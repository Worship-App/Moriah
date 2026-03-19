import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, User, Search, ChevronRight, Heart, MessageCircle, Share2 } from 'lucide-react'

const BlogPostCard = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
            {post.category}
          </span>
        </div>
        
        {/* Reading Time */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {post.readingTime}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {post.date}
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {post.author}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-amber-600 transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            Leer más
            <ChevronRight className="w-4 h-4" />
          </Link>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {post.likes}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {post.comments}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const FeaturedPost = ({ post }) => {
  return (
    <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl overflow-hidden shadow-xl">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="relative h-64 md:h-full">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="md:w-1/2 p-8 text-white">
          <div className="flex items-center gap-4 text-sm text-amber-100 mb-4">
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime}
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {post.title}
          </h2>

          <p className="text-amber-100 mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <div>
                <div className="font-medium">{post.author}</div>
                <div className="text-sm text-amber-100">{post.date}</div>
              </div>
            </div>
            
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 bg-white text-amber-600 px-4 py-2 rounded-lg font-medium hover:bg-amber-50 transition-colors"
            >
              Leer artículo
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const BlogSidebar = () => {
  const categories = [
    { name: 'Cuidado de Manillas', count: 8 },
    { name: 'Tendencias de Moda', count: 6 },
    { name: 'Guías de Estilo', count: 5 },
    { name: 'Mantenimiento', count: 4 },
    { name: 'Historia de Joyas', count: 3 }
  ]

  const popularPosts = [
    {
      title: 'Cómo limpiar tus manillas de plata',
      slug: 'limpiar-manillas-plata',
      date: '15 Mar 2024'
    },
    {
      title: 'Tendencias de manillas 2024',
      slug: 'tendencias-manillas-2024',
      date: '10 Mar 2024'
    },
    {
      title: 'Combinar manillas con tu outfit',
      slug: 'combinar-manillas-outfit',
      date: '5 Mar 2024'
    }
  ]

  const tags = [
    'plata', 'oro', 'cuero', 'elegante', 'casual', 'moda', 
    'cuidado', 'estilo', 'tendencias', 'accesorios'
  ]

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Buscar artículos
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar en el blog..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Categorías
        </h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-gray-700 dark:text-gray-300">
                {category.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Artículos populares
        </h3>
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <Link
              key={index}
              to={`/blog/${post.slug}`}
              className="block group"
            >
              <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {post.date}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Etiquetas populares
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Link
              key={index}
              to={`/blog/tag/${tag}`}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Datos de ejemplo para artículos del blog
  const featuredPost = {
    id: 1,
    title: 'Guía completa: Cómo cuidar tus manillas de plata para que duren toda la vida',
    excerpt: 'Aprende los mejores técnicas y productos para mantener tus manillas de plata brillantes y en perfecto estado. Desde la limpieza diaria hasta el mantenimiento profundo.',
    image: 'https://images.unsplash.com/photo-1603987837035-d4c1b1b9e3a2?w=800&h=400&fit=crop',
    category: 'Cuidado de Manillas',
    author: 'María González',
    authorImage: 'https://images.unsplash.com/photo-1494790108755-2616b332c6ca?w=50&h=50&fit=crop&crop=face',
    date: '20 Mar 2024',
    readingTime: '5 min lectura',
    slug: 'guia-cuidado-manillas-plata'
  }

  const blogPosts = [
    {
      id: 2,
      title: 'Tendencias de manillas 2024: Los estilos que están dominando la moda',
      excerpt: 'Descubre las últimas tendencias en manillas para este año. Desde diseños minimalistas hasta piezas statement, te mostramos lo que está en voga.',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=250&fit=crop',
      category: 'Tendencias de Moda',
      author: 'Ana Sofía',
      date: '18 Mar 2024',
      readingTime: '4 min lectura',
      likes: 45,
      comments: 12,
      slug: 'tendencias-manillas-2024'
    },
    {
      id: 3,
      title: 'Cómo combinar múltiples manillas sin sobrecargar tu look',
      excerpt: 'El arte del layering: aprende a combinar diferentes manillas para crear un look equilibrado y stylish. Tips expertos para evitar errores comunes.',
      image: 'https://images.unsplash.com/photo-1529139574841-a036b828b5b5?w=400&h=250&fit=crop',
      category: 'Guías de Estilo',
      author: 'Carlos Rodríguez',
      date: '15 Mar 2024',
      readingTime: '6 min lectura',
      likes: 38,
      comments: 8,
      slug: 'combinar-multiples-manillas'
    },
    {
      id: 4,
      title: 'Materiales: ¿Cuál es el mejor para tus manillas?',
      excerpt: 'Plata, oro, acero, cuero... Analizamos los pros y contras de cada material para que tomes la mejor decisión según tu estilo y presupuesto.',
      image: 'https://images.unsplash.com/photo-1603987837035-d4c1b1b9e3a2?w=400&h=250&fit=crop',
      category: 'Guías de Compra',
      author: 'Laura Martínez',
      date: '12 Mar 2024',
      readingTime: '7 min lectura',
      likes: 52,
      comments: 15,
      slug: 'mejores-materiales-manillas'
    },
    {
      id: 5,
      title: 'El significado detrás de diferentes estilos de manillas',
      excerpt: 'Explora el simbolismo y significado cultural de diferentes tipos de manillas a lo largo de la historia. Desde amuletos de protección hasta símbolos de estatus.',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=250&fit=crop',
      category: 'Historia de Joyas',
      author: 'Diego Herrera',
      date: '10 Mar 2024',
      readingTime: '8 min lectura',
      likes: 29,
      comments: 6,
      slug: 'significado-estilos-manillas'
    },
    {
      id: 6,
      title: 'Mantenimiento de manillas de cuero: Tips para prolongar su vida',
      excerpt: 'Las manillas de cuero requieren cuidados especiales. Te enseñamos cómo limpiar, hidratar y proteger tus accesorios de cuero para que duren años.',
      image: 'https://images.unsplash.com/photo-1603987837035-d4c1b1b9e3a2?w=400&h=250&fit=crop',
      category: 'Mantenimiento',
      author: 'María González',
      date: '8 Mar 2024',
      readingTime: '5 min lectura',
      likes: 41,
      comments: 10,
      slug: 'mantenimiento-manillas-cuero'
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Blog Moriah
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Descubre tips, tendencias y guías sobre el cuidado y estilo de tus manillas favoritas
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <FeaturedPost post={featuredPost} />
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
          >
            <option value="all">Todas las categorías</option>
            <option value="Cuidado de Manillas">Cuidado de Manillas</option>
            <option value="Tendencias de Moda">Tendencias de Moda</option>
            <option value="Guías de Estilo">Guías de Estilo</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Historia de Joyas">Historia de Joyas</option>
          </select>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No se encontraron artículos que coincidan con tu búsqueda.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Suscríbete a nuestro newsletter
          </h2>
          <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
            Recibe artículos exclusivos, tips de cuidado y ofertas especiales directamente en tu correo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button className="px-6 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
