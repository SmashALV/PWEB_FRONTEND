const API_URL = 'https://backend-cloud-5bym.onrender.com/categorias';

export async function getCategoria(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Error al obtener categoría');
  return await response.json();
}

export async function getAllCategorias() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener categorías');
  return await response.json();
}

export async function deleteCategoria(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar categoría');
  return await response.json();
}

export async function updateCategoria(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar categoría');
  return await response.json();
}

export async function createCategoria(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear categoría');
  return await response.json();
}
