import "./scss/styles.scss";

import { apiProducts } from "./utils/data";
import { Buyer } from "./components/models/buyer";
import { Basket } from "./components/models/basket";
import { Products } from "./components/models/products";
import { IBuyer, IProductsResponse } from "./types";
import { Api } from "./components/base/Api";
import { WebLarekApi } from "./components/Api/weblarek-api";
import { API_URL } from "./utils/constants";

// МОДЕЛИ

console.log("РАБОТА С ТОВАРАМИ");

const productsModel = new Products();
// Устанавливаем массив товаров и выбранный товар
productsModel.setItems(apiProducts.items);
productsModel.setItem(apiProducts.items[0]);

console.log("Все товары из каталога:", productsModel.getItems());
console.log(
  "Выбранный товар для детального просмотра:",
  productsModel.getItem()
);
console.log(
  "Поиск товара по ID:",
  productsModel.getItemById(apiProducts.items[1].id)
);

console.log("\n");

// РАБОТА МОДЕЛИ (BUYER)

console.log("РАБОТА С ДАННЫМИ ПОКУПАТЕЛЯ");

// Тестовые данные покупателя
const buyer1: IBuyer = {
  payment: "card",
  email: "ediktul@gmail.com",
  phone: "+79035418249",
  address: "ул. Лазо дом 23 пр. 2",
};

const buyerModel = new Buyer();
// Заполняем данные покупателя
buyerModel.setData({
  email: buyer1.email,
  phone: buyer1.phone,
  address: buyer1.address,
});

console.log("Сохраненные данные покупателя:", buyerModel.getData());
console.log("Проверка корректности данных:", buyerModel.validateData());

// Очищаем данные и показываем результат
buyerModel.clearData();
console.log("Данные после очистки:", buyerModel.getData());
console.log("\n");

// РАБОТА КОРЗИНЫ (BASKET)

console.log("РАБОТА КОРЗИНЫ");

const basketModel = new Basket();

// Добавляем четыре товара в корзину
console.log("Добавляем товары в корзину...");
basketModel.addItem(apiProducts.items[0]);
basketModel.addItem(apiProducts.items[1]);
basketModel.addItem(apiProducts.items[2]);
basketModel.addItem(apiProducts.items[3]);

console.log("Содержимое корзины:", basketModel.getBasketItems());
console.log("Количество товаров в корзине:", basketModel.getItemsTotal());
console.log("Общая стоимость корзины:", basketModel.getTotalPrice());
console.log(
  "Проверка наличия товара в корзине:",
  basketModel.checkItemById(apiProducts.items[0].id)
);

// Удаляем один товар
console.log("Удаляем товар из корзины...");
basketModel.removeItem(apiProducts.items[0]);
console.log("Корзина после удаления:", basketModel.getBasketItems());

// Очищаем всю корзину
console.log("Очищаем корзину полностью...");
basketModel.emptyBasket();
console.log("Корзина после очистки:", basketModel.getBasketItems());

//  РАБОТА С API

const baseApi = new Api(API_URL);
const localApi = new WebLarekApi(baseApi);

async function getProducts() {
  try {
    const productsModelApi = new Products();
    console.log("Загружаем товары с сервера...");

    const products: IProductsResponse = await localApi.getProducts();
    productsModelApi.setItems(products.items);

    console.log("Товары успешно загружены:", productsModelApi.getItems());
  } catch (error) {
    console.error("Ошибка при загрузке товаров:", error);
  }
}

// Запускаем загрузку товаров через API
getProducts();
