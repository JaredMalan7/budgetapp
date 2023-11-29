'use client'
import React from "react"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowTrendUp, faArrowTrendDown } from "@fortawesome/free-solid-svg-icons"




export function WeekTransactions({ showNewExpense, onCreateNewExpense }) {
    useEffect(() => {
        if (showNewExpense) {
            console.log('Creating a new expense div')
            onCreateNewExpense()
        }
    }, [showNewExpense, onCreateNewExpense])


    return (
        <div className="weekExpenses">
            <div className="flex justify-around">
                {/* ============== Budget ================= */}
                <div className="bg-white p-4 flex place-items-center rounded-2xl gap-3">
                    <div className="bg-mint py-2 px-3 rounded-full">
                        <FontAwesomeIcon icon={faArrowTrendUp} className="text-pistachio " />
                    </div>
                    <div className="">
                        <div className="text-pistachio font-bold">
                            +24%
                        </div>
                        <div>
                            Budget
                        </div>
                    </div>
                </div>
                {/* ============ Balance ============== */}
                <div className="bg-white p-4 flex place-items-center rounded-2xl gap-3">
                    <div className="bg-pale py-2 px-3 rounded-full">
                        <FontAwesomeIcon icon={faArrowTrendDown} className="text-mandarin " />
                    </div>
                    <div className="">
                        <div className="text-mandarin font-bold">
                            -76%
                        </div>
                        <div>
                            Balance
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}