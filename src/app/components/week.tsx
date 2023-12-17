'use client'
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faHouseCrack, faHouse, faHouseUser, faBasketShopping, faUtensils, faBurger, faFileMedical, faCirclePlay, faTags, faDumbbell, faCreditCard, IconDefinition, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useTransactions } from "./TransactionsContext";

const transactionTypeIcons: Record<string, IconDefinition> = {
    Transportation: faCar,
    Utilities: faHouseCrack,
    Rent: faHouse,
    Mortgage: faHouseUser,
    Groceries: faBasketShopping,
    Takeout: faBurger,
    "Dining Out": faUtensils,
    Healthcare: faFileMedical,
    Entertainment: faCirclePlay,
    Retail: faTags,
    Sports: faDumbbell,
    Other: faCreditCard,
};

export function WeekTransactions() {
    const { user, setTransactions } = useTransactions();
    const { transactions } = user;

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedTransactions, setEditedTransactions] = useState([...transactions]);

    const handleEdit = (index: number) => {
        setEditIndex(index);
        const updatedTransactions = [...transactions];
        updatedTransactions[index] = { ...transactions[index] };
        setEditedTransactions(updatedTransactions);
    };

    const handleSave = () => {
        setTransactions(editedTransactions);
        setEditIndex(null);
    };

    const handleCancel = () => {
        setEditIndex(null);
    };

    const handleInputChange = (index: number, key: string, value: string) => {
        const updatedTransactions = [...editedTransactions];
        updatedTransactions[index][key] = value;
        setEditedTransactions(updatedTransactions);
    };

    const handleDelete = (index: number) => {
        const updatedTransactions = [...editedTransactions];
        updatedTransactions.splice(index, 1);
        setEditedTransactions(updatedTransactions);
        setEditIndex(null);
        setTransactions(updatedTransactions); // Add this line to update the context transactions
    };


    // Function to check if a transaction falls within the current week
    const isTransactionInCurrentWeek = (transaction: any) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
        const currentDay = currentDate.getDate();

        return (
            transaction.year === currentYear &&
            transaction.month === currentMonth &&
            transaction.day >= currentDay - currentDate.getDay() &&
            transaction.day <= currentDay + (6 - currentDate.getDay())
        );
    };

    const currentWeekTransactions = transactions.filter(isTransactionInCurrentWeek);
    if (!currentWeekTransactions.length) {
        return <div className="text-center">No transactions found for this week</div>;
    }

    return (
        <div className="weekExpenses mt-6 mb-20">
            {transactions.map((transaction, index) => (
                // Check if the transaction is in the current week before rendering
                isTransactionInCurrentWeek(transaction) && (
                    <div className="flex justify-between place-items-center mb-6 bg-white p-4 rounded-2xl" key={index}>
                        <div className="px-4">
                            <FontAwesomeIcon icon={transactionTypeIcons[transaction.transactionType]} />
                        </div>
                        <div className="text-center">
                            {editIndex === index ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedTransactions[index].transactionName}
                                        onChange={(e) => handleInputChange(index, "transactionName", e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={editedTransactions[index].month.toString()}
                                        onChange={(e) => handleInputChange(index, "month", e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={editedTransactions[index].day.toString()}
                                        onChange={(e) => handleInputChange(index, "day", e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={editedTransactions[index].year.toString()}
                                        onChange={(e) => handleInputChange(index, "year", e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={editedTransactions[index].transactionBalance.toString()}
                                        onChange={(e) => handleInputChange(index, "transactionBalance", e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        value={editedTransactions[index].transactionType}
                                        onChange={(e) => handleInputChange(index, "transactionType", e.target.value)}
                                    />
                                </>
                            ) : (
                                <>
                                    <p className="font-bold">{transaction.transactionName}</p>
                                    <i className="text-light-text">{transaction.month}-{transaction.day}-{transaction.year}</i>
                                </>
                            )}
                        </div>
                        <div className="font-bold">
                            {transaction.transactionBalance < 0 && "-"}
                            ${Math.abs(transaction.transactionBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(index)} className="cursor-pointer" />
                            {editIndex === index && (
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            )}
                        </div>
                        {editIndex === index && (
                            <div>
                                <button onClick={handleSave}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        )}
                    </div>
                )
            ))}
        </div>
    );
}
