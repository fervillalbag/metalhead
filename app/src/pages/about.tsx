import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

import client from "@/config/apollo";
import { GET_ABOUT_PAGE } from "@/graphql/queries/aboutPage";
import Layout from "@/layout";
import Loading from "@/components/Loading";
import Skeleton from "@/components/Skeleton";
import { getToken } from "utils/helpers";
import { isAuth, isUserNotFound } from "utils/actions";

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
  isUserNotFound();

  const aboutDataPage = aboutData?.getAboutPage;

  if (!aboutDataPage) return <Loading />;

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    } else {
      isAuth();
    }
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-y-10 gap-x-24 lg:gap-y-0 lg:grid-cols-2 pt-0 lg:pt-8 pb-16 lg:pb-20 max-w-6xl w-11/12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.3, duration: 0.3 },
          }}
        >
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.6, duration: 0.3 },
          }}
        >
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
        </motion.div>
      </div>
    </Layout>
  );
};

export default About;
