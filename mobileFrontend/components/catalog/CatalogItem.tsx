import {FC, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

type Props = {
    item: {
        id: number,
        title: string,
        handle: string,
        nested?: any[]
    }
}

const CatalogItem: FC<Props> = ({item}) => {

    const { navigate }: any = useNavigation();
    const [nestedVisible, setNestedVisible] = useState<boolean>(false);
    const { title, handle, nested } = item;

    const onItemClick = () => {
        if(nested) {
            setNestedVisible((prev) => !prev);
        }
        else {
            navigate('Catalog Results', { title: item.title, handle: item.handle });
        }
    }

    return (
        <View style={styles.catalogItem}>
            <TouchableOpacity onPress={() => onItemClick()} style={styles.catalogItemTitle}>
                <Text
                    style={styles.catalogItemText}
                >{title}</Text>
                {(nested &&
                    <Image
                        style={[styles.catalogItemArrow, nestedVisible ? {transform: [{ rotate: '90deg' }]} : null]}
                       source={require('../../assets/icons/arrow.png')}
                    />
                )}
            </TouchableOpacity>
            {(nested && nestedVisible &&
                nested.map((nestedItem) =>
                    <View key={nestedItem['id']} style={styles.catalogItemNested}>
                        <CatalogItem item={nestedItem} />
                    </View>
                )
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    catalogItem: {
        marginTop: 20,
    },
    catalogItemTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    catalogItemText: {
        fontSize: 17,
        textTransform: 'capitalize',
        fontFamily: 'Secondary-SemiBold',
    },
    catalogItemArrow: {
        height: 24,
        width: 24,
    },
    catalogItemNested: {
        marginBottom: 4,
        paddingLeft: 12,
    }
})

export default CatalogItem;
