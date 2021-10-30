const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
export const isAuthenticated = !!localStorage.getItem('accessToken');