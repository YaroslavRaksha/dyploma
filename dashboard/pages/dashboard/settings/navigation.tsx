
import React, {useEffect, useState} from "react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import SettingsNavigationLayout from "../../../components/dashboard/layouts/settings/navigation";
import {RootState} from "../../../store";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import handleErrorClient from "../../../helpers/handleErrorClient";
import nextApiInstance from "../../../utils/nextApiInstance";

const Settings = () => {

    const { selectedStoreId }: any = useSelector((state:RootState) => state.storeData);
    const router = useRouter();
    const [navigation, setNavigation] = useState([]);

    useEffect(() => {

        const getNavigation = async () => {
            try {
                const { data } = await nextApiInstance.get(`/api/storeSettings/${selectedStoreId}?fields=navigation`)
                const { navigation } = data;
                setNavigation(navigation);
            }
            catch(error) {
                await handleErrorClient({ error, router })
            }
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

