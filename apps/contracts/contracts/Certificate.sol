// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Certificate is ERC1155, Ownable {

    mapping(uint256 => string) public AwardCertificate;
    mapping(uint256 => string) public ParticipateCertificate;

    mapping(address => uint256[]) public AwardCertificateOf;
    mapping(address => uint256[]) public ParticipateCertificateOf;

    constructor(string memory uri) ERC1155(uri) {}

    function issueAwardCertificate(address account, uint256 hackathon) public onlyOwner returns (uint256) {
        /// generate from hackathon with salt
        uint256 awardTokenId = hackathon+1;
        AwardCertificate[awardTokenId];
        AwardCertificateOf[account].push(awardTokenId);
        _mint(account, awardTokenId, 1, "");
    }

    function issueParticipateCertificate(address account, uint256 hackathon) public onlyOwner returns (uint256) {
        /// generate from hackathon
        uint256 participateTokenId = hackathon;
        ParticipateCertificate[participateTokenId];
        ParticipateCertificateOf[account].push(participateTokenId);
        _mint(account, participateTokenId, 1, "");
    }

    // 특정 사용자가 가지고 있는 token id를 모두 가져온다.
    function getTokenIds(address account) public view returns (uint256[][2] memory) {
        uint256[] memory awardTokenIds = AwardCertificateOf[account];
        uint256[] memory participateTokenIds = ParticipateCertificateOf[account];
        uint256[][2] memory tokenIds = [awardTokenIds, participateTokenIds];
        return tokenIds;
    }

    function setURI(string memory newUri) external onlyOwner {
        _setURI(newUri);
    }

    // Soulbound lock
    function safeTransferFrom(
        address ,
        address ,
        uint256 ,
        uint256 ,
        bytes memory 
    ) public pure override {
        revert("not supported");
    }
    
}
