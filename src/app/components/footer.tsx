'use client'
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTransactions } from "./TransactionsContext";
import Link from "next/link";
import { link } from "fs";

export function Footer() {
    const { transactions, setTransactions } = useTransactions();
    const [newTransaction, setNewTransaction] = useState({
        transactionId: 0,
        transactionType: "Other",
        transactionName: "New Transaction",
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        transactionBalance: 0,
    });

    const handleAddTransaction = () => {
        try {
            // Create a copy of the transactions array and add the new transaction
            const updatedTransactions = [...transactions, newTransaction];

            // Update the context with the new transactions
            setTransactions(updatedTransactions);

            // Update local storage with the new transactions
            localStorage.setItem("transactions", JSON.stringify(updatedTransactions));

            // Update newTransaction state for the next transaction
            setNewTransaction((prevTransaction) => ({
                ...prevTransaction,
                transactionId: prevTransaction.transactionId + 1,
                // Add logic for other properties if needed
            }));
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    const onIconClick = () => {
        handleAddTransaction();
    };

    // Fetch data from local storage on component mount
    useEffect(() => {
        try {
            const storedTransactions = localStorage.getItem("transactions");
            if (storedTransactions) {
                setTransactions(JSON.parse(storedTransactions));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []); // Empty dependency array to ensure it runs only on mount

    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center mt-6 mb-6">
            <FontAwesomeIcon icon={faPlus} className="text-white bg-black p-4 rounded-full cursor-pointer" onClick={onIconClick} />
        </div>
    );
}
