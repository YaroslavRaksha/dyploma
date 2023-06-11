import {useSelector, useDispatch} from "react-redux";
import {ScrollView, StyleSheet, RefreshControl, Modal, TouchableOpacity, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {FC, useState, useCallback, useEffect} from 'react';
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import colors from "../../helpers/colorVariables";
import InitialPageLoading from "../loading/InitialPageLoading";
import {RootState} from "../../store";
import {ProductItemType} from '../../helpers/customTypings';
import CartFooter from "./CartFooter";

{/*
{
    id: '1',
    title: "Men's t-shirt",
    price: '20',
    count: 1,
},
*/}

const Cart: FC = ({ route }: any) => {

    const { cartItems }: any = useSelector((state:RootState) => state.cartData);
    const [initialRefresh, setInitialRefresh] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const getDataOnRefresh = (ifInitialRefresh?: boolean) => {
        ifInitialRefresh
            ? setInitialRefresh(true)
            : setRefreshing(true)

        setTimeout(() => {
            ifInitialRefresh
                ? setInitialRefresh(false)
                : setRefreshing(false)

        }, 200);
    };

    useFocusEffect(
        useCallback(() => {
            getDataOnRefresh(true)
        }, [route.params.mount])
    );

    const onRefresh = useCallback(() => {
        getDataOnRefresh()
    }, []);

    if(cartItems?.length === 0 && !initialRefresh) {
        return <EmptyCart />
    }

    if(initialRefresh) {
        return <InitialPageLoading />
    }
    return (
        <>
            <ScrollView
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
                style={styles.wrapper}
            >
                {
                    cartItems.map((item:ProductItemType, index:number) =>
                        <CartItem
                            key={index.toString()}
                            item={item}
                            firstItemUnderline={index === 0 && cartItems.length > 1}
                            notLastItemUnderline={index !== cartItems.length - 1}
                        />)
                }
            </ScrollView>
            <CartFooter />
        </>
    );
}

export default Cart;

const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 20,
        backgroundColor: colors.light,
    }
})
