import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../helpers/colorVariables';
import ProductImage from "./productImage";
import {ProductItemType} from "../../helpers/customTypings";
import {useNavigation} from "@react-navigation/native";
import ProductPrice from "./productPrice";

type Props = {
    item: ProductItemType,
    spaceBetweenCards: number,
};

const ProductCard: React.FC<Props> = ({ item, spaceBetweenCards }) => {

    const { navigate }: any = useNavigation();
    const { title, price, compareAtPrice, images, currencyCode } = item;
    const productWidth = Dimensions.get('window').width / 2 - (spaceBetweenCards);

    const onProductClick = () => {
        navigate('Product View', { item: item });
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => onProductClick()}
            style={[styles.wrapper, { width: productWidth }]}
        >
            <View style={styles.productImage}>
                <ProductImage
                    source={{ uri: images[0] }}
                />
            </View>
            <View style={styles.productContent}>
                <Text style={styles.productTitle}>{title}</Text>

                <ProductPrice
                    price={price}
                    compareAtPrice={compareAtPrice}
                    currencyCode={currencyCode}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        marginBottom: 30,
    },
    productImage: {
        backgroundColor: colors.imgBackground,
        aspectRatio: .8,
        width: '100%',
        marginBottom: 8,
    },
    productContent: {
        paddingLeft: 10,
    },
    productTitle: {
        fontFamily: 'Secondary-Medium',
        fontSize: 15,
    },
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
});

export default ProductCard;
