import { useQuery } from "react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const fetchTodoDetail = (id: string) =>
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((response) =>
    response.json()
  );

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const todo = await fetchTodoDetail(id);
  return { props: { todo } };
};

type TodoDetailProps = {
  todo: Todo;
};

export const TodoDetail = (props: TodoDetailProps) => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, refetch } = useQuery({
    queryKey: ["todo-detail", id],
    queryFn: () => fetchTodoDetail(id),
    initialData: props.todo,
    refetchOnMount: false,
  });

  return (
    <>
      <Head>
        <title>{data?.title}</title>
      </Head>
      <main>
        <h1>Todo detail</h1>
        <div>{data?.title}</div>
        <button onClick={() => refetch()}>refetch</button>
      </main>
    </>
  );
};

export default TodoDetail;
