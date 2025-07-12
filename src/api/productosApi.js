const API_URL = 'https://backend-cloud-5bym.onrender.com/productos';

export async function getProductos() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener productos');
  return await response.json();
}

export async function getProducto(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Error al obtener producto');
  return await response.json();
}

export async function crearProducto(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al crear producto');
  return await response.json();
}

export async function actualizarProducto(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Error al actualizar producto');
  return await response.json();
}

export async function eliminarProducto(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar producto');
  return await response.json();
}

export async function getSimilarProductos(productoId) {
  const response = await fetch(`${API_URL}/similar/${productoId}`);
  if (!response.ok) throw new Error('Error al obtener productos similares');
  return await response.json();
}
