'use client'
import React, { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowTrendUp, faArrowTrendDown, faHouse, faCar, faHouseCrack, faHouseUser, faBasketShopping, faUtensils, faBurger, faFileMedical, faCirclePlay, faTags, faDumbbell, faCreditCard, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { useTransactions } from "./TransactionsContext"


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
    const { transactions, setTransactions } = useTransactions();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('./user.json');
                const userData = await response.json();

                const transactionsData = userData.transactions || [];

                // Filter transactions for the current week
                const currentDate = new Date();
                const currentWeekTransactions = transactionsData.filter((transaction: { year: number; month: number; day: number | undefined }) => {
                    const transactionDate = new Date(transaction.year, transaction.month - 1, transaction.day);
                    return (
                        transactionDate.getFullYear() === currentDate.getFullYear() &&
                        transactionDate.getMonth() === currentDate.getMonth() &&
                        transactionDate.getDate() >= currentDate.getDate() - currentDate.getDay() &&
                        transactionDate.getDate() <= currentDate.getDate() + (6 - currentDate.getDay())
                    );
                });

                setTransactions(currentWeekTransactions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [setTransactions]);

    return (
        <div className="weekExpenses mt-6 mb-20">
            {transactions.map((transaction) => (
                <div className="flex justify-between place-items-center mb-6 bg-white p-4 rounded-2xl" key={transaction.transactionId}>
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
