import { SidebarLink } from './SidebarLink';

import styles from '../styles/components/Sidebar.module.css';
import { signOut } from 'next-auth/client';

export function Sidebar() {
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img src="/icons/logo-dark.svg" alt="move.it"/>
            </div>
            <div className={styles.menu}>
                <SidebarLink
                    icon={['home-blue.svg', 'home.svg']}
                    label="Início"
                    route="/"
                ></SidebarLink>
                <SidebarLink
                    icon={['award-blue.svg', 'award.svg']}
                    label="Classificação"
                    route="/leaderboard"
                ></SidebarLink>
            </div>
            <div className={styles.logoutContainer}>
                <button className={styles.logoutButton} onClick={() => {signOut()}}>
                    <img src="/icons/log-out.svg" alt="Sair"/>
                </button>
            </div>
        </div>
    );
}