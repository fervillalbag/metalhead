import React from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Layout from "@/layout";
import client from "@/config/apollo";
import Loading from "@/components/Loading";
import { GET_HEADER_HOME } from "@/graphql/queries/headerHome";
import { GET_GROWTH_INFO_HOME } from "@/graphql/queries/growthInfo";
import { GET_GROWTH_HOME } from "@/graphql/queries/growthHome";
import { GET_REVIEW_HOME } from "@/graphql/queries/reviewHome";
import { GET_REVIEW_INFO } from "@/graphql/queries/reviewInfo";
import { HeaderInfo } from "types/header";
import { GrowthData, GrowthInfo } from "types/growth";
import { ReviewData, ReviewInfo } from "types/review";

interface HomeIprops {
  headerData: {
    getHeaderHome: HeaderInfo;
  };
  growthData: {
    getGrowthInfoHome: GrowthInfo;
  };
  reviewData: {
    getReviewHome: ReviewData[];
  };
  reviewInfoData: {
    getReviewInfoHome: ReviewInfo;
  };
  growthHome: {
    getGrowthHome: GrowthData[];
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: headerData } = await client.query({
    query: GET_HEADER_HOME,
  });

  const { data: growthData } = await client.query({
    query: GET_GROWTH_INFO_HOME,
  });

  const { data: reviewData } = await client.query({
    query: GET_REVIEW_HOME,
  });

  const { data: reviewInfoData } = await client.query({
    query: GET_REVIEW_INFO,
  });

  const { data: growthHome } = await client.query({
    query: GET_GROWTH_HOME,
  });

  return {
    props: {
      headerData,
      growthData,
      reviewData,
      reviewInfoData,
      growthHome,
    },
    revalidate: 60,
  };
};

const Home: React.FC<HomeIprops> = ({
  headerData,
  growthData,
  reviewData,
  reviewInfoData,
  growthHome,
}) => {
  const headerHomeData = headerData?.getHeaderHome;
  const growthHomeData = growthData?.getGrowthInfoHome;
  const reviewHomeData = reviewData?.getReviewHome;
  const reviewInfoHomeData = reviewInfoData?.getReviewInfoHome;
  const growthItemsHomeData = growthHome?.getGrowthHome;

  if (
    !headerHomeData ||
    !growthHomeData ||
    !reviewHomeData ||
    !reviewInfoHomeData ||
    !growthItemsHomeData
  )
    return <Loading />;

  return (
    <div>
      <Layout>
        <div className="hidden lg:block absolute right-[-160px] top-[-200px] -z-10">
          <img src="/bg-tablet-pattern.svg" alt="" />
        </div>

        <header className="lg:flex items-center max-w-6xl w-11/12 mx-auto py-0 lg:py-8">
          <div className="flex-1 mb-10 lg:mb-0">
            <h3 className="text-4xl lg:text-6xl font-bold text-DarkBlue">
              {headerHomeData?.title}
            </h3>
            {headerHomeData &&
              headerHomeData.description.map((item: any) => (
                <p
                  key={item.id}
                  className="w-full lg:w-8/12 text-DarkGrayishBlue mt-6"
                >
                  {item.text}
                </p>
              ))}
          </div>
          <div className="flex flex-1 justify-center">
            <LazyLoadImage
              src={headerHomeData?.image}
              alt=""
              width={"100%"}
              height={"100%"}
            />
          </div>
        </header>

        <section className="max-w-6xl mx-auto w-11/12 lg:flex items-start py-8 lg:py-16">
          <div className="flex-1">
            <h3 className="text-2xl lg:text-4xl font-bold text-DarkBlue">
              {growthHomeData?.title}
            </h3>
            {growthHomeData?.description.map((item: any) => (
              <p
                key={item.id}
                className="w-full lg:w-8/12 text-DarkGrayishBlue mt-6"
              >
                {item.text}
              </p>
            ))}
          </div>
          <div className="flex-1 mt-8">
            {growthItemsHomeData.map((item: any, index: number) => (
              <article
                key={item.id}
                className="grid grid-cols-[60px_1fr] items-center mb-10 gap-x-4"
              >
                <div className="bg-BrightRed text-white py-2 px-4 rounded-2xl text-center text-xs font-bold">
                  0{index + 1}
                </div>
                <div className="text-DarkBlue font-semibold">{item.title}</div>
                <div className="col-start-1 lg:col-start-2 col-end-5 mt-3 text-DarkGrayishBlue">
                  {item.description.map((item: any) => (
                    <span key={item.id}>{item.text}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-6xl w-11/12 mx-auto text-2xl lg:text-4xl font-bold text-DarkBlue py-8">
          <h3 className="text-center">{reviewInfoHomeData?.title}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20 mt-20">
            {reviewHomeData.map((item: any) => (
              <article key={item.id} className="rounded-xl bg-gray p-4">
                <div className="grid place-items-center py-4">
                  <img src={item?.avatar} alt="" className="w-32 mt-[-80px]" />
                </div>
                <h4 className="text-lg text-center">{item?.name}</h4>
                {item?.description.map((item: any) => (
                  <p
                    key={item.id}
                    className="text-base font-normal text-DarkGrayishBlue mt-2 text-center"
                  >
                    {item.text}
                  </p>
                ))}
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link href="/">
              <a className="w-36 text-center text-sm py-3 font-medium rounded-3xl bg-BrightRed text-white">
                Get Started
              </a>
            </Link>
          </div>
        </section>

        <section className="bg-BrightRed py-12 mt-10">
          <div className="max-w-6xl mx-auto w-11/12 grid md:grid-cols-2 gap-y-6 items-center">
            <h3 className="w-11/12 text-4xl font-medium text-white">
              Simplify how your team works today.
            </h3>
            <div className="md:justify-self-end">
              <Link href="/">
                <a className="block w-36 text-center text-sm py-3 font-medium rounded-3xl bg-white text-BrightRed">
                  Get Started
                </a>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Home;
