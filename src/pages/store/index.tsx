import { Container, Row } from "reactstrap";
import { useQuery } from "react-query";
import CustomCard from "@/components/CustomCard";
import { GetServerSideProps } from "next/types";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}

export const getServerSideProps: GetServerSideProps<{
  products: IProduct[];
}> = async () => {
  const products = await fetch(
    "https://fakestoreapi.com/products?limit=9"
  ).then((res) => res.json());
  return { props: { products } };
};

type StoreProps = {
  products: IProduct[];
};

const Store = ({ products }: StoreProps) => {
  const { data, isLoading, refetch, error } = useQuery<IProduct[] | undefined>({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products?limit=9").then((res) =>
        res.json()
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialData: products,
    //enabled: false,
  });

  if (error) {
    return <div>error</div>;
  }

  return (
    <Container>
      <Container>
        <h1 className="d-flex justify-content-center mt-4">
          Buy some of our products please
        </h1>
        <h4 className="d-flex justify-content-center pb-5 mt-4">
          Choose between milions of super cool products
        </h4>
      </Container>
      <Container>
        <Row className="d-flex justify-content-center align-items-center">
          {data &&
            !isLoading &&
            data.map((product: IProduct) => {
              return (
                <CustomCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  category={product.category}
                  price={product.price}
                  description={product.description}
                />
              );
            })}
        </Row>
      </Container>
    </Container>
  );
};

export default Store;
