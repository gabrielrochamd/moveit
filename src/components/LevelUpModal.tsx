import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
    const { level, closeLevelUpModal } = useContext(UserContext)
    
    return (
        <div className={styles.overlay}>
            <div className={styles.modalContainer}>
                <div className={styles.container}>
                    <header>{level}</header>
                    <strong>Parabéns</strong>
                    <p>Você alcançou um novo level.</p>
                    <button onClick={closeLevelUpModal} type="button">
                        <img src="/icons/close.svg" alt="Fechar modal"/>
                    </button>
                </div>
            </div>
        </div>
    );
}