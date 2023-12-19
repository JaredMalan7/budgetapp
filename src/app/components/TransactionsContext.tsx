'use client'
import React, { createContext, FC, useContext, useEffect, useState, ReactNode, useCallback } from "react";

interface ITransaction {
    transactionId: number;
    transactionType: string;
    transactionName: string;
    transactionBalance: number;
    month: number;
    day: number;
    year: number;
}

// Define IUser interface for the entire user object
interface IUser {
    name: string;
    lastName: string;
    budget: number;
    transactions: ITransaction[];
}

interface TransactionsContextType {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    transactions: ITransaction[];
    setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

const TransactionsContext = createContext<TransactionsContextType | null>(null);

const useTransactions = () => {
    const transactionsContext = useContext(TransactionsContext);

    if (!transactionsContext) {
        throw new Error("useTransactions has to be used within <TransactionsContext.Provider>");
    }

    return transactionsContext;
};

const TransactionsProvider: FC<TransactionsProviderProps> = ({ children }) => {
    // Initialize user state
    const [user, setUser] = useState<IUser>(() => {
        // Check if localStorage is defined before using it
        const storedUser = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
        return storedUser ? JSON.parse(storedUser) : { name: "", lastName: "", budget: 0, transactions: [] };
    });

    // Load user data from local storage on component mount if state is not set
    useEffect(() => {
        // Check if localStorage is defined before using it
        const storedUser = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Update local storage whenever user data changes
    useEffect(() => {
        // Check if localStorage is defined before using it
        if (typeof window !== 'undefined') {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    // Provide a memoized version of setUser to avoid unnecessary renders
    const memoizedSetUser = useCallback(
        (newUser: React.SetStateAction<IUser>) => {
            setUser((prevUser) => {
                const updatedUser = typeof newUser === "function" ? newUser(prevUser) : newUser;
                localStorage.setItem("user", JSON.stringify(updatedUser));
                return updatedUser;
            });
        },
        []
    );

    const memoizedSetTransactions = useCallback(
        (newTransactions: React.SetStateAction<ITransaction[]>) => {
            setUser((prevUser) => ({
                ...prevUser,
                transactions: typeof newTransactions === "function" ? newTransactions(prevUser.transactions) : newTransactions,
            }));
        },
        []
    );

    return (
        <TransactionsContext.Provider value={{ user, setUser: memoizedSetUser, transactions: user.transactions, setTransactions: memoizedSetTransactions }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export { useTransactions, TransactionsProvider, TransactionsContext };
