import { pathRoute } from '@/utils/constant'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

const InputSearch = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const search = formData.get('search')
    if (search) {
      window.location.href = `${pathRoute.search}?query=${search}`
    }
  }

  return (
    <form className={cn('flex-1 px-3 text-2xl')} onSubmit={handleSubmit}>
      <Input
        placeholder='Nhập Tên Truyện'
        name='search'
        autoCapitalize='off'
        autoComplete='off'
        type='text'
        className='text-base placeholder:text-base placeholder:pl-1 placeholder:capitalize'
      />
    </form>
  )
}

export default InputSearch
