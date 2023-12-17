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

interface TransactionsContextType {
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
        throw new Error(
            "useTransactions has to be used within <TransactionsContext.Provider>"
        );
    }

    return transactionsContext;
};

const TransactionsProvider: FC<TransactionsProviderProps> = ({ children }) => {
    const [transactions, setTransactions] = useState<ITransaction[] | null>(null);

    useEffect(() => {
        // Load transactions from local storage on component mount if state is not set
        if (transactions === null) {
            const storedTransactions = localStorage.getItem("transactions");
            if (storedTransactions) {
                setTransactions(JSON.parse(storedTransactions));
            } else {
                setTransactions([]); // Set to an empty array if no data is in local storage
            }
        }
    }, [transactions]);

    // Update local storage whenever transactions change
    useEffect(() => {
        if (transactions !== null) {
            localStorage.setItem("transactions", JSON.stringify(transactions));
        }
    }, [transactions]);

    // Provide a memoized version of setTransactions to avoid unnecessary renders
    const memoizedSetTransactions = useCallback(
        (newTransactions: React.SetStateAction<ITransaction[]>) => {
            setTransactions((prevState) => {
                if (typeof newTransactions === 'function') {
                    // Handle functional update
                    return newTransactions(prevState || []);
                } else {
                    // Handle direct value update
                    return newTransactions || [];
                }
            });
        },
        []
    );

    return (
        <TransactionsContext.Provider value={{ transactions: transactions || [], setTransactions: memoizedSetTransactions }}>
            {children}
        </TransactionsContext.Provider>
    );
};


export { useTransactions, TransactionsProvider, TransactionsContext };
