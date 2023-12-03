'use client'

import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faCar, faHouseCrack, faHouseUser, faBasketShopping, faUtensils, faBurger, faFileMedical, faCirclePlay, faTags, faDumbbell, faCreditCard, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"


export function TransactionsMenu() {
    const icons: { [key: string]: IconDefinition } = {
        Transportation: faCar,
        Utilities: faHouseCrack,
        Rent: faHouse,
        Mortgage: faHouseUser,
        Groceries: faBasketShopping,
        Takeout: faBurger,
        "Dining Out": faUtensils,
        Healthcare: faFileMedical,
        Entertainment: faCirclePlay,
        Retail: faTags,
        Sports: faDumbbell,
        Other: faCreditCard,
    }

    const items = Object.keys(icons).map((key) => ({
        key,
        label: key,
        icon: icons[key],
    }))

    const [selectedItem, setSelectedItem] = useState(items[0])

    const handleItemSelect = (item: any) => {
        setSelectedItem(item)
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="flat" style={{ padding: 0, textAlign: 'center' }}>
                    <FontAwesomeIcon icon={selectedItem.icon} style={{ marginRight: '8px' }} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={items}>
                {(item) => (
                    <DropdownItem
                        key={item.key}
                        color={item.key === "delete" ? "danger" : "default"}
                        className={item.key === "delete" ? "text-danger" : ""}
                        textValue={item.label}  // textValue prop to solve warnings
                        onClick={() => handleItemSelect(item)} // Handle item selection
                    >
                        <FontAwesomeIcon icon={item.icon} style={{ marginRight: '8px' }} />

                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    )

}
