import axios from '../interceptor';

export const updateNotifications = (status) => {
    return axios.put('notifications', { status });
};
