import { faker } from "@faker-js/faker"
import { CalendarDaysIcon, CreditCardIcon } from "@heroicons/react/20/solid"
import router from "next/router"
import { hackathonInfos } from "../global/constants"

export default function Home() {
    return (
        <div className="w-full">
            <div className="mt-[16px] flex w-full">
                <div className="grid w-full grid-cols-2 gap-4">
                    {hackathonInfos?.map((hackathon, i) => (
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                router.push({
                                    pathname: `/hackathon/${i}/info`
                                })
                            }}
                        >
                            <h2 className="sr-only">Summary</h2>
                            <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                                <dl className="flex flex-wrap">
                                    <div className="flex-auto pl-6 pt-6">
                                        <dt className="text-xl font-semibold leading-6 text-gray-900">
                                            {hackathon.name}
                                        </dt>
                                    </div>
                                    <div className="flex-none self-end px-6 pt-4">
                                        <dt className="sr-only">Status</dt>
                                        <dd className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                                            Register
                                        </dd>

                                        <dd className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            In Progress
                                        </dd>
                                        <dd className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                                            Voting
                                        </dd>
                                        <dd className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                                            Finished
                                        </dd>
                                    </div>
                                    <div className="relative mt-6 flex w-full flex-none border-t border-gray-900/5 px-6 pt-6">
                                        <img className="h-10 w-10 rounded-full" src={faker.image.url()} />
                                        <img className="-ml-4 h-10 w-10 rounded-full" src={faker.image.url()} />
                                        <img className="-ml-4 h-10 w-10 rounded-full" src={faker.image.url()} />
                                        <span className="ml-30 absolute left-24 mt-3 rounded bg-gray-900 px-2 py-1 text-white">
                                            +123
                                        </span>
                                    </div>

                                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                        <dt className="flex-none">
                                            <span className="sr-only">Due date</span>
                                            <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd className="text-sm leading-6 text-gray-500">
                                            Block Height : 1111111 ~ 222222
                                        </dd>
                                    </div>
                                    <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                                        <dt className="flex-none">
                                            <span className="sr-only">Status</span>
                                            <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
                                        </dt>
                                        <dd className="text-sm leading-6 text-gray-500">Prize Pool : $10,560.00</dd>
                                    </div>
                                </dl>
                                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                        Join Happy Hacking <span aria-hidden="true">&rarr;</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        // <div
                        //   className="flex h-[272px] flex-col justify-between border-2 border-[#] bg-blue-200 font-bold"
                        //   key={i}
                        //   onClick={() => {
                        //     router.push({
                        //       pathname: `/hackathon/${i}/info`,
                        //     })
                        //   }}
                        // >
                        //   <div className="flex justify-between bg-blue-500">
                        //     <div id="name" className="text-[24px]">
                        //       {hackathon.name}
                        //     </div>
                        //     <div id="link">
                        //       <a
                        //         href={hackathon?.links?.website}
                        //         target="_blank"
                        //         rel="noopener noreferrer"
                        //       >
                        //         <img
                        //           className="inline-block h-10 w-10 rounded-full"
                        //           src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        //           alt="Profile"
                        //         />
                        //       </a>
                        //       <a
                        //         href={hackathon?.links?.github}
                        //         target="_blank"
                        //         rel="noopener noreferrer"
                        //       >
                        //         <img
                        //           className="inline-block h-10 w-10 rounded-full"
                        //           src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                        //           alt="Profile"
                        //         />
                        //       </a>

                        //       <a
                        //         href={hackathon?.links?.twitter}
                        //         target="_blank"
                        //         rel="noopener noreferrer"
                        //       >
                        //         <img
                        //           className="inline-block h-10 w-10 rounded-full"
                        //           src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg"
                        //           alt="Profile"
                        //         />
                        //       </a>
                        //     </div>
                        //   </div>
                        //   <div>시작일시(타임스탬프) 종료일시(타임스탬프)</div>
                        //   <div>참여자</div>
                        //   <div className="flex justify-between bg-blue-500">
                        //     <div>상태 (참가자 받는중 / 진행중 /end)</div>
                        //     <button className="rounded-lg bg-[#3770FF] px-[44px] py-[11px] text-[#fff]">
                        //       Apply
                        //     </button>
                        //   </div>
                        // </div>
                    ))}
                    <div id="add-hackathon">
                        <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                            <dl className="flex flex-wrap">
                                <div className="flex-auto pl-6 pt-6">
                                    <dt className="text-xl font-semibold leading-6 text-gray-900">New Hackathon</dt>
                                </div>
                            </dl>
                            <div
                                className="mt-6 cursor-pointer border-t border-gray-900/5 px-6 py-6"
                                onClick={() => {
                                    router.push({ pathname: "create-hackathon" })
                                }}
                            >
                                <div className="text-sm font-semibold leading-6 text-gray-900">
                                    Click to add <span aria-hidden="true">&rarr;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
