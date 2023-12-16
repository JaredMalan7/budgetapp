'use client'
import React, { Component, Context, useEffect, useState } from "react"
import { Tabs, Tab, Card, CardBody, NextUIProvider } from "@nextui-org/react";
import { WeekTransactions, MonthTransactions, YearTransactions } from ".";
import { Router, useRouter } from "next/router";
import { useTransactions } from "./TransactionsContext";



export function PageTabs() {
    const { setTransactions } = useTransactions();

    const fetchData = async () => {
        try {
            const response = await fetch('https://65761d560febac18d403b1ad.mockapi.io/api/v1/transactions');
            const transactionsData = await response.json() || [];


            // Set the transactions without reversing the order
            setTransactions(transactionsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex w-full flex-col mb-6">
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
