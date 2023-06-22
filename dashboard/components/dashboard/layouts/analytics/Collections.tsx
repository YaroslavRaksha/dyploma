
import CountModal from "../../../helpers/analytics/CountModal";
import styles from "@/styles/reactComponents/dashboard/layouts/analytics/index.module.css";

const AnalyticsCollectionsLayout = ({ analytics }) => {

    console.log(analytics)
    return (
        <>
            <h1>Analytics / Collections</h1>
            <div className={styles.wrapper}>
                <div className={styles.modals}>

                    <div className={styles.modalItem}>
                        <CountModal
                            title='Views'
                            count={analytics?.view}
                        />
                    </div>

                    <div className={styles.modalItem}>
                        <CountModal
                            title='Clicks'
                            count={analytics?.click}
                        />
                    </div>

                </div>
            </div>
        </>
    );
};

export default AnalyticsCollectionsLayout;
