import { SemaphoreEthers } from "@semaphore-protocol/data"
import { Group } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"
import { generateProof } from "@semaphore-protocol/proof"
import { readContract, readContracts, writeContract } from "@wagmi/core"
import { ethers } from "ethers"
import { Chain, parseEther } from "viem"
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

export const getVote = (contractAddress: "0x${String}") => (userAddress : string) => readContract(
    {
        address: contractAddress,
        abi: ABI,
        functionName: "votes",
        args: [userAddress]
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


export const castVote = (chain:Chain, contractAddress: "0x${String}", _identity: Identity) => async (vote: string) => {
    let semaphoreAddress;
    if (chain.id === 420) {
        semaphoreAddress = "0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131"
    } else if (chain.id === 59140) {
        semaphoreAddress = "0x31E4CA436707166315734Ed62f59a36Cc1132483"
    }
    // 이거 chain 에 맞게 설정
    // console.log("rpcUrl ", chain.rpcUrls.public.http[0])
    const semaphoreEthers = new SemaphoreEthers("https://opt-goerli.g.alchemy.com/v2/demo", {
        address: semaphoreAddress
    })

    const members = await semaphoreEthers.getGroupMembers(contractAddress)
    const group = new Group(contractAddress, 20, members)
    const signal = vote

    
    const { proof, merkleTreeRoot, nullifierHash } = await generateProof(
        _identity,
        group,
        contractAddress,
        signal
    )

    return fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chainId: chain.id,
            contractAddress,
            vote,
            merkleTreeRoot,
            nullifierHash,
            proof
        })
    })
}