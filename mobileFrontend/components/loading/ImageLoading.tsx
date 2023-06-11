import { FC } from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";

const ImageLoading: FC = () => {
    return (
        <View style={styles.wrapper}>
            <ActivityIndicator size='small' color='#333' />
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ImageLoading;
