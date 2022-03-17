import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    TextInput,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { getChosenList } from '../services/diary';
import { clearChosenList } from '../redux/module/photo';

function PublishPage(props) {
    const {clearChosenList} = props;
    const [inputText, setInputText] = useState('');
    const chosenList = getChosenList();
    useEffect(() => {
        return function clear() {
            //clearChosenList();
        }
    }, [])
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

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearChosenList: () => {
            dispatch(clearChosenList());
        }
    }
}

const Publish = connect(mapStateToProps, mapDispatchToProps)(PublishPage)

export default Publish;
