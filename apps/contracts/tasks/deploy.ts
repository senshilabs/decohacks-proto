import { task, types } from "hardhat/config"

task("deploy", "Deploy a Feedback contract")
    .addOptionalParam("semaphore", "Semaphore contract address", undefined, types.string)
    .setAction(async ({semaphore: semaphoreAddress }, { ethers, run }) => {
        // 옵티미즘 testnet :  "0x3889927F0B5Eb1a02C6E2C20b39a1Bd4EAd76131"
        if (!semaphoreAddress) {
            const { semaphore } = await run("deploy:semaphore", {
                
            })

            semaphoreAddress = semaphore.address
        }

        const HackathonFactoryFactory = await ethers.getContractFactory("HackathonFactory")

        const HackathonFactoryContract = await HackathonFactoryFactory.deploy(semaphoreAddress)

        await HackathonFactoryContract.deployed()

        console.info(`HackathonFactory contract has been deployed to: ${HackathonFactoryContract.address}`)

        return HackathonFactoryContract
    })
