import { useState } from 'react'
import { NavLink } from 'react-router'
import { ArrowDownNarrowWide, ArrowUpWideNarrow, Logs } from 'lucide-react'
import { logo } from '@/assets'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import type { ChapterItem } from '@/types'

const MenuChapters = ({
  chapters,
  slug,
  chapterNumber,
}: {
  chapters: ChapterItem[]
  slug?: string
  chapterNumber: string
}) => {
  const [isReverse, setIsReverse] = useState(false)
  const [renderChapters, setRenderChapters] = useState(chapters)

  const handleReverse = () => {
    setIsReverse(!isReverse)
    setRenderChapters(renderChapters.reverse())
  }

  return (
    <Drawer direction='left'>
      <DrawerTrigger asChild>
        <Button size={'sm'}>
          <Logs />
        </Button>
      </DrawerTrigger>
      <DrawerContent className={cn('border-none')}>
        <DrawerHeader>
          <DrawerTitle
            className={cn('flex text-xl md:text-2xl items-center justify-between')}>
            Danh Sách Chương
            <button onClick={handleReverse} className='cursor-pointer'>
              {isReverse ? (
                <ArrowUpWideNarrow className={cn('text-primary')} />
              ) : (
                <ArrowDownNarrowWide className={cn('text-primary')} />
              )}
            </button>
          </DrawerTitle>
          {/* <DrawerDescription>Select a chapter to read.</DrawerDescription> */}
        </DrawerHeader>
        <div className={cn('no-scrollbar overflow-y-auto px-2 md:px-4 py-2 md:py-4')}>
          <ul className={cn('list-none')}>
            {renderChapters.map((chapter, index) => {
              return (
                <li
                  key={chapter.filename + index}
                  className={cn(
                    'text-xl last:border-b-0 border-b border-primary duration-300 hover:bg-primary/30',
                    chapter.chapter_name === chapterNumber ? 'bg-primary/30' : '',
                  )}>
                  <NavLink
                    className={cn('inline-block w-full text-lg py-1 px-2')}
                    to={`/read-stories?slug=${slug}&chapter=${chapter.chapter_name}`}>
                    Chương {chapter.chapter_name}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </div>
        <DrawerFooter>
          <NavLink to={{ pathname: '/' }}>
            <img src={logo} alt='logo' />
          </NavLink>
          {/* <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default MenuChapters
