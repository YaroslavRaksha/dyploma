import { FC, useState } from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import colors from "../../helpers/colorVariables";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import { ProductItemType } from '../../helpers/customTypings';
import CartPromoCodeModal from "./CartPromoCodeModal";
import {useNavigation} from "@react-navigation/native";
import CtaButton from "../customComponents/CtaButton";

const CartFooter: FC = () => {
    const { navigate }: any = useNavigation();

    const [visiblePromoCodeModal, setVisiblePromoCodeModal] = useState<boolean>(false);
    const { cartItems }: any = useSelector((state:RootState) => state.cartData);

    const totalCartSum = cartItems?.reduce(
        (r:number, a:ProductItemType) =>
            r + (parseFloat(a.price) * a.count), 0);


    return (
        <>
            <View style={styles.footer}>
                <View style={styles.footerInfo}>
                    <Text style={styles.footerPrice}>До сплати: {totalCartSum.toLocaleString()} грн</Text>
                    <TouchableOpacity onPress={() => setVisiblePromoCodeModal(true)}>
                        <Text style={styles.footerPromo}>є промокод?</Text>
                    </TouchableOpacity>
                    <CartPromoCodeModal
                        visiblePromoCodeModal={visiblePromoCodeModal}
                        setVisiblePromoCodeModal={setVisiblePromoCodeModal}
                    />
                </View>
                <CtaButton
                    text='Перейти до сплати'
                    onPress={() => navigate('Checkout')}
                />
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    footer: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 32,
        paddingTop: 4,
        backgroundColor: colors.light
    },
    footerInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 14
    },
    footerPromo: {
        fontFamily: 'Primary-Medium',
        color: colors.gray
    },
    footerPrice: {
        fontFamily: 'Primary-SemiBold',
        fontSize: 15,
    }
})

export default CartFooter;
