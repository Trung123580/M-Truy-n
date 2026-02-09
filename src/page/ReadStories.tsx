import { useSearchParams } from 'react-router'
import { useEffect, useLayoutEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Heart, House, Logs } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import ErrorPage from '@/components/ErrorPage'
import Image from '@/components/Image'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { callApiReadStories, getDetails } from '@/services'
import type { ReadChapter } from '@/types'

const ReadStories = () => {
  const [searchParams] = useSearchParams()
  const slug = searchParams.get('slug') ?? ''
  const chapter = searchParams.get('chapter') ?? '1'
  const { data, isLoading, isError } = useQuery({
    queryKey: ['detail', slug],
    queryFn: () => getDetails({ slug }),
  })
  const [currentChapterData, setCurrentChapterData] = useState<ReadChapter | null>(null)

  useLayoutEffect(() => {
    if (!slug) window.history.back()
  }, [slug])

  useEffect(() => {
    if (data?.item.chapters?.length) {
      const chapterData = data?.item.chapters[0].server_data.find(
        (item) => item.chapter_name === chapter,
      )
      ;(async () => {
        const response = await callApiReadStories({
          chapter_api_data: chapterData?.chapter_api_data ?? '',
        })
        setCurrentChapterData(response as ReadChapter)
      })()
    }
  }, [data, chapter])

  const chaptersImage = currentChapterData?.item.chapter_image ?? []
  const domain_cdn = currentChapterData?.domain_cdn ?? ''
  const chapter_path = currentChapterData?.item.chapter_path ?? ''
  const chapters = data?.item.chapters?.[0]?.server_data ?? []

  if (isLoading) return <Loading />
  if (isError) return <ErrorPage />

  return (
    <div className='md:w-max mx-auto'>
      <div className='space-y-5 flex items-center flex-col my-4 md:my-10'>
        <h3 className='text-2xl text-center md:text-3xl font-bold text-primary'>
          {data?.item.name ?? ''}
        </h3>
        <span className='text-white text-xl'>
          {data?.item.author
            ?.map((item) => {
              if (!item) return 'Đang cập nhật'
              return item
            })
            .join(', ')}
        </span>
        <div className='flex gap-1.5 md:gap-2.5'>
          <Button size={'sm'}>
            <House />
          </Button>
          <Button size={'sm'}>
            <Logs />
            {/* <div>danh sach chuong menu fixd mở hiện bên trái</div> */}
          </Button>
          <div className='flex items-center gap-1.5 md:gap-2.5'>
            <Button disabled={chapter === '0'} size={'sm'}>
              <ChevronLeft />
            </Button>
            <div className='bg-white text-sm md:text-base font-medium text-dark h-full flex items-center px-2.5 rounded-md'>
              Chương {chapter}
            </div>
            <Button disabled={chapter === (chapters.length - 1).toString()} size={'sm'}>
              <ChevronRight />
            </Button>
          </div>
          <Button size={'sm'}>
            <Heart /> <span className='md:block hidden'>theo dõi</span>
          </Button>
        </div>
      </div>
      <div className='max-w-185 mx-auto'>
        {chaptersImage.map((item) => (
          <Image
            alt={item.image_file}
            key={item.image_file}
            loading='eager'
            className='object-cover'
            src={domain_cdn + '/' + chapter_path + '/' + item.image_file}
          />
        ))}
      </div>
    </div>
  )
}

export default ReadStories
