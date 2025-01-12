pragma solidity >=0.8.2 <0.9.0;

contract SimpleContractBlock{
    // block
    block.number;
    block.difficulty;
    block.coinbase ();

    /* your comment 
    */

    // message
    msg.sender;
    msg.data;
    msg.value;

    // transaction
    tx.origin;
    tx.gas;
}