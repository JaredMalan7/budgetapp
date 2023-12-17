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
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : { name: "", lastName: "", budget: 0, transactions: [] };
    });

    // Initialize transactions state
    const [transactions, setTransactions] = useState<ITransaction[]>(() => {
        const storedTransactions = localStorage.getItem("transactions");
        return storedTransactions ? JSON.parse(storedTransactions) : [];
    });

    // Load user data from local storage on component mount if state is not set
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Load transactions from local storage on component mount if state is not set
    useEffect(() => {
        const storedTransactions = localStorage.getItem("transactions");
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        }
    }, []);

    // Update local storage whenever user data changes
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    // Update local storage whenever transactions data changes
    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    // Provide a memoized version of setUser and setTransactions to avoid unnecessary renders
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
            setTransactions((prevTransactions) => {
                const updatedTransactions =
                    typeof newTransactions === "function" ? newTransactions(prevTransactions) : newTransactions;
                localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
                return updatedTransactions;
            });
        },
        []
    );

    return (
        <TransactionsContext.Provider value={{ user, setUser: memoizedSetUser, transactions, setTransactions: memoizedSetTransactions }}>
            {children}
        </TransactionsContext.Provider>
    );
};
export { useTransactions, TransactionsProvider, TransactionsContext };
