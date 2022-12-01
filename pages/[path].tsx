import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LaMetricData } from "../utils/types";
import styles from "../styles/Home.module.css";

const Page = () => {
  const router = useRouter();
  const { path } = router.query;

  const [data, setData] = useState<LaMetricData>();

  useEffect(() => {
    fetch(`/api/${path}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [path]);

  return (
    <div style={{ padding: "2rem" }}>
      <a
        href={`${process.env.NEXT_PUBLIC_URL}`}
        style={{
          padding: "0.5rem",
          border: "1px solid gray",
          borderRadius: "5px",
        }}
      >
        ⬅️ Go back
      </a>
      <p>/{path}</p>
      <pre>
        <code>{JSON.stringify(data, null, 4)}</code>
      </pre>
    </div>
  );
};

export default Page;
