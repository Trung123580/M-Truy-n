import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel.tsx'
import { listCategory, pathRoute } from '@/utils/constant.ts'
import { cn } from '@/lib/utils.ts'
import CardUI from '@/components/CardUI.tsx'
import { CirclePlus } from 'lucide-react'
import Title from '@/components/Title.tsx'
import type { ResponseStore } from '@/types'

const Banner = (props: {
  newStoreData: ResponseStore | undefined
  comingSoon: ResponseStore | undefined
  dataComplete: ResponseStore | undefined
}) => {
  const { newStoreData, comingSoon, dataComplete } = props
  return (
    <div className={cn('space-y-2 ')}>
      <div className='flex gap-2.5 md:flex-row flex-col'>
        <div className={cn('md:w-2/3 flex  items-center justify-between')}>
          <h3 className={cn('text-xl font-normal')}>Truyện Mới</h3>
        </div>
        <div className='w-full flex-1 gap-5 md:flex hidden'>
          <Title
            icon={<CirclePlus className={cn('hover:text-primary duration-300')} />}
            title={'Truyện Hoàn Thành'}
            pathName={pathRoute['story-list']}
            search={`?slug=${listCategory['hoan-thanh']}`}
          />
          <Title
            icon={<CirclePlus className={cn('hover:text-primary duration-300')} />}
            title={'Truyện Sắp Ra Mắt'}
            pathName={pathRoute['story-list']}
            search={`?slug=${listCategory['sap-ra-mat']}`}
          />
        </div>
      </div>
      <div className='flex gap-2.5 md:flex-row flex-col '>
        <Carousel
          className='md:w-2/3 rounded-xl overflow-hidden'
          plugins={[
            Autoplay({
              delay: 12000,
            }),
          ]}>
          <CarouselContent className='-ml-5 '>
            {(newStoreData?.items ?? []).map((item, index) => (
              <CarouselItem
                key={index}
                className='pl-4 md:pl-5 basis-1/2 xl:basis-1/4 lg:basis-[30%]'>
                <Card className='p-0 h-83 overflow-hidden'>
                  <CardContent className='h-full flex aspect-square items-center justify-center p-0'>
                    <CardUI
                      pathname={pathRoute.detail}
                      item={{ ...item }}
                      isSpace={false}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className='flex w-full flex-1 gap-4 md:gap-5 md:mt-0 mt-5'>
          <div className={cn('w-full space-y-2.5')}>
            <Title
              icon={<CirclePlus className={cn('hover:text-primary duration-300')} />}
              title={'Truyện Hoàn Thành'}
              pathName={pathRoute['story-list']}
              search={`?slug=${listCategory['truyen-moi']}`}
              className={'md:hidden'}
            />
            <Carousel
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
              opts={{
                align: 'start',
              }}
              orientation='vertical'
              className='w-full max-w-xs'>
              <CarouselContent className='mt-0 h-56 md:h-82.75 space-y-2.5 lg:space-y-3.5 xl:space-y-5'>
                {(dataComplete?.items ?? []).map((item, index) => (
                  <CarouselItem key={index} className='pt-0 md:basis-1/2 '>
                    <div className='rounded-xl overflow-hidden'>
                      <Card className='h-56 xl:h-72 py-0' key={item._id}>
                        <CardContent className='flex items-center justify-center p-0 h-full'>
                          <CardUI
                            pathname={pathRoute.detail}
                            item={{ ...item }}
                            isSpace={false}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          <div className={cn('w-full space-y-2.5')}>
            <Title
              icon={<CirclePlus className={cn('hover:text-primary duration-300')} />}
              title={'Truyện Hoàn Thành'}
              pathName={pathRoute['story-list']}
              search={`?slug=${listCategory['sap-ra-mat']}`}
              className={'md:hidden'}
            />
            <Carousel
              opts={{
                align: 'start',
              }}
              plugins={[
                Autoplay({
                  delay: 7000,
                }),
              ]}
              orientation='vertical'
              className='w-full max-w-xs'>
              <CarouselContent className='mt-0 h-56 md:h-82.75 space-y-2.5 lg:space-y-3.5 xl:space-y-5'>
                {(comingSoon?.items ?? []).map((item, index) => (
                  <CarouselItem key={index} className='pt-0 md:basis-1/2 '>
                    <div className='rounded-xl overflow-hidden'>
                      <Card className='h-56 xl:h-72 py-0' key={item._id}>
                        <CardContent className='flex items-center justify-center p-0 h-full'>
                          <CardUI
                            pathname={pathRoute.detail}
                            item={{ ...item }}
                            isSpace={false}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Banner
