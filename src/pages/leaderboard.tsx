import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/pages/Leaderboard.module.css';

export default function Leaderboard() {
    const { users, readAllUsers } = useContext(UserContext);

    const [titleHeight, setTitleHeight] = useState(0);
    const [userListHeaderHeight, setUserListHeaderHeight] = useState(0);

    const titleContainer: MutableRefObject<HTMLDivElement> = useRef();
    const userListHeader: MutableRefObject<HTMLTableSectionElement> = useRef();

    useEffect(() => {
        readAllUsers();

        const html = document.documentElement;
        
        html.style.overflowY = 'hidden';

        setTitleHeight(titleContainer.current.clientHeight);
        setUserListHeaderHeight(userListHeader.current.clientHeight);

        return () => {
            html.style.overflowY = null;
        }
    }, []);
    
    return (
        <div className={styles.leaderboardContainer}>
            <Sidebar />
            <div className={styles.container}>
                <div className={styles.titleContainer} ref={titleContainer}>
                    <h1>Classificação</h1>
                </div>
                <table className={styles.userList}>
                    <thead ref={userListHeader}>
                        <tr className={styles.header}>
                            <td className={styles.position}>Posição</td>
                            <td className={styles.picture}>Usuário</td>
                            <td className={styles.user}></td>
                            <td className={styles.challenges}>Desafios</td>
                            <td className={styles.experience}>Experiência</td>
                        </tr>
                    </thead>
                    <tbody style={{
                        height: `calc(100vh - ${titleHeight}px - ${userListHeaderHeight}px - 5rem)`,
                        overflowY: 'auto'
                    }}>
                        {
                            users.map((user, index) => {
                                return (
                                    <tr className={styles.userListItem} key={`user${index}`}>
                                        <td className={styles.position}>{index + 1}</td>
                                        <td className={styles.picture}>
                                            <img src={user.image} alt={user.name}/>
                                        </td>
                                        <td className={styles.user}>{user.name}</td>
                                        <td className={styles.challenges}><span className={styles.value}>{user.completedChallenges}</span> completados</td>
                                        <td className={styles.experience}><span className={styles.value}>{user.totalExperience}</span> xp</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}