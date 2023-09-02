# DECOHACKS

![image](https://github.com/senshilabs/decohacks-proto/assets/10369528/a2aa5507-42f8-4bd8-ae75-808ede6c0211)


### Project Name
DECOHACKS (Decentralization Of HACKathonS)

### Tagline
"Innovating Hackathons through Blockchain: Transparency, Security, and Accessibility"

### Problem Solving
**Vision of Senshilabs Team**: Based on years of experience in participating and hosting hackathons, Senshilabs has identified various issues that exist in current hackathons. Based on this, we created DECOHACKS to make hackathon events more transparent, secure, and accessible.

#### Key Features

- **Enhanced Transparency**: Publicizes the rules of the hackathon using smart contracts. No implicit trust is needed from sponsors, participants, or judges.
  
  - **Rule Coding**: The hackathon rules are coded into smart contracts, making them always transparent and verifiable.
  - **Automatic Prize Distribution**: Smart contracts automatically distribute prizes, minimizing human intervention.
  
- **Cost Reduction**: Provides an automated process without a middle manager, reducing the overall operational cost.
  
- **Global Accessibility**: Utilizes the borderless nature of blockchain to enable participation from anywhere in the world.

- **Anonymity and Verifiability**: Provides an anonymous yet verifiable voting system through zero-knowledge proofs. Judges operate anonymously but are registered through public Wallet addresses.

- **Layer 2 Solutions**: Applies Layer 2 technology to solve various transaction and gas fee issues.

### Challenges and Solutions

1. **Smart Contract Optimization**: Thanks to the advanced optimization of Layer 2, contracts can be deployed at a lower gas price. However, deploying a smart contract for each hackathon can be expensive. To solve this, we are considering pre-defining various hackathon types and reusing contracts accordingly.

2. **Complexity of Zero-Knowledge Proofs**: Although this technology is currently one of the most promising topics in the blockchain industry, it's difficult to implement due to its complexity. To simplify the application of zk-solutions, we used Semaphore.

3. **Implementing Anonymous Voting with Public Accounts**: Although Semaphore made anonymous voting easier to implement, there was a challenge in ensuring anonymous voting when general public accounts (judges in DECOHACKS) are used. We implemented a 1-to-1 matching anonymous voting system through one Call and one Relayer Call.

4. **Deploying Contracts on Layer 2**: EVM-compatible Layer 2 offers easier project migration. However, except for Optimism, we faced issues such as:
- Linea: Contract is deployed and accessible through DAPP, but the hackathon creation transaction is still pending.
- zkSync: Pre-work needed for Deploy was done, but Semaphore contracts used in DECOHACKS could not be deployed, thus the final deployment was not carried out.

5. **Time-Based Rules**: Hackathons generally change states based on time. For example, voting should only be possible during the voting period. Due to the short nature of hackathons, some features were deliberately omitted for testing.

### Technologies Used
- Blockchain: Ethereum
- Programming Language: Solidity, TS
- Layer 2: Optimism, Linea
- zk-Solutions: Semaphore

### Useful Links
- [GitHub Repository](https://github.com/senshilabs/decohacks-proto)
- [Demo Page](https://decohacks-proto-web-app.vercel.app/) **caution** In vercel, first time nextjs error will be raised. refresh page after connect wallet 


## Project Detail 

### Contract
1. **Certificate.sol**: This contract facilitates the issuance of certification tokens following the ERC1155 token standard. Its key functionalities are as follows:
   - `addIssuer(address issuer)`: A function to register certificate issuers, restricting issuance rights to these designated addresses.
   - `issueAwardCertificate(address account, uint256 hackathon)`: A function to issue award certificates, creating tokens and awarding them to recipient accounts.
   - `issueParticipateCertificate(address account, uint256 hackathon)`: A function to issue participation certificates, creating tokens and awarding them to participant accounts.

2. **Hackathon.sol**: This contract manages hackathon information and operations. Its key functionalities include:
   - `participate()`: A function for participants to join the hackathon. It registers participant information before the hackathon starts and issues participation certificates.
   - `depositEthPrize(string memory prizeName)`: A function for depositing prize funds. It records prize information and deposits ether into the contract.
   - `addVoter(uint256 identityCommitment)`: A function to add voter to the semaphore group, ensuring only evaluators can participate.
   - `castVote(uint256 voted, uint256 merkleTreeRoot, uint256 nullifierHash, uint256[8] calldata proof)`: A function allowing evaluators to cast votes using the Semaphore protocol, verifying the proof.
   - `distributePrize()`: A function to distribute prizes based on voting results. It distributes ether to participants as prizes and transfers remaining balances to the contract owner.

3. **HackathonFactory.sol**: This contract creates and manages hackathon contracts. Its main functionalities are as follows:
   - `createMiniHackathon(...)`: A function to create hackathon contracts. It sets up a hackathon using the Semaphore protocol and the Certificate contract, and registers it.

### ZKP
![image](https://github.com/senshilabs/decohacks-proto/assets/10369528/f8c94137-1c7b-4946-b727-5a7b09926275)

### Main Contract 

| Item | Optimism | Linea |
|------|----------|-------|
| **RPC URL** | `https://goerli.optimism.io` | `https://rpc.goerli.linea.build` |
| **Chain ID** | `420` | `59140` |
| **HackathonFactory Address** | `0xEB34bb2aC2eb907f760Dfd6eEDE69cddDEB88E32` | [`0x08e2d1cc528f44b48D0A50A30E11dcb227170771`](https://goerli.lineascan.build/address/0x08e2d1cc528f44b48d0a50a30e11dcb227170771) |
| **Semaphore Address** | `0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131` (Official) | [`0x31E4CA436707166315734Ed62f59a36Cc1132483`](https://goerli.lineascan.build/address/0x31E4CA436707166315734Ed62f59a36Cc1132483) (Manually Deployed) |
