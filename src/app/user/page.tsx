'use client'
import React, { useState, useEffect } from "react";
import { faCircleArrowLeft, faUserPen, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const User = () => {
    // Function to get the initial user state // This code still needs work as errors are still encountered when refreshing the user page from the user page
    // this is due to the initial user state being userName, once the name of the user is edited, the userName is no longer the initial state,
    //however, that still is the initial state of the context, so changes may need to be made, unfortunately because I was limited by only doing front-end,
    // I do not have the knowledge to do that yet, but I am hoping that by the end of the back-end slides I know how to do this part. 
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
        if (typeof window !== 'undefined') {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    const [userInput, setUserInput] = useState({
        userName: user.name,
        userLastName: user.lastName,
        budget: user.budget.toString(),
    });

    const [editMode, setEditMode] = useState(false);

    // Save user data to local storage when user changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);


    const handleEditClick = () => {
        setUserInput({
            userName: user.name,
            userLastName: user.lastName,
            budget: user.budget.toString(),
        });
        setEditMode(true);
    };

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


    const handleGoBackClick = () => {
        window.history.back();
    };

    return (
        <div className="bg-white p-5 rounded-xl w-card-w">
            <h1 className="font-bold text-center p-4">User Interface</h1>
            <div className="flex items-center mb-4 w-full justify-around">
                <label className="font-bold mr-4">Name:</label>
                <div>
                    {editMode ? (
                        <input className="bg-app-base px-2 rounded"
                            placeholder="Enter name"
                            value={userInput.userName}
                            onChange={(e) => setUserInput({ ...userInput, userName: e.target.value })}
                        />
                    ) : (
                        user.name
                    )}
                </div>
            </div>
            <div className="flex items-center mb-4 w-full justify-around">
                <label className="font-bold mr-4">Last Name:</label>
                <div>
                    {editMode ? (
                        <input className="bg-app-base px-2 rounded"
                            placeholder="Enter last name"
                            value={userInput.userLastName}
                            onChange={(e) => setUserInput({ ...userInput, userLastName: e.target.value })}
                        />
                    ) : (
                        user.lastName
                    )}
                </div>
            </div>
            <div className="flex items-center mb-4 w-full justify-around">
                <label className="font-bold mr-4">Budget:</label>
                <div>
                    {editMode ? (
                        <input className="bg-app-base px-2 rounded"
                            placeholder="Enter budget"
                            value={userInput.budget}
                            onChange={(e) => setUserInput({ ...userInput, budget: e.target.value })}
                        />
                    ) : (
                        `$${user.budget}`
                    )}
                </div>
            </div>
            <div className="flex items-center mb-4 justify-around">
                <button onClick={handleGoBackClick} className="mr-2 text-2xl">
                    <FontAwesomeIcon icon={faCircleArrowLeft} />
                </button>
                <button className="text-2xl" onClick={editMode ? handleSaveClick : handleEditClick}>
                    {editMode ? <FontAwesomeIcon icon={faDownload} /> : <FontAwesomeIcon className="text-2xl" icon={faUserPen} />}
                </button>
            </div>
        </div>
    );
};

export default User;
