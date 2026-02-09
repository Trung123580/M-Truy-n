import { cn } from '@/lib/utils'

const Image = ({
  src,
  className,
  loading,
  alt,
}: {
  src: string
  className?: string
  loading?: 'eager' | 'lazy'
  alt?: string
}) => {
  return (
    <img
      loading={loading}
      className={cn('object-contain w-max', className)}
      src={src}
      alt={alt}
    />
  )
}

export default Image
