import { Routes, Route, useLocation } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { MotionConfig } from 'framer-motion'
import { SidebarLayout, PageTransition } from './components/layout'
import { mdxComponents } from './mdx-components'
import Home from './pages/Home'
import Page from './pages/Page'

export default function App() {
  const location = useLocation()
  return (
    <MotionConfig reducedMotion="user">
      <MDXProvider components={mdxComponents}>
        <SidebarLayout>
          <PageTransition>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<Page />} />
            </Routes>
          </PageTransition>
        </SidebarLayout>
      </MDXProvider>
    </MotionConfig>
  )
}
