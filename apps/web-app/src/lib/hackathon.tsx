import { readContract, writeContract, readContracts } from "@wagmi/core"

import hackathon from "../../contract-artifacts/Hackathon.json"

let ABI = hackathon.abi

export const  participate = (contractAddress: "0x${String}") => {
    return writeContract(
        {
            address: contractAddress,
            abi: ABI,
            functionName: "participate"
        }
    )
}

export const  getParticipants = (contractAddress: "0x${String}") => {
    return readContract(
        {
            address: contractAddress,
            abi: ABI,
            functionName: "getParticipants"
        }
    )
}

export const  getTotalPrize = (contractAddress: "0x${String}") => {
    return readContract(
        {
            address: contractAddress,
            abi: ABI,
            functionName: "getTotalPrize"
        }
    )
}

export const hackathonInfo = (contractAddress: "0x${String}") => {
    return readContracts({
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
}

export const depositEthPrize = (contractAddress: "0x${String}") => (prizeName: String) => {
    return writeContract(
        {
            address: contractAddress,
            abi: ABI,
            functionName: "depositEthPrize",
            args: [prizeName]
        }
    )
}


export const addVoter = (contractAddress: "0x${String}") => (identityCommitment: String) => {
    return writeContract(
        {
            address: contractAddress,
            abi: ABI,
            functionName: "addVoter",
            args: [identityCommitment]
        }
    )
}