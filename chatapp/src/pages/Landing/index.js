import Login from '../../components/Login';
import Register from '../../components/Register';
import { useEffect, useState } from 'react';
import styles from './Landing.module.scss';
import Toastmess from '../../components/Toastmess';
import { useCookies } from 'react-cookie';
function Landing() {
    const [show, setShow] = useState(true);
    const [successToast, setSuccessToast] = useState(false);
    const [cookie, setCookie, removeCookie] = useCookies([]);
    function handleSuccess() {
        setShow(true);
        setSuccessToast(true);
    }

    useEffect(() => {
        if (cookie.token) removeCookie('token');
    }, []);

    return (
        <div className={styles.wrapper}>
            {successToast && <Toastmess type={false}>Đăng ký thành công</Toastmess>}
            {show ? (
                <Login
                    toRegister={() => {
                        setSuccessToast(false);
                        setShow(false);
                    }}
                />
            ) : (
                <Register
                    toLogin={() => {
                        setShow(true);
                    }}
                    handleSuccess={() => handleSuccess()}
                />
            )}
        </div>
    );
}

export default Landing;
