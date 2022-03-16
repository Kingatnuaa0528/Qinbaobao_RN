import React, { useState } from 'react';
import { 
    View,
    Image,
    TextInput,
    StyleSheet,
 } from 'react-native';

import { getChosenList } from '../services/diary';

function Publish() {
    const [inputText, setInputText] = useState('');
    const chosenList = getChosenList();
    return (
        <View style={styles.page}>
            <TextInput
                value={inputText}
                onChangeText={text => setInputText(text)}
                style={styles.input}
                placeholder={'宝宝在笑、在跑...还是发呆中？'}
                placeholderTextColor="#BEBEBE"
            />
            <View style={styles.rowList}>
            {
                chosenList.map((item, index) => {
                    //console.log("item: " + item);
                    return (
                    <Image
                        source={{ uri: item }}
                        style={styles.image}
                    />
                    );
                })
            }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        marginLeft: 20 
    },
    input: {
        height: 100,
        textAlignVertical: 'top',
        marginTop: 3
    },
    rowList: {
        flex: 1,
        flexDirection: 'row',
        flexFlow: 'wrap',
    },
    image: {
        height: 80,
        width: 80,
        marginRight: 3,
    }
})

export default Publish;
