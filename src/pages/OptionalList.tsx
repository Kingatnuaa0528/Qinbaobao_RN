import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

import { fetchPhoto, clearOptionalList, clearChosenList } from '../redux/module/photo';
import { REVEAL_IMAGE } from '../utils/album.android';
import PhotoCard from '../components/AlbumCard/photoCard';

const NUM_PER_ROW = 3;
const ON_END_REACHED_THRES = 0.2;

// ui组件
const OptionalListPage = (props) => {
  const { data, fetchPhoto, clearOptionalList, clearChosenList } = props;
  const [imgWidth, setWidth] = useState(120);
  const [imgHeight, setHeight] = useState(120);

  useEffect(() => {
    fetchPhoto();
    const { width, height } = getImageScale();
    setWidth(width);
    setHeight(height);
    return function clear() {
      clearOptionalList();
      clearChosenList();
    }
  }, []);

  function getImageScale() {
    const { width: screenWidth } = Dimensions.get('window');
    return {
      width: screenWidth * 0.96 / NUM_PER_ROW,
      height: screenWidth * 0.96 / NUM_PER_ROW
    }
  }

  function renderItem(data) {
    let imageUri = '';
    try {
      imageUri = data.item.node.image.uri;
    } catch (error) {
    }
    if (imageUri != undefined && imageUri.length > 0) {
      const item = { imgUrl: imageUri };
      return (
        <PhotoCard
          item={item}
          width={imgWidth}
          height={imgHeight}
          style={styles.image}
        />
      )
    } else {
      const item = { imgUrl: REVEAL_IMAGE };
      return (
        <PhotoCard
          item={item}
          width={imgWidth}
          height={imgHeight}
          style={styles.image}
        />
      )
    }
  }

  function onEndReached() {
    console.log("onEndReached");
  }

  // render
  return (
    <View style={styles.page}>
      <FlatList
        data={data}
        numColumns={NUM_PER_ROW}
        renderItem={(item) => renderItem(item)}
        columnWrapperStyle={styles.list}
        onEndReachedThreshold={ON_END_REACHED_THRES}
        onEndReached={() => onEndReached()}
      />
    </View>
  );

}

function mapStateToProps(state) {
  return {
    data: state.photoReducer.photoList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPhoto: () => {
      dispatch(fetchPhoto);
    },
    clearOptionalList: () => {
      dispatch(clearOptionalList());
    },
    clearChosenList: () => {
      dispatch(clearChosenList());
    }
  }
}

const styles = StyleSheet.create({
  page: {

  },
  list: {
    justifyContent: 'space-around',
  },
  image: {
    marginLeft: 1,
    marginRight: 1,
    marginBottom: 2,
  }
});

const OptionalList = connect(mapStateToProps, mapDispatchToProps)(OptionalListPage);

export default OptionalList;
