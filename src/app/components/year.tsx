'use client'
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faHouse, faCar, faHouseCrack, faHouseUser, faBasketShopping, faUtensils, faBurger, faFileMedical, faCirclePlay, faTags, faDumbbell, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { useTransactions } from "./TransactionsContext";

// Define the transaction type icons
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

export function YearTransactions() {
    const { user } = useTransactions();
    const { transactions } = user;


    // Sort all transactions by date in descending order
    const sortedTransactions = transactions.sort((a: { year: number; month: number; day: number | undefined; }, b: { year: number; month: number; day: number | undefined; }) => {
        const dateA: Date = new Date(a.year, a.month - 1, a.day);
        const dateB: Date = new Date(b.year, b.month - 1, b.day);
        return dateB.getTime() - dateA.getTime();
    });

    if (!sortedTransactions.length) return <div className="text-center">No transactions found</div>;
    return (
        <div className="yearExpenses mt-6 mb-20">
            {sortedTransactions.map((transaction, index) => (
                <div className="flex justify-between place-items-center mb-6 bg-white p-4 rounded-2xl" key={index}>
                    <div className="px-4">
                        <FontAwesomeIcon icon={transactionTypeIcons[transaction.transactionType]} />
                    </div>
                    <div className="text-center">
                        <p className="font-bold">{transaction.transactionName}</p>
                        <i className="text-light-text">{transaction.month}-{transaction.day}-{transaction.year}</i>
                    </div>
                    <div className="font-bold">
                        {transaction.transactionBalance < 0 && "-"}
                        ${Math.abs(transaction.transactionBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                </div>
            ))}
        </div>
    );
}