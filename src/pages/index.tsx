import Head from 'next/head'

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';

import { CountdownProvider } from '../contexts/CountdownContext';
import { Sidebar } from '../components/Sidebar';

import styles from '../styles/pages/Home.module.css'
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function Home() {
    const { isLevelUpModalOpen } = useContext(UserContext);
    
    return (
        <div className={styles.homeContainer} style={{
            filter: isLevelUpModalOpen ? 'blur(3px)' : 'none'
        }}>
            <Sidebar />
            <div className={styles.container}>
                <Head>
                    <title>Início | move.it</title>
                </Head>

                <ExperienceBar />

                <CountdownProvider>
                    <section>
                        <div>
                            <Profile />
                            <CompletedChallenges />
                            <Countdown />
                        </div>
                        <div>
                            <ChallengeBox />
                        </div>
                    </section>
                </CountdownProvider>
            </div>
        </div>
    )
}
