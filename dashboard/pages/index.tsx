
import styles from '@/styles/Authorization.module.css'
import PageHead from '../components/helpers/PageHead';
import Input from '../components/helpers/Input'
import {useEffect, useState} from 'react';
import next from '../utils/nextApiInstance';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { checkSessionExists } from "../helpers/checkSessionExists";

const QrCodeScanner = ({src}) => {

    const router = useRouter();

    const [token, setToken] = useState('');

    const onVerifySubmit = async (e) => {
        e.preventDefault();

        try {

            const { data } = await next.post('/api/user/verify', {
                token: token,
            }, { withCredentials: true });

            const { verified } = data;

            if(verified) {
                await router.push('/dashboard/analytics');
            }
        }

        catch({ errorMessage }) {
            alert(errorMessage)
        }
    }

    return (
        <form className={styles.form} onSubmit={onVerifySubmit}>
            <Image
                src={src}
                width={200}
                height={200}
                alt='QR Code'
            />
            <span style={{marginTop: 4, fontSize: 15, textAlign: 'center'}}>
                Go to the <b>Authenticator App</b> and <br />
                provide 6-digit code
            </span>
            <Input
                name='code'
                placeholder='123 456'
                errorText='Please, type valid code'
                value={token}
                onChange={event => setToken(event.target.value)}
                style={{marginTop: 24}}
            />
            <button
                type='submit'
                className={styles.formSubmit}
                style={{marginTop: 12}}
            >
                Verify
            </button>
        </form>
    )
}


const UserAuthorization = ({ sessionExists }) => {

    const router = useRouter();

    useEffect(() => {
        if (sessionExists) {
            router.push('/dashboard/analytics');
        }
    }, [sessionExists, router]);

    const [qrCode, setQrCode] = useState(undefined);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const onSignInSubmit = async (e) => {

        e.preventDefault();

        try {
            const { data } = await next.post('/api/user/login', {
                email: formData?.email,
                password: formData?.password,
            }, { withCredentials: true });

            const { qrCode } = data;
            setQrCode(qrCode);
        }

        catch({ errorMessage }) {
            alert(errorMessage)
        }
    }

    return (
        <>
            <PageHead title='Sign In' />
            <main className={styles.main}>
                <div className={styles.wrapper}>

                    { qrCode && <QrCodeScanner src={qrCode}/> }

                    { !qrCode &&
                    <form onSubmit={onSignInSubmit} className={styles.form}>
                        <h2>Sign in</h2>

                        <Input
                            name='email'
                            placeholder='Enter your email'
                            value={formData.email}
                            onChange={handleInputChange}
                            errorText='Please, type valid email'
                            style={{marginTop: 32}}
                        />

                        <Input
                            name='password'
                            type='password'
                            placeholder='Enter your password'
                            value={formData.password}
                            onChange={handleInputChange}
                            errorText='Please, type valid password'
                            style={{marginTop: 8}}
                        />

                        <button
                            type='submit'
                            className={styles.formSubmit}
                            style={{marginTop: 16}}
                        >
                            Sign in
                        </button>

                        <span className={styles.formHelp}>
                            If you need further assistance, please <br />
                            <a href='#'>Contact Us</a>
                        </span>
                    </form>
                    }
                </div>
            </main>
        </>
    )
};

export async function getServerSideProps(context) {
    const { userId, sessionId } = context.req.cookies;
    const sessionExists = await checkSessionExists(userId, sessionId);

    return {
        props: {
            sessionExists,
        },
    };
}

export default UserAuthorization;
