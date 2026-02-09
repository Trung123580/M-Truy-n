import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    'Content-Type': 'application/json',
    // cache: 'no-cache',
    // date: new Date().toISOString(),
  },
})
