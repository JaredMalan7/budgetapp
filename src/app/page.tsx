'use client'
import React, { useState } from "react"
import { faCcVisa, faCcAmex, faCcDiscover, faCcMastercard } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Greet, CreditCard, PageTabs, WeekTransactions, Footer } from "./components"
import { Button } from "@nextui-org/react"



export default function Home() {
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
                <WeekTransactions showNewExpense={showNewExpense} onCreateNewExpense={handleCreateNewExpense}></WeekTransactions>
                <div id="transactionsContainer" className="flex flex-col justify-center text-center mt-6 ">
                    Transactions go here
                </div>
            </div>
            <div className="">
                <Footer onIconClick={handleIconClick}></Footer>
            </div>
        </div>


    )
}