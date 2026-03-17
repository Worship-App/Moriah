import { useFilterStore } from '../../store/filterStore'
import { PRODUCT_TYPES, COLORS, MATERIALS, PRICE_RANGES } from '../../utils/constants'

export default function ProductFilters() {
  const { filters, setFilter, addFilterValue, removeFilterValue, clearFilters, setSearchQuery } = useFilterStore()

  const handlePriceRangeChange = (min, max) => {
    setFilter('priceRange', { min, max })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-primary">Filtros</h2>
        {(filters.type.length > 0 || filters.color.length > 0 || filters.materials.length > 0 || filters.searchQuery) && (
          <span className="text-xs font-semibold text-secondary bg-secondary bg-opacity-10 px-3 py-1 rounded-full">
            Activos
          </span>
        )}
      </div>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-primary mb-3">Buscar Productos</label>
        <input
          type="text"
          placeholder="Nombre o descripción..."
          value={filters.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
        />
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-sm font-medium text-primary mb-3">Tipo de Manilla</label>
        <div className="space-y-2">
          {PRODUCT_TYPES.map((type) => (
            <label key={type.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
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
                className="w-4 h-4 text-secondary rounded focus:ring-2 focus:ring-secondary cursor-pointer"
              />
              <span className="ml-3 text-sm text-gray-700 font-medium">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <label className="block text-sm font-medium text-primary mb-3">Color</label>
        <div className="space-y-2">
          {COLORS.map((color) => (
            <label key={color.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
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
                className="w-4 h-4 text-secondary rounded focus:ring-2 focus:ring-secondary cursor-pointer"
              />
              <span className="ml-3 text-sm text-gray-700 font-medium">{color.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium text-primary mb-3">Rango de Precio</label>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <label key={`${range.value.min}-${range.value.max}`} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
              <input
                type="radio"
                name="priceRange"
                checked={
                  filters.priceRange.min === range.value.min &&
                  filters.priceRange.max === range.value.max
                }
                onChange={() => handlePriceRangeChange(range.value.min, range.value.max)}
                className="w-4 h-4 text-secondary focus:ring-2 focus:ring-secondary cursor-pointer"
              />
              <span className="ml-3 text-sm text-gray-700 font-medium">{range.label}</span>
            </label>
          ))}
        </div>
        
        {/* Custom Price Range Inputs */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-3 font-semibold">O ingresa un rango personalizado:</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Mínimo</label>
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceRangeChange(parseInt(e.target.value) || 0, filters.priceRange.max)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Máximo</label>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceRangeChange(filters.priceRange.min, parseInt(e.target.value) || 1000000)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Materials Filter */}
      <div>
        <label className="block text-sm font-medium text-primary mb-3">Materiales</label>
        <div className="space-y-2">
          {MATERIALS.map((material) => (
            <label key={material.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
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
                className="w-4 h-4 text-secondary rounded focus:ring-2 focus:ring-secondary cursor-pointer"
              />
              <span className="ml-3 text-sm text-gray-700 font-medium">{material.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={clearFilters}
        className="w-full px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-primary rounded-lg hover:from-gray-200 hover:to-gray-100 transition-all font-semibold border border-gray-200 shadow-sm hover:shadow-md"
      >
        Limpiar Todos los Filtros
      </button>
    </div>
  )
}
