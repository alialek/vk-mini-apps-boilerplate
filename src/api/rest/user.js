import axios from '../interceptor';

export const user = () => {
	return axios('user');
};
