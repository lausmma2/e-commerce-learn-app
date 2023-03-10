import useCartStore, { Product } from "@/hooks/useCartStore";
import { IProduct } from "@/pages/store";
import Link from "next/link";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";

const CustomCard = ({ id, title, category, price, description }: IProduct) => {
  const [quantity, setQuantity] = useState<number>(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const prod = {
    id: id,
    title: title,
    price: price,
  };

  const handleAddClick = (prod: Product) => {
    addToCart(prod);
    setQuantity((prev) => prev + 1);
  };
  const handleDeleteClick = (productId: number) => {
    removeFromCart(productId);
    setQuantity((prev) => prev - 1);
  };
  return (
    <Card
      style={{
        width: "18rem",
        marginRight: "2%",
      }}
      className="d-flex p-2 mb-5"
      color="light"
      key={id}
    >
      <img alt="Sample" src="https://picsum.photos/300/200" />
      <CardBody>
        <CardTitle tag="h5">{title.substring(0, 20)}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {category}
        </CardSubtitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          ${price}
        </CardSubtitle>
        <CardText>
          {description.substring(0, 50).toLowerCase()}...
          <Link href={`/store/products/${id}`}>more</Link>
        </CardText>
        <Button
          onClick={() => handleAddClick(prod)}
          className="w-100"
          color="primary"
        >
          Add to cart
        </Button>
        <div className="d-flex justify-content-center">{quantity}</div>
        {quantity > 0 && (
          <Button
            onClick={() => handleDeleteClick(prod.id)}
            className="w-100 mb-2"
            color="danger"
          >
            Remove
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default CustomCard;
