'use client'
import Link from "next/link"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { useEffect, useState } from "react"


export function Greet() {
    const [greeting, setGreeting] = useState('Hello')
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch('/user.json')
                const userData = await response.json()
                const { name } = userData

                setUserName(name)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const currentHour = new Date().getHours()

        if (currentHour >= 5 && currentHour < 12) {
            setGreeting(`Good Morning, ${userName}`)
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting(`Good Afternoon, ${userName}`)
        } else if (currentHour >= 18 && currentHour < 20) {
            setGreeting(`Good Evening, ${userName}`)
        } else {
            setGreeting(`Hello, ${userName}`)
        }
    }, [userName])


    return (
        <div className="flex justify-between place-items-center">
            <span className="font-bold">{greeting}</span>
            <Link href="/user">
                <FontAwesomeIcon icon={faUser} className="text-white bg-meteorite p-2 rounded-full cursor-pointer mr-6" />

            </Link>
        </div>
    )
}

