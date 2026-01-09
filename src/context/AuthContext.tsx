import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    signup: (name: string, email: string, pass: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'AUTH_APP_USERS';
const SESSION_KEY = 'AUTH_APP_SESSION';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadSession = async () => {
            try {
                const session = await AsyncStorage.getItem(SESSION_KEY);
                if (session) {
                    setUser(JSON.parse(session));
                }
            } catch (e) {
                console.error('Failed to load session', e);
            } finally {
                setIsLoading(false);
            }
        };
        loadSession();
    }, []);

    const login = async (email: string, pass: string) => {
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        const users = usersJson ? JSON.parse(usersJson) : {};

        const foundUser = users[email];

        if (!foundUser) {
            throw new Error('User not found');
        }

        if (foundUser.password !== pass) {
            throw new Error('Incorrect credentials');
        }

        const userData = { name: foundUser.name, email: foundUser.email };
        setUser(userData);
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    };

    const signup = async (name: string, email: string, pass: string) => {
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        const users = usersJson ? JSON.parse(usersJson) : {};

        if (users[email]) {
            throw new Error('User already exists');
        }

        const newUser = { name, email, password: pass };
        users[email] = newUser;

        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

        const userData = { name, email };
        setUser(userData);
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem(SESSION_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
