import { getStore } from "../redux/ConfigureStore";
import { setStorage } from "../utils/storage";

export const BACK_EVENT_FROM_PUBLISH = "BackFromPublish";

export function submitNote(time: Date) {
    const store = getStore();
    if(store == undefined) {
        console.error("store is undefined!");
        return false;
    } else {
        const chosenList = store.getState().photoReducer.chosenList;
        const diaryText = store.getState().photoReducer.diaryText;
        const timeStamp = time.getTime();
        const timeString = time.getFullYear().toString() + "-" + (time.getMonth() + 1).toString() + "-" + time.getDate().toString();
        let data = {
            imgSourceList: chosenList,
            date: timeString,
            diaryText: diaryText,
            timeStamp: timeStamp
        };
        setStorage(timeStamp, data);
    }
}

export function getChosenList() {
    const store = getStore();
    if(store == undefined) {
        console.error("store is undefined!");
        return [];
    } else {
        const chosenList = store.getState().photoReducer.chosenList;
        return chosenList;
    }
}