import Layout from "@/layout";
import React, { useContext, useEffect } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

import { GET_SLIDES } from "@/graphql/queries/community";
import { MenuContext } from "@/context/MenuContext";

import "swiper/css/navigation";
import "swiper/css/autoplay";
import { getToken } from "utils/helpers";
import { isAuth, isUserNotFound } from "utils/actions";
import client from "@/config/apollo";

interface CommunityIprops {
  slides: any;
}

export const getStaticProps = async () => {
  const { data: slides } = await client.query({ query: GET_SLIDES });

  return {
    props: {
      slides,
    },
  };
};

const Community: React.FC<CommunityIprops> = ({ slides }) => {
  isUserNotFound();

  const { isShowMenu } = useContext(MenuContext);

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
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.3, duration: 0.3 },
        }}
      >
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className={`relative h-72 lg:h-[450px] px-20 ${
            isShowMenu ? "hidden" : "block"
          }`}
        >
          {slides &&
            slides.getSlides.map((slide: any) => (
              <SwiperSlide key={slide.id} className="bg-slate-300 text-white">
                <img
                  src={slide.image}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.6, duration: 0.3 },
        }}
        className="max-w-6xl mx-auto w-11/12 py-10 lg:py-20"
      >
        <span className="block text-3xl text-DarkBlue">Community</span>

        <p className="mt-4 text-DarkGrayishBlue max-w-4xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quasi
          unde enim assumenda? Fugiat laboriosam quaerat eius sed fugit, in
          debitis voluptates sunt enim libero magni architecto asperiores esse
          quae nobis necessitatibus omnis ratione autem ipsa tempore! Itaque,
          temporibus sunt.
        </p>
      </motion.div>
    </Layout>
  );
};

export default Community;
