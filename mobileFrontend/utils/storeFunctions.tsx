import backendApiInstance from "./backendApiInstance";
import axios from "axios";
import Constants from "expo-constants";

const storeId = (Constants.manifest as any)?.extra?.STORE_ID;


type getStoreSettingsType = {
    fields: string
}

const getStoreSettings = async ({ fields }: getStoreSettingsType) => {

    const { data } = await backendApiInstance.get('/storeSettings/' + storeId + `?fields=${fields}`);
    const { navigation } = data;
    return JSON.parse(navigation);
}


type getProductsType = {
    handle: string,
}

const getProducts = async ({ handle }: getProductsType) => {

    const { data } = await backendApiInstance.get('/products/' + storeId + `?handle=${handle}`);
    const { products } = data;

    return products;
};

export {
    getProducts,
    getStoreSettings,
};