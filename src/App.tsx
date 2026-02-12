import Banner from '@/components/Banner.tsx'
import Main from './components/Main'
import { listCategory } from './utils/constant'
import { getListStore } from './services'
import { useQuery } from '@tanstack/react-query'
import ErrorPage from './components/ErrorPage'
import Loading from './components/Loading'
function App() {
  const {
    data: newStoreData,
    isLoading: isLoadingStore,
    isError: isErrorStore,
  } = useQuery({
    queryKey: ['list-store', listCategory['truyen-moi']],
    queryFn: () => getListStore({ type: listCategory['truyen-moi'] }),
    refetchInterval: 60000,
  })

  const {
    data: dataComplete,
    isLoading: isLoadingComplete,
    isError: isErrorComplete,
  } = useQuery({
    queryKey: ['result-store', listCategory['hoan-thanh']],
    queryFn: () => getListStore({ type: listCategory['hoan-thanh'] }),
    refetchInterval: 60000,
  })

  const {
    data: comingSoon,
    isLoading: isLoadingComingSoon,
    isError: isErrorComingSoon,
  } = useQuery({
    queryKey: ['coming-soon', listCategory['sap-ra-mat']],
    queryFn: () => getListStore({ type: listCategory['sap-ra-mat'] }),
    refetchInterval: 60000,
  })
  const option = {
    newStoreData,
    dataComplete,
    comingSoon,
  }

  if (isErrorStore || isErrorComingSoon || isErrorComplete) return <ErrorPage />
  if (isLoadingStore || isLoadingComingSoon || isLoadingComplete) return <Loading />
  return (
    <div className='px-2.5 md:px-5 '>
      <Banner {...option} />
      <Main isLoadingStore={isLoadingStore} />
    </div>
  )
}

export default App
