import React from 'react';

import { 
  getPhotos,
} from '../../utils/album.android';

export const actions = {
    FETCH_ALBUM: "PHOTO/FETCH_ALBUM",
    FETCH_PHOTO: "PHOTO/FETCH_PHOTO",
    FETCH_VIDEO: "PHOTO/FETCH_VIDEO"
}

const PAGE_SIZE = 20;

const initialStatus = {
  photoList: [],
  dataStatus: ""
};

// reducer
export function photoReducer(state=initialStatus, action: any) {
  switch(action.type) {
    case actions.FETCH_PHOTO: {
      return {
        photoList: action.payload
      }
    }
    default: {
      return initialStatus
    }
  }

}

// action creater
export function fetchPhoto(dispatch: any) {
  getPhotos(PAGE_SIZE).then(response => {
    let photoList = response;
    return dispatch({
      type: actions.FETCH_PHOTO,
      payload: photoList
    })
  }).catch((err) => {
    console.log("[getPhotos] response error! " + JSON.stringify(err));
    return dispatch({
      type: actions.FETCH_PHOTO,
      payload: []
    })
  });
}