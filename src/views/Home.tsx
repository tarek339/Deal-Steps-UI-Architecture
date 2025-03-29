import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { Product } from "@/components/ui/shared";
import useRequests from "@/hooks/useRequests";
import useSelectors from "@/hooks/useSelectors";

const Home = () => {
  const { fetchProducts, products } = useRequests();
  const { user } = useSelectors();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClick = async (id: string, productId: string) => {
    try {
      const response = await axios.post(`products/add_to_cart/${id}`, {
        productId,
      });
      console.log(response.data.message);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return (
    <div className="flex w-full flex-wrap justify-center gap-6 p-5">
      {products.map((product, i) => (
        <Product
          key={i}
          brand={product.brand}
          description={product.description}
          imageUrl={product.imageUrl}
          price={product.price}
          addToCart={() => handleClick(user?.id ?? "", product.id ?? "")}
          viewDetails={() => navigate(`/product-profile/${product.id}`)}
        />
      ))}
    </div>
  );
};

export default Home;
