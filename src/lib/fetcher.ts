export const fetchFakeProducts = () => {
    return fetch("https://fakestoreapi.com/products?limit=12").then((res) =>
      res.json()
    );
  };
  