import React from "react";
import { GET_HEADER_HOME } from "@/graphql/queries/headerHome";
import client from "@/config/apollo";

const AdminHome: React.FC = () => {
  const [data, setData] = React.useState<any | null>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<[] | null>(
    null
  );

  React.useEffect(() => {
    (async () => {
      const { data: headerData } = await client.query({
        query: GET_HEADER_HOME,
      });
      setData(headerData?.getHeaderHome);
      setDescriptionArray(headerData?.getHeaderHome.description);
    })();
  }, []);

  console.log(descriptionArray);

  if (!data || !descriptionArray) return null;

  return (
    <div>
      <h1>Admin Page</h1>

      {data?.title}

      <hr />
      <section className="py-16">
        <span className="block">Header</span>

        <input
          type="text"
          value={data.title}
          className="w-11/12 border"
          onChange={(e: any) => setData({ ...data, title: e.target.value })}
        />
        {descriptionArray.map((item: any) => (
          <textarea
            key={item.id}
            value={item.text}
            className="w-11/12 border h-64"
            onChange={(e: any) => setData({ ...data, title: e.target.value })}
          ></textarea>
        ))}
      </section>
      <hr />
    </div>
  );
};

export default AdminHome;
