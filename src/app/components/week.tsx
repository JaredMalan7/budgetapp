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
        <div>
            {transactions.map((transaction) => (
                <div key={transaction.transactionId}>

                    <p>{transaction.transactionName}</p>
                </div>
            ))}
        </div>
    )
}