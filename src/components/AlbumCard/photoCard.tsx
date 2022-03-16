import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import CheckBox from 'expo-checkbox';

import { chooseImage } from '../../redux/module/photo';

function PhotoCardComponent(props) {
    const { item, width, height, style, chooseImage } = props;
    const [isChosen, setChosen] = useState(false);

    return (
        <TouchableOpacity
            onPress={() => {
                chooseImage(item, !isChosen);
                setChosen(!isChosen);
            }}
        >
            <View style={styles.imageContainer}>
                <CheckBox 
                    value={isChosen}
                    style={styles.checkBox}
                />
                <Image
                    source={{ uri: item.imgUrl }}
                    style={[
                        style,
                        styles.image,
                        {
                            width: width,
                            height: height
                        }
                    ]}
                />
            </View>
        </TouchableOpacity>
    );
}

function mapStateToProps(state) {
    return {
        
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chooseImage: (item, isChosen) => {
            dispatch(chooseImage(item, isChosen));
        }
    }
}

const styles = StyleSheet.create({
    imageContainer: {

    },
    image: {
    },
    checkBox: {
        position: 'absolute',
        zIndex: 1,
        top: 10,
        right: 10
    }
});

const PhotoCard = connect(mapStateToProps, mapDispatchToProps)(PhotoCardComponent);
export default PhotoCard;