import {FC, useState, useRef} from 'react';
import { Image, Text, View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import colors from "../../helpers/colorVariables";
import {ProductItemType} from '../../helpers/customTypings';
import ImageLoading from "../loading/ImageLoading";
import {useDispatch} from "react-redux";
import {removeCartItem, setCartItemQuantity} from "../../store/reducers/cartData";
import ProductImage from "../productCard/productImage";
import ProductPrice from "../productCard/productPrice";

type Props = {
    key: string,
    item: ProductItemType,
    firstItemUnderline: boolean,
    notLastItemUnderline: boolean,
}


const CartItem: FC<Props> = ({item, firstItemUnderline, notLastItemUnderline}) => {
    const dispatch = useDispatch();

    const { id, title, images, price, compareAtPrice, count, availability, currencyCode } = item;

    const setQuantity = (isPlus:boolean) => {

        if(isPlus && !(count + 1 > availability)) {
            dispatch(setCartItemQuantity({changedCountItemId: id, newCount: count + 1}))
        }
        else if(!isPlus && !(count - 1 < 1)) {
            dispatch(setCartItemQuantity({changedCountItemId: id, newCount: count - 1}))
        }
    };

    const fadeOut: any = new Animated.Value(1);

    const removeItem = () => {

        Animated.timing(fadeOut, {
            toValue:  0,
            duration:  300,
            useNativeDriver: true,
        }).start(() => dispatch(removeCartItem({removedItemId: item.id})));

    };

    return (
        <Animated.View
            style={[
                {opacity: fadeOut},
                styles.productWrapper,
                firstItemUnderline || notLastItemUnderline ? styles.underline : {}]}
        >
            <View style={styles.productImage}>
                <ProductImage
                    source={{ uri: images[0]}}
                />
            </View>

            <View style={{flex: 1}}>
                <View style={styles.productHeader}>
                    <Text style={styles.productTitle}>{title}</Text>
                    <TouchableOpacity onPress={() => removeItem()}>
                        <Image
                            style={styles.removeItemIcon}
                            source={require('../../assets/icons/trash.png')}
                        />
                    </TouchableOpacity>
                </View>
                <ProductPrice
                    price={price}
                    compareAtPrice={compareAtPrice}
                    currencyCode={currencyCode}
                />
                {/*
                <View style={styles.descriptionItem}>
                    <Text style={styles.descriptionLabel}>Колір:</Text>
                    <Image style={styles.colorEllipse} source={require('../../assets/ellipse.png')} />
                </View>
                <View style={styles.descriptionItem}>
                    <Text style={styles.descriptionLabel}>Пам'ять:</Text>
                    <Text style={styles.descriptionValue}>{storage}</Text>
                </View>
                */}
                <View style={[styles.descriptionItem, { marginTop: 8}]}>
                    <Text style={styles.descriptionLabel}>Кількість:</Text>
                    <View style={styles.productCount}>
                        <TouchableOpacity onPress={() => setQuantity(false)}>
                            <Image source={require('../../assets/icons/cart/minus.png')} style={{ width: 30, height: 30, marginRight: 8 }} />
                        </TouchableOpacity>
                        <Text style={styles.descriptionValue}>{count}</Text>
                        <TouchableOpacity onPress={() => setQuantity(true)}>
                            <Image source={require('../../assets/icons/cart/plus.png')} style={{ width: 30, height: 30, marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animated.View>
    )
};

export default CartItem;

const styles = StyleSheet.create({
    removeItemIcon: {
      width: 20,
      height: 20,
    },
    productWrapper: {
        paddingBottom: 16,
        marginBottom: 16,
        height: 164,
        display: 'flex',
        flexDirection: 'row',
    },
    productImage: {
        position: 'relative',
        backgroundColor: colors.imgBackground,
        height: '100%',
        width: 130,
        marginRight: 16,
        paddingLeft: 4,
        paddingRight: 4,
    },
    productHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productTitle: {
        fontFamily: 'Secondary-Bold',
        fontSize: 15,
    },
    productPrice: {
        marginBottom: 10,
        marginTop: 4,
        fontFamily: 'Primary-SemiBold',
        fontSize: 13,
    },
    descriptionItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    descriptionLabel: {
        width: 60,
        marginRight: 16,
        fontFamily: 'Primary-Regular',
        fontSize: 12,
        color: colors.dark
    },
    descriptionValue: {
        fontSize: 12,
        fontFamily: 'Primary-Medium',
        color: colors.gray
    },
    colorEllipse: {
        width: 16,
        height: 16,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.lightGray
    },
    productRemove: {
        marginTop: -2,
        display: 'flex',
    },
    productCount: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    underline: {
        borderBottomWidth: 1,
        borderColor: 'rgb(224,224,224)'
    }
})
