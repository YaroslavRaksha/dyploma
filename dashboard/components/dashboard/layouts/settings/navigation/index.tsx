
import styles from "@/styles/reactComponents/dashboard/layouts/settings/index.module.css";
import { useState } from "react";
import NavigationItemEdit from "./NavigationItemEdit";
import { updatingNavigationItem } from "../../../../../helpers/customTypings";
import nextApiInstance from "../../../../../utils/nextApiInstance";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store";

const updateItemById = ({ items, id, newTitle, newHandle }) => {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.id === id) {
            const updatedItem = { ...item, title: newTitle, handle: newHandle };
            items[i] = updatedItem;
            return items;
        } else if (item.nested && item.nested.length > 0) {

            const updatedNestedItems = updateItemById({
                items: item.nested,
                id: id,
                newTitle: newTitle,
                newHandle: newHandle
            });
            if (updatedNestedItems) {
                items[i].nested = updatedNestedItems;
                return items;
            }
        }
    }
    return null;
};


const SettingsNavigation = ({ navigation, setNavigation, selectedStoreId, level = 0}) => {

    const [editingItem, setEditingItem] = useState(null);

    const renderMenuItems = (items, level) => {
        return items.map((item) => {
            const hasNestedItems = item?.nested && item.nested.length > 0;
            const padding = `${level * 12}px`

            return (
                <li key={item.id}>
                    <div className={styles.navigationItem}>
                        <span className={styles.navigationItemTitle} style={{ paddingLeft: padding }}>{item.title}</span>
                        <button className={styles.editNavigationItem} onClick={() => setEditingItem(item)}>
                            Edit
                        </button>
                    </div>
                    {hasNestedItems && (
                        <ul>
                            {renderMenuItems(item.nested, level + 1)}
                        </ul>
                    )}
                </li>
            );
        });
    };

    const updateNavigation = async ({id, newTitle, newHandle}: updatingNavigationItem) => {


        /* check if navigation is the same in redis and check if items are existing in store */

        const updatedNavigation = updateItemById({
            items: navigation,
            id: id,
            newTitle: newTitle,
            newHandle: newHandle
        });

        const { data } = await nextApiInstance.post('/api/storeSettings/' + selectedStoreId, {
            updatedSettings: [
                { key: 'navigation', value: updatedNavigation }
            ]
        })
        if(data?.ok) {
            setEditingItem(null);
            setNavigation(updatedNavigation);
        }
    }

    return (
        <>
            <h1>Settings / Navigation</h1>
            <div className={styles.wrapper}>
                <h3>Navigation list</h3>
                <ul>
                    {renderMenuItems(navigation, level)}
                </ul>
            </div>

            {
                editingItem &&
                    <NavigationItemEdit
                        hideModal={() => setEditingItem(null)}
                        editingItem={editingItem}
                        updateNavigation={(updatedItem) => updateNavigation(updatedItem)}
                    />
            }
        </>
    );
};

export default SettingsNavigation;
