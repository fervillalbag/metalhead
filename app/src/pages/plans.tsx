import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";

import Layout from "@/layout";
import client from "@/config/apollo";
import { GET_PLANS } from "@/graphql/queries/plan";
import { GET_PLAN_INFO } from "@/graphql/queries/planInfo";
import Skeleton from "@/components/Skeleton";

interface PlansIprops {
  dataPlans: any;
  dataInfo: any;
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: dataPlans } = await client.query({
    query: GET_PLANS,
  });

  const { data: dataInfo } = await client.query({
    query: GET_PLAN_INFO,
  });

  return {
    props: {
      dataPlans,
      dataInfo,
    },
    revalidate: 60 * 60 * 2,
  };
};

const Plans: React.FC<PlansIprops> = ({ dataPlans, dataInfo }) => {
  const dataHomePlans = dataPlans?.getPlans;
  const dataHomePlanInfo = dataInfo?.getPlanInfo;

  return (
    <Layout>
      <div className="w-11/12 max-w-6xl mx-auto">
        {!dataHomePlanInfo && (
          <div className="mx-auto w-32">
            <Skeleton type="text" />
          </div>
        )}

        <h3 className="text-2xl lg:text-4xl font-bold text-DarkBlue text-center">
          {dataHomePlanInfo?.title}
        </h3>

        {dataHomePlanInfo?.description.map((description: any) => (
          <div key={description.id}>
            {!dataHomePlanInfo && (
              <div className="w-10/12 mx-auto mt-8">
                <Skeleton type="text" />
                <Skeleton type="text" />
                <Skeleton type="text" />
              </div>
            )}

            <span className="block mt-4 text-DarkGrayishBlue font-regular text-sm text-center lg:w-9/12 mx-auto">
              {description.text}
            </span>
          </div>
        ))}

        {!dataHomePlanInfo && (
          <div className="grid grid-cols-2 gap-x-20 gap-y-16 w-10/12 mx-auto mt-8">
            <div className="w-full h-[500px]">
              <Skeleton type="thumbnail" />
            </div>
            <div className="w-full h-[500px]">
              <Skeleton type="thumbnail" />
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-[repeat(2,_370px)] gap-6 gap-y-10 justify-center pt-10 pb-20">
          {dataHomePlans.map((plan: any) => (
            <article
              key={plan.id}
              className={`border border-solid border-DarkGrayishBlue rounded px-6 py-8 ${
                plan.slug === "pro" && "bg-gray"
              }`}
            >
              <span className="block text-center font-bold text-VeryDarkBlue text-xl">
                {plan.name}
              </span>

              <div className="flex items-center justify-center mt-4">
                <span className="block mr-1">$</span>
                <span className="block text-4xl">{plan.price}</span>
              </div>

              <Link href="/plans">
                <a className="bg-white py-3 block text-center mt-4 rounded border border-DarkGrayishBlue border-solid">
                  Get Started
                </a>
              </Link>

              <ul className="mt-6">
                {plan.items.map((item: any) => (
                  <li
                    key={item.id}
                    className={`text-sm font-regular text-DarkGrayishBlue mb-4 ${
                      !item.status && "text-[rgba(0,0,0,0.2)] line-through"
                    }`}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Plans;
