import React from 'react';
import {
    View,
    Image,
    StyleSheet,
} from 'react-native';

function PhotoCard(props) {
    const { item, width, height, style } = props;

    return (
        <View style={styles.imageContainer}>
            <Image
                source={{uri: item.imgUrl}}
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
    );
}

const styles = StyleSheet.create({
    imageContainer: {

    },
    image: {

    }
});

export default PhotoCard;
