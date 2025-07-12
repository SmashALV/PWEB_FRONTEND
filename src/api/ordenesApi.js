const API_URL = 'https://backend-cloud-5bym.onrender.com/ordenes';

export async function getOrden(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Error al obtener orden');
  return await response.json();
}

export async function getAllOrdenes() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener ordenes');
  return await response.json();
}

export async function createOrden(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al crear orden');
  return await response.json();
}

export async function deleteOrden(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar orden');
  return await response.json();
}
