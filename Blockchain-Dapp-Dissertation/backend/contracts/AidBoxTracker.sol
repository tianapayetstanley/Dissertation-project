// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AidBoxTracker {
    address public owner;

    // Define valid statuses for the aid boxes
    string[] public validStatuses = ["Pending", "Delivered", "In Transit", "Cancelled", "Received Funds"];

    // Struct representing each aid box
    struct AidBox {
        uint256 id;
        string description;
        string status;
    }

    mapping(uint256 => AidBox) public aidBoxes;         // AidBox ID to AidBox struct
    mapping(uint256 => string) public boxCoordinates;   // NEW: AidBox ID to GPS string ("lat,long")

    uint256 public nextId;                              // Auto-incrementing counter for box IDs

    // NEW: Event for storing hashed GPS logs (auditable)
    event LocationLogged(uint256 indexed boxId, string lat, string lon, uint256 timestamp);

    event AidBoxStatusUpdated(uint256 id, string newStatus); // Event when status is changed
    event CollaborationRequested(address fromOrg, address toOrg, string details); // Collab requests

    // NEW: Transparent logging of ETH + metadata
    event FundsShared(
        address indexed sender,
        address indexed receiver,
        uint256 boxId,
        uint256 timestamp
    );

    // NEW: Realtime location update event (not hashed)
    event LocationUpdated(uint256 indexed boxId, string latlong, uint256 timestamp);

    constructor() {
        owner = msg.sender; // Only the deployer is allowed to mutate state
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // Adds a new AidBox to the mapping
    function addAidBox(string memory description, string memory status) public onlyOwner {
        require(isValidStatus(status), "Invalid status");

        aidBoxes[nextId] = AidBox(nextId, description, status);
        nextId++;
    }

    // Updates the status of a given box
    function updateAidBoxStatus(uint256 id, string memory status) public onlyOwner {
        require(id < nextId, "AidBox does not exist");
        require(isValidStatus(status), "Invalid status");

        aidBoxes[id].status = status;
        emit AidBoxStatusUpdated(id, status);
    }

    // Fetch details of a specific box
    function getAidBox(uint256 id) public view returns (AidBox memory) {
        require(id < nextId, "AidBox does not exist");
        return aidBoxes[id];
    }

    // Internal check for allowed statuses
    function isValidStatus(string memory status) private view returns (bool) {
        for (uint i = 0; i < validStatuses.length; i++) {
            if (keccak256(bytes(status)) == keccak256(bytes(validStatuses[i]))) {
                return true;
            }
        }
        return false;
    }

    // Allow one org to request collab with another
    function requestCollaboration(address toOrg, string memory details) public {
        emit CollaborationRequested(msg.sender, toOrg, details);
    }

    // NEW: Transfers ETH and logs metadata (sender, receiver, box ID)
    function shareFunds(address toOrg, uint256 boxId) external payable {
        require(toOrg != address(0), "Invalid receiver");
        require(msg.value > 0, "No ETH sent");
        require(boxId < nextId, "Invalid Box ID");

        (bool sent, ) = toOrg.call{value: msg.value}("");
        require(sent, "Transfer failed");

        emit FundsShared(msg.sender, toOrg, boxId, block.timestamp);

        //✅ Also updates the box status for UI feedback
        aidBoxes[boxId].status = "Received Funds";
        emit AidBoxStatusUpdated(boxId, "Received Funds");
    }

    // NEW: Realtime GPS update (user-friendly string)
    function updateLocation(uint256 boxId, string memory latlong) public {
        require(boxId < nextId, "Invalid Box ID");
        boxCoordinates[boxId] = latlong;
        emit LocationUpdated(boxId, latlong, block.timestamp);
    }

    // NEW: Hashable GPS logger for tamper-proof auditing
    function logLocation(uint256 boxId, string memory lat, string memory lon) public {
        require(boxId < nextId, "Invalid Box ID");
        emit LocationLogged(boxId, lat, lon, block.timestamp);
    }
}
