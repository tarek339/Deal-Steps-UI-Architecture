import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Product } from "@/components/ui/shared";
import useRequests from "@/hooks/useRequests";
import useSelectors from "@/hooks/useSelectors";

const Home = () => {
  const { fetchProducts, products } = useRequests();
  const { user } = useSelectors();
  const navigate = useNavigate();

  const [nextSlice, setNextSlice] = useState(10);

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

  const viewMore = () => {
    setNextSlice(nextSlice + 10);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <div className="flex w-full flex-wrap justify-center gap-6">
        {products.slice(0, nextSlice).map((product, i) => (
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
      <Button onClick={viewMore}>View More</Button>
    </div>
  );
};

export default Home;
