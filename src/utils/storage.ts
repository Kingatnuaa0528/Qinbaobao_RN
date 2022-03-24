import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage'

let storage;

export const CONTENT_KEY = "contentKey";
const PAGE_SIZE = 10;

export function createStorage() {
    if(storage == undefined) {
        storage = new Storage({
            storageBackend: AsyncStorage,
            enableCache: true,
            defaultExpires: null,
        })
    }
}

export function setStorage(id, object) {
    createStorage();
    return storage.save({
        key: CONTENT_KEY,
        id: id,
        data: object
    })
}

export function getStorageById(id) {
    createStorage();
    const query = {
        key: CONTENT_KEY,
        id: id
    };
    return storage.getBatchData(query);
}

// 分页获取所有storage
export async function getAllStorageByPage(cursor: number) {
    try{
        createStorage();
        
        const ids = await storage.getIdsForKey(CONTENT_KEY);
        let endCursor = cursor + PAGE_SIZE;
        let hasNext = true;
        if(endCursor > ids.length) {
            hasNext = false;
            endCursor = ids.length;
        }

        let chosenIds = ids.slice(cursor, endCursor);
        const query = chosenIds.map( id => ({
            key: CONTENT_KEY, 
            id: id,
            syncInBackground: true
        }));
        const data = await storage.getBatchData(query);
        return Promise.resolve({
            data: data,
            hasNext: hasNext,
            cursor: endCursor
        });
    } catch(e) {
        return Promise.reject({
            data: e
        })
    }
}