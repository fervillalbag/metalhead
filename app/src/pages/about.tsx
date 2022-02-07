import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import client from "@/config/apollo";
import { GET_ABOUT_PAGE } from "@/graphql/queries/aboutPage";
import Layout from "@/layout";
import Loading from "@/components/Loading";
import Skeleton from "@/components/Skeleton";

export const getStaticProps = async () => {
  const { data: aboutData } = await client.query({
    query: GET_ABOUT_PAGE,
  });

  return {
    props: {
      aboutData,
    },
  };
};

const About = ({ aboutData }: { aboutData: any }) => {
  const aboutDataPage = aboutData?.getAboutPage;

  if (!aboutDataPage) return <Loading />;

  return (
    <div>
      <Layout>
        <div className="grid grid-cols-1 gap-y-10 gap-x-24 lg:gap-y-0 lg:grid-cols-2 pt-0 lg:pt-8 pb-16 lg:pb-20 max-w-6xl w-11/12 mx-auto">
          <div>
            {!aboutDataPage && (
              <div>
                <Skeleton type="title" />
              </div>
            )}

            <h3 className="text-2xl lg:text-4xl font-bold text-DarkBlue">
              {aboutDataPage?.title}
            </h3>
            {aboutDataPage.description.map((item: any) => (
              <div key={item.id}>
                {!aboutDataPage && (
                  <div className="mt-12">
                    <Skeleton type="text" />
                    <Skeleton type="text" />
                    <Skeleton type="text" />
                    <Skeleton type="text" />
                  </div>
                )}

                <p key={item.id} className=" text-DarkGrayishBlue mt-6">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <div>
            {!aboutDataPage && (
              <div className="w-full h-[650px]">
                <Skeleton type="thumbnail" />
              </div>
            )}
            <LazyLoadImage
              src={aboutDataPage?.image}
              alt="Business image"
              className="w-full object-cover align-top"
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default About;
