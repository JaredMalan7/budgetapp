'use client'
import React, { useContext, useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faHouseCrack, faHouse, faHouseUser, faBasketShopping, faUtensils, faBurger, faFileMedical, faCirclePlay, faTags, faDumbbell, faCreditCard, IconDefinition, faEdit, faTrash, faFileArrowDown, faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import { useTransactions } from "./TransactionsContext";
import { TransactionsMenu } from "./transactionmenu";

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

export function MonthTransactions() {
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
            } else if (key === 'transactionBalance') {
                // Ensure that the balance is treated as a number
                updatedTransaction[key] = parseFloat(value as string);
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

    // Function to check if a transaction falls within the current month and year
    const isTransactionInCurrentMonth = (transaction: ITransaction) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

        return transaction.year === currentYear && transaction.month === currentMonth;
    };

    return (
        <div className="monthExpenses mt-6 mb-20">
            {transactions.map((transaction, index) => (
                // Check if the transaction is in the current month and year before rendering
                isTransactionInCurrentMonth(transaction) && (
                    <div className="flex justify-between w-full place-items-center mb-6 bg-white p-4 rounded-2xl" key={index}>
                        <div className="flex">
                            {editIndex === index ? (
                                <>
                                    {/* Hide the previously selected transactionType during editing */}
                                    <TransactionsMenu
                                        selectedItem={{ key: transaction.transactionType, label: transaction.transactionType, icon: transactionTypeIcons[transaction.transactionType] }}
                                        handleItemSelect={(item) => handleInputChange('transactionType', item)}
                                    />
                                </>
                            ) : (
                                <FontAwesomeIcon icon={transactionTypeIcons[transaction.transactionType]} />
                            )}
                        </div>
                        <div className="flex just place-items-center gap-4">
                            <div className="text-center">
                                {editIndex === index ? (
                                    <>
                                        {/* Show inputs only during editing */}
                                        <div className="flex flex-col gap-2">
                                            <input className="bg-app-base py-2 text-center rounded"
                                                type="text"
                                                value={editTransaction?.transactionName || ''}
                                                onChange={(e) => handleInputChange('transactionName', e.target.value)}
                                                placeholder="Transaction Name"
                                                onFocus={(e) => { e.target.select(); e.preventDefault(); }} // Select text on focus and prevent default context menu
                                                onContextMenu={(e) => e.preventDefault()} // Prevent default context menu
                                            />
                                            <div className="flex gap-2">
                                                <input className="bg-app-base p-2 text-center rounded"
                                                    type="number"
                                                    value={editTransaction?.day || 0}
                                                    onChange={(e) => handleInputChange('day', e.target.value)}
                                                    placeholder="Day"
                                                    min={1}
                                                    max={31}
                                                />
                                                <input className="bg-app-base p-2 text-center rounded"
                                                    type="number"
                                                    value={editTransaction?.month || 0}
                                                    onChange={(e) => handleInputChange('month', e.target.value)}
                                                    placeholder="Month"
                                                    min={1}
                                                    max={12}
                                                />
                                                <input className="bg-app-base p-2 text-center rounded"
                                                    type="number"
                                                    value={editTransaction?.year || 0}
                                                    onChange={(e) => handleInputChange('year', e.target.value)}
                                                    placeholder="Year"
                                                    min={1000}
                                                    max={9999}
                                                />
                                            </div>
                                            <input className="bg-app-base p-2 text-center rounded"
                                                type="number"
                                                value={editTransaction?.transactionBalance || 0}
                                                onChange={(e) => handleInputChange('transactionBalance', e.target.value)}
                                                placeholder="Balance"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center">
                                        {/* Show values when not editing */}
                                        <p className="font-bold">{transaction.transactionName}</p>
                                        <i className="text-light-text">{transaction.month}-{transaction.day}-{transaction.year}</i>
                                    </div>
                                )}
                            </div>
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
                        <div className="EditButtonContainer">
                            {/* Show edit button only when not editing */}
                            {editIndex !== index && (
                                <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(index)} className="cursor-pointer" />
                            )}
                            {editIndex === index && (
                                <div className="buttonsContainer flex flex-col gap-6 ml-3">
                                    <FontAwesomeIcon icon={faTrash} className="cursor-pointer text-lg" onClick={() => handleDelete(index)} />
                                    <FontAwesomeIcon icon={faFileArrowDown} className="cursor-pointer text-lg" onClick={handleSave} />
                                    <FontAwesomeIcon icon={faRectangleXmark} className="cursor-pointer text-lg" onClick={handleCancel} />
                                </div>
                            )}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}
