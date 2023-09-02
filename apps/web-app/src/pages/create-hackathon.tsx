import { useState } from 'react'

export default function CreateHackathon() {
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [website, setWebsite] = useState('')
  const [github, setGithub] = useState('')
  const [twitter, setTwitter] = useState('')

  const submit = () => {
    console.log(submit)
  }

  return (
    <div className="mt-[16px]">
      {/* <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="website">Website:</label>
          <input
            type="url"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="github">GitHub:</label>
          <input
            type="url"
            id="github"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="twitter">Twitter:</label>
          <input
            type="url"
            id="twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>

        <div id="submit" onClick={submit}>
          submit
        </div>
      </form> */}
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

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Start Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="start-date"
                    id="start-date"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="end-date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  End Date
                </label>
                <div className="mt-2">
                  <input
                    type="date"
                    name="end-date"
                    id="end-date"
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
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    {/* <GlobeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    /> */}
                  </span>
                  <input
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
                  htmlFor="github"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  GitHub
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    {/* <GitHubIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    /> */}
                  </span>
                  <input
                    type="url"
                    name="github"
                    id="github"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="https://github.com/username"
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
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    {/* <TwitterIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    /> */}
                  </span>
                  <input
                    type="url"
                    name="twitter"
                    id="twitter"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
