import React, { useEffect, useState } from 'react';
import {
    Text,
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
import TimelineList from '../components/TimelineList';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
    function renderItem(item, width) {
        console.log("item: " + JSON.stringify(item));
        return (
            <FeedsItemCard
                item={item.item}
                width={width}
                key={item.key}
                style={styles.card}
            />
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
                <TimelineList
                    data={dataList}
                    onEndReachedThreshold={ON_END_REACHED_THRES}
                    onEndReached={() => onEndReached()}
                    screenWidth={screenWidth}
                    renderCard={(item, width) => renderItem(item, width)}
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
    list: {
        justifyContent: 'space-around',
    },
    card: {
        marginBottom: 10
    }
});

export default Content;
