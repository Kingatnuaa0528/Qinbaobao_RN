import { getStore } from "../redux/ConfigureStore";

export function submitNote() {
    const store = getStore();
    if(store == undefined) {
        console.error("store is undefined!");
        return false;
    } else {
        const chosenList = store.getState().photoReducer.chosenList;
        console.log("store: " + JSON.stringify(chosenList));
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