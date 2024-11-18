pragma solidity >=0.8.2 <0.9.0;

contract SimpleContractTypes{
// string
string name = "tiana";

// integers 
uint storedata = 23;

// boolean
bool aTrueOrFalseValue = false;

//address 
address walletAddress = 0x772ddhwwe;

// arrays
string[] names;

//Struct to define, similar to an object
struct User {
    string firstName;
    string lastName;
    uint age;
}
// enums
enum userType {buyer, seller}

// mappings
mapping(address => uint) public balances;

}
