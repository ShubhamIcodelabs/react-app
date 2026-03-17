const API_BASE_URL = "http://localhost:3001/api";

// Refresh the access token using the stored refresh token
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) throw new Error('No refresh token');

    const response = await fetch(`${API_BASE_URL}/user/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
        // Refresh token expired or invalid — force logout
        localStorage.clear();
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
};

// Authenticated fetch — auto-retries once with a fresh token on 401
export const authFetch = async (endpoint, options = {}) => {
    const accessToken = localStorage.getItem('accessToken');

    const makeRequest = (token) =>
        fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                ...options.headers
            }
        });

    let response = await makeRequest(accessToken);

    if (response.status === 401) {
        // Try refreshing the token once
        const newToken = await refreshAccessToken();
        response = await makeRequest(newToken);
    }

    return response;
};
