import {
  ArrowTopRightOnSquareIcon,
  ClipboardIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import Form from 'components/Form'
import DeleteModal from 'components/Modals/Delete'
import moment from 'moment'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [urls, setUrls] = useState([])
  const [selectedUrl, setSelectedUrl] = useState(null)

  useEffect(() => {
    fetchUrls()
  }, [])

  async function fetchUrls() {
    const res = await fetch('/api')
    const data = await res.json()
    setUrls(data)
  }

  async function handleDelete() {
    await fetch(`/api/${selectedUrl}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status === 200) {
        setUrls((e) => e.filter((e) => e.shortUrl !== selectedUrl))
        setSelectedUrl(null)
      }
    })
  }

  function cancelDelete() {
    setSelectedUrl(null)
  }

  function copytoClipboard(shortUrl) {
    navigator.clipboard.writeText(process.env.BASE_URL + '/api/' + shortUrl)
  }

  return (
    <div className="mt-4 overflow-x-auto w-full">
      <Form setUrls={setUrls} />
      <DeleteModal
        show={selectedUrl}
        onDelete={handleDelete}
        onAbort={cancelDelete}
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="mx-auto w-full max-w-[1000px] text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Source
              </th>
              <th scope="col" className="px-6 py-3">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3">
                Expires In
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {urls.map((e, key) => (
              <tr
                key={key}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="max-w-xs overflow-ellipsis overflow-hidden px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {e.source}
                </th>
                <td className="px-6 py-4">{e.clicks}</td>
                <td className="px-6 py-4">
                  {e.oneTimeUse
                    ? 'One time use only'
                    : moment
                        .duration(moment(e.expireAt).diff(moment()))
                        .humanize()}
                </td>
                <td className="px-6 py-4 text-right flex flex-row gap-1">
                  <Link href={`/api/${e.shortUrl}`} target="_blank">
                    <ArrowTopRightOnSquareIcon className="w-6 h-6 cursor-pointer" />
                  </Link>
                  <button onClick={() => copytoClipboard(e.shortUrl)}>
                    <ClipboardIcon className="w-6 h-6 cursor-pointer" />
                  </button>
                  <button onClick={() => setSelectedUrl(e.shortUrl)}>
                    <TrashIcon className="w-6 h-6 cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Home.auth = true
