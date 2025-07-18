import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../api/UserApi";
import "./Lista_Usuarios.css";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");

  const cargarUsuarios = async () => {
    try {
      const apiUsers = await getAllUsers();
      const localUsers = JSON.parse(localStorage.getItem("users")) || [];

      const combinedUsers = [...localUsers, ...apiUsers].reduce((acc, user) => {
        if (!acc.some(u => u.dni === user.dni)) {
          acc.push({ ...user, estado: user.estado || "Activo" }); 
        }
        return acc;
      }, []);

      setUsuarios(combinedUsers);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const cambiarEstadoUsuario = (dni) => {
    const updatedUsuarios = usuarios.map(user => {
      if (user.dni === dni) {
        return { ...user, estado: user.estado === "Activo" ? "Inactivo" : "Activo" };
      }
      return user;
    });

    setUsuarios(updatedUsuarios);
    localStorage.setItem("users", JSON.stringify(updatedUsuarios.filter(u => u.dni))); // Actualizar localStorage
  };

  const updateUserStatus = async (id, status) => {
    try {
      const updatedUser = await fetch(`/api/users/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      }).then(res => res.json());

      setUsuarios(prev => prev.map(u => (u.id === id ? updatedUser : u)));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
    const onFocus = () => cargarUsuarios();
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const usuariosFiltrados = usuarios.filter(u =>
    (u.dni?.toString().includes(filtro) ||
      u.nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
      u.apellido?.toLowerCase().includes(filtro.toLowerCase()))
  );

  return (
    <div className="lista-usuarios-container">
      <h2>Lista de usuarios registrados</h2>
      <input
        type="text"
        placeholder="Filtrar por ID, nombre o apellido"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        className="filtro-input"
      />
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>DNI</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((u, idx) => (
            <tr key={u.dni || idx}>
              <td>{u.nombre}</td>
              <td>{u.apellido}</td>
              <td>{u.email || u.correo}</td>
              <td>{u.dni || "Sin DNI"}</td>
              <td>
                <span
                  className={`estado-link ${u.estado === "Activo" ? "estado-activo" : "estado-inactivo"}`}
                  onClick={() => cambiarEstadoUsuario(u.dni)} 
                >
                  {u.estado}
                </span>
              </td>
              <td>
                <button onClick={() => updateUserStatus(u.id, 'Activo')}>Activar</button>
                <button onClick={() => updateUserStatus(u.id, 'Inactivo')}>Desactivar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}