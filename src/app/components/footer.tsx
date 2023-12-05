'use client'
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTransactions } from "./TransactionsContext";

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

            // uses a simplified way to write to a local JSON file.
            const updatedUserData = { transactions: updatedTransactions };
            const updatedUserDataJSON = JSON.stringify(updatedUserData, null, 2);


            fetch('/user.json', {
                method: 'POST',  // neither PUT nor POST work in this case in order to update the json file.
                headers: {
                    'Content-Type': 'application/json',
                },
                body: updatedUserDataJSON,
            });
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    const onIconClick = () => {
        handleAddTransaction();
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center mt-6 mb-6">
            <FontAwesomeIcon icon={faPlus} className="text-white bg-black p-4 rounded-full cursor-pointer" onClick={onIconClick} />
        </div>
    );
}
