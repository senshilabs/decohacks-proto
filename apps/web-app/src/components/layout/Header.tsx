import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { ConnectKitButton } from "connectkit"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"

const chains = [
    {
        id: 59140,
        name: "Linea",
        avatar: "https://img.api.cryptorank.io/coins/150x150.linea1680021297845.png"
    },
    {
        id: 420,
        name: "Optimism",
        avatar: "https://img.api.cryptorank.io/coins/150x150.optimism1654027460186.png"
    }
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ")
}

const Header = () => {
    const router = useRouter()
    const { chain } = useNetwork()
    const { switchNetwork } = useSwitchNetwork()
    const { address, isConnected } = useAccount()

    const [selected, setSelected] = useState(chains[1])

    useEffect(() => {
        if (chain) {
            setSelected(chains.find((c) => c.id === chain?.id) || chains[0])
        }
    }, [chain])

    const handleChainChange = (newSelected: any) => {
        setSelected(newSelected)
        switchNetwork?.(newSelected.id)
    }

    const NetworkSelector = () => (
        <Listbox value={selected} onChange={handleChainChange}>
            {({ open }) => (
                <>
                    <div className="relative w-[135px]">
                        <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                                <img src={selected?.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                <span className="ml-3 block">{selected.name}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {chains.map((person) => (
                                    <Listbox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            classNames(
                                                active ? "bg-indigo-600 text-white" : "text-gray-900",
                                                "relative cursor-default select-none py-2 pl-3 pr-9"
                                            )
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <img
                                                        src={person.avatar}
                                                        alt=""
                                                        className="h-5 w-5 flex-shrink-0 rounded-full"
                                                    />
                                                    <span
                                                        className={classNames(
                                                            selected ? "font-semibold" : "font-normal",
                                                            "ml-3 block"
                                                        )}
                                                    >
                                                        {person.name}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? "text-white" : "text-indigo-600",
                                                            "absolute inset-y-0 right-0 flex items-center pr-4"
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )

    return (
        <div className="flex h-[75px] w-full items-center justify-between border-b border-gray-200 py-[16px]">
            <p
                className="cursor-pointer"
                onClick={() => {
                    router.push({ pathname: "/" })
                }}
            >
                DecoHacks
            </p>
            <div className="flex items-center">
                <div className="mr-4">
                    <NetworkSelector />
                </div>

                {isConnected ? (
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            router.push({ pathname: "/profile" })
                        }}
                    >{`${address?.slice(0, 6)}...${address?.slice(-4)}`}</div>
                ) : (
                    <ConnectKitButton />
                )}
            </div>
        </div>
    )
}

export default Header
