import {FC, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated} from 'react-native';
import colors from "../../helpers/colorVariables";

type Props = {
    array: any[] | undefined,
    inputError: boolean,
    onSet: Function
}

const DropdownList: FC<Props> = ({array, inputError, onSet}) => {

    console.log(array);
    if(array && array?.length > 0) {
        return (
            <View style={[styles.dropdownWrapper, {borderColor: inputError ? colors.error : colors.inputFocus}]}>
                {array?.slice(0,3)?.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => onSet(item)}>
                            <Text style={styles.dropdownItemText}>{item}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
    else {
        return <></>
    }
};

const styles = StyleSheet.create({
    dropdownWrapper: {
        maxHeight: 150,
        paddingVertical: 4,
        width: '100%',
        backgroundColor: colors.light,
        position: 'absolute',
        bottom: 48,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    dropdownItem: {
        paddingHorizontal: 12,
        paddingTop: 8,
        paddingBottom: 8,
    },
    dropdownItemText: {
        fontFamily: 'Secondary-Medium',
        fontSize: 15,
    }
})

export default DropdownList;
