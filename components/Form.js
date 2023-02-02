import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { expireAtOptions } from 'helpers/expireAt'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

export default function Button() {
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(() => resetForm())
  const [submittion, setSubmittion] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    setForm(resetForm())
  }, [modalOpen])

  function resetForm() {
    return {
      source: '',
      passwordEnabled: false,
      password: '',
      expireAt: 'twentyFourHours',
      oneTimeUse: false,
    }
  }

  function handleChange(event) {
    setForm((e) => ({ ...e, [event.target.name]: event.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmittion(true)
    await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .catch((e) => {
        console.log(e)
      })

    setModalOpen(false)
    setSubmittion(false)

    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <>
      <div className="fixed right-6 bottom-6 group">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        >
          <PlusIcon className="w-8 h-8 transition-transform group-hover:rotate-45" />
          <span className="sr-only">Open actions menu</span>
        </button>
      </div>
      <div
        className={`${
          modalOpen ? 'flex' : 'hidden'
        } fixed items-center justify-center bg-black bg-opacity-70 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              onClick={() => setModalOpen(false)}
            >
              <XMarkIcon className="w-5 h-5" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Shorten your URL
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="url"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Source URL
                  </label>
                  <input
                    type="text"
                    name="source"
                    id="url"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="https://www.google.com"
                    required
                    value={form.source}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      name="passwordEnabled"
                      value={form.passwordEnabled}
                      onChange={() =>
                        setForm((e) => ({
                          ...e,
                          passwordEnabled: !e.passwordEnabled,
                        }))
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Password protected
                    </span>
                  </label>
                </div>
                {form.passwordEnabled && (
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="********"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>
                )}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    name="oneTimeUse"
                    value={form.oneTimeUse}
                    onChange={() =>
                      setForm((e) => ({ ...e, oneTimeUse: !e.oneTimeUse }))
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Expire after use
                  </span>
                </label>

                {!form.oneTimeUse && (
                  <div>
                    <label
                      htmlFor="expireAt"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Expire in
                    </label>
                    <select
                      id="expireAt"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="expireAt"
                      required
                      value={form.expireAt}
                      onChange={handleChange}
                    >
                      {Object.keys(expireAtOptions).map((e) => (
                        <option key={e} value={e}>
                          {expireAtOptions[e].value}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  disabled={submittion}
                >
                  {submittion ? 'Please wait...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
