// import solidity 
pragma solidity >=0.8.2 <0.9.0;

//import from another file
// import "filename";
// import * as symbolname from "filename2";
// import {symb1 as alies, symbol2} from "filename3";


// first contract
contract SimpleContract{
    //state variable
    uint storeData;

    //modifier is a conditional
    modifier onlyData(){
        require (
            storeData >= 0);
            _;
    }
    // function
    function set(uint x) public {
        storeData = x;
    }

    // event
    event Sent(address from, address to, uint storeData);
}