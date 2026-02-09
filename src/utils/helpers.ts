export const PATH_IMAGE = import.meta.env.VITE_DOMAIN_CDN_IMAGE

export const handleConcatPathImage = (path: string) => {
  return PATH_IMAGE + path
}

export const handleStatus = (status: string) => {
  switch (status) {
    case 'ongoing':
      return 'Đang phát hành'
    case 'completed':
      return 'Hoàn thành'
    default:
      return status
  }
}
