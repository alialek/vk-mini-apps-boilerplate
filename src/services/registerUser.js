import { register} from "../api";
import { setIntroViewed} from "../api/vk";

export const registerUser = (about) => {
    return Promise.all([register(about), setIntroViewed()]);
};
