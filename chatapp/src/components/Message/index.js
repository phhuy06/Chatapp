import styles from './Message.module.scss';
import clsx from 'clsx';
function Message({ type, message, time, name }) {
    //type = 1: send, type = 0: receive
    return (
        <div
            className={clsx({
                [styles.msgSend]: type,
                [styles.msgReceive]: !type,
            })}
        >
            <p className={styles.msgTime}>{time}</p>
            <p className={styles.msgInner}>{message}</p>
            <p className={styles.msgName}>{name}</p>
        </div>
    );
}

export default Message;
