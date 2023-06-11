
import { FC } from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import colors from "../../helpers/colorVariables";
import { ProgressItemsType } from '../../helpers/customTypings';

type Props = {
    progressItems: any,
    currentPageIndex: number,
}


const CheckoutProgressBar: FC<Props> = ({progressItems, currentPageIndex}) => {

    const CheckedProgressItem: FC = () =>
        <Image style={{width: 24, height: 24}} source={require('../../assets/icons/checked.png')} />

    return progressItems.map((item: ProgressItemsType, index: number) => {
        const passed = index < currentPageIndex;
        const selected = currentPageIndex === index;

        return (
            <View key={index} style={styles.progressItem}>
                <View>
                    <View
                        style={[
                            styles.progressItemNumWrapper,
                            selected ? styles.selectedProgressItemNumWrapper : null,
                            passed ? styles.passedProgressItemNumWrapper : null,
                        ]}
                    >
                        {passed
                            ? <CheckedProgressItem />
                            : <Text style={[styles.progressItemNum, selected ? styles.selectedProgressItemNum : {} ]}>
                                {index + 1}
                              </Text>

                        }
                    </View>
                    {!(index === progressItems?.length - 1) && <View style={styles.progressItemDivider}/>}
                </View>
                <Text
                    style={[
                        styles.progressItemText,
                        selected ? styles.selectedProgressItemText : {},
                    ]}
                >
                    {item?.progressBarTitle ? item.progressBarTitle : item.title}
                </Text>
            </View>
        )
    })
};

export default CheckoutProgressBar;

const styles = StyleSheet.create({
    progressItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '33.333%',
    },
    progressItemDivider: {
        width: '66.666%',
        height: 1,
        left: 34,
        backgroundColor: colors.lightGray,
        position: 'absolute',
        top: 12,
    },
    progressItemNumWrapper: {
        color: colors.lightGray,
        borderColor: colors.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.2,
        borderRadius: 100,
        width: 26,
        height: 26,
    },
    selectedProgressItemNumWrapper: {
        color: colors.progressBar,
        borderColor: colors.gray,
    },
    passedProgressItemNumWrapper: {
        backgroundColor: colors.progressBar,
        borderColor: colors.progressBar,
    },
    progressItemNum: {
        fontSize: 14,
        color: colors.lightGray,
        fontFamily: 'Primary-Medium'
    },
    selectedProgressItemNum: {
        color: colors.gray
    },
    progressItemText: {
        color: colors.gray,
        fontSize: 11,
        fontFamily: 'Primary-Medium',
        textAlign: 'center',
        marginTop: 2,
    },
    selectedProgressItemText: {
        textDecorationLine: 'underline'
    }
})
