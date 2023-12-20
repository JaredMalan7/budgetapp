'use client'
import React, { useState, useEffect } from "react";

const User = () => {
    let isBrowser;

    if (typeof window !== 'undefined') {
        isBrowser = true;
    }

    // Function to get the initial user state
    const getInitialUserState = () => {
        // Check if running on the client side
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : {
                name: "userName",
                lastName: "userLastName",
                budget: 0,
                transactions: [],
            };
        } else {
            // Return default values for server-side rendering
            return {
                name: "userName",
                lastName: "userLastName",
                budget: 0,
                transactions: [],
            };
        }
    };


    // Initial state from local storage or default values
    const [user, setUser] = useState(getInitialUserState);

    useEffect(() => {
        // Check if running on the client side
        if (isBrowser && typeof window !== 'undefined') {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user, isBrowser]);


    const [userInput, setUserInput] = useState({
        userName: user.name,
        userLastName: user.lastName,
        budget: user.budget.toString(),
    });

    const [editMode, setEditMode] = useState(false);

    // Save user data to local storage when user changes
    useEffect(() => {
        const storedUser = isBrowser ? localStorage.getItem("user") : null;
        if (isBrowser) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    // Handle edit button click
    const handleEditClick = () => {
        setUserInput({
            userName: user.name,
            userLastName: user.lastName,
            budget: user.budget.toString(),
        });
        setEditMode(true);
    };

    // Handle save button click
    const handleSaveClick = () => {
        if (Object.values(userInput).every((value) => value !== "")) {
            setUser({
                name: userInput.userName,
                lastName: userInput.userLastName,
                budget: parseFloat(userInput.budget),
                transactions: user.transactions,
            });
            setEditMode(false);
        } else {
            setUserInput({
                userName: user.name,
                userLastName: user.lastName,
                budget: user.budget.toString(),
            });
            alert("Please fill in all fields before saving.");
        }
    };

    return (
        <div>
            <h1 className="font-bold text-center p-4">User Interface</h1>
            <div className="flex items-center mb-4">
                <label className="font-bold mr-4">Name:</label>
                <div>
                    {editMode ? (
                        <input
                            placeholder="Enter name"
                            value={userInput.userName}
                            onChange={(e) => setUserInput({ ...userInput, userName: e.target.value })}
                        />
                    ) : (
                        user.name
                    )}
                </div>
            </div>
            <div className="flex items-center mb-4">
                <label className="font-bold mr-4">Last Name:</label>
                <div>
                    {editMode ? (
                        <input
                            placeholder="Enter last name"
                            value={userInput.userLastName}
                            onChange={(e) => setUserInput({ ...userInput, userLastName: e.target.value })}
                        />
                    ) : (
                        user.lastName
                    )}
                </div>
            </div>
            <div className="flex items-center mb-4">
                <label className="font-bold mr-4">Budget:</label>
                <div>
                    {editMode ? (
                        <input
                            placeholder="Enter budget"
                            value={userInput.budget}
                            onChange={(e) => setUserInput({ ...userInput, budget: e.target.value })}
                        />
                    ) : (
                        `$${user.budget}`
                    )}
                </div>
            </div>
            <button onClick={editMode ? handleSaveClick : handleEditClick}>
                {editMode ? "Save" : "Edit"}
            </button>
        </div>
    );
};

export default User;
