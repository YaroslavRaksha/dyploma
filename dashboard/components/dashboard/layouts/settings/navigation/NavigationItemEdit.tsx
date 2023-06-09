
import styles from "@/styles/reactComponents/dashboard/layouts/settings/index.module.css";
import Input from "../../../../helpers/Input";
import {useState} from "react";
import {updatingNavigationItem} from "../../../../../helpers/customTypings";

const SettingsNavigationItemEdit = ({ updateNavigation, hideModal, editingItem }) => {

    const { id, title, handle } = editingItem;

    const [formData, setFormData] = useState({
        title: title,
        handle: handle,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = () => {
        if(formData.title.length < 3 && formData?.handle.length < 3) {
            return alert('Fields should contain more than 3 characters')
        }

        updateNavigation({
            id: id,
            newTitle: formData.title,
            newHandle: formData.handle
        } as updatingNavigationItem);

    }

    return (
        <>
            <div className={styles.editModalBackdrop} onClick={hideModal} />
            <div className={styles.editModal}>
                <h3>Edit collection</h3>

                <div className={styles.editModalBody}>
                    <div className={styles.editModalInput}>
                        <div>Collection title</div>
                        <Input
                            name='title'
                            value={formData.title}
                            placeholder='Accessories'
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={styles.editModalInput}>
                        <div>Collection handle</div>
                        <Input
                            name='handle'
                            value={formData.handle}
                            placeholder='accessories-handle'
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <button className={styles.editModalSubmit} onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </>
    );
};

export default SettingsNavigationItemEdit;
