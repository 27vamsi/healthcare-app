// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Healthcare is Ownable {
    struct PatientData {
        address patient;
        string data;
        bool isAuthorized;
    }

    mapping(address => PatientData) public patientRecords;
    mapping(address => uint256) public reputation;

    ERC20 public token;

    // Update the constructor to accept the initial owner address and token address
    constructor(address initialOwner, address tokenAddress) Ownable(initialOwner) {
        token = ERC20(tokenAddress);
    }

    function storeData(address patient, string memory data) public onlyOwner {
        patientRecords[patient] = PatientData(patient, data, true);
    }

    function getData(address patient) public view returns (string memory) {
        require(patientRecords[patient].isAuthorized, "Not authorized");
        return patientRecords[patient].data;
    }

    function authorizeAccess(address patient) public {
        require(msg.sender == patient, "Only patient can authorize");
        patientRecords[patient].isAuthorized = true;
    }

    function addReputation(address provider, uint256 score) public {
        reputation[provider] += score;
    }
}
