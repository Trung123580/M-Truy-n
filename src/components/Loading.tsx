import { cn } from '@/lib/utils'

const Loading = () => {
  return (
    <section
      className={cn(
        'fixed bg-[#00000080] top-0 left-0 bottom-0 right-0 flex items-center justify-center',
      )}>
      <div
        className={cn(
          'w-12 h-12 border-4 border-solid border-t-transparent border-white rounded-full animate-spin',
        )}
      />
    </section>
  )
}
export default Loading
