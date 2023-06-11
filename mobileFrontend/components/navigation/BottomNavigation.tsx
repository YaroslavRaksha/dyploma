import{ FC } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../home/Home";
import { Image, View, StyleSheet } from "react-native";
import Catalog from "../catalog/Catalog";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/Wishlist";
import Account from "../account/Account";
import colors from '../../helpers/colorVariables';


const Tab = createBottomTabNavigator();
const SelectedPageLine = ({focused} : any) => focused ? <View style={styles.selectedPageLine} /> : <></>;



const BottomNavigation: FC = ({navigation, route}: any) => {
    const { screenOptions } = route?.params

    return (
        <>
            <Tab.Navigator screenOptions={{ tabBarShowLabel: false, tabBarStyle: { borderTopWidth: 0 }}}>
                <Tab.Screen
                    name='Home'
                    component={Home}
                    options={{
                        ...screenOptions,
                        tabBarIcon: ({t, focused} : any) =>
                            <>
                                <SelectedPageLine focused={focused} />
                                <Image source={require('../../assets/icons/navigation/home.png')} style={{width: 20, height: 20}} />
                            </>

                    }}
                />
                <Tab.Screen
                    name='Collections'
                    component={Catalog}
                    options={{
                        ...screenOptions,
                        tabBarIcon: ({t, focused} : any) =>
                            <>
                                <SelectedPageLine focused={focused} />
                                <Image source={require('../../assets/icons/navigation/catalog.png')} style={{width: 20, height: 20}} />
                            </>
                    }}
                />
                <Tab.Screen
                    name='Cart'
                    component={Cart}
                    initialParams={{mount: true}}

                    options={{
                        ...screenOptions,
                        tabBarIcon: ({t, focused} : any) =>
                            <>
                                <SelectedPageLine focused={focused} />
                                <Image source={require('../../assets/icons/navigation/cart.png')} style={{width: 20, height: 20}} />
                            </>

                    }}
                />

                <Tab.Screen
                    name='Wishlist'
                    component={Wishlist}
                    options={{
                        ...screenOptions,
                        tabBarIcon: ({t, focused} : any) =>
                            <>
                                <SelectedPageLine focused={focused} />
                                <Image source={require('../../assets/icons/heart.png')} style={{width: 20, height: 20}} />
                            </>
                    }}
                />

                <Tab.Screen
                    name='Account'
                    component={Account}
                    options={{
                        ...screenOptions,
                        tabBarIcon: ({t, focused} : any) =>
                            <>
                                <SelectedPageLine focused={focused} />
                                <Image source={require('../../assets/icons/navigation/account.png')} style={{width: 20, height: 20}} />
                            </>
                    }}
                />
            </Tab.Navigator>
        </>
    )
};

export default BottomNavigation;

const styles = StyleSheet.create({
    selectedPageLine: {
        position: 'absolute',
        left: '20%',
        top: 0,
        width: '60%',
        borderTopWidth: 3,
        borderColor: colors.accent,
        borderBottomRightRadius: 2,
        borderBottomLeftRadius: 2,
    }
});
