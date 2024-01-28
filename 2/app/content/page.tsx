import React, { Suspense } from "react";

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

type RenderProductsProps = {
  products: ProductModel[];
};

const getProducts = async (): Promise<ProductModel[]> => {
  const response = await fetch("https://65b5302a41db5efd2867677c.mockapi.io/api/v1/products");
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
};

const RenderProducts: React.FC<RenderProductsProps> = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <img src={product.imageURL} alt={product.name} />
          <p>{product.stock}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </>
  );
};

const Page = async ({}: Props) => {
  const products: ProductModel[] = await getProducts();
  console.log(products);

  return (
    <>
      <div>Test Page</div>
      <RenderProducts products={products} />
    </>
  );
};

export default Page;
