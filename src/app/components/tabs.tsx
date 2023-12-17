'use client'
import React, { Component, Context, useEffect, useState } from "react"
import { Tabs, Tab, Card, CardBody, NextUIProvider } from "@nextui-org/react";
import { WeekTransactions, MonthTransactions, YearTransactions } from ".";
import { Router, useRouter } from "next/router";
import { useTransactions } from "./TransactionsContext";



export function PageTabs() {
    const { transactions, setTransactions } = useTransactions();

    useEffect(() => {
        try {
            // Retrieve transactions from local storage
            const storedTransactions = localStorage.getItem("transactions");
            const transactionsData = storedTransactions ? JSON.parse(storedTransactions) : [];

            // Set the transactions without reversing the order
            setTransactions(transactionsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [setTransactions]); // Add setTransactions to dependency array to eliminate warnings

    return (
        <div className="flex w-full flex-col mb-6 mt-6 justify-center">
            <Tabs fullWidth radius="full">
                <Tab key="Week" title="Week">
                    <WeekTransactions></WeekTransactions>
                </Tab>
                <Tab key="Month" title="Month" >
                    <MonthTransactions></MonthTransactions>
                </Tab>
                <Tab key="Year" title="Year" >
                    <YearTransactions></YearTransactions>
                </Tab>
            </Tabs>
        </div>
    );
}
