import React from 'react'
import { NavLink } from 'react-router'
import { cn } from '@/lib/utils.ts'
import { pathRoute } from '@/utils/constant.ts'

type PathRoute = (typeof pathRoute)[keyof typeof pathRoute]
const Title = ({
  title,
  pathName,
  search,
  icon,
  className,
}: {
  className?: string
  icon?: React.ReactNode
  title: string
  pathName?: PathRoute
  search: string
}) => {
  return (
    <div className={cn('flex justify-between flex-1', className)}>
      <h3 className={cn('text-xs md:text-base xl:text-xl font-normal line-clamp-1')}>
        {title}
      </h3>
      <NavLink
        to={{
          pathname: pathName,
          search: search,
        }}
        className={cn('text-xl font-normal')}>
        {icon}
      </NavLink>
    </div>
  )
}
export default Title
