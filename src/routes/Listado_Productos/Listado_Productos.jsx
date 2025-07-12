import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos } from '../../api/productosApi';
import './Listado_Productos.css';

export default function Listado_Productos() {
    const [produ, setProdu] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getProductos().then(setProdu).catch(() => setProdu([]));
    }, []);

    const adaptedprodu = produ.map(u => ({
        id: u.id,
        nombre: u.name,
        precio: u.precioConDescuento || u.precio,
        presentacion: u.unit || '',
        descripcion: u.descripcion,
        stock: u.stock,
    }));

    const filtered = adaptedprodu.filter(u =>
        (u.nombre || '').toLowerCase().includes(search.toLowerCase()) ||
        (u.descripcion || '').toLowerCase().includes(search.toLowerCase())
    );

    // Ordenar de menor a mayor por id
    const sorted = [...filtered].sort((a, b) => a.id - b.id);

    return (
        <>
            <h1>Listado Productos</h1>
            <section className="search-bar-section">
                <input
                    type="text"
                    placeholder="Buscar un producto..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button className='bton_agrega' onClick={() => navigate('/Agregar_Producto')}> Agregar Producto(+)</button>
            </section>
            <table className="productos-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.nombre}</td>
                            <td>{u.descripcion}</td>
                            <td>{u.stock}</td>
                            <td>
                                {/* Removed stock-related functionality */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
