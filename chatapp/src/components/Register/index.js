import styles from './Register.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faTags } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
function Register({ toLogin, handleSuccess }) {
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [account, setAccount] = useState('');
    const [pwd, setPwd] = useState('');
    function handleSubmit(e) {
        e.preventDefault();

        if (name === '' || account === '' || pwd === '') {
            return setError('Không được để trống!');
        } else if (pwd.length < 6 || pwd.length > 18) {
            return setError('Mật khẩu trong khoảng 6-18 kí tự!');
        }

        function handleRegister(data) {
            if (data.msg === 'success') {
                handleSuccess();
            } else {
                return setError('Tài khoản đã tồn tại!');
            }
        }

        const datasend = {
            name: name,
            account: account,
            password: pwd,
        };

        fetch(`${process.env.REACT_APP_API_ENDPOINT}/register`, {
            method: 'POST',
            body: JSON.stringify(datasend),
            headers: { 'content-type': 'application/json' },
        })
            .then((res) => res.json())
            .then((data) => handleRegister(data));
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h3>Register</h3>
            </div>
            <div className={styles.container}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <FontAwesomeIcon icon={faTags} />
                        <input
                            value={name}
                            onChange={(e) => {
                                setError('');
                                setName(e.target.value);
                            }}
                            placeholder="Tên"
                        ></input>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faUser} />
                        <input
                            value={account}
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
                                setPwd(e.target.value);
                            }}
                            type="password"
                            placeholder="Mật Khẩu"
                        ></input>
                    </div>
                    <span>{error}</span>
                    <button type="submit">Register</button>
                </form>
            </div>
            <div className={styles.footer}>
                <button onClick={() => toLogin()}>Go to Login</button>
            </div>
        </div>
    );
}

export default Register;
