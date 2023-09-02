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
- Programming Language: Solidity
- Layer 2: Optimism, Linea
- zk-Solutions: Semaphore

### Useful Links
- [GitHub Repository](https://github.com/senshilabs/decohacks-proto)
