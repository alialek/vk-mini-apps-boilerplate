import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 9000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        let token;
        try {
            token = localStorage.getItem('user_rc') || null;
        } catch {
            token = window.token || null;
        }
        if (config.method !== 'get') {
            config.headers.common['Content-Type'] = 'application/json';
        }
        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete config.headers.common['Authorization'];
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        try {
            if (error.toJSON().message === 'Network Error') {
            } else if (error.toJSON().message.includes('timeout')) {
            } else if (error.response.status === 401) {
                // localStorage.removeItem('user_rc');
                delete axios.defaults.headers.common['Authorization'];
            } else {
            }
            return Promise.reject(error);
        } catch (err) {}
        return Promise.reject(error);
    },
);

export default instance;
