import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { 
    View,
    StyleSheet, 
} from 'react-native';

import Content from "../pages/Content";
import PublishComponent from '../pages/Publish';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
        <View style={styles.container}>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false // 隐藏标题，可以设置到Stack.Screen中(options属性)
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={Content} 
                />
                <Stack.Screen
                    name="Publish"
                    component={PublishComponent} 
                />
            </Stack.Navigator>
        </View>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
