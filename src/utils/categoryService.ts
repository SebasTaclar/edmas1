import type { Category } from '@/types/TeamType'

export interface CreateCategoryRequest {
  name: string
  description?: string
}

export interface CreateCategoryResponse {
  success: boolean
  category?: Category
  error?: string
}

class CategoryService {
  private categories: Category[] = [
    {
      id: 'adultos_masculino',
      name: 'Adultos Masculino',
      description: 'Categoría para equipos masculinos adultos (18+ años)',
    },
    {
      id: 'adultos_femenino',
      name: 'Adultos Femenino',
      description: 'Categoría para equipos femeninos adultos (18+ años)',
    },
    {
      id: 'infantil',
      name: 'Infantil',
      description: 'Categoría para equipos infantiles (hasta 17 años)',
    },
  ]

  // Obtener todas las categorías
  getAllCategories(): Category[] {
    return [...this.categories]
  }

  // Obtener categoría por ID
  getCategoryById(id: string): Category | null {
    return this.categories.find((category) => category.id === id) || null
  }

  // Crear nueva categoría
  createCategory(request: CreateCategoryRequest): CreateCategoryResponse {
    try {
      // Validar que el nombre no esté vacío
      if (!request.name.trim()) {
        return {
          success: false,
          error: 'El nombre de la categoría es requerido',
        }
      }

      // Generar ID único basado en el nombre
      const id = request.name
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '')

      // Verificar que no exista una categoría con ese ID
      if (this.categories.find((cat) => cat.id === id)) {
        return {
          success: false,
          error: 'Ya existe una categoría con ese nombre',
        }
      }

      const newCategory: Category = {
        id,
        name: request.name.trim(),
        description: request.description?.trim() || '',
      }

      this.categories.push(newCategory)

      // En una aplicación real, aquí se guardaría en la base de datos
      console.log('Nueva categoría creada:', newCategory)

      return {
        success: true,
        category: newCategory,
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error al crear la categoría',
      }
    }
  }

  // Actualizar categoría
  updateCategory(categoryId: string, request: CreateCategoryRequest): CreateCategoryResponse {
    try {
      const categoryIndex = this.categories.findIndex((cat) => cat.id === categoryId)

      if (categoryIndex === -1) {
        return {
          success: false,
          error: 'Categoría no encontrada',
        }
      }

      // Validar que el nombre no esté vacío
      if (!request.name.trim()) {
        return {
          success: false,
          error: 'El nombre de la categoría es requerido',
        }
      }

      // Actualizar la categoría
      this.categories[categoryIndex] = {
        ...this.categories[categoryIndex],
        name: request.name.trim(),
        description: request.description?.trim() || this.categories[categoryIndex].description,
      }

      // En una aplicación real, aquí se guardaría en la base de datos
      console.log('Categoría actualizada:', this.categories[categoryIndex])

      return {
        success: true,
        category: this.categories[categoryIndex],
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error al actualizar la categoría',
      }
    }
  }

  // Eliminar categoría (soft delete - solo marcar como inactiva si fuera necesario)
  deleteCategory(categoryId: string): boolean {
    try {
      const categoryIndex = this.categories.findIndex((cat) => cat.id === categoryId)

      if (categoryIndex === -1) {
        return false
      }

      // Verificar si hay equipos usando esta categoría
      // En una aplicación real, esto sería una consulta a la base de datos
      // Por ahora solo removemos la categoría
      this.categories.splice(categoryIndex, 1)

      // En una aplicación real, aquí se guardaría en la base de datos
      console.log('Categoría eliminada:', categoryId)

      return true
    } catch (error) {
      return false
    }
  }

  // Verificar si una categoría está en uso por equipos
  isCategoryInUse(categoryId: string): boolean {
    // En una aplicación real, esto haría una consulta a la base de datos
    // Por ahora simulamos que las categorías predefinidas están en uso
    const predefinedCategories = ['adultos_masculino', 'adultos_femenino', 'infantil']
    return predefinedCategories.includes(categoryId)
  }
}

const categoryService = new CategoryService()
export default categoryService
