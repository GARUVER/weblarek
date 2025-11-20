export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}

export interface IProduct {
  id: string; // Уникальный идентификатор товара
  title: string; // Название товара
  description: string; // Подробное описание товара
  image: string; // URL изображения товара
  category: string; // Категория товара
  price: number | null; // Цена товара (может быть null)
}

export interface IBuyer {
  payment: "card" | "cash" | ""; // Способ оплаты
  email: string; // Email адрес покупателя
  phone: string; // Телефон покупателя
  address: string; // Адрес доставки
}

export interface IOrderRequest extends IBuyer {
  total: number;
  items: string[];
}

export interface IOrderResponse {
  id: string;
  total: number;
}

export interface IErrorResponse {
  error: string;
}

export interface IProductsResponse {
  total: number;
  items: IProduct[];
}
