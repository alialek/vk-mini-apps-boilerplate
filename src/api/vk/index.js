import { VKMiniAppAPI } from '@vkontakte/vk-mini-apps-api';
import { store } from '../../index';
import { setColorScheme } from '../../store/data/actions';
import { router, PAGE_MAIN } from '../../router';

const api = new VKMiniAppAPI();

const STORAGE_KEYS = {
    STATUS: 'status',
};

export const initApp = () => api.initApp();

api.onUpdateConfig((res) => {
    if (res?.scheme) store.dispatch(setColorScheme(res.scheme));
});

export const getUserInfo = () => {
    return api.getUserInfo();
};

export const tapticNotification = (type) => {
    api.bridge.send('VKWebAppTapticNotificationOccurred', { type });
};

export const tapticSelectNotification = () => {
    api.bridge.send('VKWebAppTapticSelectionChanged', {});
};

export const isIntroViewed = async () => {
    return await api.storageGet(STORAGE_KEYS.STATUS);
};
export const setIntroViewed = async () => {
    api.storageSet(STORAGE_KEYS.STATUS, 'viewed').finally(() => router.replacePage(PAGE_MAIN));
};

