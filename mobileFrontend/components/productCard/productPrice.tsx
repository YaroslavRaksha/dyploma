import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import colors from "../../helpers/colorVariables";

type Props = {
    price: string,
    compareAtPrice: string,
    currencyCode: string,
};

const ProductPrice: React.FC<Props> = ({ price, compareAtPrice, currencyCode }) => {
    return (
        <View style={styles.productPriceWrapper}>
            <Text style={[styles.productPrice, compareAtPrice ? { color: colors.error } : null]}>
                {price} {currencyCode}
            </Text>
            {compareAtPrice &&
            <Text style={styles.productPriceCompare}>
                {compareAtPrice} {currencyCode}
            </Text>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    productPriceWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    productPrice: {
        fontFamily: 'Primary-Medium',
        fontSize: 13,
    },
    productPriceCompare: {
        marginLeft: 4,
        fontFamily: 'Primary-Medium',
        fontSize: 12,
        textDecorationLine: 'line-through',
        color: colors.gray
    }
})

export default ProductPrice;
