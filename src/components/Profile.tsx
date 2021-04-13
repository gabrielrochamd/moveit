import { useSession } from 'next-auth/client';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const [session, loading] = useSession();
    
    const { level } = useContext(UserContext);
    
    return (
        <div className={styles.profileContainer}>
            <img src={session?.user.image} alt={session?.user.name}/>
            <div>
                <strong>{session?.user.name}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}