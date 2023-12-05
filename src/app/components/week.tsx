'use client'
import React, { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowTrendUp, faArrowTrendDown } from "@fortawesome/free-solid-svg-icons"
import { useTransactions } from "./TransactionsContext"




export function WeekTransactions() {
    const { transactions, setTransactions } = useTransactions()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('./user.json')
                const userData = await response.json()

                const transactionsData = userData.transactions || []

                if (Array.isArray(transactionsData)) {
                    setTransactions(transactionsData)
                } else {
                    console.error('Transactions data is not in the expected array format: ', transactionsData)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
        console.log(transactions)
    }, [setTransactions])
    return (
        <div className="weekExpenses mt-6 mb-20">
            {transactions.map((transaction) => (
                <div className="flex justify-between place-items-center mb-6 bg-white p-4 rounded-2xl" key={transaction.transactionId}>
                    <div>{transaction.transactionType}</div>
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
    )
}