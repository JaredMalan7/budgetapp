'use client'
import Link from "next/link";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTransactions } from "./TransactionsContext";

export function Greet() {
    const { user } = useTransactions();
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            setGreeting(`Good Morning, ${user.name}`);
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting(`Good Afternoon, ${user.name}`);
        } else if (currentHour >= 18 && currentHour < 20) {
            setGreeting(`Good Evening, ${user.name}`);
        } else {
            setGreeting(`Hello, ${user.name}`);
        }
    }, [user]);

    return (
        <div className="flex justify-between place-items-center">
            <span className="font-bold">{greeting}</span>
            <Link href="/user">
                <FontAwesomeIcon
                    icon={faUser}
                    className="text-white bg-meteorite p-2 rounded-full cursor-pointer mr-6"
                />
            </Link>
        </div>
    );
}