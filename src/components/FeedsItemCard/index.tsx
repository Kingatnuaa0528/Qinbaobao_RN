import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

function FeedsItemCard(props: any) {
    const { item, width, style } = props;
    const itemWidth = width;
    const imgScaleRatio = 0.93;

    function getImageScale({ rowNumber: rowNumber }) {
        return {
            width: itemWidth * imgScaleRatio / rowNumber,
            height: itemWidth * imgScaleRatio / rowNumber
        };
    }

    function formatTimeStamp(timeStamp) {
        const time = new Date(timeStamp);
        return (time.getMonth() + 1).toString() + "-" + time.getDate().toString() + " " + time.getHours() + ":" + time.getMinutes();
    }

    return (
        <View style={{
            width: itemWidth,
            ...style,
            ...styles.card
        }}>
            <Text style={styles.dateText}>{item.date}</Text>
            <View style={styles.imageContainer}>
                {
                    item.imgSourceList.map((imgUrl: any, index: number) => {
                        return (
                            <Image
                                source={{ uri: imgUrl }}
                                key={index}
                                style={
                                    getImageScale({
                                        rowNumber: item.imgSourceList.length
                                    })
                                }
                            />
                        )
                    })
                }
            </View>
            {
                item.diaryText != undefined && item.diaryText.length > 0 &&
                <Text style={styles.diaryText}>{item.diaryText}</Text>
            }
            {
                item.timeStamp != undefined &&
                <Text style={{marginTop: 4, fontSize: 12}}>{formatTimeStamp(item.timeStamp)}</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        paddingRight: 15,
    },
    imageContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    image: {
        //alignItems: "center",
    },
    dateText: {
        color: '#000000',
        fontSize: 17,
        marginBottom: 3
    },
    diaryText: {
        color: '#000000',
        fontSize: 15,
        marginTop: 8
    }
});

export default FeedsItemCard;
