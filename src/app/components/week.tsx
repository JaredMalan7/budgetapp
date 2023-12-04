'use client'
import React from "react"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowTrendUp, faArrowTrendDown } from "@fortawesome/free-solid-svg-icons"




export function WeekTransactions({ showNewExpense, onCreateNewExpense }: any) {
    useEffect(() => {
        if (showNewExpense) {
            console.log('Creating a new expense div')
            onCreateNewExpense()
        }
    }, [showNewExpense, onCreateNewExpense])


    return (
        <div>

        </div>
    )
}