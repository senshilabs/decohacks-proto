import { readContract, writeContract } from "@wagmi/core"

import hackathonFactory from "../../contract-artifacts/HackathonFactory.json"

const ABI = hackathonFactory.abi

export const createMiniHackathon = (contractAddress: "0x${String}") => (name: string, start: number, submit_deadline: number, end: number, website: string, telegram: string, twitter: string, evaluators: string[]) => writeContract({
    address : contractAddress,
    abi : ABI,
    functionName : "createMiniHackathon",
    args : [name, start, submit_deadline, end, website, telegram, twitter, evaluators]
  }) 
  

export const hackathons = (contractAddress: '0x${String}') => readContract(
    {
      address: contractAddress,
      abi: ABI,
      functionName: "hackathons"
    }
  )
