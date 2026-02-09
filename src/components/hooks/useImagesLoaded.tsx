import { useEffect, useState } from 'react'

interface ImageStatus {
  src: string
  loaded: boolean
  error: boolean
}

export default function useImagesLoaded({ selector = 'img' }: { selector?: string }) {
  const [status, setStatus] = useState<ImageStatus[]>([])
  const [allLoaded, setAllLoaded] = useState(false)
  useEffect(() => {
    // Get list of images inside useEffect
    const images = Array.from(document.querySelectorAll<HTMLImageElement>(selector))

    if (images.length === 0) {
      setAllLoaded(true)
      setStatus([])
      return
    }

    // Initialize status for each image
    const initialStatus = images.map((img) => ({
      src: img.src,
      loaded: img.complete && !!img.naturalWidth,
      error: img.complete && !img.naturalWidth,
    }))

    setStatus(initialStatus)
    setAllLoaded(initialStatus.every((s) => s.loaded || s.error))

    // Function to check status of all images
    const checkAll = () => {
      const currentStatus = images.map((img) => ({
        src: img.src,
        loaded: img.complete && !!img.naturalWidth,
        error: img.complete && !img.naturalWidth,
      }))
      setStatus(currentStatus)
      setAllLoaded(currentStatus.every((s) => s.loaded || s.error))
    }

    // Add load and error events for incomplete images
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', checkAll)
        img.addEventListener('error', checkAll)
      }
    })

    // Observe dynamic changes in DOM (if needed)
    const observer = new MutationObserver(() => {
      const updatedImages = Array.from(
        document.querySelectorAll<HTMLImageElement>(selector),
      )
      const newStatus = updatedImages.map((img) => ({
        src: img.src,
        loaded: img.complete && !!img.naturalWidth,
        error: img.complete && !img.naturalWidth,
      }))
      setStatus(newStatus)
      setAllLoaded(newStatus.every((s) => s.loaded || s.error))

      // Update events for new images
      updatedImages.forEach((img) => {
        if (!img.complete) {
          img.addEventListener('load', checkAll)
          img.addEventListener('error', checkAll)
        }
      })
    })

    // Observe changes in DOM
    observer.observe(document.body, { childList: true, subtree: true })

    // Cleanup
    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', checkAll)
        img.removeEventListener('error', checkAll)
      })
      observer.disconnect()
    }
  }, [selector, allLoaded])

  return { allLoaded, status }
}
