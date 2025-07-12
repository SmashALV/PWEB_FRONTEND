const API_URL = 'https://backend-cloud-5bym.onrender.com/users';

export async function getUser(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Error al obtener usuario');
  return await response.json();
}

export async function getAllUsers() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener usuarios');
  return await response.json();
}