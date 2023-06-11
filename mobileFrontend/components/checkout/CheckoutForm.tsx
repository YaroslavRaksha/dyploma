
import {FC, useState} from 'react';
import {StyleSheet, View} from "react-native";
import {ProgressItemsType} from "../../helpers/customTypings";
import Input from "../customComponents/Input";
import CtaButton from "../customComponents/CtaButton";

type Props = {
    progressItems: ProgressItemsType[],
    currentPageIndex: number,
    submitProgressItem: Function,
    selectedProgress: ProgressItemsType
}

const getKeys = (progressItems: ProgressItemsType[]) => {
    const allInputs = progressItems
        ?.map((item) => item?.inputs)
        ?.filter((i) => i);

    const allKeys = allInputs
        .map((inputs) =>
            inputs?.map((input) => input.key)).flat(1)

    /* return objects by all input keys from progress Items */

    return allKeys?.reduce((a: any, v: any) => ({...a, [v]: {isValid: {ok: false}, value: ''}}), {});
}

const CheckoutForm: FC<Props> = ({progressItems, currentPageIndex, selectedProgress, submitProgressItem}) => {

    const [triggerErrors, setTriggerErrors] = useState<boolean | number>(false);

    const [shippingObject, setShippingObject] = useState<any>(() => getKeys(progressItems));
    const handleFormSubmit = () => {
        const inputKeys = selectedProgress?.inputs?.map((input) => input.key);
        const formIsValid = inputKeys?.map((key) => shippingObject[key].isValid.ok)?.every(Boolean);
        if(formIsValid) {
            setTriggerErrors(false)
            return submitProgressItem();
        }
        if(!formIsValid) {
            /* we need to set new true value, because validation response can be different. So we update error */
            setTriggerErrors((prev) => prev === 1 ? 2 : 1)
            return false;
        }

    }
    return (
        <>
            {
                progressItems.map((item: ProgressItemsType, pageIndex: number) =>
                    item?.inputs?.map((input, index: number) => {
                        return (currentPageIndex === pageIndex &&
                            <View  key={index} style={styles.checkoutInputWrapper}>
                                <Input
                                    triggerErrors={triggerErrors}
                                    key={input.key}
                                    label={input.label}
                                    propValue={shippingObject[input.key].value}
                                    setPropValue={({isValid, newValue}: any) => {
                                        setShippingObject((prev: any) => (
                                            {...prev, [input.key]: {isValid: isValid, value: newValue }}
                                        ))
                                    }}
                                    placeholder={input.placeholder}
                                    validation={input.validation}
                                    validationList={input.validationList}
                                />
                            </View>
                        )
                    })
                )
            }

            <View style={{marginTop: 12}}>
                <CtaButton
                    text='Далі'
                    onPress={() => handleFormSubmit()}
                />
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    checkoutInputWrapper: {
        marginBottom: 24,
    }
})

export default CheckoutForm;