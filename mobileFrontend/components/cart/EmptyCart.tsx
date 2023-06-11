import { FC } from 'react';
import {StyleSheet, Text, View} from "react-native";
import colors from '../../helpers/colorVariables';


const EmptyCart: FC = () => {
    return (
        <View style={styles.emptyCartWrapper}>
            <Text style={styles.emptyCartTitle}>Ваш кошик пустий!</Text>
            <Text style={styles.emptyCartSubtitle}>Що там нового у каталогу?</Text>
        </View>
    )
};

export default EmptyCart;

const styles = StyleSheet.create({
    emptyCartWrapper: {
        flex: 1,
        backgroundColor: colors.light,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyCartTitle: {
        fontFamily: 'Primary-SemiBold',
        fontSize: 17
    },
    emptyCartSubtitle: {
        fontFamily: 'Primary-SemiBold',
        fontSize: 14,
        marginTop: 8,
    }
});

