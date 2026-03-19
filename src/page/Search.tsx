import CardUI from '@/components/CardUI'
import ErrorPage from '@/components/ErrorPage'
import useResponsive from '@/components/hooks/useResponsive'
import Loading from '@/components/Loading'
import { Card, CardContent } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { getSearchStore } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router'

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') as string

  const page = searchParams.get('page') || 1
  const naviagte = useNavigate()

  const { isMobile } = useResponsive({ query: '(min-width: 768px)' })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tim-kiem', query],
    queryFn: () => getSearchStore({ query: query, page: Number(page) }),
    refetchInterval: 60000,
  })

  const handleChangePage = (page: number) => {
    if (page === 0) return
    naviagte(`?query=${query}&page=${page}`)
  }

  const totalPage = Math.ceil(Number(data?.params?.pagination?.totalItems ?? 0) / 24) ?? 0

  if (isLoading) return <Loading />
  if (isError) return <ErrorPage />
  return (
    <section className={cn('mt-5  px-2.5 md:px-5 ')}>
      <h3 className={cn('text-2xl font-normal capitalize')}>{data?.titlePage ?? ''}</h3>
      <div className={cn('mt-3')}>
        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-5 flex-1 flex-wrap justify-between',
          )}>
          {data?.items.map((item) => {
            return (
              <Card
                key={item._id}
                className={cn('p-0 h-64 md:h-72 lg:h-83 overflow-hidden')}>
                <CardContent
                  className={cn(
                    'h-full flex aspect-square items-center justify-center p-0',
                  )}>
                  <CardUI item={{ ...item }} />
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className={cn('py-4 md:py-6')}>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={
                    Number(page) > 1
                      ? `?query=${query}&page=${Number(page) - 1}`
                      : undefined
                  }
                />
              </PaginationItem>
              {/* {totalPage > 1 && (
                <>
                  {[1].map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href={`?query=${query}&page=${p}`}
                        isActive={p === Number(page)}
                        onClick={() => handleChangePage(p)}>
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </>
              )} */}
              {/* Ellipsis if current page > 4 */}
              {Number(page) > 3 && <PaginationEllipsis />}
              {/* Show 2 pages before & after current */}
              {Array.from({ length: isMobile ? 2 : 5 }, (_, i) => {
                const p = Number(page) - 1 + i
                if (p > 1 && p < totalPage - 1) {
                  return (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href={`?query=${query}&page=${p}`}
                        isActive={p === Number(page)}
                        onClick={() => handleChangePage(p)}>
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                }
                return null
              })}
              {/* Ellipsis if current page < totalPage - 3 */}
              {Number(page) < totalPage - 3 && <PaginationEllipsis />}
              {/* Always show last 2 pages */}
              {[...Array(totalPage).keys()].map((p, index) => (
                <PaginationItem key={p} className={cn(index === 0 ? 'hidden' : '')}>
                  <PaginationLink
                    href={`?query=${query}&page=${p}`}
                    isActive={p === Number(page)}
                    onClick={() => handleChangePage(p)}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href={
                    Number(page) < totalPage
                      ? `?query=${query}&page=${Number(page) + 1}`
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  )
}
export default Search
