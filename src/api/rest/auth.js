import axios from '../interceptor';

export const auth = (url) => {
    return axios.post('auth', { url });
};
