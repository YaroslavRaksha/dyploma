
import styles from "@/styles/reactComponents/helpers/analytics/CountModal.module.css";


type CountModal = {
    title: string,
    count: number,
}

const formatter = new Intl.NumberFormat('en-US', { style: 'decimal' });

export default function CountModal({title, count}: CountModal) {

    const countValue = count ? formatter.format(count) : '0';

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>

            <h2 className={styles.count}>
                {countValue}
            </h2>

            <div className={styles.description}>
                <img className={styles.arrow} alt='Arrow up' src='/analyticsArrowUp.svg' />
                <span className={styles.descriptionText}>
                    <span>?%</span> from last month
                </span>
            </div>
        </div>
    )
}
