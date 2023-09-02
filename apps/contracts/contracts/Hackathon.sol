// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Certificate.sol";
import "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

contract Hackathon {
    
    struct SemaphoreConfig {
        ISemaphore semaphore;
        uint256 groupId;
    }

    struct Prize {
        string name;
        uint256 balance;
    }
    
    struct HackathonInfo {
        string name;
        uint256 start;
        uint256 submit_deadline;
        uint256 end;
        string website;
        string telegram;
        string twitter;
        address[] evaluators;
    }

    Certificate public certificate;
    SemaphoreConfig public semaphoreConfig;
    HackathonInfo public hackathon;
    Prize[] public prizes;
    bool public isPrizeDistributed;

    address[] public participants;
    mapping(address => uint256) public votes;
    mapping(uint256 => bool) nullifierHashes;

    constructor(
        address semaphoreAddress,
        address certificateAddress,
        string memory _name, 
        uint256 _start,
        uint256 _submit_deadline, 
        uint256 _end,
        string memory _website, 
        string memory _telegram,
        string memory _twitter,
        address[] memory _evaluators
    ) {
        require(block.timestamp < _start, "Start time must be in the future");
        require(_start < _submit_deadline, "Submit deadline must be after start time");
        require(_submit_deadline < _end, "End time must be after submit deadline");

        semaphoreConfig.semaphore = ISemaphore(semaphoreAddress);
        semaphoreConfig.groupId = uint256(uint160(address(this)));
        certificate = Certificate(certificateAddress);

        hackathon.name = _name;
        hackathon.start = _start;
        hackathon.submit_deadline = _submit_deadline;
        hackathon.end = _end;
        hackathon.website = _website;
        hackathon.telegram = _telegram;
        hackathon.twitter = _twitter;
        hackathon.evaluators = _evaluators;

        isPrizeDistributed = false;
    }

    function participate() external {
        require(block.timestamp < hackathon.start, "Cannot participate after hackathon start");
        participants.push(msg.sender);
        certificate.issueParticipateCertificate(msg.sender, uint256(uint160(address(this))));
        votes[msg.sender] = 0;
    }

    function getParticipants() external view returns (address[] memory) {
        return participants;
    }

    function getEvaluators() external view returns (address[] memory) {
        return hackathon.evaluators;
    }

    function depositEthPrize(string memory prizeName) external payable {
        require(block.timestamp < hackathon.submit_deadline, "Cannot deposit prize after submit deadline");

        prizes.push(Prize(prizeName, msg.value));
    }

    function getTotalPrize() external view returns (uint256) {
        uint256 totalPrize = 0;
        for (uint256 i = 0; i < prizes.length; i++) {
            totalPrize += prizes[i].balance;
        }
        return totalPrize;
    }

    function addVoter(uint256 identityCommitment) external {
        require(hackathon.submit_deadline < block.timestamp, "Cannot add voter before submit deadline");
        require(block.timestamp < hackathon.end, "Cannot join group after hackathon end");
        // evaluator 만 참여 가능
        bool isEvaluator = false;
        for (uint256 i = 0; i < hackathon.evaluators.length; i++) {
            if (hackathon.evaluators[i] == msg.sender) {
                isEvaluator = true;
                break;
            }
        }
        require(isEvaluator, "Only evaluators can join group");
        
        // voter 등록은 한번만 가능하나, Dev 를 미적용하여 여러번 등록 가능

        semaphoreConfig.semaphore.addMember(semaphoreConfig.groupId, identityCommitment);
    }

    function castVote(
        uint256 voted,
        uint256 merkleTreeRoot,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external {
        require(hackathon.submit_deadline < block.timestamp, "Cannot add voter before submit deadline");
        require(block.timestamp < hackathon.end, "Cannot join group after hackathon end");
        semaphoreConfig.semaphore.verifyProof(semaphoreConfig.groupId, merkleTreeRoot, voted, nullifierHash, semaphoreConfig.groupId, proof);

        nullifierHashes[nullifierHash] = true;
        
        votes[address(uint160(voted))] += 1;
    }

    // 상금 분배 (semaphore 에서 vote 가 가장 많은 address 순으로, prize 를 분배)
    function distributePrize() external {
        require(!isPrizeDistributed, "Prize already distributed");
        require(block.timestamp > hackathon.end, "Cannot distribute prize before hackathon end");
        require(prizes.length > 0, "No prize to distribute");
        require(address(this).balance > 0, "No balance to distribute");

        // prize 를 상금별로 정렬
        for (uint256 i = 0; i < prizes.length; i++) {
            for (uint256 j = i + 1; j < prizes.length; j++) {
                if (prizes[i].balance < prizes[j].balance) {
                    Prize memory temp = prizes[i];
                    prizes[i] = prizes[j];
                    prizes[j] = temp;
                }
            }
        }

        // sort participants by votes
        for (uint256 i = 0; i < participants.length; i++) {
            for (uint256 j = i + 1; j < participants.length; j++) {
                if (votes[participants[i]] < votes[participants[j]]) {
                    address temp = participants[i];
                    participants[i] = participants[j];
                    participants[j] = temp;
                }
            }
        }

        address[] memory winners = new address[](prizes.length);
        for (uint256 i = 0; i < prizes.length; i++) {
            if (i < participants.length) {
                winners[i] = participants[i];
            } else {
                winners[i] = address(0);
            }
        }

        // 상금 분배
        for (uint256 i = 0; i < prizes.length; i++) {
            if (winners[i] != address(0)) {
                payable(winners[i]).transfer(prizes[i].balance);
                certificate.issueAwardCertificate(winners[i], uint256(uint160(address(this))));
            }
        }
        
        // 남은금액은 owner 에게
        payable(msg.sender).transfer(address(this).balance);

        isPrizeDistributed = true;
    }
}
