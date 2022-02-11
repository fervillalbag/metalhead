import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import NavbarDashboard from "@/components/admin/Navbar";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SLIDES } from "@/graphql/queries/community";
import { DELETE_SLIDE } from "@/graphql/mutation/slide";
import Modal from "@/components/Modal";

const CommunityAdmin: React.FC = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemDelete, setItemDelete] = useState<string>("");

  const {
    data: slides,
    loading,
    refetch,
  } = useQuery(GET_SLIDES, {
    fetchPolicy: "network-only",
  });
  const [deleteSlide] = useMutation(DELETE_SLIDE);

  const handleDeleteSlide = async (id: string) => {
    try {
      const response = await deleteSlide({
        variables: {
          id,
        },
      });
      refetch();
      toast.success(response?.data?.deleteSlide?.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return null;

  return (
    <div className="flex">
      <NavbarDashboard />

      <section className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">Community Section</h1>

        <h1 className="text-2xl text-slate-600 mt-8 mb-6">List of Slides</h1>

        <Modal showModal={showModal}>
          <div className="flex flex-col justify-center h-full items-center">
            <h1>¿Desea eliminar?</h1>

            <div className="grid grid-cols-2 gap-x-4">
              <button
                className="block p-2 border"
                onClick={() => {
                  handleDeleteSlide(itemDelete);
                  setShowModal(false);
                }}
              >
                Si
              </button>
              <button
                className="block p-2 border"
                onClick={() => {
                  setShowModal(false);
                  setItemDelete("");
                }}
              >
                No
              </button>
            </div>
          </div>
        </Modal>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-4">
          {slides.getSlides.map((slide: any) => (
            <div
              key={slide.id}
              className="shadow-lg rounded border border-slate-200 px-4 py-3 h-56 flex flex-col justify-between"
            >
              <div>
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-full h-32 object-contain"
                />
              </div>

              <div>
                <div>
                  <button
                    className="block w-full bg-slate-500 py-2 rounded text-white"
                    onClick={() => {
                      setItemDelete(slide.id);
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-8"
            onClick={() => router.push("/admin/create/community")}
          >
            Add new banner
          </button>
        </div>
      </section>
    </div>
  );
};

export default CommunityAdmin;
