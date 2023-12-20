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
    progressWidth: string;
}

// Define the Action type
type Action =
    | { type: "SET_BALANCE"; payload: string }
    | { type: "SET_CARD_NUMBER"; payload: string }
    | { type: "SET_CARD_TYPE"; payload: string }
    | { type: "SET_PROGRESS_COLOR"; payload: string }
    | { type: "SET_BUDGET"; payload: number }
    | { type: "SET_TRANSACTIONS"; payload: ITransaction[] }
    | { type: "SET_PROGRESS_WIDTH"; payload: string };

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
        case "SET_PROGRESS_WIDTH":
            return { ...state, progressWidth: action.payload };
        default:
            return state;
    }
};

export function CreditCard() {
    const { user } = useTransactions();
    const [
        { balance, cardNumber, cardType, progressColor, budget, transactions, progressWidth },
        dispatch,
    ] = useReducer(reducer, {
        balance: "$0",
        cardNumber: "****",
        cardType: "",
        progressColor: "#0073ff",
        budget: 0,
        transactions: [],
        progressWidth: "0%", // Added this line
    });

    useEffect(() => {
        if (user) {
            const { card, transactions, budget } = user;

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

            const percentage = (totalBalance / budget) * 100;

            dispatch({ type: "SET_BALANCE", payload: `$${totalBalance.toFixed(2)}` });
            dispatch({ type: "SET_PROGRESS_WIDTH", payload: `${percentage.toFixed(2)}%` });
        }
    }, [user]);

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
                return null;
        }
    };

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
                    style={{ backgroundColor: '#ee341b', width: progressWidth }}
                    className="p-1 rounded-lg"
                ></div>
            </div>
            <div className="flex justify-between place-items-center text-white">
                {/* <div className="flex gap-8">
                    <div>****</div>
                    <div>****</div>
                    <div id="cardNumber">{cardNumber}</div>
                </div> */}
                <div className="flex gap-8">
                    <div>****</div>
                    <div>****</div>
                    <div id="cardNumber">435</div>
                </div>
                {/* <div id="cardType">
                    {getCardIcon() && (
                        <FontAwesomeIcon icon={getCardIcon() as IconDefinition} className="h-[40px]" />
                    )}
                </div> */}
                <div id="cardType">
                    <FontAwesomeIcon icon={faCcDiscover} className="h-[40px]" />
                </div>
            </div>
        </div>
    );
}
