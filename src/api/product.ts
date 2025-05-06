import { addToast } from "@heroui/react";


export const fetchProducts = async ({
  filter,
}:{
  filter?: Record<string, unknown>,
}) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/products/list/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filter),
      credentials: 'include',
    });
    if (!response.ok) {
      addToast({
        title: "Error",
        description: "Error fetching products",
        color: "danger",
      });
      return null;
    }
    const json = await response.json();
    if (!json.success) {
      addToast({
        title: "Error",
        description: "Error fetching products",
        color: "danger",
      });
      return null;
    }
    return json.products;
  } catch (error) {
    console.warn('Error fetching products', error);
    addToast({
      title: "Error",
      description: "Error fetching products",
      color: "danger",
    });
    return null;
  };
}

const ProductAPI = {
  fetchProducts,
};

export default ProductAPI;