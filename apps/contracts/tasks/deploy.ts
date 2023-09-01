import { task, types } from "hardhat/config"

task("deploy", "Deploy a Feedback contract")
    .addOptionalParam("semaphore", "Semaphore contract address", undefined, types.string)
    .setAction(async ({semaphore: semaphoreAddress }, { ethers, run }) => {

        const network = process.env.DEFAULT_NETWORK


        if (network === "optimism-goerli") {
            semaphoreAddress = "0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131"
        } else if (network === "linea-goerli") {
            semaphoreAddress = "0x31E4CA436707166315734Ed62f59a36Cc1132483"
        }


        const HackathonFactoryFactory = await ethers.getContractFactory("HackathonFactory")

        const HackathonFactoryContract = await HackathonFactoryFactory.deploy(semaphoreAddress)

        await HackathonFactoryContract.deployed()

        console.info(`HackathonFactory contract has been deployed to: ${HackathonFactoryContract.address}`)

        return HackathonFactoryContract
    })
