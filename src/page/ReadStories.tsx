import { NavLink, useNavigate, useSearchParams } from 'react-router'
import { useEffect, useLayoutEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, CircleArrowUp, Heart, House } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import ErrorPage from '@/components/ErrorPage'
import Image from '@/components/Image'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { callApiReadStories, getDetails } from '@/services'
import type { ReadChapter } from '@/types'
import MenuChapters from '@/components/MenuChapters'
import { cn } from '@/lib/utils'

const ReadStories = () => {
  const [currentChapterData, setCurrentChapterData] = useState<ReadChapter | null>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const slug = searchParams.get('slug') ?? ''
  const chapter = searchParams.get('chapter') ?? '1'
  const [isLoading, setIsLoading] = useState(false)
  const { data, isError } = useQuery({
    queryKey: ['detail', slug],
    queryFn: () => getDetails({ slug }),
  })
  console.log({ isLoading })
  useLayoutEffect(() => {
    if (!slug) window.history.back()
  }, [slug])

  useEffect(() => {
    if (data?.item.chapters?.length) {
      const chapterData = data?.item.chapters[0].server_data.find(
        (item) => item.chapter_name === chapter,
      )
      ;(async () => {
        setIsLoading(true)
        const response = await callApiReadStories({
          chapter_api_data: chapterData?.chapter_api_data ?? '',
        })
        setCurrentChapterData(response as ReadChapter)
        setIsLoading(false)
      })()
    }
  }, [data, chapter])

  const handlePrevChapter = () => {
    const currentIndex = chapters.findIndex((item) => item.chapter_name === chapter)
    if (currentIndex > 0) {
      const prevChapter = chapters[currentIndex - 1].chapter_name
      searchParams.set('chapter', prevChapter)
      navigate(`?${searchParams.toString()}`)
    }
  }

  const handleNextChapter = () => {
    const currentIndex = chapters.findIndex((item) => item.chapter_name === chapter)
    if (currentIndex < chapters.length - 1) {
      const nextChapter = chapters[currentIndex + 1].chapter_name
      searchParams.set('chapter', nextChapter)
      navigate(`?${searchParams.toString()}`)
    }
  }

  const chaptersImage = currentChapterData?.item.chapter_image ?? []
  const domain_cdn = currentChapterData?.domain_cdn ?? ''
  const chapter_path = currentChapterData?.item.chapter_path ?? ''
  const chapters = data?.item.chapters?.[0]?.server_data ?? []

  if (isLoading) return <Loading />
  if (isError) return <ErrorPage />

  return (
    <>
      <div className={cn('md:w-max mx-auto')}>
        <div className={cn('space-y-5 flex items-center flex-col my-4 md:my-10')}>
          <h3 className={cn('text-2xl text-center md:text-3xl font-bold text-primary')}>
            {data?.item.name ?? ''}
          </h3>
          <span className={cn('text-white text-xl')}>
            {data?.item.author
              ?.map((item) => {
                if (!item) return 'Đang cập nhật'
                return item
              })
              .join(', ')}
          </span>
          <div className={cn('flex gap-1.5 md:gap-2.5')}>
            <Button size={'sm'} className='px-0'>
              <NavLink
                className={cn('w-full h-full flex items-center px-2.5')}
                to={{
                  pathname: '/detail',
                  search: `slug=${slug}`,
                }}>
                <House />
              </NavLink>
            </Button>
            <MenuChapters chapters={chapters} slug={slug} chapterNumber={chapter} />
            <div className={cn('flex items-center gap-1.5 md:gap-2.5')}>
              <Button disabled={chapter === '1'} size={'sm'} onClick={handlePrevChapter}>
                <ChevronLeft />
              </Button>
              <div
                className={cn(
                  'bg-white text-sm md:text-base font-medium text-dark h-full flex items-center px-2.5 rounded-md',
                )}>
                Chương {chapter}
              </div>
              <Button
                onClick={handleNextChapter}
                disabled={chapter === (chapters.length - 1).toString()}
                size={'sm'}>
                <ChevronRight />
              </Button>
            </div>
            <Button size={'sm'}>
              <Heart /> <span className={cn('md:block hidden')}>theo dõi</span>
            </Button>
          </div>
        </div>
        <div className={cn('max-w-185 md:w-max mx-auto')}>
          {chaptersImage.map((item) => (
            <Image
              alt={item.image_file}
              key={item.image_file}
              loading='eager'
              className={cn('object-contain w-full')}
              src={domain_cdn + '/' + chapter_path + '/' + item.image_file}
            />
          ))}
        </div>
      </div>

      <Button
        className={cn(
          'fixed bottom-5 right-5 md:opacity-100 opacity-30 hover:opacity-100 duration-300',
        )}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <CircleArrowUp className='scale-150' />
      </Button>
    </>
  )
}

export default ReadStories
