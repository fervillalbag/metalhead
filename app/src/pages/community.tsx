import Layout from "@/layout";
import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import client from "@/config/apollo";
import { GET_SLIDES } from "@/graphql/queries/community";

import "swiper/css/navigation";
import "swiper/css/autoplay";

export const getServerSideProps = async () => {
  const { data: slides } = await client.query({
    query: GET_SLIDES,
  });

  return {
    props: {
      slides: slides?.getSlides,
    },
  };
};

const Community = ({ slides }: any) => {
  return (
    <Layout>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="h-72 lg:h-[450px] px-20"
      >
        {slides.map((slide: any) => (
          <SwiperSlide key={slide.id} className="bg-slate-300 text-white">
            <img
              src={slide.image}
              className="w-full h-full object-cover"
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="max-w-6xl mx-auto w-11/12 py-10 lg:py-20">
        <span className="block text-3xl text-DarkBlue">Community</span>

        <p className="mt-4 text-DarkGrayishBlue max-w-4xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quasi
          unde enim assumenda? Fugiat laboriosam quaerat eius sed fugit, in
          debitis voluptates sunt enim libero magni architecto asperiores esse
          quae nobis necessitatibus omnis ratione autem ipsa tempore! Itaque,
          temporibus sunt.
        </p>
      </div>
    </Layout>
  );
};

export default Community;