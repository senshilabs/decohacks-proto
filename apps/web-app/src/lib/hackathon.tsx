import { readContract, readContracts, writeContract } from "@wagmi/core"
import { Group } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"
import { SemaphoreSubgraph } from "@semaphore-protocol/data"
import { SemaphoreEthers } from "@semaphore-protocol/data"
import { generateProof } from "@semaphore-protocol/proof"
import { BigNumber, ethers, utils } from "ethers"
import { parseEther } from "viem"
import hackathon from "../../contract-artifacts/Hackathon.json"

const ABI = hackathon.abi

export const participate = (contractAddress: "0x${String}") => writeContract(
        {
            address: contractAddress,
            abi: ABI,
            functionName: "participate"
        }
    )

export const getParticipants = (contractAddress: "0x${String}") => readContract(
        {
            address: contractAddress,
            abi: ABI,
            functionName: "getParticipants"
        }
    )

export const  getTotalPrize = (contractAddress: "0x${String}") => readContract(
        {
            address: contractAddress,
            abi: ABI,
            functionName: "getTotalPrize"
        }
    )

export const  getPrizes = async(contractAddress: "0x${String}") => {
    const result = []
    try{
        for(let i = 0; i < 10; i++){
            result.push(await readContract(
                {
                    address: contractAddress,
                    abi: ABI,
                    functionName: "prizes",
                    args: [ethers.BigNumber.from(i)]
                }
            ))    
        }
    }catch(e){}

    return result
}

export const getJudges = (contractAddress: "0x${String}") => readContract(
    {
        address: contractAddress,
        abi: ABI,
        functionName: "getEvaluators"
    }
)

export const hackathonInfo = (contractAddress: "0x${String}") => readContracts({
        contracts: [
            {
                address: contractAddress,
                abi: ABI,
                functionName: "hackathon"
            },
            {
                address: contractAddress,
                abi: ABI,
                functionName: "getTotalPrize"
            }
        ]
    })



export const depositEthPrize = (contractAddress: "0x${String}") => (prizeName: string, ethValue: string) => writeContract(
        {
            address: contractAddress,
            abi: ABI,
            functionName: "depositEthPrize",
            args: [prizeName],
            value: parseEther(ethValue)
        }
    )


export const addVoter = (contractAddress: "0x${String}") => (identityCommitment: string) => writeContract(
        {
            address: contractAddress,
            abi: ABI,
            functionName: "addVoter",
            args: [identityCommitment]
        }
    )


export const castVote = (chainId:number, contractAddress: "0x${String}", _identity: Identity) => async (vote: string) => {

    // 이거 chain 에 맞게 설정
    const semaphoreEthers = new SemaphoreEthers("http://localhost:8545", {
    address: "semaphore-address"
    })

    const members = await semaphoreEthers.getGroupMembers(contractAddress)
    const group = new Group(contractAddress, 20, members)

    const signal = BigNumber.from(utils.formatBytes32String(vote)).toString()

    const { proof, merkleTreeRoot, nullifierHash } = await generateProof(
        _identity,
        group,
        contractAddress,
        signal
    )

    return fetch("api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chainId,
            contractAddress,
            vote,
            merkleTreeRoot,
            nullifierHash,
            proof
        })
    })
}