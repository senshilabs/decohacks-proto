import { faker } from "@faker-js/faker"
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid"
import { Identity } from "@semaphore-protocol/identity"
import { publicProvider } from "@wagmi/core/providers/public"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { formatEther } from "viem"
import { useAccount, useBlockNumber, useContractRead, useNetwork } from "wagmi"
import hackathonABI from "../../../../contract-artifacts/Hackathon.json"
import {
    addVoter,
    castVote,
    depositEthPrize,
    getJudges,
    getParticipants,
    getPrizes,
    getVote,
    hackathonInfo,
    participate
} from "../../../lib/hackathon"

const SubTabs = ["info", "prize", "judge", "participant"]

const stats = [
    { label: "Total Prize", value: "$7000" },
    { label: "Backer", value: "37" },
    { label: "Participant", value: "12" },
    { label: "Raised", value: "$25M" }
]

const shortenAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`

function HackathonTab() {
    const router = useRouter()
    const { id: contractAddress, tab } = router.query

    const { data: deployedHacakthons } = useContractRead({
        address: contractAddress,
        abi: hackathonABI.abi,
        functionName: "hackathon"
    })

    const { data: blockNumber, isError, isLoading } = useBlockNumber()

    const { address, isConnecting, isDisconnected } = useAccount()
    const { chain, chains } = useNetwork()
    const provider = publicProvider()

    const [participants, setParticipants] = useState<string[]>([])
    const [info, setInfo] = useState<any[]>([])
    const [prizes, setPrizes] = useState<any[]>([])
    const [judges, setJudges] = useState<any[]>([])

    const [prizeName, setPrizeName] = useState("")
    const [ethValue, setEthValue] = useState("")

    const [_identity, setIdentity] = useState<Identity>()

    const [voteList, setVoteList] = useState<string[]>([])

    const [selectedAddress, setSelectedAddress] = useState<string>(0)

    const fetchData = async () => {
        try {
            const fetchedParticipants = await getParticipants(contractAddress)
            const fetchedInfo = await hackathonInfo(contractAddress)
            const fetchedPrizes = await getPrizes(contractAddress)
            const fetchJudges = await getJudges(contractAddress)

            const getVotes = async () => {
                const promises = fetchedParticipants.map((participant) => getVote(contractAddress)(participant))
                const results = await Promise.all(promises)
                setVoteList(results)
            }

            setParticipants(fetchedParticipants)
            setInfo(fetchedInfo)
            setPrizes(fetchedPrizes)
            setJudges(fetchJudges)
            getVotes()

            console.log({ fetchedInfo })
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        if (name === "prizeName") {
            setPrizeName(value)
        } else if (name === "ethValue") {
            setEthValue(value)
        }
    }

    useEffect(() => {
        if (voteList.length) {
            console.log({ voteList })
        }
    }, [voteList])

    // useEffect(()=>{
    //   const temp = async () => {
    //     try{
    //       setTimeout(async()=>{
    //         const result = await getVote(contractAddress)(address)
    //         console.log({result})
    //       }, 1000)

    //     }catch(e){
    //       console.log(e)
    //     }

    //   }

    //   temp()
    // },[])

    const createIdentity = async () => {
        const identity = new Identity()
        setIdentity(identity)
        localStorage.setItem("identity", identity.toString())

        if (_identity) {
            try {
                addVoter(contractAddress)(_identity?.commitment.toString()).then((res) => {
                    castVote(chain, contractAddress, _identity)(selectedAddress)
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [deployedHacakthons])

    let content
    switch (tab) {
        case "info":
            content = (
                <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                            <div className="lg:pr-4">
                                <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10">
                                    <img
                                        className="absolute inset-0 h-full w-full object-cover brightness-125 saturate-0"
                                        src="https://ethcon-korea.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F02cc7f7ee9ba451c8d105250bf4ac441%2Fassets%2Fcover%2F684.png&w=1440&q=100"
                                        alt=""
                                    />
                                    <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" />
                                    <div
                                        className="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
                                        aria-hidden="true"
                                    >
                                        <div
                                            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-40"
                                            style={{
                                                clipPath:
                                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                                            }}
                                        />
                                    </div>
                                    <figure className="relative isolate">
                                        <svg
                                            viewBox="0 0 162 128"
                                            fill="none"
                                            aria-hidden="true"
                                            className="absolute -left-2 -top-4 -z-10 h-32 stroke-white/20"
                                        >
                                            <path
                                                id="0ef284b8-28c2-426e-9442-8655d393522e"
                                                d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                                            />
                                            <use href="#0ef284b8-28c2-426e-9442-8655d393522e" x={86} />
                                        </svg>

                                        <p className="mt-6 text-2xl font-black leading-8 text-white">
                                            {info[0]?.result[0]}
                                        </p>
                                        <blockquote className="mt-6 text-xl font-semibold leading-8 text-white">
                                            <p>
                                                “Amet amet eget scelerisque tellus sit neque faucibus non eleifend.
                                                Integer eu praesent at a. Ornare arcu gravida natoque erat et cursus
                                                tortor.”
                                            </p>
                                        </blockquote>
                                    </figure>
                                </div>
                            </div>
                            <div>
                                <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
                                    <p className="text-base font-semibold leading-7 text-indigo-600">Hackathon</p>
                                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                        PROOF-OF-SHARING
                                    </h1>
                                    <div className="max-w-xl">
                                        <p className="mt-6 font-bold">
                                            Let’s share ideas, knowledge, experiences and deep connections!
                                        </p>
                                        <p className="mt-3">
                                            Supporting the open-source movement as a non profit Ethereum developer
                                            conference, Ethcon Korea have started its journey since 2019. We as
                                            organizers believe that Ethereum is more than just a technical solution - it
                                            is a community.
                                        </p>
                                        <p className="mt-3">
                                            Our mission is to empower local communities by bridging the gap between
                                            Korea and the world through the promotion of decentralized protocols, tools,
                                            and culture. Our commitment to fostering innovation and community continues
                                            with this Hackathon and conference, and we look forward to supporting the
                                            growth of the Ethereum ecosystem here.
                                        </p>
                                    </div>
                                </div>
                                <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-4">
                                    {stats.map((stat, statIdx) => (
                                        <div key={statIdx}>
                                            <dt className="text-sm font-semibold leading-6 text-gray-600">
                                                {stat.label}
                                            </dt>
                                            <dd className="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">
                                                {stat.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                                <div className="mt-10 flex">
                                    <div
                                        className="text-base font-semibold leading-7 text-indigo-600"
                                        onClick={async () => {
                                            try {
                                                console.log({ blockNumber })
                                                console.log({ contractAddress })
                                                await participate(contractAddress)
                                            } catch (e) {
                                                console.log(e)
                                            }
                                        }}
                                    >
                                        Join Happy Hacking <span aria-hidden="true">&rarr;</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            break
        case "prize":
            content = (
                <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 ">
                    <div className="flex justify-center">
                        <input
                            type="text"
                            name="prizeName"
                            id="prizeName"
                            className="mr-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            placeholder="Prize Name"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="ethValue"
                            id="ethValue"
                            className="mr-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            placeholder="Eth Value"
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            onClick={async () => {
                                await depositEthPrize(contractAddress)(prizeName, ethValue)
                            }}
                        >
                            Add Prize
                        </button>
                    </div>
                    {prizes.length ? (
                        prizes?.map((prize, i) => (
                            <li key={i} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                                <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                    <div className="text-sm font-medium leading-6 text-gray-900">{prize[0]}</div>
                                </div>
                                <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                                    <div className="flex justify-between gap-x-4 py-3">
                                        <dt className="text-gray-500">Transaction</dt>
                                        <dd className="text-gray-700">{faker.datatype.hexadecimal({ length: 64 })}</dd>
                                    </div>
                                    <div className="flex justify-between gap-x-4">
                                        <dt className="text-gray-500">Amount</dt>
                                        <dd className="flex items-start gap-x-2">
                                            <div className="font-medium text-gray-900">{formatEther(prize[1])} ETH</div>
                                        </dd>
                                    </div>
                                </dl>
                            </li>
                        ))
                    ) : (
                        <></>
                    )}
                </ul>
            )
            break
        case "judge":
            content = (
                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {judges.length ? (
                        judges.map((judge) => (
                            <li
                                key={faker.internet.email()}
                                className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                            >
                                <div className="flex flex-1 flex-col p-8">
                                    <img
                                        className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                                        src={faker.image.url()}
                                        alt=""
                                    />
                                    <h3 className="mt-6 text-sm font-medium text-gray-900">{shortenAddress(judge)}</h3>
                                    <dl className="mt-1 flex flex-grow flex-col justify-between">
                                        <dt className="sr-only">Title</dt>
                                        <dd className="text-sm text-gray-500">{faker.person.jobTitle()}</dd>
                                        <dt className="sr-only">Role</dt>
                                        <dd className="mt-3">
                                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Judge
                                            </span>
                                        </dd>
                                    </dl>
                                </div>
                                <div>
                                    <div className="-mt-px flex divide-x divide-gray-200">
                                        <div className="flex w-0 flex-1">
                                            <a
                                                href={""}
                                                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                            >
                                                <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Email
                                            </a>
                                        </div>
                                        <div className="-ml-px flex w-0 flex-1">
                                            <a
                                                href={""}
                                                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                                            >
                                                <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Call
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div>no judges</div>
                    )}
                </ul>
            )
            break

        case "participant":
            content = (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {participants.length ? (
                        participants.map((participant, i) => (
                            <div key={i}>
                                <div
                                    key={faker.internet.email()}
                                    className="relative flex cursor-pointer items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm"
                                    onClick={() => {
                                        setSelectedAddress(participant)
                                        createIdentity()
                                    }}
                                >
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={faker.image.url()} alt="" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        <p className="text-sm font-medium text-gray-900">
                                            {shortenAddress(participant)}
                                        </p>
                                        <p className="truncate text-sm text-gray-500">{faker.person.jobTitle()}</p>
                                    </div>
                                    <div className="">
                                        <img
                                            className="h-5 w-5"
                                            src={"https://static.thenounproject.com/png/5244038-200.png"}
                                            alt=""
                                        />
                                    </div>
                                    <div>{voteList[i]?.toString() || 0}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>no participants</div>
                    )}
                </div>
            )
            break
        default:
            content = <div>Select a tab</div>
    }

    return (
        <div>
            <div className="mb-[32px] mt-[16px] flex w-full flex-col items-center">
                <div className="grid w-fit grid-cols-4 divide-x-[1px] divide-gray-200 rounded-md border-[1px] border-gray-200 text-center shadow-sm">
                    {SubTabs.map((subtab, i) => (
                        <div
                            key={i}
                            className="flex h-[36px] w-[100px] items-center justify-center hover:bg-slate-200"
                            onClick={() => router.push(`/hackathon/${router.query.id}/${subtab}`)}
                        >
                            {subtab}
                        </div>
                    ))}
                </div>
            </div>
            {content}
        </div>
    )
}

export default HackathonTab
