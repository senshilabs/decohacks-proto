//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Hackathon.sol";
import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

contract HackathonFactory {
    ISemaphore public semaphore;
    address[] public hackathons;

    constructor(address semaphoreAddress) {
        semaphore = ISemaphore(semaphoreAddress);
    }

    // payable
    function createMiniHackathon(
        address semaphoreAddress,
        string memory _name, 
        uint256 _start,
        uint256 _submit_deadline, 
        uint256 _end,
        string memory _website,
        string memory _telegram,
        string memory _twitter,
        address[] memory _evaluators
    ) public payable returns(address){
        Hackathon hackathon = new Hackathon(
            semaphoreAddress,
            _name,
            _start,
            _submit_deadline,
            _end,
            _website,
            _telegram,
            _twitter,
            _evaluators
        );
        address hackathonAddress = address(hackathon);
        
        semaphore.createGroup(uint256(uint160(hackathonAddress)), 20, hackathonAddress);
        hackathons.push(hackathonAddress);
        return hackathonAddress;
    }

    function getDeployedHackathons() public view returns (address[] memory) {
        return hackathons;
    }
}