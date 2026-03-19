import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/Common'
import Layout from './components/Layout/Layout'
import Cart from './components/Cart/Cart'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Blog from './pages/Blog'
import Favorites from './pages/Favorites'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ErrorBoundary>
      <Router basename="/Moriah">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      <Cart />
    </ErrorBoundary>
  )
}

export default App
