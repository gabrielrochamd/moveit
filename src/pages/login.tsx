import { LoginForm } from '../components/LoginForm';
import styles from '../styles/pages/Login.module.css';

export default function Login() {
    return(
        <div className={styles.loginContainer}>
            <LoginForm />
        </div>
    );
}