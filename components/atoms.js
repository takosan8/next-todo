import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

//count
export const countTask = atom({
    key: "count",
    default: 0
});

//user
export const userInfo = atom({
    key: "user",
    default: {
        name: "未登録",
    },
    effects_UNSTABLE: [persistAtom] //追加
});