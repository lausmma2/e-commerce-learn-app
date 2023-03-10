import Link from "next/link";
import styled from "styled-components";

type TodoProps = {
  title: string;
  completed: boolean;
  id: string;
};

export const Todo = ({ title, id }: TodoProps) => {
  return (
    <Container>
      {title} <Link href={`/todos/${id}`}>detail</Link>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  border: 1px solid black;
  margin: 1rem 0;
  background-color: ${({ theme }) => theme.colors.todoBackground};
`;
