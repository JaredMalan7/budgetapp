'use client'
import React, { useState } from "react"
import { faCcVisa, faCcAmex, faCcDiscover, faCcMastercard } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Greet, CreditCard, PageTabs, WeekTransactions, Footer, TransactionsMenu } from "./components"
import { Button } from "@nextui-org/react"



export default function Home() {
    const [showNewExpense, setNewExpense] = useState(false)

    const handleIconClick = () => {
        setNewExpense(!showNewExpense)
    }
    const currentDate = new Date()
    // Get individual components of the local date
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1 // Month is zero-based, so add 1
    const day = currentDate.getDate()

    const localDate = `${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}-${year}`

    console.log('Local Date: ', localDate)

    return (
        <div className="flex flex-col min-h-screen mb-20">
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