import React, {useState} from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { ProductItemType } from "../../helpers/customTypings";
import colors from "../../helpers/colorVariables";
import ProductImage from "../productCard/productImage";
import ProductPrice from "../productCard/productPrice";
import CtaButton from "../customComponents/CtaButton";
import {useDispatch} from "react-redux";
import {addCartItem} from "../../store/reducers/cartData";

type Props = {
    route?: any | undefined;
    navigation?: any | undefined;
};

const ProductView: React.FC<Props> = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { item } = route!.params;
    const { title, price, compareAtPrice, images, currencyCode }: ProductItemType = item;


    const [statusVisible, setStatusVisible] = useState<boolean>(false);

    const addToCart = () => {
        dispatch(addCartItem({ addedItem: item }));
        setStatusVisible(true);

        setTimeout(() => {
            setStatusVisible(false)
        }, 2000)
    }

    return (
        <>
            {(statusVisible &&
                <View style={styles.productAddToCartStatus}>
                    <Text style={styles.statusText}>Товар додано до кошику</Text>
                </View>
            )}
            <View style={styles.wrapper}>
                <View style={styles.productImage}>
                    <ProductImage source={{ uri: images[0] }} />
                </View>
                <View style={styles.productContent}>
                    <Text style={styles.productTitle}>{title}</Text>
                    <ProductPrice
                        price={price}
                        compareAtPrice={compareAtPrice}
                        currencyCode={currencyCode}
                    />
                    <View style={styles.addToCart}>
                        <CtaButton
                            text='Додати до кошика'
                            onPress={addToCart}
                        />
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        flex: 1,
        backgroundColor: colors.light,
    },
    productContent: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    productTitle: {
        fontFamily: 'Secondary-Medium',
        fontSize: 18,
        marginBottom: 4,
    },
    productImage: {
        backgroundColor: colors.imgBackground,
        aspectRatio: .65,
        width: '100%',
    },
    addToCart: {
        marginTop: 20,
    },
    productAddToCartStatus: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        width: '100%',
        height: 105,
        backgroundColor: colors.green_300,
        zIndex: 1,
    },
    statusText: {
        fontFamily: 'Secondary-Bold',
        fontSize: 18,
        color: colors.light,
        marginBottom: 20,
    }
});

export default ProductView;
