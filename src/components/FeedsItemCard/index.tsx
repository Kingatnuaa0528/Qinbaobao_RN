import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

function FeedsItemCard(props: any) {
    const { item, width } = props;
    const itemWidth = width;
    const imgScaleRatio = 0.93;

    function getImageScale ({imgPath: imgPath, rowNumber: rowNumber, containerWidth: containerWidth, imgScaleRatio: imgScaleRatio}) {
        const imageObject = Image.resolveAssetSource(imgPath);
        const { width, height } = imageObject;
        return {
            width: containerWidth * imgScaleRatio / rowNumber,
            height: containerWidth * imgScaleRatio / (rowNumber * width) * height
        };
      }
      

    return (
        <View style={styles.card}>
            <Text>{item.date}</Text>
            <View style={styles.imageContainer}>
            {
                item.imgSourceList.map((imgUrl: any, index: number) => {
                    return(
                        <Image
                            source={imgUrl} 
                            key={index}
                            style={[
                                styles.image,
                                getImageScale({
                                    imgPath: imgUrl, 
                                    rowNumber: item.imgSourceList.length,
                                    containerWidth: itemWidth,
                                    imgScaleRatio: imgScaleRatio
                                }),
                            ]}
                        />
                    )
                })
            }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginLeft: 3,
        marginRight: 10
    },
    imageContainer: {
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'space-between'
    },
    image: {
        alignItems: "center",
    }
});

export default FeedsItemCard;
