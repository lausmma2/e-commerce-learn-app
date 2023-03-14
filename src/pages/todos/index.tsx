import { Todo } from "@/components/todo";
import { useQuery } from "react-query";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Container } from "reactstrap";

const fetchTodos = (page: number, limit: number) =>
  // new Promise<any>((resolve) => {
  //   setTimeout(
  //     () =>
  //       resolve(
  fetch(
    `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`,
    {
      next: {
        revalidate: 60,
      },
    }
  ).then((response) => response.json());
//     ),
//   3000
// );
// });

export const getServerSideProps: GetServerSideProps<{
  todos: Todo[];
}> = async () => {
  const todos = await fetchTodos(0, 10);
  return { props: { todos } };
};

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type Props = {
  todos: Todo[];
};

export const Todos = ({ todos }: Props) => {
  const { data, refetch, isRefetching } = useQuery<Todo[]>({
    queryKey: ["todos"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: () => fetchTodos(0, 10),
    initialData: todos,
  });

  return (
    <>
      <Head>
        <title>Todo list</title>
      </Head>
      <main>
        <Container>
          <h1>Todos</h1>
          {isRefetching && <div>loading</div>}
          <div className="d-flex justify-content-between">
            <button onClick={() => refetch({})}>refetch</button>
            <button>Create a New Todo</button>
          </div>
          <div>
            {data?.map((todo) => (
              <Todo
                id={todo.id}
                key={todo.id}
                title={todo.title}
                completed={todo.completed}
              />
            ))}
          </div>
        </Container>
      </main>
    </>
  );
};

export default Todos;
