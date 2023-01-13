import moment from 'moment'
import {
  ArrowTopRightOnSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import clientPromise from 'lib/mongodb'
import Link from 'next/link'
import { PATH_NAMES } from 'helpers/paths'

export default async function Dashboard({ searchParams }) {
  const client = await clientPromise
  const collection = client.db('tinyurl').collection('urls')
  let urls = await collection.find().toArray()

  if (searchParams.delete) {
    const filtered = urls.filter((e) => e.shortUrl !== searchParams.delete)
    if (filtered.length !== urls.length) {
      await collection.deleteOne({ shortUrl: searchParams.delete })
    }
    urls = filtered
  }

  return (
    <div className="mt-4 mx-auto overflow-x-auto w-screen max-w-screen-lg">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                  <Link href={`/${e.shortUrl}`}>
                    <ArrowTopRightOnSquareIcon className="w-6 h-6 cursor-pointer" />
                  </Link>
                  <Link
                    href={`${PATH_NAMES.DASHBOARD.path}?delete=${e.shortUrl}`}
                  >
                    <TrashIcon className="w-6 h-6 cursor-pointer" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
