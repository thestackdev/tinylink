import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, Label, TextInput } from 'flowbite-react'
import { errorModalState } from 'store/utils'

export default function () {
  const [passwordInput, setPasswordInput] = useState('')
  const router = useRouter()
  const { shortUrl, error } = router.query

  useEffect(() => {
    console.log(error)
    if (error) errorModalState.value = 'Wrong password'
  }, [error])

  function handleSubmit(e) {
    e.preventDefault()
    window.open(`/api/${shortUrl}?password=${passwordInput}`, '_self')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 justify-center w-full max-w-lg mx-auto mt-8"
    >
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        Your link is password protected
      </h1>
      <div className="w-full">
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your email" />
        </div>
        <TextInput
          id="password"
          type="password"
          placeholder="********"
          required={true}
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
      </div>
      <Button className="ml-auto" type="submit">
        Submit
      </Button>
    </form>
  )
}
