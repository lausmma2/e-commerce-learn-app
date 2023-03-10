import { useQuery } from "react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { IProduct } from "../..";

const fetchProductDetail = async (id: string) => {
  return await fetch(`https://fakestoreapi.com/products/${id}`).then((res) =>
    res.json()
  );
};

type ProductDetailProps = {
  product: IProduct;
};

export const ProductDetail = (props: ProductDetailProps) => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, refetch } = useQuery({
    queryKey: ["product-detail", id],
    queryFn: () => fetchProductDetail(id),
    initialData: props.product,
    refetchOnMount: false,
  });

  return (
    <>
      <Head>
        <title>{data?.title}</title>
      </Head>
      <main>
        <h1>Product detail</h1>
        <div>{data?.title}</div>
        <button onClick={() => refetch()}>refetch</button>
      </main>
    </>
  );
};

export default ProductDetail;
