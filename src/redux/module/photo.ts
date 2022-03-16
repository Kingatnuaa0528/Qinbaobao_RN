import React from 'react';

import {
  getPhotos,
} from '../../utils/album.android';

export const actions = {
  FETCH_ALBUM: "PHOTO/FETCH_ALBUM",
  FETCH_PHOTO: "PHOTO/FETCH_PHOTO",
  FETCH_VIDEO: "PHOTO/FETCH_VIDEO",
  CHOOSE_PHOTO: "PHOTO/CHOOSE_PHOTO",
  CLEAR_CHOSEN_LIST: "PHOTO/CLEAR_CHOSEN_LIST",
}

const PAGE_SIZE = 20;

const initialStatus = {
  photoList: [],
  dataStatus: "",
  chosenList: []
};

// reducer
export function photoReducer(state = initialStatus, action: any) {
  switch (action.type) {
    case actions.FETCH_PHOTO: {
      return {
        ...state,
        photoList: action.payload
      }
    }
    case actions.CHOOSE_PHOTO: {
      return {
        ...state,
        chosenList: action.payload
      }
    }
    case actions.CLEAR_CHOSEN_LIST: {
      return {
        ...state,
        chosenList: []
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

export function chooseImage(item, isChosen) {
  let imgUrl = item.imgUrl;
  return (dispatch, getState) => {
    const { chosenList } = getState().photoReducer;
    console.log("choseList: " + JSON.stringify(chosenList));
    let payload = chosenList;
    if (!isChosen) {
      chosenList.map((item, index) => {
        if(item === imgUrl) {
          chosenList.splice(index, 1);
        }
      })
      payload = chosenList;
    } else {
      payload = [...chosenList, imgUrl];
    }
    console.log("payload: " + JSON.stringify(payload));
    dispatch({
      type: actions.CHOOSE_PHOTO,
      payload: payload
    })
  }
}

export function clearChosenList(dispatch) {
  return dispatch({
    type: actions.CLEAR_CHOSEN_LIST
  })
}