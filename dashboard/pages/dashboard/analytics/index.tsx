import React, {useEffect, useState} from 'react';
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import AnalyticsLayout from "../../../components/dashboard/layouts/analytics";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import handleErrorClient from "../../../helpers/handleErrorClient";
import {useRouter} from "next/router";
import nextApiInstance from "../../../utils/nextApiInstance";

const Analytics = () => {

    const router = useRouter();
    const { selectedStoreId }: any = useSelector((state:RootState) => state.storeData);

    const [analytics, setAnalytics] = useState([]);

    useEffect(() => {

        const getAnalytics = async () => {
            try {
                const { data } = await nextApiInstance.get('/api/analytics/' + selectedStoreId);
                const { analytics } = data;
                setAnalytics(analytics);
            }
            catch(error) {
                await handleErrorClient({ error, router })
            }
        }

        getAnalytics();
    }, [selectedStoreId]);

    return (
        <DashboardLayout>
            <AnalyticsLayout analytics={analytics} />
        </DashboardLayout>
    );
};


export default Analytics;
