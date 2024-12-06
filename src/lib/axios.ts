import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

// It basically checks if the API delay is true
// then it creates a new promise that lasts 2 seconds
// this way we can test loading components of the page
if (env.VITE_ENABLE_API_DELAY) {
  // Before every API call , it'll execute the function below:
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config // config is the body of the API call
  })
}
