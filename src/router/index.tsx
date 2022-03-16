import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import Content from "../pages/Content";
import OptionalList from '../pages/OptionalList';
import Publish from '../pages/Publish';
import { submitNote } from '../services/diary';
import { clearChosenList } from '../redux/module/photo';

const Stack = createNativeStackNavigator();

function AppPage(props) {
    const { clearChosenList } = props;
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        //headerShown: false // 隐藏标题，可以设置到Stack.Screen中(options属性)
                    }}
                >
                    <Stack.Screen
                        name="Home"
                        component={Content}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="Optional"
                        component={OptionalList}
                        options={({ navigation: { navigate } }) => ({
                            title: "所有文件",
                            headerRight: () => (
                                <Text onPress={() => {
                                    navigate('Publish')
                                }}>完成</Text>
                            )
                        })}
                    />
                    <Stack.Screen
                        name="Publish"
                        component={Publish}
                        options={({ navigation: { goBack } }) => ({
                            headerLeft: () => (
                                <Text onPress={() => {
                                    clearChosenList();
                                    goBack();
                                }}>取消</Text>
                            ),
                            headerRight: () => (
                                <Text
                                    style={styles.publishBtn}
                                    onPress={() => {
                                        submitNote();
                                    }}
                                >
                                    保存
                                </Text>
                            ),
                            headerShadowVisible: false,
                            title: '',
                        })}
                    />
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
};

function mapStateToProps(state) {
    return {
        data: state.photoReducer.photoList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearChosenList: () => {
            dispatch(clearChosenList);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    publishBtn: {
        borderRadius: 12,
        backgroundColor: '#FFB90F',
        width: 45,
        height: 25,
        textAlign: 'center',
        lineHeight: 25,
        color: 'white',
        fontSize: 14
    }
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppPage);
export default App;