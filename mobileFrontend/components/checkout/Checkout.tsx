import {FC, useEffect} from 'react';
import {View, TouchableWithoutFeedback, Keyboard, StyleSheet, Text} from 'react-native';
import colors from "../../helpers/colorVariables";
import CheckoutProgressBar from "./CheckoutProgressBar";
import {useNavigation} from "@react-navigation/native";
import {ProgressItemsType} from '../../helpers/customTypings';
import BackButton from "../customComponents/BackButton";
import CheckoutForm from "./CheckoutForm";


type Props = {
    navigation?: any | undefined,
    route?: any | undefined
}

const Checkout: FC<Props> = ({navigation, route}) => {

    const { navigate }: any = useNavigation();
    const currentPageIndex = route?.params?.nextPage || 0;

    useEffect(() => {

        /* If we are on first page, return back to cart. If not, go back to previous progress item */
        const goBackFunction = () =>
            currentPageIndex ? navigate('Checkout', { nextPage: currentPageIndex - 1 }) : navigate('Cart');

        navigation.setOptions({
            headerTitle: `Checkout ${currentPageIndex + 1}/${progressItems.length}`,
            headerLeft: () =>
                <BackButton
                    onPress={() => goBackFunction()}
                />

        })
    }, [currentPageIndex]);

    const progressItems: ProgressItemsType[] = [
        { progressBarTitle: 'ФІО', title: 'ФІО отримувача',
            inputs: [
                { label: 'Имя', placeholder: 'Введите имя получателя', key: 'name', validation: 'cyrillicText' },
                { label: 'Фамилия', placeholder: 'Введите фамилию', key: 'surname', validation: 'cyrillicText' },
            ]
        },

        { title: 'Адреса',
            inputs: [
                { label: 'Город', placeholder: 'Введите город получателя', key: 'city', validation: 'validationList', validationList: ['Київ', 'Кривий Рiг', 'Днiпро', 'Одеса', 'Харков'] },
            ]
        },

        { title: 'Payment' }
    ];

    const selectedProgress = progressItems[currentPageIndex];

    const submitProgressItem = () => {
        if(selectedProgress?.title === 'Payment') {
            return false;
        }
        navigate('Checkout', { nextPage: currentPageIndex + 1 })
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.wrapper}>
                <View style={styles.progressBar}>
                    <CheckoutProgressBar
                        progressItems={progressItems}
                        currentPageIndex={currentPageIndex}
                    />
                </View>
                <Text style={styles.checkoutTitle}>{selectedProgress.title}</Text>
                <CheckoutForm
                    progressItems={progressItems}
                    currentPageIndex={currentPageIndex}
                    selectedProgress={selectedProgress}
                    submitProgressItem={() => submitProgressItem()}
                />
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 24,
        backgroundColor: colors.light,
        height: '100%'
    },
    progressBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        marginLeft: -12,
        marginRight: -12,
    },
    checkoutTitle: {
        textAlign: 'center',
        marginBottom: 16,
        fontFamily: 'Primary-SemiBold',
        fontSize: 18,
    }
})

export default Checkout;
