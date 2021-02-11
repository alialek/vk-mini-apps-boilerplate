import axios from '../api/interceptor';

export const saveCredentials = (res) => {
	localStorage.setItem('user_rc', res.data.token);
	axios.defaults.headers.common['Authorization'] = res.data.token;
};
