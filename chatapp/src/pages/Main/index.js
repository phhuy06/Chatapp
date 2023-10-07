import styles from './Main.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Message from '../../components/Message';
import Socket from '../../Socket';
function Main() {
    let x = '';
    const [message, setMessage] = useState('');
    const [listMess, setListMess] = useState([]);
    const [name, setName] = useState('');
    const [cookies] = useCookies([]);
    if (cookies.token) {
        x = jwt_decode(cookies.token);
    }
    const [decode] = useState(x);
    const [fullname, setFullname] = useState(decode.account);
    const navigate = useNavigate();
    const ref = useRef();
    const ref2 = useRef();

    useEffect(() => {
        if (!cookies.token) {
            navigate('/landing');
        } else {
            const fullname = decode.account;
            let name = '';
            for (let i = fullname.length - 1; i >= 0; i--) {
                if (fullname[i] === ' ') {
                    name = fullname.slice(i + 1);
                    break;
                }
                if (i === 0) {
                    name = fullname;
                }
            }
            setFullname(fullname);
            setName(name);
            Socket.connect();
            Socket.emit('show_connect', fullname, name);
        }
    }, []);

    useEffect(() => {
        Socket.on('join', (data) => {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

            const msg = {
                message: `${data.fullname} đã tham gia!`,
                time: formattedTime,
                type: data.fullname === fullname,
                name: data.name,
            };

            setListMess((prev) => [msg, ...prev]);
        });

        Socket.on('mess', (data) => {
            if (data.fullname !== fullname) {
                const date = new Date();
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
                const msg = {
                    message: data.message,
                    time: formattedTime,
                    type: false,
                    name: data.name,
                };
                setListMess((prev) => [msg, ...prev]);
            }
        });

        return () => {
            Socket.off('join');
            Socket.off('mess');
        };
    }, []);

    useEffect(() => {
        ref.current.scrollTop = ref.current.scrollHeight;
    }, [listMess]);

    function handleSend() {
        if (message !== '') {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
            const msg = {
                message: message,
                time: formattedTime,
                type: true,
                name: name,
            };
            Socket.emit('mess', message, fullname, name);
            setMessage('');
            setListMess((prev) => [msg, ...prev]);
            ref2.current.focus();
        }
    }

    function handleEnter(e) {
        if (e.keyCode === 13) {
            return handleSend();
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <p>{fullname}</p>
            </div>
            <div ref={ref} className={styles.container}>
                {listMess.map((message, ind) => (
                    <Message
                        key={ind}
                        type={message.type}
                        message={message.message}
                        time={message.time}
                        name={message.name}
                    ></Message>
                ))}
            </div>
            <div className={styles.msginput}>
                <input
                    value={message}
                    ref={ref2}
                    placeholder="Type message!"
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => handleEnter(e)}
                ></input>
                <button onClick={() => handleSend()}>Send</button>
            </div>
        </div>
    );
}

export default Main;
