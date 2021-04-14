import axios from 'axios';

import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { LevelUpModal } from '../components/LevelUpModal';

import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye'
    description: string
    amount: number
}

interface User {
    completedChallenges: number
    currentExperience: number
    email: string
    id: string
    image: string
    level: number
    name: string
    totalExperience: number
}

interface UserContextData {
    activeChallenge: Challenge
    completedChallenges: number
    currentExperience: number
    email: string
    experienceToNextLevel: number
    id: string
    image: string
    isLevelUpModalOpen: boolean
    level: number
    name: string
    users: User[]
    closeLevelUpModal: () => void
    completeChallenge: () => void
    levelUp: () => void
    readAllUsers: () => void
    readUser: (sessionEmail: string) => void
    resetChallenge: () => void
    startNewChallenge: () => void
}

interface UserProviderProps {
    children: ReactNode
}

export const UserContext = createContext({} as UserContextData);

export function UserProvider({
    children
}: UserProviderProps) {
    const [completedChallenges, setCompletedChallenges] = useState(0);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [image, setImage] = useState('');
    const [level, setLevel] = useState(1);
    const [name, setName] = useState('');
    const [totalExperience, setTotalExperience] = useState(0);
    const [users, setUsers] = useState([]);
    
    const [initCompletedChallenges, setInitCompletedChallenges] = useState(0);
    const [initCurrentExperience, setInitCurrentExperience] = useState(0);
    const [initLevel, setInitLevel] = useState(1);
    const [initTotalExperience, setInitTotalExperience] = useState(0);
    
    const router = useRouter();
    const [session] = useSession();

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }
    
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/Notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount} xp!`
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setTotalExperience(totalExperience + amount);
        setActiveChallenge(null);
        setCompletedChallenges(completedChallenges + 1);
    }

    function createUser() {
        axios.post('/api/db/createUser', {
            completedChallenges,
            currentExperience,
            email: session.user.email,
            image: session.user.image,
            level,
            name: session.user.name,
            totalExperience
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    function readUser() {
        axios.post('/api/db/readUser', { email: session.user.email }).then((response) => {
            const d = response.data;
            if (d !== '') {
                setInitCompletedChallenges(d.completedChallenges);
                setInitCurrentExperience(d.currentExperience);
                setInitLevel(d.level);
                setInitTotalExperience(d.totalExperience);
                
                setCompletedChallenges(d.completedChallenges);
                setCurrentExperience(d.currentExperience);
                setEmail(d.email);
                setId(d._id);
                setImage(d.image);
                setLevel(d.level);
                setName(d.name);
                setTotalExperience(d.totalExperience);
            } else {
                createUser();
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    function updateUser() {
        axios.post('/api/db/updateUser', {
            completedChallenges,
            currentExperience,
            email,
            level,
            totalExperience
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    function readAllUsers() {
        axios.get('/api/db/readAllUsers').then((response) => {
            setUsers(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        if (!session) {
            router.push('/login');
        } else {
            setEmail(session.user.email);
            setImage(session.user.image);
            setName(session.user.name);
            readUser();
        }
    }, [session]);

    useEffect(() => {
        if (
            // Se todos os valores atuais forem maiores ou iguais aos valores iniciais correspondentes
            (
                completedChallenges >= initCompletedChallenges &&
                currentExperience >= initCurrentExperience &&
                level >= initLevel &&
                totalExperience >= initTotalExperience
            ) &&
            // Se pelo menos um dos valores for maior que o valor inicial correspondente
            (
                completedChallenges > initCompletedChallenges ||
                currentExperience > initCurrentExperience ||
                level > initLevel ||
                totalExperience > initTotalExperience
            )
        ) {
            updateUser();
        }
    }, [completedChallenges, currentExperience, level, totalExperience]);
    
    return (
        <UserContext.Provider value={{
            activeChallenge,
            completedChallenges,
            currentExperience,
            email,
            experienceToNextLevel,
            id,
            image,
            isLevelUpModalOpen,
            level,
            name,
            users,
            closeLevelUpModal,
            completeChallenge,
            levelUp,
            readAllUsers,
            readUser,
            resetChallenge,
            startNewChallenge
        }}>
            {children}
            { isLevelUpModalOpen && <LevelUpModal /> }
        </UserContext.Provider>
    )
}