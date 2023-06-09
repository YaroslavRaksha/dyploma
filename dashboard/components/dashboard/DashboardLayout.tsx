import SideMenu from './SideMenu';
import styles from '@/styles/reactComponents/dashboard/DashboardLayout.module.css'
import Input from "../helpers/Input";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setAllStores, setSelectedStore} from "../../store/reducers/storeData";
import nextApiInstance from "../../utils/nextApiInstance";

const DashboardLayout = ({ children }) => {

    const dispatch = useDispatch();
    const dropdownRef = useRef(null);

    const { allStores, selectedStoreName }: any = useSelector((state:RootState) => state.storeData);

    const [dropdownListVisible, setDropdownListVisible] = useState(false);
    const [accountName, setAccountName] = useState(selectedStoreName);

    useEffect(() => {

        if(!allStores) {
            const getStores = async () => {
                const { data } = await nextApiInstance.get('/api/store');
                const { stores } = data;

                dispatch(setAllStores({ stores: stores }));
            }

            getStores()
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownListVisible(false);
        }
    };

    const handleAccountNameChange = (event) => {
        const value = event.target.value;
        setAccountName(value);
    }

    const handleStoreSelect = ({ id, name }) => {
        dispatch(setSelectedStore({ id: id, name: name }));
        setAccountName(name);
        setDropdownListVisible(false);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.sideMenu}>
                <SideMenu />
            </div>
            <main className={styles.main}>
                <div className={styles.accountsDropdown} ref={dropdownRef}>
                    <Input
                        name='Accounts Dropdown'
                        onChange={handleAccountNameChange}
                        value={accountName}
                        placeholder='example.myshopify.com'
                        additionalProps={{
                            onFocus: () => setDropdownListVisible(true),
                        }}
                    />
                    {dropdownListVisible && allStores?.length > 0 && (
                        <ul className={styles.accountsList}>
                            {allStores?.map((store, index) => (
                                <li
                                    key={index}
                                    className={styles.listItem}
                                    onClick={() => handleStoreSelect(store)}
                                >
                                    {store.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={styles.mainContent}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
