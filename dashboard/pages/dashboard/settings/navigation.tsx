
import React, {useEffect, useState} from "react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import SettingsNavigationLayout from "../../../components/dashboard/layouts/settings/navigation";
import store, {RootState} from "../../../store";
import next from "../../../utils/nextApiInstance";
import {useSelector} from "react-redux";

const Settings = () => {

    const { selectedStoreId }: any = useSelector((state:RootState) => state.storeData);

    const [navigation, setNavigation] = useState([]);

    useEffect(() => {

        const getNavigation = async () => {
            const { data } = await next.get(`/api/storeSettings/${selectedStoreId}?fields=navigation`);
            const { navigation } = data;
            setNavigation(navigation);
        }

        getNavigation();
    }, [selectedStoreId]);

    return (
        <DashboardLayout>
            <SettingsNavigationLayout
                navigation={navigation}
                setNavigation={setNavigation}
                selectedStoreId={selectedStoreId}
            />
        </DashboardLayout>
    );
};


export default Settings;

