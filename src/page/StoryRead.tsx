import CardUI from '@/components/CardUI'
import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/context/AuthProvider'
import { cn } from '@/lib/utils'
import type { ItemStore } from '@/types'
import { pathRoute } from '@/utils/constant'
import { useEffect } from 'react'
import { NavLink } from 'react-router'

const StoryRead = () => {
  const { user, isLogin, onDeleteData } = useAuth()
  const data = user?.history ?? []

  useEffect(() => {
    if (!isLogin) window.history.back()
  }, [isLogin])

  if (!isLogin) return <Loading />

  if (data.length === 0)
    return (
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-1/2 flex flex-col items-center justify-center py-20 text-center h-full'>
        <div className='text-9xl mb-8'>📚</div>

        <h2 className='text-xl font-semibold text-white/70 mb-4'>
          Bạn chưa có lịch sử đọc truyện
        </h2>

        <p className='text-white/70 mb-10 max-w-md'>
          Khi bạn đọc truyện, lịch sử sẽ được lưu tại đây để bạn dễ dàng tiếp tục đọc.
        </p>

        <NavLink to='/' className='w-full'>
          <Button className='w-full text-base' variant={'default'}>
            Khám phá truyện
          </Button>
        </NavLink>
      </div>
    )

  return (
    <section className={cn('mt-5  px-2.5 md:px-5 ')}>
      <h3 className={cn('text-2xl font-normal capitalize')}>Truyện Đã Đọc</h3>
      <div className={cn('mt-3')}>
        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-5 flex-1 flex-wrap justify-between',
          )}>
          {data?.map((item: ItemStore) => {
            return (
              <Card
                key={item._id}
                className={cn('p-0 h-64 md:h-72 lg:h-83 overflow-hidden')}>
                <CardContent
                  className={cn(
                    'h-full flex aspect-square items-center justify-center p-0',
                  )}>
                  <CardUI
                    isClose={true}
                    pathname={'/' + pathRoute.detail}
                    item={{ ...item }}
                    onClose={() => onDeleteData({ data: item, type: 'history' })}
                  />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default StoryRead
