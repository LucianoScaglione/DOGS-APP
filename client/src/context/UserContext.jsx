import { useState, useEffect, createContext } from 'react';
import { isAuthenticated } from '../components/AuthService';
import Login from '../components/Login';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const checkLoggedIn = async () => {
            let cuser = isAuthenticated();
            if (cuser === null) {
                localStorage.setItem('user', '');
                cuser = '';
            }
            setCurrentUser(cuser);
        };
        checkLoggedIn();
    }, []);

    return (
        <UserContext.Provider value={[currentUser, setCurrentUser]}>
            {currentUser?.token ? children : <Login />}
        </UserContext.Provider>
    );
};


export default UserContext;