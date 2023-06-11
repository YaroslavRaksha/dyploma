import {FC, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from "../../helpers/colorVariables";
import CatalogItem from "./CatalogItem";
import { getStoreSettings } from '../../utils/storeFunctions';


const Catalog: FC = () => {

    const [navigationItems, setNavigationItems] = useState([])
    useEffect(() => {
        const getNavigation = async () => {
            const navigation = await getStoreSettings({ fields: 'navigation' });
            setNavigationItems(navigation)
        }
        getNavigation();
    }, []);

    return (
        <View style={styles.wrapper}>
            <View style={styles.catalog}>
                {navigationItems.map((item) => {
                    return (
                        <CatalogItem
                            key={item['id']}
                            item={item}
                        />
                    )
                })}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        height: '100%',
        backgroundColor: colors.light
    },
    catalog: {
        paddingHorizontal: 20,
    },
})
export default Catalog;