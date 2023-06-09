import styles from "@/styles/reactComponents/helpers/Input.module.css";
import {useState, CSSProperties, useEffect} from "react";

type InputType = {
    name: string,
    type?: string,
    onChange: Function,
    value: string,
    placeholder: string,
    errorText?: string,
    style?: CSSProperties,
    additionalProps?: Object,
}

export default function Input({name, type, onChange, value, placeholder, errorText, style, additionalProps}: InputType) {

    const [errorVisible, setErrorVisible] = useState(false);

    return (
        <div className={styles.inputWrapper} style={style}>
            <input
                type={type || 'text'}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...additionalProps}
            />

            <div className={styles.errorText} style={{opacity: errorVisible ? 1 : 0}}>
                {errorText}
            </div>
        </div>
    )
}
