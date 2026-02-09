import { useMediaQuery } from 'react-responsive'

const useResponsive = ({ query = '(min-width: 768px)' }: { query?: string }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query,
  })
  return { isMobile: !isDesktopOrLaptop, isDesktop: isDesktopOrLaptop }
}

export default useResponsive
