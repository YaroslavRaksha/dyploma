
import {FC, useEffect, useRef, useState} from 'react';
import {Text, TextInput, StyleSheet, Animated, Keyboard} from 'react-native';
import colors from "../../helpers/colorVariables";
import inputValidation from '../../helpers/validations/inputValidations';
import {InputType, validationResponseType} from "../../helpers/customTypings";
import InputError from "./InputError";
import DropdownList from "./DropdownList";


const Input: FC<InputType> = ({label, propValue, setPropValue, placeholder, triggerErrors, validation, validationList}) => {
    const [dropdownList, setDropdownList] = useState<string[] | undefined>(validationList);
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [inputError, setInputError] = useState<any>(false);

    const animDuration = 200;
    const interpolatedColor = useRef(new Animated.Value(0)).current;
    const borderColor = interpolatedColor.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.inputDefault, colors.inputFocus]
    });

    const onFocus = () => {
        setInputFocus(true);
        return Animated.timing(interpolatedColor, {
            useNativeDriver: false,
            duration: animDuration,
            toValue: 1,
        }).start();
    };

    const onBlur = () => {
        setInputFocus(false)
        return Animated.timing(interpolatedColor, {
            useNativeDriver: false,
            duration: animDuration,
            toValue: 0,
        }).start();
    };

    useEffect(() => {
        if(triggerErrors) {
            onChange({
                newValue: propValue,
                triggeredFromForm: true
            })
        }
    }, [triggerErrors]);


    const onChange = ({newValue, triggeredFromForm}: {newValue: string, triggeredFromForm?: boolean}) => {

        const validationResponse: validationResponseType =
            inputValidation({value: newValue, validation: validation, validationList: validationList });

        if(validationResponse.ok && inputError) {
            setInputError(false)
        }

        if(!validationList) {
            if(!validationResponse.ok && validationResponse.error !== inputError
                || !validationResponse.ok && !inputError) {
                setInputError(validationResponse.error);
            }
        }

        /* To improve ui, we show error in validationList, only when form is submitted. */
        if(validationList && triggeredFromForm) {
            setInputError(validationResponse.error);
        }


        if(validation === 'validationList') {
            if(newValue.length < 1) {
                setDropdownList(validationList)
            }
            else {
                const newList = validationList?.sort((a,b) => {
                    if (a.startsWith(newValue) && !b.startsWith(newValue)) {
                        return -1;
                    } else if (!a.startsWith(newValue) && b.startsWith(newValue)) {
                        return 1;
                    } else {
                        return 0;
                    }
                }).filter((item) => item?.includes(newValue));

                const listAreEqual = JSON.stringify(dropdownList) == JSON.stringify(newList);

                !listAreEqual && newList!.length > 0 ? setDropdownList(newList) : ''
            }
        }

        setPropValue({isValid: validationResponse, newValue: newValue})
    }

    return (
        <>
            <Text style={styles.inputLabel}>{label}</Text>
            <Animated.View style={[styles.inputWrapper, {borderColor: inputError ? colors.error : borderColor}]}>
                <TextInput
                    style={styles.input}
                    onFocus={() => onFocus()}
                    onBlur={() => onBlur()}
                    onChangeText={(newValue: string) => onChange({newValue: newValue})}
                    value={propValue}
                    placeholder={placeholder}
                />
                {(inputError && <InputError inputError={inputError} />)}
            </Animated.View>
            {(inputFocus && validationList &&
                <DropdownList
                    array={dropdownList}
                    inputError={inputError}
                    onSet={(newValue: string) => {
                        onChange({newValue: newValue})
                        onBlur();
                        Keyboard.dismiss();
                    }}
                />
            )}
        </>
    )
};

const styles = StyleSheet.create({
    inputWrapper: {
        borderWidth: 2,
        borderRadius: 4,
    },
    inputLabel: {
        fontFamily: 'Secondary-Medium',
        fontSize: 14,
        marginBottom: 2
    },
    input: {
        height: 48,
        width: '100%',
        borderRadius: 2,
        paddingLeft: 12,
        fontFamily: 'Primary-Medium',
        fontSize: 14
    }
})
export default Input;