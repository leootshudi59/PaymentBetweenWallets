import {createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

export const TransactionContext = createContext();

const { ethereum } = window;

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');

    useEffect(() => {
        checkIsWalletConnected()
    })

    const checkIsWalletConnected = async () => {
        try {
            if (!ethereum) {
                alert("Please install Metamask plugin");
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found");
            }
            
        } catch (e) {
            console.log(e);
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                alert("Please install Metamask plugin");
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                window.location.reload();
            } else {
                console.log("No accounts found");
                throw new Error("no Ethereum object")
            }
            
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount }}>
            {children}
        </TransactionContext.Provider>
    )
}