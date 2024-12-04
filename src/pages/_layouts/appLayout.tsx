import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/header'
import { api } from '@/lib/axios'

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    // This interceptor will basically intercept each response and check the status code
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Use isAxiosError to confirm the error is an Axios error and access its properties and types
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            // Add this {replace:true} so the user can't navigate back to the previous screen (dashboard)
            navigate('/sign-in', { replace: true })
          }
        }
      },
    )

    return () => {
      // Clean up the interceptors when the component unmounts
      // unmounts > removed from the DOM tree
      // if you don't clean up your interceptors they'll accumulate and you'll have memory problems
      // since there'll be a lot of interceptors processing each request
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
