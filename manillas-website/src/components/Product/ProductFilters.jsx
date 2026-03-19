import { useState } from 'react'
import { useFilterStore } from '../../store/filterStore'
import { PRODUCT_TYPES, COLORS, MATERIALS, PRICE_RANGES } from '../../utils/constants'
import { Search, X, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react'
import VoiceSearch from '../Common/VoiceSearch'

export default function ProductFilters() {
  const { filters, setFilter, addFilterValue, removeFilterValue, clearFilters, setSearchQuery } = useFilterStore()
  const [expandedSections, setExpandedSections] = useState({
    search: true,
    type: true,
    color: true,
    price: true,
    materials: true,
    advanced: false
  })

  const handlePriceRangeChange = (min, max) => {
    setFilter('priceRange', { min, max })
  }

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const activeFiltersCount = [
    filters.type.length,
    filters.color.length,
    filters.materials.length,
    filters.searchQuery ? 1 : 0,
    (filters.priceRange.min > 0 || filters.priceRange.max < 1000000) ? 1 : 0
  ].reduce((sum, count) => sum + count, 0)

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-amber-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filtros</h2>
          {activeFiltersCount > 0 && (
            <span className="text-xs font-semibold text-amber-700 bg-amber-100 dark:bg-amber-900 dark:text-amber-300 px-2 py-1 rounded-full">
              {activeFiltersCount} activos
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            Limpiar todo
          </button>
        )}
      </div>

      {/* Search Section */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <button
          onClick={() => toggleSection('search')}
          className="w-full flex items-center justify-between py-3 text-left"
        >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Buscar Productos</label>
          {expandedSections.search ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {expandedSections.search && (
          <div className="space-y-3">
            <VoiceSearch
              onSearch={setSearchQuery}
              placeholder="Buscar por nombre, descripción..."
              className="w-full"
            />
            
            {/* Quick Search Tags */}
            <div className="flex flex-wrap gap-2">
              {['Dorada', 'Plata', 'Elegante', 'Casual', 'Moderna'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-amber-100 dark:hover:bg-amber-900 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Type Filter */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <button
          onClick={() => toggleSection('type')}
          className="w-full flex items-center justify-between py-3 text-left"
        >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Tipo de Manilla</label>
          {expandedSections.type ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {expandedSections.type && (
          <div className="space-y-2">
            {PRODUCT_TYPES.map((type) => (
              <label key={type.value} className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={filters.type.includes(type.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      addFilterValue('type', type.value)
                    } else {
                      removeFilterValue('type', type.value)
                    }
                  }}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-2 focus:ring-amber-500 cursor-pointer"
                />
                <div className="ml-3 flex-1">
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{type.label}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{type.description}</p>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Color Filter */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <button
          onClick={() => toggleSection('color')}
          className="w-full flex items-center justify-between py-3 text-left"
        >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Color</label>
          {expandedSections.color ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {expandedSections.color && (
          <div className="space-y-2">
            {COLORS.map((color) => (
              <label key={color.value} className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={filters.color.includes(color.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      addFilterValue('color', color.value)
                    } else {
                      removeFilterValue('color', color.value)
                    }
                  }}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-2 focus:ring-amber-500 cursor-pointer"
                />
                <div className="ml-3 flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{color.label}</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between py-3 text-left"
        >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Rango de Precio</label>
          {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-3">
            {/* Preset Ranges */}
            <div className="grid grid-cols-2 gap-2">
              {PRICE_RANGES.map((range) => (
                <button
                  key={`${range.value.min}-${range.value.max}`}
                  onClick={() => handlePriceRangeChange(range.value.min, range.value.max)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.priceRange.min === range.value.min &&
                    filters.priceRange.max === range.value.max
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            
            {/* Custom Price Range */}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-semibold">Rango personalizado:</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Mínimo</label>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange.min}
                    onChange={(e) => handlePriceRangeChange(parseInt(e.target.value) || 0, filters.priceRange.max)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Máximo</label>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceRangeChange(filters.priceRange.min, parseInt(e.target.value) || 1000000)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Materials Filter */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
        <button
          onClick={() => toggleSection('materials')}
          className="w-full flex items-center justify-between py-3 text-left"
        >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Materiales</label>
          {expandedSections.materials ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {expandedSections.materials && (
          <div className="space-y-2">
            {MATERIALS.map((material) => (
              <label key={material.value} className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={filters.materials.includes(material.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      addFilterValue('materials', material.value)
                    } else {
                      removeFilterValue('materials', material.value)
                    }
                  }}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-2 focus:ring-amber-500 cursor-pointer"
                />
                <div className="ml-3 flex-1">
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{material.label}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{material.description}</p>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Filters */}
      <div>
        <button
          onClick={() => toggleSection('advanced')}
          className="w-full flex items-center justify-between py-3 text-left"
        >
          <label className="text-sm font-medium text-gray-900 dark:text-white">Filtros Avanzados</label>
          {expandedSections.advanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {expandedSections.advanced && (
          <div className="space-y-4">
            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">Disponibilidad</label>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded-lg">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => setFilter('inStockOnly', e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded focus:ring-2 focus:ring-amber-500 cursor-pointer"
                  />
                  <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">Solo productos disponibles</span>
                </label>
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">Ordenar por</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilter('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="featured">Destacados</option>
                <option value="price-low">Precio: Menor a mayor</option>
                <option value="price-high">Precio: Mayor a menor</option>
                <option value="name-asc">Nombre: A-Z</option>
                <option value="name-desc">Nombre: Z-A</option>
                <option value="newest">Más nuevos</option>
                <option value="rating">Mejor calificados</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">Calificación mínima</label>
              <div className="flex gap-2">
                {[4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilter('minRating', rating)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.minRating === rating
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900'
                    }`}
                  >
                    {rating}+ ⭐
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
