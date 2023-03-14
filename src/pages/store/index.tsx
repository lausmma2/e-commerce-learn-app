/* eslint-disable prettier/prettier */
import { Container, Row } from "reactstrap";
import { QueryClient, useQuery, dehydrate } from "react-query";
import CustomCard from "@/components/CustomCard";
import { fetchFakeProducts } from "@/lib/fetcher";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}

/*export const getServerSideProps: GetServerSideProps<{
  products: IProduct[];
}> = async () => {
  const products = await fetchFakeProducts();
  return { props: { products } };
};*/

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("products", fetchFakeProducts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

/*type StoreProps = {
  products: IProduct[];
};*/

//const Store = ({ products }: StoreProps) => {
const Store = () => {
  // Tady není potřeba použít props, protože useQuery si data sám bere z cache (kde jsou pomocí prefetchQuery) podle queryKey... bez použití hydrate ale je potřeba použít props
  const { data, isLoading, refetch, error } = useQuery<IProduct[] | undefined>({
    queryKey: ["products"],
    queryFn: () => fetchFakeProducts(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    //initialData: products,
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
