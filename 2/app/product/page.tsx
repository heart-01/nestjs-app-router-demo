"use client";

import React, { useEffect, useState } from "react";
import { handleSubmitForm } from './action';

type Props = {};

type ProductModel = {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  stock: number;
  price: number;
  createdAt: string;
  updatedAt: string;
};

const getProducts = async (): Promise<ProductModel[]> => {
  const response = await fetch("https://65b5302a41db5efd2867677c.mockapi.io/api/v1/products");
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
};

const Page = (props: Props) => {
  const [productList, setProductList] = useState<ProductModel[]>([]);

  const initProduct = async () => {
    try {
      const products: ProductModel[] = await getProducts();
      setProductList(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    initProduct();
  }, []);

  console.log(productList);

  return (
    <div>
      Test Page
      {productList.map((product) => {
        return (
          <div key={product.id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <img src={product.imageURL} alt={product.name} />
            <p>{product.stock}</p>
            <p>{product.price}</p>
          </div>
        );
      })}
      <form action={handleSubmitForm}>
        Email <input name="email" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Page;
