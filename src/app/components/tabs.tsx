'use client'
import React, { Context, useEffect, useState } from "react"
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";


export function PageTabs() {

    return (
        <div className="flex w-full flex-col mb-6">
            <Tabs fullWidth radius="full">
                <Tab key="Week" title="Week">

                </Tab>
                <Tab key="Month" title="Month">

                </Tab>
                <Tab key="Year" title="Year">

                </Tab>
            </Tabs>
        </div>
    );
}
