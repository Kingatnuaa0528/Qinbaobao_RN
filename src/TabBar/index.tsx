import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from '../../resource/icons';

function TabBar() {
    const navigation = useNavigation(); 
    const onPress = () => {
        navigation.navigate('Optional');
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
            >
                <Icon name="Add" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        alignItems: 'center'
    }
})

export default TabBar;
