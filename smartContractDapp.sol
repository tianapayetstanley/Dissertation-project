// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract InheritanceContract {
    address payable public recipient;
    address public owner;
    bool public isOwnerDeceased;

    constructor(address payable _recipient) {
        owner = msg.sender;
        recipient = _recipient;
        isOwnerDeceased = false;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can access this functio");
        _;
    }

    modifier onlyRecipient() {
        require(msg.sender == recipient, "Only designated reciption can access this function");
        _;
    }

    function declareDeceased() external onlyOwner {
        require(isOwnerDeceased, "Owner has not been declared deceased.");
        require(address(this).balance > 0, "No funds available for withdrawal.");
        recipient.transfer(address(this).balance);
    }

    // Fallback function to receive payments
    receive() external payable {}

}