'use client'

import React, { useEffect, useReducer } from "react";
import {
    faCcVisa,
    faCcAmex,
    faCcDiscover,
    faCcMastercard,
    IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTransactions } from "./TransactionsContext";

// Define the ITransaction type
interface ITransaction {
    transactionId: number;
    transactionType: string;
    transactionName: string;
    day: number;
    month: number;
    year: number;
    transactionBalance: number;

}

// Define the IUser type
interface IUser {
    user_id: number;
    username: string;
    budget: number;
    card: {
        "card#": string;
        type: string;
        progressBarColor: string;
    };
    transactions: ITransaction[];
}

// Define the State type
interface State {
    balance: string;
    cardNumber: string;
    cardType: string;
    progressColor: string;
    budget: number;
    transactions: ITransaction[];
}

// Define the Action type
type Action =
    | { type: "SET_BALANCE"; payload: string }
    | { type: "SET_CARD_NUMBER"; payload: string }
    | { type: "SET_CARD_TYPE"; payload: string }
    | { type: "SET_PROGRESS_COLOR"; payload: string }
    | { type: "SET_BUDGET"; payload: number }
    | { type: "SET_TRANSACTIONS"; payload: ITransaction[] };

// Define the reducer function
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_BALANCE":
            return { ...state, balance: action.payload };
        case "SET_CARD_NUMBER":
            return { ...state, cardNumber: action.payload };
        case "SET_CARD_TYPE":
            return { ...state, cardType: action.payload };
        case "SET_PROGRESS_COLOR":
            return { ...state, progressColor: action.payload };
        case "SET_BUDGET":
            return { ...state, budget: action.payload };
        case "SET_TRANSACTIONS":
            return { ...state, transactions: action.payload };
        default:
            return state;
    }
};

export function CreditCard() {
    const { user } = useTransactions();
    const [
        { balance, cardNumber, cardType, progressColor, budget, transactions },
        dispatch
    ] = useReducer(reducer, {
        balance: "$0",
        cardNumber: "****",
        cardType: "",
        progressColor: "#0073ff",
        budget: 0,
        transactions: [],
    });

    // Function to dynamically get the icon based on card type
    const getCardIcon = (): IconDefinition | null => {
        switch (cardType) {
            case "faCcVisa":
                return faCcVisa;
            case "faCcAmex":
                return faCcAmex;
            case "faCcDiscover":
                return faCcDiscover;
            case "faCcMastercard":
                return faCcMastercard;
            default:
                return null; // Return a default icon or handle as needed
        }
    };

    useEffect(() => {
        if (user) {
            const { card, transactions, budget } = user;

            console.log('User Budget:', budget);  // Added console log

            // Check if 'card' property exists before accessing its properties
            const cardNumber = card && card["card#"] ? card["card#"] : "****";
            const cardType = card && card.type ? card.type : "";
            const progressColor = card && card.progressBarColor ? card.progressBarColor : "";

            dispatch({ type: "SET_CARD_NUMBER", payload: cardNumber });
            dispatch({ type: "SET_CARD_TYPE", payload: cardType });
            dispatch({ type: "SET_PROGRESS_COLOR", payload: progressColor });
            dispatch({ type: "SET_BUDGET", payload: budget });
            dispatch({ type: "SET_TRANSACTIONS", payload: transactions });

            const totalBalance = transactions.reduce(
                (total, transaction) => total + transaction.transactionBalance,
                0
            );

            // Calculate the percentage of the balance against the budget
            const percentage = (totalBalance / budget) * 100;

            // Update the progress bar width dynamically
            dispatch({ type: "SET_BALANCE", payload: `$${totalBalance.toFixed(2)}` });
        }
    }, [user]);

    return (
        <div className="bg-meteorite p-4 rounded-xl w-card-w h-card-h flex flex-col justify-between">
            <div>
                <div id="Balance" className="text-title1 text-white">
                    {balance}
                </div>
                <div className="text-midDark-text">Balance</div>
            </div>

            <div className="budgetBar bg-midDark rounded-lg">
                <div
                    id="Progress"
                    style={{ backgroundColor: progressColor, width: balance }}
                    className="p-1 rounded-lg"
                ></div>
            </div>
            <div className="flex justify-between place-items-center text-white">
                <div className="flex gap-8">
                    <div>****</div>
                    <div>****</div>
                    <div id="cardNumber">{cardNumber}</div>
                </div>
                <div id="cardType">
                    {getCardIcon() && (
                        <FontAwesomeIcon icon={getCardIcon() as IconDefinition} className="h-[40px]" />
                    )}
                </div>
            </div>
        </div>
    );
}