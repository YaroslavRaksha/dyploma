import {FC} from 'react';
import {View, ActivityIndicator} from 'react-native';

const InitialPageLoading: FC = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <ActivityIndicator size='small' color='#333' />
        </View>
    )
};

export default InitialPageLoading;
