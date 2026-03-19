import dayjs from 'dayjs'
import { NavLink } from 'react-router'
import { cn } from '@/lib/utils.ts'
import type { ItemStore } from '@/types'
import { handleConcatPathImage } from '@/utils/helpers.ts'
import { Button } from './ui/button'
import { X } from 'lucide-react'

const CardUI = ({
  item,
  isSpace,
  pathname,
  isClose,
  onClose,
}: {
  pathname?: string
  item: ItemStore
  isSpace?: boolean
  isClose?: boolean
  onClose?: () => void
}) => {
  return (
    <NavLink
      to={{
        pathname: pathname,
        search: `?slug=${item.slug}`,
      }}
      className={cn('relative w-full h-full group')}>
      <img
        className='object-cover w-full h-full group-hover:scale-110 duration-300'
        src={handleConcatPathImage(item.thumb_url ?? '')}
        alt=''
      />
      {isClose && (
        <Button
          type='button'
          onClick={(e) => {
            e.preventDefault()
            onClose?.()
          }}
          className={cn(
            'absolute top-1 right-1 rounded-md scale-75 cursor-pointer hover:opacity-100 opacity-70 duration-300',
          )}
          size='sm'
          variant='link'>
          <X />
        </Button>
      )}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-16 lg:h-20 flex justify-center flex-col bg-background/80',
        )}>
        <h2 className={cn('text-sm lg:text-base line-clamp-1 pl-1')}>{item.name}</h2>
        <div className={cn('pl-1 line-clamp-1 text-xs lg:text-sm')}>
          <span>Thể loại: </span>
          {item.category?.map((cat) => (
            <span key={cat.id} className={cn('lowercase')}>
              {cat.name}
              {isSpace ? ', ' : ''}
            </span>
          ))}
        </div>
        <span
          className={cn(
            'pl-1 text-sm text-primary tracking-tight line-clamp-1',
          )}>{`Cập nhật: ${dayjs(item.updatedAt).format('DD/MM/YYYY hh:mm:ss')} `}</span>
      </div>
    </NavLink>
  )
}
export default CardUI
