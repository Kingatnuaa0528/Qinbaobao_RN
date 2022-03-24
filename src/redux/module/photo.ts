import React from 'react';

import {
  getPhotos,
  getPhotosByPage
} from '../../utils/album.android';

export const actions = {
  FETCH_ALBUM: "PHOTO/FETCH_ALBUM",
  FETCH_PHOTO: "PHOTO/FETCH_PHOTO",
  FETCH_VIDEO: "PHOTO/FETCH_VIDEO",
  CHOOSE_PHOTO: "PHOTO/CHOOSE_PHOTO",
  SET_DIARY_TEXT: "PHOTO/SET_DIARY_TEXT",
  CLEAR_OPTIONAL_LIST: "PHOTO/CLEAR_OPTIONAL_LIST",
  CLEAR_CHOSEN_LIST: "PHOTO/CLEAR_CHOSEN_LIST",
}

const PAGE_SIZE = 20;

const initialStatus = {
  photoList: [],
  dataStatus: "",
  chosenList: [],
  diaryText: "",
  cursor: '0',
  hasNext: true
};

// reducer
export function photoReducer(state = initialStatus, action: any) {
  switch (action.type) {
    case actions.FETCH_PHOTO: {
      return {
        ...state,
        photoList: [...state.photoList, ...action.payload.photoList],
        cursor: action.payload.cursor,
        hasNext: action.payload.hasNext
      }
    }
    case actions.CHOOSE_PHOTO: {
      return {
        ...state,
        chosenList: action.payload
      }
    }
    case actions.SET_DIARY_TEXT: {
      return {
        ...state,
        diaryText: action.payload
      }
    }
    case actions.CLEAR_OPTIONAL_LIST: {
      return {
        ...state,
        photoList: [],
        cursor: '0'
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
export function fetchPhoto(test: string) {
  return (dispatch, getState) => {
    const cursor = getState().photoReducer.cursor;
    getPhotosByPage(PAGE_SIZE, cursor).then(response => {
      let payload = {
        photoList: response.edges,
        cursor: response.page_info.end_cursor,
        hasNext: response.page_info.has_next_page
      }
      dispatch({
        type: actions.FETCH_PHOTO,
        payload: payload
      })
    }).catch((err) => {
      console.log("[getPhotos] response error! " + JSON.stringify(err));
      dispatch({
        type: actions.FETCH_PHOTO,
        payload: []
      })
    });
  }
}

export function chooseImage(item, isChosen) {
  let imgUrl = item.imgUrl;
  return (dispatch, getState) => {
    const { chosenList } = getState().photoReducer;
    let payload = chosenList;
    if (!isChosen) {
      chosenList.map((item, index) => {
        if (item === imgUrl) {
          chosenList.splice(index, 1);
        }
      })
      payload = chosenList;
    } else {
      payload = [...chosenList, imgUrl];
    }
    dispatch({
      type: actions.CHOOSE_PHOTO,
      payload: payload
    })
  }
}

export function clearChosenList() {
  return (dispatch) => {
    dispatch({
      type: actions.CLEAR_CHOSEN_LIST
    })
  }
}

export function clearOptionalList() {
  return (dispatch) => {
    dispatch({
      type: actions.CLEAR_OPTIONAL_LIST
    })
  }
}

export function setDairyText(text: string) {
  return (dispatch) => {
    dispatch({
      type: actions.SET_DIARY_TEXT,
      payload: text
    })
  }
}