// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract AidBoxTracker {
    address public owner;

    // Define valid statuses for the aid boxes
    string[] public validStatuses = ["Pending", "Delivered", "In Transit", "Cancelled"];

    // Declare struct
    struct AidBox {
        uint256 id;
        string description;
        string status;
    }

    // Declare mapping to store AidBoxes
    mapping(uint256 => AidBox) public aidBoxes;

    uint256 public nextId;

    // Event for status updates
    event AidBoxStatusUpdated(uint256 id, string newStatus);

    constructor() {
        owner = msg.sender; // Set the contract creator as the owner
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function addAidBox(string memory description, string memory status) public onlyOwner {
        require(isValidStatus(status), "Invalid status");

        aidBoxes[nextId] = AidBox(nextId, description, status);
        nextId++;
    }

    function updateAidBoxStatus(uint256 id, string memory status) public onlyOwner {
        require(id < nextId, "AidBox does not exist");
        require(isValidStatus(status), "Invalid status");

        aidBoxes[id].status = status;
        emit AidBoxStatusUpdated(id, status);
    }

    function getAidBox(uint256 id) public view returns (AidBox memory) {
        require(id < nextId, "AidBox does not exist");

        return aidBoxes[id];
    }

    function isValidStatus(string memory status) private view returns (bool) {
        for (uint i = 0; i < validStatuses.length; i++) {
            if (keccak256(bytes(status)) == keccak256(bytes(validStatuses[i]))) {
                return true;
            }
        }
        return false;
    }
}