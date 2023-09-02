import { readContract, writeContract, readContracts } from "@wagmi/core"

import hackathonFactory from "../../contract-artifacts/HackathonFactory.json"

let ABI = hackathonFactory.abi

export const createMiniHackathon = (contractAddress: "0x${String}") => (name: string, start: number, submit_deadline: number, end: number, website: string, telegram: string, twitter: string, evaluators: string[]) => {
  return writeContract({
    address : contractAddress,
    abi : ABI,
    functionName : "createMiniHackathon",
    args : [name, start, submit_deadline, end, website, telegram, twitter, evaluators]
  })
} 
  

export const hackathons = (contractAddress: '0x${String}') => {
  return readContract(
    {
      address: contractAddress,
      abi: ABI,
      functionName: "hackathons"
    }
  )
}
