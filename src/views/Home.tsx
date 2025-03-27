import { useEffect } from "react";

import { Product } from "@/components/ui/shared";
import useRequests from "@/hooks/useRequests";

const Home = () => {
  const { fetchProducts, products } = useRequests();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex w-full flex-wrap justify-center gap-6 p-5">
      {products.map((product, i) => (
        <Product
          key={i}
          brand={product.brand}
          description={product.description}
          imageUrl={product.imageUrl}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default Home;
