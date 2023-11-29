'use client'
import React, { useState } from "react"
import { faCcVisa, faCcAmex, faCcDiscover, faCcMastercard } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Greet, CreditCard, PageTabs, WeekTransactions, Footer } from "./components"
import { Button } from "@nextui-org/react"



export default function Home() {
    const [showNewExpense, setNewExpense] = useState(false)

    const handleIconClick = () => {
        setNewExpense((prevShowNewExpense) => {
            console.log("Previous State:", prevShowNewExpense)
            const newState = !prevShowNewExpense
            console.log("New State:", newState)
            return newState;
        })
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
                <WeekTransactions showNewExpense={showNewExpense}></WeekTransactions>
            </div>
            <div className="">
                <Footer onIconClick={handleIconClick}></Footer>
            </div>
        </div>


    )
}