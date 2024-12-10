import { Link, useRouteError } from 'react-router-dom'

export function Error() {
  const error = useRouteError() as Error

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-bold text-4xl">Error, something happened...</h1>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p>
        Return to{' '}
        <Link to="/" className="text-sky-500 dark:text-sky-400">
          dashboard
        </Link>
      </p>
    </div>
  )
}
