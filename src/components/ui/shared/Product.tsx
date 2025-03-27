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

import { ProductProps } from "@/types/interfaces/interfaces";

const Product = ({ brand, description, imageUrl, price }: ProductProps) => {
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
        <Button variant={"default"}>
          <Info />
        </Button>
        <Button variant={"success"}>
          <ShoppingCart />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
