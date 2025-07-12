import "./Mi_Cuenta.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import Ordenes from "./Ordenes";
import OrdenDetalle from "./OrdenDetalle";
import MisDatos from "./Mis_Datos";
import CambiarContraseña from "./Cambiar_Contrasen╠âa";
import { Outlet } from "react-router-dom";
import AdminDashboardResumen from "./AdminDashboardResumen";
import AdminLayout from "../Mi_Cuenta/AdminDashboardResumen";
import ListaUsuarios from "../Admin/Lista_Usuarios";
import ListaCategorias from "../Listado_Categorias/Listado_Categorias";
import Listado_Productos from "../Listado_Productos/Listado_Productos";

export default function MiCuenta() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/iniciar-sesion");
    }
    
    if (user?.rol === "admin" && location.pathname === "/mi-cuenta") {
      navigate("/mi-cuenta/mis-datos", { replace: true });
    }
  }, [navigate, user, location.pathname]);

  return (
    <div className="mi-cuenta-container">
      <nav className="mi-cuenta-nav">
        {user?.rol === "admin" ? (
          <>
            <Link to="/mi-cuenta/mis-datos" className={location.pathname === "/mi-cuenta/mis-datos" ? "active-admin-btn" : ""}>Mis datos</Link>
            <Link to="/dashboard" className="admin-btn">Dashboard</Link>
            <Link to="/lista_usuarios" className="admin-btn">Lista de Usuarios</Link>
            <Link to="/Lista_Categorias" className="admin-btn">Lista de Categorías</Link>
            <Link to="/Lista_Productos" className="admin-btn">Lista de Productos</Link>
            
          </>
        ) : (
          <>
            <Link to="/mi-cuenta/ordenes">Órdenes</Link>
            <Link to="/mi-cuenta/mis-datos">Mis datos</Link>
            <Link to="/mi-cuenta/cambiar-contraseña">Cambiar contraseña</Link>
          </>
        )}
      </nav>
      <div className="mi-cuenta-section">
        <Routes>
          <Route path="mis-datos" element={<MisDatos />} />
          <Route path="dashboard" element={<AdminLayout><AdminDashboardResumen /></AdminLayout>} />
          <Route path="lista_usuarios" element={<AdminLayout><ListaUsuarios /></AdminLayout>} />
          <Route path="Lista_Categorias" element={<AdminLayout><ListaCategorias /></AdminLayout>} />
          <Route path="Lista_Productos" element={<AdminLayout><Listado_Productos /></AdminLayout>} />
          <Route path="ordenes" element={<Ordenes />} />
          <Route path="ordenes/:id" element={<OrdenDetalle />} />
          <Route path="cambiar-contraseña" element={<CambiarContraseña />} />
          <Route index element={<Ordenes />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}