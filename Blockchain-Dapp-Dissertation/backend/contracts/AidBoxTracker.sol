// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AidBoxTracker {
    address public owner;

    // Define valid statuses for the aid boxes
    string[] public validStatuses = ["Pending", "Delivered", "In Transit", "Cancelled", "Received Funds"];

    // AidBox struct to represent each tracked aid item
    struct AidBox {
        uint256 id;
        string description;
        string status;
    }

    // Mapping to store aid boxes by ID
    mapping(uint256 => AidBox) public aidBoxes;

    // Optional GPS location data
    mapping(uint256 => string) public boxCoordinates; // boxId => "lat,long"

    // Counter for aid box IDs
    uint256 public nextId;

    //  NEW: Logged GPS hashes (on-chain audit)
    event LocationLogged(uint256 indexed boxId, string lat, string lon, uint256 timestamp);

    // Event for updating aid box status
    event AidBoxStatusUpdated(uint256 id, string newStatus);

    // Event for organization collaboration requests
    event CollaborationRequested(address fromOrg, address toOrg, string details);

    //  New Event: Log fund-sharing transactions with metadata
    event FundsShared(
        address indexed sender,
        address indexed receiver,
        uint256 boxId,
        uint256 timestamp
    );

    //  Event for location updates
    event LocationUpdated(uint256 indexed boxId, string latlong, uint256 timestamp);

    constructor() {
        owner = msg.sender; // Set contract deployer as the owner
    }

    // Modifier to restrict certain functions to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Add a new aid box to the tracker
    function addAidBox(string memory description, string memory status) public onlyOwner {
        require(isValidStatus(status), "Invalid status");

        aidBoxes[nextId] = AidBox(nextId, description, status);
        nextId++;
    }

    // Update the status of an existing aid box
    function updateAidBoxStatus(uint256 id, string memory status) public onlyOwner {
        require(id < nextId, "AidBox does not exist");
        require(isValidStatus(status), "Invalid status");

        aidBoxes[id].status = status;
        emit AidBoxStatusUpdated(id, status);
    }

    // Retrieve a specific aid box's details
    function getAidBox(uint256 id) public view returns (AidBox memory) {
        require(id < nextId, "AidBox does not exist");
        return aidBoxes[id];
    }

    // Validate whether the status is one of the predefined allowed values
    function isValidStatus(string memory status) private view returns (bool) {
        for (uint i = 0; i < validStatuses.length; i++) {
            if (keccak256(bytes(status)) == keccak256(bytes(validStatuses[i]))) {
                return true;
            }
        }
        return false;
    }

    // Log a collaboration request between organizations
    function requestCollaboration(address toOrg, string memory details) public {
        emit CollaborationRequested(msg.sender, toOrg, details);
    }

    //  New Function: Simulate fund transfer and update aid box status
    function shareFunds(address toOrg, uint256 boxId) external payable {
        require(toOrg != address(0), "Invalid receiver");
        require(msg.value > 0, "No ETH sent");
        require(boxId < nextId, "Invalid Box ID");

        // Forward ETH to the recipient
        (bool sent, ) = toOrg.call{value: msg.value}("");
        require(sent, "Transfer failed");

        // Emit event for transparency
        emit FundsShared(msg.sender, toOrg, boxId, block.timestamp);

        // Optional: automatically update box status
        aidBoxes[boxId].status = "Received Funds";
        emit AidBoxStatusUpdated(boxId, "Received Funds");
    }

    //  GPS Location Tracker Function
    function updateLocation(uint256 boxId, string memory latlong) public {
        require(boxId < nextId, "Invalid Box ID");
        boxCoordinates[boxId] = latlong;
        emit LocationUpdated(boxId, latlong, block.timestamp);
    }

    //  NEW FUNCTION: Hashable GPS logger for transparency audit
    function logLocation(uint256 boxId, string memory lat, string memory lon) public {
        require(boxId < nextId, "Invalid Box ID");
        emit LocationLogged(boxId, lat, lon, block.timestamp);
    }
}
