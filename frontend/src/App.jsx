import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:3000/data");
      const data = await res.json();
      console.log(data);
    }
    getData();
  }, []);

  return <>Hello</>;
}
