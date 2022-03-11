import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import images from '../../resource/Images';

import FeedsItemCard from '../components/FeedsItemCard';
import TabBar from '../TabBar';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const timeLineFlexBasis = 20;

const dataList = [{
    "key": 0,
    "date": "2月21日 9个月12天",
    "imgSourceList": [images.tiger2, images.tiger2]
}, {
    "key": 1,
    "date": "1月15日 8个月6天",
    "imgSourceList": [images.tiger2]
}];

const Content = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={{ flexBasis: timeLineFlexBasis }}>
                </View>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scroll_view}
                >
                    {
                        dataList.map((item) => {
                            return (
                                <FeedsItemCard
                                    item={item}
                                    width={screenWidth - timeLineFlexBasis}
                                    key={item.key}
                                />
                            )
                        })
                    }
                </ScrollView>
            </View>
            <TabBar/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    scroll_view: {
        //flexBasis: 500, 
    },
});

export default Content;
