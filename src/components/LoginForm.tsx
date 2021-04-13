import Link from 'next/link';

import { useRouter } from 'next/router';
import { signin, useSession } from 'next-auth/client';

import styles from '../styles/components/LoginForm.module.css';

export function LoginForm() {
    const [session] = useSession();
    const router = useRouter();

    if (session) {
        router.push('/');
    }
    
    return (
        <div className={styles.loginFormContainer}>
            <img className={styles.logo} src="/images/logo-login.svg" alt="move.it"/>
            <strong>Bem-vindo</strong>
            <p>
                <img src="/icons/github.svg" alt="Github"/>
                Faça login com sua conta do Github para começar
            </p>
            <Link href="#">
                <a onClick={(event) => {
                    event.preventDefault();
                    signin('github');
                }}>
                    <div className={styles.labelGithub}>
                        Fazer login com o Github
                    </div>
                    <div className={styles.arrowGo}>
                        <img src="/icons/submit.svg" alt="Submit"/>
                    </div>
                </a>
            </Link>
        </div>
    );
}