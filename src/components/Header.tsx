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
import { Input } from '@/components/ui/input.tsx'
import { cn } from '@/lib/utils'

const Header = () => {
  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: getCategoryStore,
  })
  return (
    <header className={cn('flex items-center justify-between  px-2.5 md:px-5 ')}>
      <div className={cn('relative -left-4 min-w-55 max-w-72')}>
        <NavLink to='/'>
          <img src={logo} alt='logo' />
        </NavLink>
      </div>

      <div className={cn('md:block hidden flex-1')}>
        <form action='' className={cn('flex-1 px-5 text-2xl')}>
          <Input
            placeholder='Nhập Tên Truyện'
            className='text-base placeholder:text-base placeholder:pl-1 placeholder:capitalize'
          />
        </form>
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
            <div className={cn('grid gap-1.5 grid-cols-2 md:grid-cols-4 lg:grid-cols-6')}>
              {(data?.items ?? []).map((item) => (
                <NavLink to={`/category?slug=${item.slug}`}>
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
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback delayMs={12000}>TT</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
export default Header
