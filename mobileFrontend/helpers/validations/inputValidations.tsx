import {validationResponseType, validationType} from "../customTypings";

type InputValidation = {
    value: string,
    validation: validationType,
    validationList?: string[]
}

const validationSuccess: validationResponseType = { ok: true }

const validationError = (error: string) => {
    const errorObject: validationResponseType = {
        ok: false,
        error: error,
    }

    return errorObject;
}

const listValidation = (value: string, validationList: string[] | undefined) => {
    const valueExistsInList = validationList!.find((item) => item?.toLowerCase() === value?.toLowerCase());
    if(!valueExistsInList) {
        return validationError('Поле долнжо совпадать со значением из списка');
    }
    return validationSuccess
}

const cyrillicTextValidation = (value: string) => {
    const isCyrillic = /^[\u0400-\u04FF ]+$/.test(value);
    const containsNumbers = /[0-9]/.test(value);

    if(containsNumbers) {
        return validationError('Поле не может содержать цифры')
    }

    if(!isCyrillic) {
        return validationError('Текст должен быть написан кириллецей')
    }

    return validationSuccess
}

const inputValidation = ({value, validation, validationList}: InputValidation) => {
    if(value.length < 1) {
        return validationError('Поле не может быть пустым')
    }
    switch (validation) {
        case 'cyrillicText':
            return cyrillicTextValidation(value)
        case 'validationList':
            return listValidation(value, validationList)
        default:
            return validationSuccess;
    }
}

export default inputValidation;