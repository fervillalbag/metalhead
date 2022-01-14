import React from "react";
import Link from "next/link";

import Layout from "@/layout";

const Plans: React.FC = () => {
  return (
    <Layout>
      <div className="w-11/12 max-w-6xl mx-auto">
        <span className="block lg:mt-4 text-DarkGrayishBlue font-regular text-sm text-center lg:w-9/12 mx-auto">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, sunt
          vero ea ex suscipit quo! Quae temporibus asperiores maiores? Deserunt
          voluptates error tenetur atque saepe amet odio quae voluptatibus, qui,
          animi ipsum ut hic autem!
        </span>

        <div className="grid md:grid-cols-2 lg:grid-cols-[repeat(2,_370px)] gap-x-6 gap-y-10 justify-center pt-10 pb-20">
          <article className="border border-solid border-DarkGrayishBlue bg-gray rounded px-6 py-8">
            <span className="block text-center font-bold text-VeryDarkBlue text-xl">
              Free
            </span>

            <div className="flex items-center justify-center mt-4">
              <span className="block mr-1">$</span>
              <span className="block text-4xl">0</span>
            </div>

            <Link href="/plans">
              <a className="bg-white py-3 block text-center mt-4 rounded border border-DarkGrayishBlue border-solid">
                Get Started
              </a>
            </Link>

            <ul className="mt-6">
              <li className="text-sm font-regular text-DarkGrayishBlue mb-4">
                30.000+ graphic & animated templates
              </li>
              <li className="text-sm font-regular text-DarkGrayishBlue mb-4">
                Instant access to 140 million stock images
              </li>
              <li className="text-sm font-regular text-DarkGrayishBlue mb-4">
                Upload your own fonts & images
              </li>
              <li className="text-sm font-regular mb-4 text-[rgba(0,0,0,0.2)] line-through">
                Upload your own fonts & images
              </li>
              <li className="text-sm font-regular mb-4 text-[rgba(0,0,0,0.2)] line-through">
                Upload your own fonts & images
              </li>
              <li className="text-sm font-regular mb-4 text-[rgba(0,0,0,0.2)] line-through">
                Upload your own fonts & images
              </li>
            </ul>
          </article>
          <article className="border border-solid border-DarkGrayishBlue bg-white rounded px-6 py-8">
            <span className="block text-center font-bold text-VeryDarkBlue text-xl">
              Pro
            </span>

            <div className="flex items-center justify-center mt-4">
              <span className="block mr-1">$</span>
              <span className="block text-4xl">7,99</span>
            </div>

            <Link href="/plans">
              <a className="bg-DarkGrayishBlue text-white py-3 block text-center mt-4 rounded border border-DarkGrayishBlue border-solid">
                Get Started
              </a>
            </Link>

            <ul className="mt-6">
              <li className="text-sm font-regular text-DarkGrayishBlue mb-4">
                30.000+ graphic & animated templates
              </li>
              <li className="text-sm font-regular text-DarkGrayishBlue mb-4">
                Instant access to 140 million stock images
              </li>
              <li className="text-sm font-regular text-DarkGrayishBlue mb-4">
                Upload your own fonts & images
              </li>
              <li className="text-sm font-regular text-DarkGrayishBlue mb-4">
                Upload your own fonts & images
              </li>
              <li className="text-sm font-regular text-DarkGrayishBlue mb-4">
                Upload your own fonts & images
              </li>
              <li className="text-sm font-regular text-DarkGrayishBlue mb-4">
                Upload your own fonts & images
              </li>
            </ul>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default Plans;
