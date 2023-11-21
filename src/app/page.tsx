import React from "react"
import { faCcVisa, faCcAmex, faCcDiscover, faCcMastercard } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Greet, CreditCard, PageTabs, WeekTransactions } from "./components"
import { Button } from "@nextui-org/react"

export default function Home() {

    return (
        <div className="">
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
                <WeekTransactions></WeekTransactions>
            </div>

        </div>


    )
}