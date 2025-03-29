import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSelectors from "@/hooks/useSelectors";
import { ProductProps } from "@/types/interfaces/interfaces";

const ProductProfile = () => {
  const { id } = useParams();
  const { user } = useSelectors();
  const navigate = useNavigate();
  const [prodcut, setProdcut] = useState<ProductProps>();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`products/fetch_single_product/${id}`);
      setProdcut(response.data.product);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const addToCart = async (id: string, productId: string) => {
    try {
      const response = await axios.post(`products/add_to_cart/${id}`, {
        productId,
      });
      console.log(response.data.message);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="flex flex-col items-center p-5">
      <Card className="w-screen max-w-sm">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardTitle className="capitalize">
            Shop: {prodcut?.shopName}
          </CardTitle>
          <CardDescription>
            <img src={prodcut?.imageUrl} alt={prodcut?.brand} />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-end gap-3">
          <span className="font-bold">{prodcut?.description}</span>
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
            impedit neque cum eum repudiandae porro quis enim ipsam, dolore
            molestias consectetur tenetur ex assumenda, quidem nesciunt
            inventore aliquam. Consectetur, repellendus?
          </span>
          <span className="font-bold">Total price: {prodcut?.price} EUR</span>
        </CardContent>

        <CardFooter className="flex w-full justify-between">
          <Button onClick={() => navigate("/")} variant="destructive">
            Back
          </Button>
          <Button
            onClick={() => addToCart(user?.id ?? "", prodcut?.id ?? "")}
            variant={"success"}
          >
            <ShoppingCart />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductProfile;
