import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

const timeLineFlexBasis = 30;
const timelineDotSize = 10;

/**
 * 
 * @param data: 数据数组
 * @param onEndReachedThreshold: flatList分页加载距离底部百分比
 * @param screenWidth: 屏幕宽度
 * @method onEndReached() : 触发分页数据加载逻辑
 * @method renderCard(item) : 渲染时间轴右侧卡片
 * @returns 
 */
function TimelineList(props) {
  const { data, onEndReachedThreshold, screenWidth } = props;
  const [itemHeight, setItemHeight] = useState(200);

  function onCardLayout(event) {
    console.log("onCardLayout: " + event.nativeEvent.layout.height);
    setItemHeight(event.nativeEvent.layout.height);
  }
  function _renderItem(item) {
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
        {
          props.renderCard(item, screenWidth-timeLineFlexBasis)
        }
      </View>

    )
  }
  return (
    <View>
      <FlatList
        data={data}
        renderItem={(item) => _renderItem(item)}
        onEndReachedThreshold={onEndReachedThreshold}
        onEndReached={() => props.onEndReached()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  timeDot: {
      width: timelineDotSize,
      height: timelineDotSize,
      borderRadius: timelineDotSize/2,
      backgroundColor: '#FFB90F'
  },
});

export default TimelineList;
