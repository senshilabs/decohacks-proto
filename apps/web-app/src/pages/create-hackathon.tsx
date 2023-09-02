import { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { HackathonFactoryAddress } from '../global/constants';
import { createMiniHackathon } from '../lib/hackathonFactory';


export default function CreateHackathon() {
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState({ date: '', time: '' });
  const [deadlineTime, setDeadlineTime] = useState({ date: '', time: '' });
  const [endTime, setEndTime] = useState({ date: '', time: '' });
  const [website, setWebsite] = useState('')
  const [telegram, settelegram] = useState('')
  const [twitter, setTwitter] = useState('')
  const [judge, setJudge] = useState('')

  const { chain, chains } = useNetwork()

  const [targetHackathonFactory, setTargetHackathonFactory] = useState(HackathonFactoryAddress.optimism)

  const { connector: activeConnector, isConnected } = useAccount()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    console.log({startTime, deadlineTime, endTime})

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'website':
        setWebsite(value);
        break;
      case 'telegram':
        settelegram(value);
        break;
      case 'twitter':
        setTwitter(value);
        break;
      case 'judge':
        setJudge(value);
        break;
      case 'start-date':
        setStartTime((prev) => ({ ...prev, date: value }));
        break;
      case 'start-time':
        setStartTime((prev) => ({ ...prev, time: value }));
        break;
      case 'deadline-date':
        setDeadlineTime((prev) => ({ ...prev, date: value }));
        break;
      case 'deadline-time':
        setDeadlineTime((prev) => ({ ...prev, time: value }));
        break;
      case 'end-date':
        setEndTime((prev) => ({ ...prev, date: value }));
        break;
      case 'end-time':
        setEndTime((prev) => ({ ...prev, time: value }));
        break;
      default:
        break;
    }
  };

  const getUnixTimestamp = ({ date, time }) => {
    if (!date || !time) return null; // Make sure both date and time are available
    return new Date(`${date}T${time}:00`).getTime() / 1000;
  };

  const startTimestamp = getUnixTimestamp(startTime);
  const deadlineTimestamp = getUnixTimestamp(deadlineTime);
  const endTimestamp = getUnixTimestamp(endTime);


  useEffect(()=>{
    if(chain){
      if(chain.id === 420) {
        setTargetHackathonFactory(HackathonFactoryAddress.optimism)
      }
      if(chain.id === 59140){
        setTargetHackathonFactory(HackathonFactoryAddress.linea)
      }
    }
  },[chain])
  // useEffect(() => {
  //   console.log({name, startTime, endTime, website, telegram, twitter,judge})
  // },[name, startTime, endTime, website, telegram, twitter,judge])

  const submit = async () => {
    try{
      const createHackathon = createMiniHackathon(targetHackathonFactory)
    createHackathon(name, startTimestamp, deadlineTimestamp, endTimestamp, website, telegram, twitter, [judge])  
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div className="mt-[16px]">
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleInputChange}
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Ethcon Seoul 2023"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Start
                </label>
                <div className="mt-2 flex w-full gap-4">
                  <input
                  onChange={handleInputChange}
                    type="date"
                    name="start-date"
                    id="start-date"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                   <input
                   onChange={handleInputChange}
                    type="time"
                    name="start-time"
                    id="start-time"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="Deadline"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Deadline
                </label>
                <div className="mt-2 flex w-full gap-4">
                  <input
                  onChange={handleInputChange}
                    type="date"
                    name="deadline-date"
                    id="deadline-date"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                   <input
                   onChange={handleInputChange}
                    type="time"
                    name="deadline-time"
                    id="deadline-time"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="End"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  End
                </label>
                <div className="mt-2 flex w-full gap-4">
                  <input
                  onChange={handleInputChange}
                    type="date"
                    name="end-date"
                    id="end-date"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                   <input
                   onChange={handleInputChange}
                    type="time"
                    name="end-time"
                    id="end-time"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Website
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  
                  <input
                  onChange={handleInputChange}
                    type="url"
                    name="website"
                    id="website"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="telegram"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  telegram
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
               
                  <input
                  onChange={handleInputChange}
                    type="url"
                    name="telegram"
                    id="telegram"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="https://telegram.com/username"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="twitter"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Twitter
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
               
                  <input
                    onChange={handleInputChange}
                    type="url"
                    name="twitter"
                    id="twitter"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="judge"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  judge
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
               
                  <input
                    onChange={handleInputChange}
                    type="url"
                    name="judge"
                    id="judge"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="0x123...456"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div onClick={submit}>Submit</div>
    </div>
  )
}
