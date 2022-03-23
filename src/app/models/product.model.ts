// export interface Product {
//   id: string;
//   title: string;
//   price: number;
//   image: string;
//   description: string;
//   category: string;
// }

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

// El patrón de diseño Data Transfer Object (DTO)
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

// export interface UpdateProductDTO {
//   title?: string;
//   price?: number;
//   images?: string[];
//   description?: string;
//   categoryId?: number;
// }

// Todos los datos son opcionales
export interface UpdateProductDTO extends Partial<CreateProductDTO> {}


