'use client'


// this this is host page/landing page, all components come together here. 
import React from "react";
import { Greet, CreditCard, PageTabs, Footer, BudgetOverview } from "./components";
import { TransactionsProvider } from "./components/TransactionsContext";
import { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <TransactionsProvider>
            <div className="flex flex-col min-h-screen">

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

        </TransactionsProvider>
    )
}

export default Home;