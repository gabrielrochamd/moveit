import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/components/SidebarLink.module.css';

interface Props {
    icon: [string, string]
    label: string
    route: string
}

export function SidebarLink(props: Props) {
    const router = useRouter();
    
    return (
        <Link href={props.route}>
            <a className={styles.menuButtonContainer}>
                <div className={styles.menuButtonIndicator} style={{
                    display: router.pathname === props.route ? 'block' : 'none'
                }}></div>
                <div className={styles.menuButton}>
                    <img src={ `/icons/${props.icon[ router.pathname === props.route ? 0 : 1 ]}` } alt={props.label}/>
                </div>
            </a>
        </Link>
    );
}