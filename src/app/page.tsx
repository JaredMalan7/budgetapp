'use client'
import React, { useState } from "react"
import { faCcVisa, faCcAmex, faCcDiscover, faCcMastercard } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Greet, CreditCard, PageTabs, WeekTransactions, Footer, BudgetOverview, MonthTransactions, YearTransactions } from "./components"
import { Button } from "@nextui-org/react"
import { createContext } from "vm"
import { TransactionsContext } from "./components/TransactionsContext"



export default function Home() {

    const [transactions, setTransactions] = useState([{
        "transactionId": 1,
        "transactionType": "Transportation",
        "transactionName": "Gas",
        "transactionBalance": -90.00,
        "month": 12,
        "day": 4,
        "year": 2023
    }])
    const [showNewExpense, setNewExpense] = useState(false)

    const handleIconClick = () => {
        setNewExpense(!showNewExpense)

        if (!showNewExpense) {
            const weekExpenses = document.querySelector('.weekExpenses')
            console.log('weekExpenses: ', weekExpenses)
            const setNewExpenseDiv = document.createElement('div')
            setNewExpenseDiv.textContent = 'New Expense'
            weekExpenses?.appendChild(setNewExpenseDiv)
        }
    }

    const handleCreateNewExpense = () => {
        setNewExpense(false)
    }

    return (
        <TransactionsContext.Provider value={{
            transactions, setTransactions
        }}>
            <div className="flex flex-col min-h-screen">
                {/* <FontAwesomeIcon icon={faCcVisa} className="w-[30px]" />
            <div>
                <Button>Click me</Button>
            </div> */}
                <div className="mb-4 mt-6">
                    <Greet></Greet>
                </div>
                <div className="mb-6">
                    <CreditCard></CreditCard>
                </div>
                <div className="">
                    <PageTabs></PageTabs>
                </div>

                <div>
                    <BudgetOverview />
                </div>


                <div>
                    {/* <WeekTransactions></WeekTransactions> */}
                    {/* <MonthTransactions></MonthTransactions> */}
                    <YearTransactions></YearTransactions>
                </div>
                <div className="">
                    <Footer></Footer>
                </div>
            </div>

        </TransactionsContext.Provider>
    )
}