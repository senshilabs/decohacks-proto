import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { getCertificateContract } from "../lib/certificate"

const files = [
  {
    title: 'ETHCON 2023 Korea',
    source:
      'https://cdn.imweb.me/upload/S20230621b4d58a033ef9e/805ce405015e2.png',
  },
]

const profile = () => {
  const {address} = useAccount()
  const [participatedNftList, setParticipatedNftList] = useState<string[]>([]);
  const [awardNftList, setAwardNftList] = useState<string[]>([]);

  useEffect(()=>{
    const fetchCertificate = async () => {
      const result = await getCertificateContract("0x971aeece1d60f3c0326ece7bd4956903e9e3cad3")(address)
      setAwardNftList(result[0])

      setParticipatedNftList(result[1])
    }
    fetchCertificate()
  },[])

  
  return <div className="mt-[16px] flex flex-col">
  <div className=" font-semibold mb-2">Participated NFT</div>
  <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {participatedNftList.map((nft) => (
        <li key={nft} className="relative">
          <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <img src={"https://cdn.imweb.me/upload/S20230621b4d58a033ef9e/805ce405015e2.png"} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
          </div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">ETHCON 2023 Korea</p>
        </li>
      ))}
    </ul>
    <div className="border-t-[1px] border-gray-200 w-full h-1 my-4"></div>
    <div className="font-semibold mb-2">Award NFT</div>
    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {awardNftList.map((nft) => (
        <li key={nft} className="relative">
          <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <img src={"https://cdn.imweb.me/upload/S20230621b4d58a033ef9e/805ce405015e2.png"} alt="" className="pointer-events-none object-cover group-hover:opacity-75 gold-shimmer" />
          </div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">ETHCON 2023 Korea</p>
        </li>
      ))}
    </ul>
</div>
}

export default profile
