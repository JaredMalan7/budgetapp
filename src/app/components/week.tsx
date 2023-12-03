'use client'
import React, { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowTrendUp, faArrowTrendDown, faHouse, faCar, faHouseCrack, faHouseUser, faBasketShopping, faUtensils, faBurger, faFileMedical, faCirclePlay, faTags, faDumbbell, faCreditCard } from "@fortawesome/free-solid-svg-icons"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"
import { TransactionsMenu } from "./trasactionmenu"

export function WeekTransactions({ showNewExpense }: any) {
    useEffect(() => {
        if (showNewExpense) {
            const weekExpenses = document.querySelector('.weekExpenses')
            const newExpenseContainer = document.createElement('div')
            newExpenseContainer.className = 'expenseContainer mt-4 bg-white p-4 rounded-2xl flex justify-between place-items-center'

            if (weekExpenses) {
                const setNewExpenseDiv = document.createElement('div')
                setNewExpenseDiv.contentEditable = 'true'
                setNewExpenseDiv.className = 'p-4'
                setNewExpenseDiv.textContent = 'Type Expense'

                const transactionsMenuContainer = document.createElement('div')

                weekExpenses?.appendChild(newExpenseContainer)
                newExpenseContainer?.appendChild(transactionsMenuContainer)
                newExpenseContainer.appendChild(setNewExpenseDiv)

                createRoot(transactionsMenuContainer).render(<TransactionsMenu />)

                // Event listener for 'focus' event on setNewExpenseDiv
                setNewExpenseDiv.addEventListener('focus', () => {
                    // Clear the previous text content when clicking to edit
                    setNewExpenseDiv.textContent = ''
                })

                // Event listener for 'blur' event on setNewExpenseDiv
                setNewExpenseDiv.addEventListener('blur', () => {
                    // Restore previous text content if the user clicks out without making changes
                    if (setNewExpenseDiv.textContent === '') {
                        setNewExpenseDiv.textContent = 'Type Expense'
                    }
                })

                const expenseBalance = document.createElement('div')
                expenseBalance.className = 'expenseBalance p-4 text-red-700 font-bold'
                expenseBalance.contentEditable = 'true'
                expenseBalance.textContent = '-Balance $'

                // Warning element for non-numeric input
                const warningElement = document.createElement('div')
                warningElement.className = 'text-red-500 mt-2 hidden' // initially hidden
                warningElement.textContent = 'Please enter a valid number.'

                let originalExpenseBalanceContent = expenseBalance.textContent

                // Event listener for 'focus' event on setNewExpenseDiv
                expenseBalance.addEventListener('focus', () => {
                    // Clear the previous text content when clicking to edit
                    expenseBalance.textContent = ''
                })

                // Event listener for 'blur' event on expenseBalance
                expenseBalance.addEventListener('blur', () => {
                    // Restore previous text content if the user clicks out without making changes
                    if (expenseBalance.textContent === '') {
                        expenseBalance.textContent = originalExpenseBalanceContent
                    }
                })

                // Event listener for 'input' event
                expenseBalance.addEventListener('input', (event) => {
                    const inputValue = (event.currentTarget as HTMLElement).textContent!
                    // Validate input to allow only numbers with up to 2 decimals
                    const regex = /^\d+(\.\d{0,2})?$/
                    if (!regex.test(inputValue)) {
                        // If input is not valid, prevent the change
                        warningElement.classList.remove('hidden')
                        event.preventDefault()
                    } else {
                        warningElement.classList.add('hidden')
                    }
                })


                newExpenseContainer.appendChild(expenseBalance)
                // Add event listener for 'Enter' key press
                setNewExpenseDiv.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault()
                    }
                })
            }
        }
    }, [showNewExpense])

    return (
        <div className="weekExpenses ">
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
