import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import colors from '../../helpers/colorVariables';
import { ProductItemType } from '../../helpers/customTypings';
import ProductCard from '../productCard';
import { getProducts } from "../../utils/storeFunctions";

type Props = {
    route?: any | undefined;
    navigation?: any | undefined;
};

const spaceBetweenCards = 2;

const CatalogView: React.FC<Props> = ({ navigation, route }) => {
    const { title, handle } = route!.params;

    const [productItems, setProductItems] = useState<ProductItemType[]>([]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: title?.slice(0, 1).toUpperCase() + title?.slice(1, title?.length), /* Capitalize First Letter */
        });

        const getProductItems = async () => {
            const products = await getProducts({ handle: handle });
            setProductItems(products);
        }

        getProductItems()

    }, []);

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={productItems}
                renderItem={({ item, index }) => (
                    <View style={[index % 2 === 0 ? styles.leftItem : styles.rightItem]}>
                        <ProductCard item={item} spaceBetweenCards={spaceBetweenCards} />
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 16,
        flex: 1,
        backgroundColor: colors.light,
    },
    leftItem: {
        marginRight: spaceBetweenCards,
    },
    rightItem: {
        marginLeft: 'auto',
    },
});

export default CatalogView;
