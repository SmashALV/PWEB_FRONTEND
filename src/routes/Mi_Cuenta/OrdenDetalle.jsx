import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OrdenDetalle.css";
import { getOrden, deleteOrden } from '../../api/ordenesApi';

export default function OrdenDetalle() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrden(id).then(setOrder).catch(() => setOrder(null)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!order) return <p>Orden no encontrada.</p>;

  const handleCancelOrder = () => {
    deleteOrden(id)
      .then(() => {
        alert("Orden cancelada.");
        navigate("/mi-cuenta/ordenes");
      })
      .catch(() => alert("Error al cancelar la orden."));
  };

  const handleContinueShopping = () => {
    navigate("/checkout");
  };

  return (
    <div className="orden-detalle-container">
      <h2>Detalle de la Orden</h2>
      <p><strong>ID:</strong> {order.id}</p>
      <p><strong>Fecha:</strong> {order.fecha}</p>
      <p><strong>Total:</strong> S/ {order.total}</p>
      <h3>Productos</h3>
      <ul>
        {(order.productos && Array.isArray(order.productos)) ? (
          order.productos.map((producto, index) => (
            <li key={index}>
              {producto.name} - Cantidad: {producto.quantity} - Precio: S/ {producto.price}
            </li>
          ))
        ) : (
          <li>No hay productos en esta orden.</li>
        )}
      </ul>
      <div className="orden-detalle-buttons">
        <button onClick={handleCancelOrder} className="cancel-order-btn">
          Cancelar Orden
        </button>
        <button onClick={handleContinueShopping} className="continue-shopping-btn">
          Seguir Comprando
        </button>
      </div>
    </div>
  );
}