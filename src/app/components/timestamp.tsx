'use client'
import React from "react"
export const generateTimestamp = () => {
    const currentDate = new Date()

    const year = currentDate.getFullYear()
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const day = currentDate.getDate().toString().padStart(2, '0')
    const hours = currentDate.getHours().toString().padStart(2, '0')
    const minutes = currentDate.getMinutes().toString().padStart(2, '0')


    // Create a string representation of the timestamp
    const timestamp = `${year}-${month}-${day} ${hours}:${minutes}`

    return timestamp
}

