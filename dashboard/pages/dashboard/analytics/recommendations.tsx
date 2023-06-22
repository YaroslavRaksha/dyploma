import React, {useEffect, useState} from 'react';
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import AnalyticsRecommendationsLayout from "../../../components/dashboard/layouts/analytics/Recommendations";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import handleErrorClient from "../../../helpers/handleErrorClient";
import {useRouter} from "next/router";
import nextApiInstance from "../../../utils/nextApiInstance";


const AnalyticsRecommendations = () => {

    const { selectedStoreId }: any = useSelector((state:RootState) => state.storeData);
    const router = useRouter();
    const [analytics, setAnalytics] = useState([]);

    useEffect(() => {

        const getAnalytics = async () => {
            try {
                const { data } = await nextApiInstance.get(`/api/analytics/${selectedStoreId}?source=rec`);
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
            <AnalyticsRecommendationsLayout analytics={analytics} />
        </DashboardLayout>
    );
};

export default AnalyticsRecommendations;
