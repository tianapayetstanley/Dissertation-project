pragma solidity >=0.8.2 <0.9.0;

contract SimpleContractVal{
    // ether gwei wei
    // 1e18 has 18 zeros 
    bool isEqual = (1 ether == 1e18 wei);

    // seconds, minutes, hours, days (cant use to name variables as they are reserved, varibles always plural )
    // time units

    bool isTime = (1 hours == 60 minutes);
    bool isTime = (1 days == 24 hours);
}
