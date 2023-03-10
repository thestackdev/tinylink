import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function DeleteModal({ show, onDelete, onAbort }) {
  return (
    <div
      id="delete-modal"
      className={`${show ? 'flex' : 'hidden'}
      fixed top-0 left-0 right-0 z-50  items-center justify-center backdrop-blur-sm p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={onAbort}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <XMarkIcon className="w-5 h-5" />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <ExclamationCircleIcon className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this url?
            </h3>
            <button
              onClick={onDelete}
              type="button"
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={onAbort}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
