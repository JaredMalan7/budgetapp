'use client'
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTransactions } from "./TransactionsContext";
import Link from "next/link";
import { link } from "fs";

export function Footer() {
    const { user, setUser } = useTransactions();
    const [newTransaction, setNewTransaction] = useState({
        transactionId: 0,
        transactionType: "Other",
        transactionName: "Transaction Name",
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        transactionBalance: 0,
    });

    const handleAddTransaction = () => {
        try {
            setUser((prevUser) => {
                const updatedUser = {
                    ...prevUser,
                    transactions: [
                        ...prevUser.transactions,
                        {
                            ...newTransaction,
                            transactionId: newTransaction.transactionId + 1,
                        },
                    ],
                };

                localStorage.setItem("user", JSON.stringify(updatedUser));

                return updatedUser;
            });

            setNewTransaction((prevTransaction) => ({
                ...prevTransaction,
                transactionId: prevTransaction.transactionId + 1,

            }));
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center mt-6 mb-6">
            <FontAwesomeIcon icon={faPlus} className="text-white bg-black p-4 rounded-full cursor-pointer" onClick={handleAddTransaction} />
        </div>
    );
}

