import styles from './Toastmess.module.scss';
import clsx from 'clsx';
function Toastmess({ children, type }) {
    return (
        <div
            className={clsx(styles.wrapper, {
                [styles.red]: type,
            })}
        >
            <h3>{children}</h3>
        </div>
    );
}

export default Toastmess;
