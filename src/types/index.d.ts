export const typeList = 'truyen-moi' | 'sap-ra-mat' | 'dang-phat-hanh' | 'hoan-thanh'

export interface Category {
  id: string
  name: string
  slug: string
}

export interface ReadChapter {
  domain_cdn: string
  item: ChapterItem
}

export interface Chapter {
  filename: string
  chapter_name: string
  chapter_title: string
  chapter_api_data: string
}

export interface ItemStore {
  _id: string
  name: string
  slug: string
  origin_name: string[]
  status: string
  thumb_url: string
  sub_docquyen: boolean
  category: Category[]
  updatedAt: string
  chaptersLatest: Chapter[]
  content?: string
  author?: string[]
  chapters?: {
    server_data: ChapterItem[]
    server_name: string
  }[]
}

export interface ChapterItem {
  filename: string
  chapter_name: string
  chapter_title: string
  chapter_api_data: string
  _id?: string
  comic_name?: string
  chapter_path?: string
  chapter_image?: {
    image_page: number
    image_file: string
  }[]
}

export interface BreadCrumb {
  name: string
  slug: string
  isCurrent: boolean
  position: number
}

export interface Pagination {
  totalItems: number
  totalItemsPerPage: number
  currentPage: number
  pageRanges: number
}

export interface Params {
  type_slug: string
  slug: string
  filterCategory: string[]
  sortField: string
  pagination: Pagination
}

export interface SeoOnPage {
  descriptionHead: string
  og_type: string
  og_image: string[]
  titleHead: string
}

export interface ResponseStore {
  seoOnPage: SeoOnPage
  titlePage: string
  // breadCrumb: BreadCrumb[]
  items: ItemStore[]
  params: Params
  type_list: string
  APP_DOMAIN_FRONTEND: string
  APP_DOMAIN_CDN_IMAGE: string
}
export interface ResponseStoreDetail {
  seoOnPage: SeoOnPage
  titlePage: string
  // breadCrumb: BreadCrumb[]
  item: ItemStore
  params: Params
  type_list: string
  APP_DOMAIN_FRONTEND: string
  APP_DOMAIN_CDN_IMAGE: string
}
