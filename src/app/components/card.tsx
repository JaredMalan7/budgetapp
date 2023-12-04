'use client'
import React from "react"
import { useEffect, useState } from "react"
import { faCcVisa, faCcAmex, faCcDiscover, faCcMastercard, IconDefinition } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from '@nextui-org/button'


export function CreditCard() {
    const [balance, setBalance] = useState('$0')
    const [cardNumber, setCardNumber] = useState('****')
    const [cardType, setCardType] = useState("")
    const [progressColor, setProgressColor] = useState("")
    const [budget, setBudget] = useState(0)
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/user.json')
                const userData = await response.json()
                const { card, budget, transactions } = userData


                setCardNumber(card["card#"])
                setCardType(card.type)
                setProgressColor(card.progressBarColor)
                setBudget(budget)
                setTransactions(transactions)

                setBalance(`$${budget.toFixed(2)}`)
            } catch (error) {
                console.error('Error fetching Data: ', error)
            }
        }
        fetchData()
    }, [])


    // Function to dynamically get the icon based on card type
    const getCardIcon = () => {
        switch (cardType) {
            case "faCcVisa":
                return faCcVisa
            case "faCcAmex":
                return faCcAmex
            case "faCcDiscover":
                return faCcDiscover
            case "faCcMastercard":
                return faCcMastercard
            default:
                return null // Return a default icon or handle as needed
        }
    }



    return (
        <div className="bg-meteorite p-4 rounded-xl w-card-w h-card-h flex flex-col justify-between">
            <div>
                <div id="Balance" className="text-title1 text-white">{balance}</div>
                <div className="text-midDark-text">Balance</div>
            </div>

            <div className="bg-midDark rounded-lg">
                <div id="Progress" style={{ backgroundColor: progressColor }} className="p-1 w-1/4 rounded-lg"></div>
            </div>
            <div className="flex justify-between place-items-center text-white">
                <div className="flex gap-8">
                    <div>****</div>
                    <div>****</div>
                    <div id="cardNumber">{cardNumber}</div>

                </div>
                <div id="cardType">
                    {getCardIcon() && <FontAwesomeIcon icon={getCardIcon() as IconDefinition} className="h-[40px]" />}
                </div>

            </div>
        </div>
    )
}