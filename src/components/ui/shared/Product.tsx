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

import { ProductProps } from "@/types/interfaces/components";

const Product = ({ title, description, price, image }: ProductProps) => {
  return (
    <Card className="w-screen max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <img src={image} alt={title} />
        </CardDescription>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardContent>
        {price.toFixed(2).toString().replace(".", ",")} EUR
      </CardContent>
      <CardFooter className="flex items-center justify-between">
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
