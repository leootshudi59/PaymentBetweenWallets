// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

contract Transactions {
    uint private _transactionCount;

    struct Transaction {
        address _from;
        address _beneficiary;
        uint _amount;
        string _message;
        uint _timestamp;
    }

    // Array and not a mapping with indexes because we will want to get all the transactions
    Transaction[] private _transactionList;

    event Transfer(address from, address beneficiary, uint amount, string message, uint timestamp);

    address public sender;
    address public _receiver;

    function transferMoney(
        address payable receiver,
        uint amount,
        string memory message
    ) public {
        require(amount <= address(msg.sender).balance, "Insufficient funds");
        _transactionList.push(Transaction(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp
        ));

        _transactionCount += 1;

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp);
    }

    function getAllTransactions() public view returns(Transaction[] memory) {
        return _transactionList;
    }

    function getTransactionCount() public view returns(uint) {
        return _transactionCount;
    }
}