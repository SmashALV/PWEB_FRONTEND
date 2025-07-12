import React, { useState } from "react";

export default function AdminDashboardResumen() {
  const today = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const filteredOrders = orders.filter(
    (o) => o.date >= startDate && o.date <= endDate
  );
  const filteredUsers = users.filter(
    (u) =>
      (u.fechaCreacion || u.fecha) >= startDate &&
      (u.fechaCreacion || u.fecha) <= endDate
  );

  const ingresosTotales = filteredOrders.reduce(
    (sum, o) => sum + (parseFloat(o.total) || 0),
    0
  );

  return (
    <div className="admin-dashboard-resumen">
      <h2>Resumen del día</h2>
      <form className="periodo-form">
        <label>
          Desde: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          Hasta: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </form>
      <div className="summary-cards">
        <div className="card">
          <div className="card-label">Órdenes</div>
          <div className="card-value">{filteredOrders.length}</div>
        </div>
        <div className="card">
          <div className="card-label">Usuarios nuevos</div>
          <div className="card-value">{filteredUsers.length}</div>
        </div>
        <div className="card">
          <div className="card-label">Ingresos totales</div>
          <div className="card-value">S/{ingresosTotales.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
