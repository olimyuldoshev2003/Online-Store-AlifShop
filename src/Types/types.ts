export interface IExistedUser {
  userName: string;
  password: string;
}

export interface IBrands {
  id: number;
  brandName: string;
}

export interface ICategories {
  id: number;
  categoryImage: string;
  subCategories: [];
  categoryName: string;
}

export interface ISubCategories {
  id: number;
  subCategoryName: string;
}

export interface ISubCategoriesAdd {
  CategoryId: number;
  subCategoryName: string;
}

export interface ISubCategoriesEdit {
  Id: number;
  CategoryId: number;
  subCategoryName: string;
}

export interface IProductInfoFromCart {
  id: number;
  quantity: number;
}

export interface IProducts {
  id: number;
  productName: string;
  image: string;
  color: string;
  price: string;
  hasDiscount: boolean;
  discountPrice: number;
  quantity: number;
  productInMyCart: boolean;
  productInfoFromCart: IProductInfoFromCart;
}

export interface IProductsAdd {
  Images: [];
  BrandId: number;
  ColorId: number;
  ProductName: string;
  Description: string;
  Quantity: number;
  Weight: number;
  Size: number;
  Code: number;
  Price: number;
  HasDiscount: boolean;
  DiscountPrice: number;
  SubCategoryId: number;
}

export interface IProductsById {
  id: number;
  brand: string;
  color: string;
  images: [];
  users: [];
  productInfoFromCart: {},
  productName: string;
  description: string;
  quantity: number;
  weight: number;
  size: number;
  code: number;
  price: number;
  hasDiscount: boolean;
  discountPrice: number,
  subCategoryId: number;
}
