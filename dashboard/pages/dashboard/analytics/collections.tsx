import React, {useEffect, useState} from 'react';
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import AnalyticsCollectionsLayout from "../../../components/dashboard/layouts/analytics/Collections";
import next from "../../../utils/nextApiInstance";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const AnalyticsSearch = () => {

    const { selectedStoreId }: any = useSelector((state:RootState) => state.storeData);

    const [analytics, setAnalytics] = useState([]);

    useEffect(() => {

        const getAnalytics = async () => {
            const { data } = await next.get(`/api/analytics/${selectedStoreId}?source=col`);
            const { analytics } = data;
            setAnalytics(analytics);
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
