import api from "/src/services/api.js"; // keep this as-is

export const register = async (username, password) => {
    return await api.post("/api/auth/register", {
        username,
        password,
    });
};

export const login = async (username, password) => {
    return await api.post("/api/auth/login", {
        username,
        password,
    }, {
        withCredentials: true,
    });
};

export const authStatus = async () => {
    return await api.get("/api/auth/status", {
        withCredentials: true,
    });
};

export const logoutUser = async () => {
    return await api.post("/api/auth/logout", {}, {
        withCredentials: true,
    });
};

export const setup2FA = async () => {
    return await api.post("/api/auth/2fa/setup", {}, {
        withCredentials: true,
    });
};

export const verify2FA = async (token) => {
    return await api.post("/api/auth/2fa/verify", { token }, {
        withCredentials: true,
    });
};

export const Reset2FA = async () => {
    return await api.post("/api/auth/2fa/reset", {}, {
        withCredentials: true,
    });
};
