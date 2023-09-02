import { readContract } from "@wagmi/core"

import certificate from "../../contract-artifacts/Certificate.json"

let ABI = certificate.abi

export const getCertificateContract = (contractAddress: '0x${String}') => (address:String) => {
    return readContract(
        {
            address: contractAddress,
            abi: ABI,
            args: [address],
            functionName: "getTokenIds"
        }
    )
}