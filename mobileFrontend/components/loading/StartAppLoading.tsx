import { FC } from 'react';
import { Text, View } from 'react-native';


const StartAppLoading: FC = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Starting App...</Text>
        </View>
    )
}

export default StartAppLoading;
