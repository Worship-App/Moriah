import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductFilters from './ProductFilters'
import { useFilterStore } from '../../store/filterStore'

// Mock the store
vi.mock('../../store/filterStore', () => ({
  useFilterStore: vi.fn(),
}))

describe('ProductFilters Component', () => {
  const mockFilterStore = {
    filters: {
      type: [],
      color: [],
      priceRange: { min: 0, max: 1000000 },
      materials: [],
      searchQuery: '',
    },
    setFilter: vi.fn(),
    addFilterValue: vi.fn(),
    removeFilterValue: vi.fn(),
    clearFilters: vi.fn(),
    setSearchQuery: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    useFilterStore.mockReturnValue(mockFilterStore)
  })

  it('3.1.1 - Debe renderizar el componente ProductFilters con opciones de filtrado', () => {
    render(<ProductFilters />)
    
    expect(screen.getByText('Filtros')).toBeInTheDocument()
    expect(screen.getByText('Buscar Productos')).toBeInTheDocument()
    expect(screen.getByText('Tipo de Manilla')).toBeInTheDocument()
    expect(screen.getByText('Color')).toBeInTheDocument()
    expect(screen.getByText('Rango de Precio')).toBeInTheDocument()
    expect(screen.getByText('Materiales')).toBeInTheDocument()
  })

  it('3.1.2 - Debe implementar filtro por tipo de manilla con checkboxes', () => {
    render(<ProductFilters />)
    
    const typeCheckboxes = screen.getAllByRole('checkbox').filter(cb => {
      const label = cb.closest('label')
      return label && (label.textContent.includes('Pulsera') || label.textContent.includes('Brazalete'))
    })
    
    expect(typeCheckboxes.length).toBeGreaterThan(0)
  })

  it('3.1.3 - Debe implementar filtro por color con checkboxes', () => {
    render(<ProductFilters />)
    
    const colorCheckboxes = screen.getAllByRole('checkbox').filter(cb => {
      const label = cb.closest('label')
      return label && (label.textContent.includes('Dorado') || label.textContent.includes('Plateado'))
    })
    
    expect(colorCheckboxes.length).toBeGreaterThan(0)
  })

  it('3.1.4 - Debe implementar filtro por rango de precio', () => {
    render(<ProductFilters />)
    
    expect(screen.getByText('Rango de Precio')).toBeInTheDocument()
    expect(screen.getByText('Menos de $50.000')).toBeInTheDocument()
    expect(screen.getByText('$50.000 - $100.000')).toBeInTheDocument()
  })

  it('3.1.4 - Debe permitir ingresar rango de precio personalizado', () => {
    render(<ProductFilters />)
    
    const minInput = screen.getByPlaceholderText('Min')
    const maxInput = screen.getByPlaceholderText('Max')
    
    expect(minInput).toBeInTheDocument()
    expect(maxInput).toBeInTheDocument()
  })

  it('3.1.5 - Debe implementar filtro por materiales con checkboxes', () => {
    render(<ProductFilters />)
    
    const materialCheckboxes = screen.getAllByRole('checkbox').filter(cb => {
      const label = cb.closest('label')
      return label && (label.textContent.includes('Oro') || label.textContent.includes('Plata'))
    })
    
    expect(materialCheckboxes.length).toBeGreaterThan(0)
  })

  it('3.1.6 - Debe tener botón para limpiar filtros', () => {
    render(<ProductFilters />)
    
    const clearButton = screen.getByText('Limpiar Todos los Filtros')
    expect(clearButton).toBeInTheDocument()
  })

  it('3.1.6 - Debe llamar clearFilters al hacer clic en el botón de limpiar', () => {
    render(<ProductFilters />)
    
    const clearButton = screen.getByText('Limpiar Todos los Filtros')
    fireEvent.click(clearButton)
    
    expect(mockFilterStore.clearFilters).toHaveBeenCalled()
  })

  it('Debe actualizar búsqueda cuando se escribe en el input', () => {
    render(<ProductFilters />)
    
    const searchInput = screen.getByPlaceholderText('Nombre o descripción...')
    fireEvent.change(searchInput, { target: { value: 'pulsera' } })
    
    expect(mockFilterStore.setSearchQuery).toHaveBeenCalledWith('pulsera')
  })

  it('Debe agregar valor de filtro cuando se selecciona un checkbox', () => {
    render(<ProductFilters />)
    
    const checkboxes = screen.getAllByRole('checkbox')
    const firstCheckbox = checkboxes[0]
    
    fireEvent.click(firstCheckbox)
    
    expect(mockFilterStore.addFilterValue).toHaveBeenCalled()
  })

  it('Debe tener estilos premium con Tailwind CSS', () => {
    const { container } = render(<ProductFilters />)
    
    const filterContainer = container.querySelector('.bg-white')
    expect(filterContainer).toHaveClass('rounded-lg', 'shadow-md', 'border')
  })

  it('Debe ser responsive en todos los tamaños', () => {
    const { container } = render(<ProductFilters />)
    
    const priceInputs = container.querySelectorAll('input[type="number"]')
    expect(priceInputs.length).toBe(2)
    
    // Verificar que los inputs están en un grid responsive
    const gridContainer = container.querySelector('.grid')
    expect(gridContainer).toHaveClass('grid-cols-2', 'gap-3')
  })

  it('Debe mostrar indicador de filtros activos', () => {
    const storeWithActiveFilters = {
      ...mockFilterStore,
      filters: {
        ...mockFilterStore.filters,
        type: ['pulsera'],
      },
    }
    
    useFilterStore.mockReturnValue(storeWithActiveFilters)
    render(<ProductFilters />)
    
    expect(screen.getByText('Activos')).toBeInTheDocument()
  })

  it('Debe manejar cambios en el rango de precio personalizado', () => {
    render(<ProductFilters />)
    
    const minInput = screen.getByPlaceholderText('Min')
    fireEvent.change(minInput, { target: { value: '50000' } })
    
    expect(mockFilterStore.setFilter).toHaveBeenCalledWith('priceRange', expect.objectContaining({ min: 50000 }))
  })
})
