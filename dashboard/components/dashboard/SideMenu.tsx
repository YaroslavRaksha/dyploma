import styles from "@/styles/reactComponents/dashboard/SideMenu.module.css";
import { useRouter } from 'next/router';

const menuItems = [
    {
        label: 'Analytics', route: '/dashboard/analytics',
        nestedRoutes: [
            { label: 'Collections', route: '/dashboard/analytics/collections' },
            { label: 'Recommendations', route: '/dashboard/analytics/recommendations' }
        ],
    },
    {
        label: 'Settings',
        route: '/dashboard/settings',
        nestedRoutes: [
            { label: 'Navigation', route: '/dashboard/settings/navigation' },
        ],
    },
];

const SideMenu = ({ level = 0 }) => {
    const router = useRouter();

    const isActive = (route) => {

        if (route === '/' && router.pathname === '/') {
            return true;
        }

        if (router.pathname === route) {
            return true;
        }

        return null;
    };

    const renderMenuItems = (items, level) => {
        return items.map((item) => {
            const hasNestedRoutes = item.nestedRoutes && item.nestedRoutes.length > 0;
            const padding = `${12 + level * 12}px`

            const routeIsActive = isActive(item.route);
            return (
                <li key={item.route}>
                    <div
                        className={styles.navLink}
                        data-selected={routeIsActive}
                        style={{ paddingLeft: padding }}
                        onClick={() => routeIsActive ? '' : router.push(item.route)}
                    >
                        {item.label}
                    </div>
                    {hasNestedRoutes && (
                        <ul>{renderMenuItems(item.nestedRoutes, level + 1)}</ul>
                    )}
                </li>
            );
        });
    };

    return (
        <>
            <nav>
                <ul>
                    {renderMenuItems(menuItems, level)}
                </ul>
            </nav>
        </>
    );
};

export default SideMenu;
