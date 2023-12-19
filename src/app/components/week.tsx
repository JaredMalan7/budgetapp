// 'use client'
import React, { useContext, useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faHouseCrack, faHouse, faHouseUser, faBasketShopping, faUtensils, faBurger, faFileMedical, faCirclePlay, faTags, faDumbbell, faCreditCard, IconDefinition, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useTransactions } from "./TransactionsContext";
import { TransactionsMenu } from "./transactionmenu";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

// Define the ITransaction type
interface ITransaction {
    transactionId: number;
    transactionType: string;
    transactionName: string;
    day: number;
    month: number;
    year: number;
    transactionBalance: number;
    // Add any other properties as needed
}

export function WeekTransactions() {
    const { user, setTransactions } = useTransactions();
    const { transactions } = user;

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedTransactions, setEditedTransactions] = useState([...transactions]);
    const [editTransaction, setEditTransaction] = useState<ITransaction | null>(null);

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

    const handleEdit = (index: number) => {
        setEditIndex(index);
        const updatedTransactions = [...transactions];
        updatedTransactions[index] = { ...transactions[index] };
        setEditTransaction(updatedTransactions[index]);
        setEditedTransactions(updatedTransactions);
    };

    const handleInputChange = (key: string, value: string | { label: string }) => {
        if (editTransaction) {
            const updatedTransaction = { ...editTransaction };

            if (key === 'transactionType') {
                // If updating transactionType, use the selected transaction type label
                updatedTransaction[key] = typeof value === 'string' ? (value as string) : (value as { label: string }).label;
            } else {
                // For other properties, directly set the value
                updatedTransaction[key] = typeof value === 'string' ? value : (value as { label: string }).label;
            }

            setEditTransaction(updatedTransaction);
        }
    };

    const handleSave = () => {
        if (editTransaction) {
            const updatedTransactions = [...editedTransactions];
            updatedTransactions[editIndex] = { ...editTransaction };
            setTransactions(updatedTransactions);
            setEditIndex(null);
            setEditTransaction(null);
        }
    };

    const handleCancel = () => {
        setEditIndex(null);
        setEditTransaction(null);
    };

    const handleDelete = (index: number) => {
        const updatedTransactions = [...editedTransactions];
        updatedTransactions.splice(index, 1);
        setEditedTransactions(updatedTransactions);
        setEditIndex(null);
        setTransactions(updatedTransactions);
    };

    // Function to check if a transaction falls within the current week
    const isTransactionInCurrentWeek = (transaction: ITransaction) => {
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
                                    <TransactionsMenu
                                        selectedItem={{ key: transaction.transactionType, label: transaction.transactionType, icon: transactionTypeIcons[transaction.transactionType] }}
                                        handleItemSelect={(item) => handleInputChange('transactionType', item)}
                                    />
                                    {/* Show inputs only during editing */}
                                    <input
                                        type="text"
                                        value={editTransaction?.transactionName || ''}
                                        onChange={(e) => handleInputChange('transactionName', e.target.value)}
                                        placeholder="Transaction Name"
                                    />
                                    <input
                                        type="number"
                                        value={editTransaction?.day || 0}
                                        onChange={(e) => handleInputChange('day', e.target.value)}
                                        placeholder="Day"
                                    />
                                    <input
                                        type="number"
                                        value={editTransaction?.month || 0}
                                        onChange={(e) => handleInputChange('month', e.target.value)}
                                        placeholder="Month"
                                    />
                                    <input
                                        type="number"
                                        value={editTransaction?.year || 0}
                                        onChange={(e) => handleInputChange('year', e.target.value)}
                                        placeholder="Year"
                                    />
                                </>
                            ) : (
                                <>
                                    {/* Show values when not editing */}
                                    <p className="font-bold">{transaction.transactionName}</p>
                                    <i className="text-light-text">{transaction.month}-{transaction.day}-{transaction.year}</i>
                                </>
                            )}
                        </div>
                        <div className="font-bold">
                            {/* Show balance only when not editing */}
                            {editIndex !== index && (
                                <>
                                    {transaction.transactionBalance < 0 && "-"}
                                    ${Math.abs(transaction.transactionBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </>
                            )}
                        </div>
                        <div>
                            {/* Show edit button only when not editing */}
                            {editIndex !== index && (
                                <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(index)} className="cursor-pointer" />
                            )}
                            {editIndex === index && (
                                <>
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={handleCancel}>Cancel</button>
                                </>
                            )}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}
