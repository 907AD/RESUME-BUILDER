import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, User2Icon } from 'lucide-react'

const parseResponseData = async (response) => {
  const text = await response.text()

  if (!text) {
    return {
      message: `Request failed with status ${response.status}`,
    }
  }

  try {
    return JSON.parse(text)
  } catch {
    return {
      message: text,
    }
  }
}

const Login = () => {
  const navigate = useNavigate()
  const query = new URLSearchParams(window.location.search)
  const urlstate = query.get('state')

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/app')
    }
  }, [navigate])

  const [state, setState] = React.useState(urlstate || 'login')

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const endpoint =
        state === 'login'
          ? '/api/users/login'
          : '/api/users/register'
      const payload =
        state === 'login'
          ? { email: formData.email, password: formData.password }
          : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await parseResponseData(response)

      if (!response.ok) {
        throw new Error(result.message || `Request failed with status ${response.status}`)
      }

      if (!result.token || !result.user) {
        throw new Error('Authentication failed: invalid server response')
      }

      localStorage.setItem('token', result.token)
      localStorage.setItem('user', JSON.stringify(result.user))
      navigate('/app')
    } catch (error) {
      alert(error.message || 'Something went wrong')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[350px] rounded-2xl border border-gray-300/60 bg-white px-8 py-2 text-center shadow-sm"
      >
        {/* Heading */}
        <h1 className="mt-10 text-3xl font-medium text-gray-900">
          {state === 'login' ? 'Login' : 'Sign up'}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Please {state} to continue
        </p>

        {/* Name */}
        {state !== 'login' && (
          <div className="mt-6 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/80 bg-white pl-5">
            <User2Icon
              size={16}
              color="#6B7280"
            />

            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border-none bg-transparent pr-4 outline-none ring-0"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="mt-4 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/80 bg-white pl-5">

          <Mail
            size={15}
            color="#6B7280"
          />

          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="w-full border-none bg-transparent pr-4 outline-none ring-0"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mt-4 flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/80 bg-white pl-5">

          <Lock
            size={15}
            color="#6B7280"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border-none bg-transparent pr-4 outline-none ring-0"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgot Password */}
        <div className="mt-4 text-left">
          <button
            className="text-sm text-green-500 hover:underline"
            type="button"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-3 h-11 w-full rounded-full bg-green-500 text-white transition-all duration-200 hover:bg-green-600"
        >
          {state === 'login' ? 'Login' : 'Sign up'}
        </button>

        {/* Toggle Login / Signup */}
        <p
          onClick={() =>
            setState((prev) =>
              prev === 'login' ? 'register' : 'login'
            )
          }
          className="mb-11 mt-4 cursor-pointer text-sm text-gray-500"
        >
          {state === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}

          <span className="text-green-500 hover:underline">
            Click here
          </span>
        </p>

      </form>
    </div>
  )
}

export default Login
