import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import Socket from '../../Socket';
function Login({ toRegister }) {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies([]);

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        function handleLogin(data) {
            if (data.msg === 'success') {
                const decodeToken = jwt_decode(data.token);
                const exp_time = decodeToken.exp_day * 24 * 60 * 60 * 1000;
                setCookie('token', data.token, { path: '/', maxAge: exp_time, secure: true });
                navigate('/');
            } else {
                setError('Tài Khoản hoặc Mật Khẩu không chính xác!');
            }
        }

        const datasend = {
            account: account,
            password: password,
        };

        fetch(`${process.env.REACT_APP_API_ENDPOINT}/login`, {
            method: 'POST',
            body: JSON.stringify(datasend),
            headers: { 'content-type': 'application/json' },
        })
            .then((res) => res.json())
            .then((data) => handleLogin(data));
    }

    return (
        <div className={styles.block}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h3>Login</h3>
                </div>
                <div className={styles.container}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <FontAwesomeIcon icon={faUser} />
                            <input
                                onChange={(e) => {
                                    setError('');
                                    setAccount(e.target.value);
                                }}
                                placeholder="Tài Khoản"
                            ></input>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faLock} />
                            <input
                                onChange={(e) => {
                                    setError('');
                                    setPassword(e.target.value);
                                }}
                                type="password"
                                placeholder="Mật Khẩu"
                            ></input>
                        </div>
                        <span>{error}</span>
                        <button type="submit">Login</button>
                    </form>
                    <div className={styles.action}>
                        <div className={styles.remember}>
                            <input type="checkbox"></input>
                            <p>Remember me</p>
                        </div>
                        <p>Forgot Password?</p>
                    </div>
                </div>
                <div className={styles.footer}>
                    <h3>You don't have account?</h3>
                    <button onClick={() => toRegister()}>Go to Register</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
