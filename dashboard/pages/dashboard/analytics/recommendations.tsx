import React, {useEffect, useState} from 'react';
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import AnalyticsRecommendationsLayout from "../../../components/dashboard/layouts/analytics/Recommendations";
import next from "../../../utils/nextApiInstance";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";


const AnalyticsRecommendations = () => {

    const { selectedStoreId }: any = useSelector((state:RootState) => state.storeData);

    const [analytics, setAnalytics] = useState([]);

    useEffect(() => {

        const getAnalytics = async () => {
            const { data } = await next.get(`/api/analytics/${selectedStoreId}?source=rec`);
            const { analytics } = data;
            setAnalytics(analytics);
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
