import { Contract, providers, Wallet } from "ethers"
import type { NextApiRequest, NextApiResponse } from "next"
import Hackathon from "../../../contract-artifacts/Hackathon.json"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { chainId, contractAddress, vote, merkleTreeRoot, nullifierHash, proof } = req.body

    console.log({ chainId, contractAddress, vote, merkleTreeRoot, nullifierHash, proof })

    // number -> string
    const rpc : {[key: number]: string} = {
    420 : 'https://goerli.optimism.io',
    59140 : 'https://rpc.goerli.linea.build'
    }
    const rpcUrl = rpc[chainId]

    
    const provider = new providers.JsonRpcProvider(rpcUrl)
    const ethereumPrivateKey = process.env.ETHEREUM_PRIVATE_KEY as string


    const signer = new Wallet(ethereumPrivateKey, provider)
    const contract = new Contract(contractAddress, Hackathon.abi, signer)

    console.log({vote, merkleTreeRoot, nullifierHash, proof})

    try {
        const transaction = await contract.castVote(vote, merkleTreeRoot, nullifierHash, proof)
        await transaction.wait()

        res.status(200).end()
    } catch (error: any) {
        console.error(error)
        res.status(500).end()
    }
}
