import { FC } from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import colors from "../../helpers/colorVariables";

type Props = {
    text: string,
    onPress: Function,
};

const CtaButton: FC<Props> = ({text, onPress}) => {
    return (
        <TouchableOpacity style={styles.cta} onPress={() => onPress()}>
            <Text style={styles.ctaText}>{text}</Text>
        </TouchableOpacity>
    )
};

export default CtaButton;

const styles = StyleSheet.create({
    cta: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        borderRadius: 4,
        backgroundColor: colors.ctaPrimary,
        width: '100%',
    },
    ctaText: {
        fontFamily: 'Primary-SemiBold',
        color: colors.light,
        fontSize: 14,
    }
})
