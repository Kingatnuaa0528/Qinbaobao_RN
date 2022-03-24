import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    FlatList,
    DeviceEventEmitter,
} from 'react-native';

import FeedsItemCard from '../components/FeedsItemCard';
import TabBar from '../TabBar';
import { getAllStorageByPage } from '../utils/storage';
import { BACK_EVENT_FROM_PUBLISH } from '../services/diary';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const timeLineFlexBasis = 30;
const timelineDotSize = 10;

const ON_END_REACHED_THRES = 0.2;

const Content = () => {
    const [dataList, setDataList] = useState<any[]>([]);
    const [cursor, setCursor] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const [waiting, setWaiting] = useState(false);
    const [itemHeight, setItemHeight] = useState(200);

    useEffect(() => {
        getContentListByPage();
        DeviceEventEmitter.addListener(BACK_EVENT_FROM_PUBLISH, () => {
            getContentListByPage();
        })
    }, []);
    function onCardLayout(event) {
        console.log("onCardLayout: " + event.nativeEvent.layout.height);
        setItemHeight(event.nativeEvent.layout.height);
    }
    function renderItem(item) {
        console.log("item: " + JSON.stringify(item));
        return (
            <View style={styles.itemContainer} onLayout={(event) => {
                onCardLayout(event);
            }}>
                <View style={styles.timelineContainer} >
                    <View style={styles.timeDot} />
                    <View style={{
                        height: itemHeight - timelineDotSize,
                        ...styles.timeline
                    }} />
                </View>
                <FeedsItemCard
                    item={item.item}
                    width={screenWidth - timeLineFlexBasis}
                    key={item.key}
                    style={styles.card}
                />
            </View>

        )
    }
    function getContentListByPage() {
        if (hasNext) {
            getAllStorageByPage(cursor).then(res => {
                const newDataList = [...dataList, ...res.data];
                setDataList(newDataList);
                setCursor(res.cursor);
                setHasNext(res.hasNext);
            }).catch(e => {
                setHasNext(false);
                console.log("getAllStorageByPage error! msg: " + JSON.stringify(e));
            })
        }
    }
    async function onEndReached() {
        await getContentListByPage();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <FlatList
                    data={dataList}
                    renderItem={(item) => renderItem(item)}
                    onEndReachedThreshold={ON_END_REACHED_THRES}
                    onEndReached={() => onEndReached()}
                />
            </View>
            <TabBar />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: '#F5F5F5'
    },
    scroll_view: {
        //flexBasis: 500, 
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    timelineContainer: {
        flexBasis: timeLineFlexBasis,
        alignItems: 'center',
        height: '100%'
    },
    timeline: {
        borderColor: '#BEBEBE',
        borderLeftWidth: 0,
        borderRightWidth: 2
    },
    list: {
        justifyContent: 'space-around',
    },
    timeDot: {
        width: timelineDotSize,
        height: timelineDotSize,
        borderRadius: timelineDotSize/2,
        backgroundColor: '#FFB90F'
    },
    card: {
        marginBottom: 10
    }
});

export default Content;
