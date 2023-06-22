import React, {useEffect, useState} from 'react';
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import AnalyticsCollectionsLayout from "../../../components/dashboard/layouts/analytics/Collections";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {useRouter} from "next/router";
import handleErrorClient from "../../../helpers/handleErrorClient";
import nextApiInstance from "../../../utils/nextApiInstance";


const AnalyticsSearch = () => {

    const router = useRouter();
    const { selectedStoreId }: any = useSelector((state:RootState) => state.storeData);
    const [analytics, setAnalytics] = useState([]);

    useEffect(() => {

        const getAnalytics = async () => {
            try {
                const { data } = await nextApiInstance.get(`/api/analytics/${selectedStoreId}?source=col`);
                const { analytics } = data;
                setAnalytics(analytics);
            }
            catch(error) {
                await handleErrorClient({ error, router });
            }
        }

        getAnalytics();
    }, [selectedStoreId]);

    return (
        <DashboardLayout>
            <AnalyticsCollectionsLayout analytics={analytics} />
        </DashboardLayout>
    );
};


export default AnalyticsSearch;
