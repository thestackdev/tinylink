import clientPromise from 'lib/mongodb'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function Url({ params, searchParams }) {
  const client = await clientPromise
  const urls = client.db('tinyurl').collection('urls')

  const url = await urls.findOne({ shortUrl: params.url })

  async function link() {
    await urls.findOneAndUpdate(
      { shortUrl: params.url },
      { $inc: { clicks: 1 } }
    )
    return (
      <div className="flex flex-col gap-4 justify-center w-full max-w-lg mx-auto mt-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Click the below button to open the link
        </h1>

        <Link
          href={url.source}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Open Link
        </Link>
      </div>
    )
  }

  if (!url) notFound()

  if (!url.passwordEnabled) return link()

  if (searchParams?.password === url.password) {
    return link()
  }

  return (
    <form
      className="flex flex-col gap-4 justify-center w-full max-w-lg mx-auto mt-8"
      action={`/${params.url}`}
    >
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        {searchParams?.password === url.password
          ? 'Your link is password protected'
          : 'You entered a wrong password, try again'}
      </h1>
      <div className="w-full">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="********"
          required
        ></input>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  )
}
