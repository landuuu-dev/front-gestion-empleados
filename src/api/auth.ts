import api from './axiosConfig';

export const logout = async () => {
  try {
    await api.post('/logout'); // POST a /logout según Spring Security
    localStorage.removeItem('isAuthenticated'); // Limpiar estado local
    window.location.href = '/login';
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    // Igual limpiamos localStorage para forzar logout en frontend
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  }
};
