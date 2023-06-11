import {FC, useEffect } from 'react';
import {Modal, StyleSheet, TouchableOpacity, View, Text, Platform, Animated, TextInput, KeyboardAvoidingView} from 'react-native';
import colors from "../../helpers/colorVariables";
type Props = {
    setVisiblePromoCodeModal: Function,
    visiblePromoCodeModal: boolean,
};

const modalHeight = 140;

const CartPromoCodeModal: FC<Props> = ({visiblePromoCodeModal, setVisiblePromoCodeModal}) => {

    const modalTranslate: any = new Animated.Value(modalHeight);

    useEffect(() => {
        if(visiblePromoCodeModal) {
            Animated.spring(modalTranslate, {
                toValue: 0,
                useNativeDriver: true,
                bounciness: 0,
                speed: 10
            }).start();
        }
    });

    const hideModal = () => {
        Animated.timing(modalTranslate, {
            toValue: modalHeight * 2,
            useNativeDriver: true,
            duration: 300,
        }).start(() => setVisiblePromoCodeModal(false));
    }

    return (
        <Modal animationType="fade" transparent={true} visible={visiblePromoCodeModal}>
            <TouchableOpacity onPress={() => hideModal()} style={styles.backdrop} activeOpacity={1}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <TouchableOpacity style={styles.modal} activeOpacity={1}>
                        <Animated.View style={[styles.modalWrapper, {transform: [{ translateY: modalTranslate}]}]}>

                        </Animated.View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </TouchableOpacity>
        </Modal>
    )
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    modal: {
        width: '100%',
        height: modalHeight,
    },
    modalWrapper: {
        backgroundColor: colors.light,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 24
    },
    modalForm: {
        marginTop: 6,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderColor: colors.gray,
        borderWidth: 1,
        height: 42,
    },
})

export default CartPromoCodeModal;
