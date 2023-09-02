import { readContract, readContracts, writeContract } from "@wagmi/core"

import { ethers } from "ethers"
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