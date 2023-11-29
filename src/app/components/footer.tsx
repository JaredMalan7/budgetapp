'use client'
import React from "react"
import { useEffect, useState } from "react"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from '@nextui-org/button'


export function Footer({ onIconClick }: any) {

    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center mt-6 mb-6">
            <FontAwesomeIcon icon={faPlus} className="text-white bg-black p-4 rounded-full cursor-pointer" onClick={onIconClick} />
        </div>
    )
}