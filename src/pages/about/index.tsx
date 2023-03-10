import Head from "next/head";
import { useState } from "react";

// This page is pre-rendered at build time
// But it dos'nt loose interactive elements for example work wit state
// That means that you will receive pre rendered opage and after JS is loaded, page became interactive

const About = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <h1>About page</h1>
        <button onClick={() => setCount((value) => value + 1)}>{count}</button>
      </main>
    </>
  );
};

export default About;
