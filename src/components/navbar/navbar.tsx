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
        <Link href="/tables">Tables</Link>
      </Li>
      <Li>
        <Link href="/todos">Todos</Link>
      </Li>
      <Li>
        <Link href="/about">About</Link>
      </Li>
      <Li>
        <Button
          id="cart-button"
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          outline
          color="primary"
          className="rounded-circle"
          onClick={toggleModal}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 122.43 122.88"
          >
            <path d="M22.63,12.6h93.3c6.1,0,5.77,2.47,5.24,8.77l-3.47,44.24c-0.59,7.05-0.09,5.34-7.56,6.41l-68.62,8.73 l3.63,10.53c29.77,0,44.16,0,73.91,0c1,3.74,2.36,9.83,3.36,14h-12.28l-1.18-4.26c-24.8,0-34.25,0-59.06,0 c-13.55-0.23-12.19,3.44-15.44-8.27L11.18,8.11H0V0h19.61C20.52,3.41,21.78,9.15,22.63,12.6L22.63,12.6z M53.69,103.92 c5.23,0,9.48,4.25,9.48,9.48c0,5.24-4.25,9.48-9.48,9.48c-5.24,0-9.48-4.24-9.48-9.48C44.21,108.17,48.45,103.92,53.69,103.92 L53.69,103.92z M92.79,103.92c5.23,0,9.48,4.25,9.48,9.48c0,5.24-4.25,9.48-9.48,9.48c-5.24,0-9.48-4.24-9.48-9.48 C83.31,108.17,87.56,103.92,92.79,103.92L92.79,103.92z" />
          </svg>
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
