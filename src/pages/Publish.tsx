import React, { useEffect } from 'react';
import {
    View,
    Image,
    TextInput,
    StyleSheet,
    Text,
} from 'react-native';
import { connect } from 'react-redux';

import { getChosenList } from '../services/diary';
import { clearChosenList, setDairyText } from '../redux/module/photo';

function PublishPage(props) {
    const {inputText, setDairyText} = props;
    const chosenList = getChosenList();
    useEffect(() => {
        return function clear() {
            setDairyText("");
        }
    }, [])
    return (
        <View style={styles.page}>
            <TextInput
                value={inputText}
                onChangeText={text => setDairyText(text)}
                style={styles.input}
                placeholder={'宝宝在笑、在跑...还是发呆中？'}
                placeholderTextColor="#BEBEBE"
            />
            <View style={styles.rowList}>
                {
                    chosenList.map((item, index) => {
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
        height: 80,
        flexFlow: 'wrap',

    },
    image: {
        height: 80,
        width: 80,
        marginRight: 3,
    },
    optionCard: {
        // flex: 1,
        flexDirection: 'row',
        flexFlow: 'space-between',
        alignItems: 'stretch',
        width: 600
    }
})

function mapStateToProps(state) {
    return {
        inputText: state.photoReducer.diaryText,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearChosenList: () => {
            dispatch(clearChosenList());
        },
        setDairyText: (text) => {
            dispatch(setDairyText(text));
        }
    }
}

const Publish = connect(mapStateToProps, mapDispatchToProps)(PublishPage)

export default Publish;
