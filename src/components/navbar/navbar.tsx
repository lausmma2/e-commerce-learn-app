import useCartStore from "@/hooks/useCartStore";
import Link from "next/link";
import { useState } from "react";
import { Button } from "reactstrap";
import styled from "styled-components";
import CustomModal from "../CustomModal";

export const Navbar = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const cartItemsCount = useCartStore((state) => state.cartItemsCount);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

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
          onClick={toggleModal}
        >
          <div
            id="cart-count"
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
            <CustomModal isOpen={isOpenModal} toggle={toggleModal} />
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
  z-index: 1010;
`;

const Li = styled.li`
  display: inline;
  padding: 1rem;
`;
