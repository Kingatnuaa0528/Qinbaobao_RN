import React from 'react';
import {
  Image,
  Permission,
  PermissionsAndroid
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";

// constant
export const REVEAL_IMAGE = "https://gw.alicdn.com/imgextra/i3/O1CN01aSUuSM1XKXJV1j8eV_!!6000000002905-0-tps-200-253.jpg";


// export method
export function getPhotos(size: number) {
  const permissions = [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.CAMERA];
  return fetchWithPermission(permissions, async () => {
    const result = await CameraRoll.getPhotos({
      first: size,
      assetType: 'Photos'
    });
    return result.edges;
  });
}

export function getPhotosByPage(size: number, cursor: number) {

}

export function getVideos(size: number) {

}

export function getVideosByPage(size: number, cursor: number) {

}

export function getAll(size: number) {

}

export function getAllByPage(size: number, cursor: number) {

}

// inner method
function fetchWithPermission(permissions: Array<Permission>, action: Function) {
  return checkPermission(permissions).then(async response => {
    if (response == true) {
      console.log("checkPermission success!");
      const result = await action();
      return Promise.resolve(result);
      //return result.edges;
    } else {
      return requestPermission(permissions).then(async ret => {
        if (ret == true) {
          console.log("requestPermission success!");
          const result = await action();
          return Promise.resolve(result);
        } else {
          console.error("requestPermission error! ret=false");
          //TODO return new Promise
          return Promise.reject(new Error('fail'));
          //return null;
        }
      }).catch(err => {
        console.error("requestPermission error! " + JSON.stringify(err));
        return Promise.reject(new Error('fail'));
        //return null;
      })
    }
  }).catch(err => {
    console.error("checkPermission error! " + JSON.stringify(err));
    return Promise.reject(new Error('fail'));
    //return null;
  })
}

async function requestPermission(permissions: Array<Permission>) {
  const permissionsGranted = await PermissionsAndroid.requestMultiple(permissions);
  Object.keys(permissionsGranted).map((key, index) => {
    if (permissionsGranted[key] != PermissionsAndroid.RESULTS.GRANTED) {
      console.error(key + " permission is not granted!");
      return false;
    }
  })
  return true;
}

async function checkPermission(permissions: Array<Permission>) {
  const promises = permissions.map(async (permission) => {
    const permissionGranted = await PermissionsAndroid.check(permission);
    if (permissionGranted == false) {
      return false;
    }
  })
  const results = await Promise.all(promises);
  let result = true;
  results.map((item) => {
    result = result && (item == undefined ? true : item);
  })
  return Promise.resolve(result);
}