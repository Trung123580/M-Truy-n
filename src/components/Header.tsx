import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logo } from '@/assets'
import { Menu } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getCategoryStore } from '@/services'
import { NavLink } from 'react-router'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthProvider'
import { pathRoute } from '@/utils/constant'
import InputSearch from './InputSearch'

const Header = () => {
  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: getCategoryStore,
  })
  const { signIn, signOut, isLogin, user } = useAuth()

  return (
    <>
      <header className={cn('flex items-center justify-between  px-2.5 md:px-5 ')}>
        <div className={cn('relative -left-4 min-w-55 max-w-72')}>
          <NavLink to={{ pathname: '/' }}>
            <img src={logo} alt='logo' />
          </NavLink>
        </div>

        <div className={cn('md:block hidden flex-1')}>
          <InputSearch />
        </div>
        <div className='flex items-center gap-2'>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align={'end'}
              className={cn(
                'container max-h-100 md:max-h-auto bg-background border-none p-2',
              )}>
              <div
                className={cn('grid gap-1.5 grid-cols-2 md:grid-cols-4 lg:grid-cols-6')}>
                {(data?.items ?? []).map((item) => (
                  <NavLink to={`/${pathRoute.category}?slug=${item.slug}`}>
                    <DropdownMenuItem
                      className={cn(
                        'cursor-pointer text-center text-sm hover:bg-primary bg-dark',
                      )}
                      key={item._id}>
                      {item.name}
                    </DropdownMenuItem>
                  </NavLink>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user?.avatar ?? 'https://github.com/shadcn.png'}
                  alt={user?.userName ?? ''}
                />
                <AvatarFallback delayMs={12000}>
                  {user?.userName?.charAt(0) ?? 'MT'}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            {isLogin ? (
              <DropdownMenuContent className='bg-dark'>
                <DropdownMenuLabel className='text-center text-primary'>
                  Mê Truyện
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <NavLink to={pathRoute['story-follow']}>Truyện theo dõi</NavLink>
                </DropdownMenuItem>
                <NavLink to={pathRoute['story-read']}>
                  <DropdownMenuItem>Truyện đã đọc</DropdownMenuItem>
                </NavLink>
                <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent className='bg-dark'>
                <DropdownMenuLabel className='text-center text-primary'>
                  Mê Truyện
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signIn}>Login</DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
      </header>
      <div className='mb-4 md:hidden'>
        <InputSearch />
      </div>
    </>
  )
}
export default Header
