import { Bars3Icon, LinkIcon } from '@heroicons/react/24/outline'
import { PATH_NAMES } from 'helpers/paths'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const [toggleOpened, setToggleOpened] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  function handleSession() {
    if (session) signOut()
    else router.push('/login')
  }

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <LinkIcon className="w-6 h-6 stroke-black dark:stroke-white mr-2" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Tiny Link
          </span>
        </a>
        <button
          type="button"
          onClick={() => setToggleOpened((e) => !e)}
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="w-6 h-6" />
        </button>
        <div
          className={`${
            toggleOpened ? 'block' : 'hidden'
          } w-full md:block md:w-auto`}
        >
          <ul className="flex flex-col p-4 mt-4 border lg:items-center border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {[PATH_NAMES.DASHBOARD, PATH_NAMES.ABOUT, PATH_NAMES.CONTACT].map(
              (e, key) => (
                <li key={key}>
                  <a
                    href={e.path}
                    className="block capitalize py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {e.name}
                  </a>
                </li>
              )
            )}
            <button
              type="button"
              className="text-white w-fit bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleSession}
            >
              {session ? 'Logout' : 'Login'}
            </button>
          </ul>
        </div>
      </div>
    </nav>
  )
}
