import {createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {contractAddress, transactionContractAbi} from '../utils/constants';

export const TransactionContext = createContext();

const { ethereum } = window;

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [addressTo, setAddressTo] = useState('');
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(
        localStorage.getItem('transactionCount')
    );


    useEffect(() => {
        checkIsWalletConnected();
        checkIfTransactionExists();
    }, [transactionCount])

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

    function importDappContract() {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const dappContract = new ethers.Contract(contractAddress, transactionContractAbi, signer);
        return dappContract;
    }

    const checkIfTransactionExists = async () => {
        try {
            if (ethereum) {
                const dappContract = importDappContract();
                console.log(dappContract);
                const currentTransactionCount = await dappContract.getTransactionCount();
                window.localStorage.setItem('transactionCount', currentTransactionCount);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const sendTransaction = async () => {
        try {
            if(ethereum) {
                const dappContract = importDappContract();
                console.log(dappContract);
                const parsedAmount = ethers.utils.parseEther(amount);
                await ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [ {
                        from: currentAccount,
                        to: addressTo,
                        gas: '0x5208',
                        value: parsedAmount._hex,
                    } ]
                })
                const transactionHash = await dappContract.addTransactionToBlockchain(addressTo, parsedAmount, message);
                setIsLoading(true);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                const txCount = await dappContract.getTransactionCount();
                setTransactionCount(txCount.toNumber());
                window.location.reload();
            } else {
                console.log("No ethereum object...");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount, 
                sendTransaction,
                message,
                setMessage,
                addressTo, 
                setAddressTo,
                amount,
                setAmount
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}