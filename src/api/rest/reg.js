import axios from '../interceptor';

export const register = (about) => {
	return axios.post('reg.json', { about });
};

export const updateAbout = (about) => {
	return axios.put('reg.json', { about });
};
