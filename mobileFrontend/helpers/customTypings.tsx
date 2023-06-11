
export type ProductItemType = {
    id: string,
    title: string,
    images: string[],
    price: string,
    compareAtPrice: string,
    availability: number,
    currencyCode: string,
    count: number,
}

export type ProgressItemsType = {
    progressBarTitle?: string,
    title: string,
    inputs?: {
        label: string,
        key: string,
        placeholder: string,
        validation: validationType,
        validationList?: string[],
    }[]
};

export type InputType = {
    label: string,
    key: string,
    placeholder: string,
    validation: validationType,
    validationList?: string[],
    triggerErrors: boolean | number,

    propValue: string,
    setPropValue: Function
}

export type validationType = 'validationList' | 'cyrillicText';
export type validationResponseType = { ok: boolean, error?: string };

export type inputErrorType = boolean | string;

