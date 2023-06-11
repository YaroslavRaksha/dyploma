import { FC } from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import colors from "../../helpers/colorVariables";
import {inputErrorType} from "../../helpers/customTypings";

type Props = {
    inputError: inputErrorType
};

const InputError: FC<Props> = ({inputError}) => {
    return (
        <>
            <View style={styles.inputErrorWrapper}>
                <Image
                    style={styles.inputErrorIcon}
                    source={require('../../assets/icons/crossed.png')}
                />
            </View>
            <Text style={styles.inputErrorText}>{inputError}</Text>
        </>
    )
};

export default InputError;

const styles = StyleSheet.create({
    inputErrorWrapper: {
        position: 'absolute',
        right: 12,
        height: '100%',
        width: 24,
        justifyContent: 'center',
    },
    inputErrorIcon: {
        width: '100%',
        height: 24,
        borderRadius: 50,
        backgroundColor: colors.error,
    },
    inputErrorText: {
        position: 'absolute',
        bottom: -18,
        fontSize: 11,
        color: colors.error,
        fontFamily: 'Secondary-SemiBold'
    },
})