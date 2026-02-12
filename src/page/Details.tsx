import { useLayoutEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getDetails } from '@/services'
import { handleConcatPathImage, handleStatus } from '@/utils/helpers'
import ErrorPage from '@/components/ErrorPage'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Database, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthProvider'
const variants = ['default', 'ghost', 'link', 'outline', 'secondary', 'destructive']

const Details = () => {
  const [searchParams] = useSearchParams()
  const [isShowAll, setIsShowAll] = useState(false)
  const slug = searchParams.get('slug') ?? ''

  const { onPushData, user } = useAuth()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['detail', slug],
    queryFn: () => getDetails({ slug }),
  })

  useLayoutEffect(() => {
    if (!slug) window.history.back()
    if (data?.item) document.title = data?.item.name
  }, [slug, data])

  console.log({ data })

  const isFollow = user?.follow?.find((item: any) => item._id === data?.item._id)

  if (isLoading) return <Loading />
  if (isError) return <ErrorPage />
  return (
    <section className='pb-10 px-2.5 md:px-5'>
      <div className='flex gap-5 mt-5 md:flex-row flex-col items-start'>
        <div className='mx-auto md:mx-0 min-w-56 max-w-66 w-full rounded-xl overflow-hidden'>
          <img
            className='w-full h-full object-contain'
            src={handleConcatPathImage(data?.item.thumb_url ?? '')}
            alt='image'
            loading='eager'
          />
        </div>
        <div className='md:max-w-4xl w-full'>
          <ul className='space-y-2 *:flex md:*:grid md:*:grid-cols-[1fr_8fr]  w-full '>
            <li className='items-center md:!grid-cols-1'>
              <span className='text-2xl text-primary'>{data?.item.name}</span>
            </li>
            <li className='space-x-2.5'>
              <span className='text-nowrap'>Tên tác giả:</span>
              <span className='w-max'>
                {data?.item.author
                  ?.map((item) => {
                    if (!item) return 'Đang cập nhật'
                    return item
                  })
                  .join(', ')}
              </span>
            </li>
            <li className='items-center space-x-2.5'>
              <span className='text-nowrap'>Thể loại:</span>
              <div className='flex flex-wrap gap-1.5'>
                {data?.item.category.map((item, index) => {
                  const variant = variants[index]
                  return <Button variant={variant as any}>{item.name}</Button>
                })}
              </div>
            </li>
            <li className='items-center space-x-2.5'>
              <span className='text-nowrap'>Trạng thái:</span>
              <span>{handleStatus(data?.item.status as string)}</span>
            </li>
            <li className='!grid-cols-1'>
              <span
                className='text-xl'
                dangerouslySetInnerHTML={{ __html: data?.item.content ?? '' }}></span>
            </li>
          </ul>
          <div className='flex gap-2.5 *:text-lg mt-5 *:flex-1 w-full md:flex-row flex-col md:w-[70%] *:cursor-pointer'>
            <Button>
              <NavLink
                to={`/read-stories?slug=${slug}&chapter=${data?.item.chapters?.[0]?.server_data?.[0]?.chapter_name}`}>
                Đọc Truyện
              </NavLink>
            </Button>
            <Button variant={'outline'}>Tiếp Tục Đọc</Button>
            <Button
              variant={'link'}
              onClick={() => onPushData({ data: data?.item, type: 'follow' })}>
              <Heart />
              {isFollow ? 'Bỏ Theo Dõi' : 'Theo Dõi'}
            </Button>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <div>
          {data?.item.chapters?.map((item) => {
            return (
              <div key={item.server_name}>
                <div className='flex items-center gap-1.5'>
                  <Database className='text-primary' />
                  <h3 className='text-2xl font-bold'>Danh sách chương</h3>
                </div>
                <div className='relative'>
                  <ul
                    className={cn(
                      'border  border-primary mt-5 rounded-xl p-2.5 overflow-auto transition-all duration-300',
                      isShowAll || item.server_data.length < 6 ? 'max-h-max' : 'max-h-80',
                    )}>
                    {item.server_data.map((chapter) => {
                      return (
                        <li
                          key={chapter.filename}
                          className='text-xl last:border-b-0 duration-300 border-b border-primary hover:bg-primary/30'>
                          <NavLink
                            className='inline-block w-full text-lg py-1'
                            to={`/read-stories?slug=${slug}&chapter=${chapter.chapter_name}`}>
                            Chương {chapter.chapter_name}
                          </NavLink>
                        </li>
                      )
                    })}
                  </ul>
                  <div
                    className={cn(
                      'absolute bottom-0 flex items-center justify-center left-0 h-10 bg-primary/30 w-full rounded-b-xl',
                      isShowAll || item.server_data.length < 6 ? 'hidden' : '',
                    )}>
                    <Button
                      className='cursor-pointer'
                      onClick={() => setIsShowAll(!isShowAll)}
                      variant={'link'}
                      size={'sm'}>
                      Xem Tất Cả
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Details
