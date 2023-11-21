import React from "react"
import { faCcVisa, faCcAmex, faCcDiscover, faCcMastercard } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from '@nextui-org/button'


export function CreditCard() {



    return (
        <div className="bg-meteorite p-4 rounded-xl w-card-w h-card-h flex flex-col justify-between">
            <div>
                <div id="Balance" className="text-title1 text-white">$1,000</div>
                <div className="text-midDark-text">Balance</div>
            </div>

            <div className="bg-midDark rounded-lg">
                <div id="Progress" className="p-1 bg-progress w-1/4 rounded-lg"></div>
            </div>
            <div className="flex justify-between place-items-center text-white">
                <div className="flex gap-8">
                    <div>****</div>
                    <div>****</div>
                    <div id="cardNumber">402</div>

                </div>
                <div id="cardType">
                    <FontAwesomeIcon icon={faCcMastercard} className="h-[40px]" />
                </div>
            </div>
        </div>
    )
}