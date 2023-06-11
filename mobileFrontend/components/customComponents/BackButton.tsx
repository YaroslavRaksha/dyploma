import { FC } from 'react';
import {TouchableOpacity, Image, View, Text, StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";

type Props = {
    onPress?: Function,
};

const BackButton: FC<Props> = ({onPress}) => {
    const { goBack } = useNavigation();
    return (
        <TouchableOpacity onPress={() => onPress ? onPress() : goBack()} style={styles.backButton}>
            <Image
                source={require('../../assets/icons/arrow-back.png')}
                style={styles.backImage}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -8,
    },
    backImage: {
        height: 28,
        width: 28
    },
    backText: {
        fontFamily: 'Secondary-Medium',
    }
})

export default BackButton;
