import { Provider } from 'next-auth/client';
import { useEffect } from 'react';
import { UserProvider } from '../contexts/UserContext';

import '../styles/global.css'

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        document.addEventListener('keyup', (event) => {
            if (event.code === 'Tab' || event.code.includes('Shift')) {
                document.documentElement.classList.remove('no-outline');
            } else {
                document.documentElement.classList.add('no-outline');
            }
        });

        document.addEventListener('click', () => {
            document.documentElement.classList.add('no-outline');
        });
    });
    
    return (
        <Provider session={pageProps.session}>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </Provider>
    )
}

export default MyApp
