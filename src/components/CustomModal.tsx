import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
} from "reactstrap";
import useCartStore from "@/hooks/useCartStore";

type ModalProps = {
  isOpen: boolean;
  toggle: () => void;
};

const CustomModal = ({ isOpen, toggle }: ModalProps) => {
  const products = useCartStore((state) => state.products);
  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        style={{ zIndex: 1200, marginTop: "10%" }}
      >
        <ModalHeader toggle={toggle}>Shopping Cart</ModalHeader>
        <ModalBody>
          <Container>
            {products.length < 1 && <span>...Nothing in the cart...</span>}
            {products &&
              products.map((product) => {
                return (
                  <Row key={product.id}>
                    <span>
                      {product.title} - ${product.price}
                    </span>
                  </Row>
                );
              })}
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomModal;
