import { Info, ShoppingCart } from "lucide-react";

import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";

import { PorductCardProps } from "@/types/interfaces/components";

const Product = ({
  brand,
  description,
  imageUrl,
  price,
  addToCart,
  viewDetails,
}: PorductCardProps) => {
  return (
    <Card className="h-full w-screen max-w-sm">
      <CardHeader>
        <CardTitle>{brand}</CardTitle>
        <CardDescription>
          <img src={imageUrl} alt={brand} />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-end gap-3">
        <span>{description}</span>
        <span>{price} EUR</span>
      </CardContent>
      <CardFooter className="flex w-full justify-between">
        <Button onClick={viewDetails} variant={"default"}>
          <Info />
        </Button>
        <Button onClick={addToCart} variant={"success"}>
          <ShoppingCart />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
