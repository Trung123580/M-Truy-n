import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/ThemeProvider.tsx'
import Category from '@/page/Category.tsx'
import App from './App.tsx'
import './index.css'
import { pathRoute } from '@/utils/constant.ts'
import StoryList from '@/page/StoryList.tsx'
import Header from '@/components/Header.tsx'
import ErrorPage from '@/components/ErrorPage.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import Details from './page/Details.tsx'
import ReadStories from './page/ReadStories.tsx'
import { Toaster } from '@/components/ui/sonner'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider defaultTheme={'dark'}>
        <div className={'container mx-auto'}>
          <BrowserRouter>
            <Header />
            <Toaster position='top-right' className='toaster groupx' duration={300000} />
            <Routes>
              <Route index element={<App />} />
              <Route path={pathRoute.category} element={<Category />} />
              <Route path={pathRoute['story-list']} element={<StoryList />} />
              <Route path={pathRoute.detail} element={<Details />} />
              <Route path={pathRoute['read-stories']} element={<ReadStories />} />
              <Route path='*' element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>,
)
