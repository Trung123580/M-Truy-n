import { instance } from '@/services/axios.ts'
import type { ReadChapter, ResponseStore, ResponseStoreDetail } from '@/types'
import axios from 'axios'

export const getHomeStore = async (): Promise<ResponseStore> => {
  try {
    const response = await instance.get('/home', {
      validateStatus: (status) => status === 200,
      params: {
        page: 3,
        limit: 12,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching home store data:', error)
    throw error
  }
}

export const getCategoryStore = async (): Promise<ResponseStore> => {
  try {
    const response = await instance.get('/the-loai', {
      validateStatus: (status) => status === 200,
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching home store data:', error)
    throw error
  }
}
export const getCategory = async ({
  type,
  page = 1,
}: {
  type: string
  page?: number
}): Promise<ResponseStore> => {
  try {
    const response = await instance.get(`/the-loai/${type}`, {
      validateStatus: (status) => status === 200,
      params: {
        page,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching home store data:', error)
    throw error
  }
}

export const getListStore = async ({
  type,
  page = 1,
}: {
  type: string
  page?: number
}): Promise<ResponseStore> => {
  try {
    const response = await instance.get(`/danh-sach/${type}`, {
      validateStatus: (status) => status === 200,
      params: {
        page,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching home store data:', error)
    throw error
  }
}

export const getDetails = async ({
  slug,
}: {
  slug: string
}): Promise<ResponseStoreDetail> => {
  try {
    const response = await instance.get(`/truyen-tranh/${slug}`, {
      validateStatus: (status) => status === 200,
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching home store data:', error)
    throw error
  }
}

export const callApiReadStories = async ({
  chapter_api_data,
}: {
  chapter_api_data: string
}): Promise<ReadChapter> => {
  try {
    const response = await axios.get(chapter_api_data, {
      validateStatus: (status) => status === 200,
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching home store data:', error)
    throw error
  }
}

export const getSearchStore = async ({
  query,
  page = 1,
}: {
  query: string
  page?: number
}): Promise<ResponseStore> => {
  try {
    const response = await instance.get(`/tim-kiem?keyword=${query}`, {
      validateStatus: (status) => status === 200,
      params: {
        page,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('Error fetching home store data:', error)
    throw error
  }
}
