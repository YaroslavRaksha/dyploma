import {FC, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from "../../helpers/colorVariables";


type Props = {
    borderRadius?: number,
}

const PhoneCodeSelector: FC<Props> = ({borderRadius = 4}) => {
    return (
        <View style={[
            styles.wrapper,
            {borderTopLeftRadius: borderRadius, borderBottomLeftRadius: borderRadius}
        ]}>
            <Text style={styles.phoneCode}>+380</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 12,
        paddingRight: 16,
        backgroundColor: colors.phoneCodeSelector,
    },
    phoneCode: {
        fontSize: 15,
        fontFamily: 'Primary-Medium',
    }
})

export default PhoneCodeSelector;