'use client'
import React, { useEffect, useState } from "react"
import { faCcVisa, faCcAmex, faCcDiscover, faCcMastercard } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Greet, CreditCard, PageTabs, WeekTransactions, Footer, BudgetOverview, MonthTransactions, YearTransactions } from "./components"
import { Button } from "@nextui-org/react"
import { createContext } from "vm"
import { TransactionsContext, useTransactions } from "./components/TransactionsContext"
import { useRouter } from "next/router"



export default function Home() {


    const [transactionsState, setTransactionsState] = useState([{
        //TODO: this can be cleaned up now
        "transactionId": 1,
        "transactionType": "Transportation",
        "transactionName": "Gas",
        "transactionBalance": -90.00,
        "month": 12,
        "day": 4,
        "year": 2023
    }])
    const [showNewExpense, setNewExpense] = useState(false)



    return (
        <TransactionsContext.Provider value={{
            transactions: transactionsState, setTransactions: setTransactionsState
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
                <div>
                    <BudgetOverview />
                </div>
                <div className="">
                    <PageTabs></PageTabs>
                </div>

                <div className="">
                    <Footer></Footer>
                </div>
            </div>

        </TransactionsContext.Provider>
    )
}