import useCartStore from "@/hooks/useCartStore";
import Link from "next/link";
import { Button } from "reactstrap";
import styled from "styled-components";

export const Navbar = () => {
  const cartItemsCount = useCartStore((state) => state.cartItemsCount);
  return (
    <Container className={"shadow-sm sticky"}>
      <Li>
        <Link href="/">Home</Link>
      </Li>
      <Li>
        <Link href="/store">Store</Link>
      </Li>
      <Li>
        <Link href="/todos">Todos</Link>
      </Li>
      <Li>
        <Link href="/about">About</Link>
      </Li>
      <Li>
        <Button
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          variant="outline-primary"
          className="rounded-circle"
        >
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
              color: "white",
              width: "1.5rem",
              height: "1.5rem",
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%, 25%)",
            }}
          >
            {cartItemsCount}
          </div>
        </Button>
      </Li>
    </Container>
  );
};

const Container = styled.ul`
  background-color: white;
  padding: 1rem;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 1100;
`;

const Li = styled.li`
  display: inline;
  padding: 1rem;
`;
