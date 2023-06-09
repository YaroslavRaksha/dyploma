import React, {useEffect, useState} from 'react';
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import AnalyticsLayout from "../../../components/dashboard/layouts/analytics";
import next from '../../../utils/nextApiInstance';
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const Analytics = () => {

    const { selectedStoreId }: any = useSelector((state:RootState) => state.storeData);

    const [analytics, setAnalytics] = useState([]);

    useEffect(() => {

        const getAnalytics = async () => {
            const { data } = await next.get('/api/analytics/' + selectedStoreId);
            const { analytics } = data;
            setAnalytics(analytics);
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
