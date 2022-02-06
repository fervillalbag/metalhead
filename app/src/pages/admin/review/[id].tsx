import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { produce } from "immer";
import { useMutation, useQuery } from "@apollo/client";
import { BsFillArrowLeftCircleFill, BsTrash } from "react-icons/bs";

import Loading from "@/components/Loading";
import { GET_REVIEW_HOME_ITEM } from "@/graphql/queries/reviewHome";
import { UPDATE_REVIEW_HOME_ITEM } from "@/graphql/mutation/reviewHome";
import { ReviewData } from "@/types/review";
import { Description } from "@/types/description";
import { FileType } from "@/types/file";

const ReviewItemId = () => {
  const router = useRouter();

  const [data, setData] = React.useState<ReviewData | null>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<Description[]>(
    []
  );
  const [showHeaderImage, setShowHeaderImage] = React.useState<string | null>(
    null
  );
  const [fileHeader, setFileHeader] = React.useState<FileType | null | Blob>();

  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  const [updateReviewHome] = useMutation(UPDATE_REVIEW_HOME_ITEM);

  const { data: reviewItem } = useQuery(GET_REVIEW_HOME_ITEM, {
    fetchPolicy: "network-only",
    variables: {
      id: router?.query?.id,
    },
  });

  useEffect(() => {
    setData(reviewItem?.getReviewHomeItem);
    setDescriptionArray(reviewItem?.getReviewHomeItem?.description);
  }, [router, reviewItem]);

  const newDescription: Description = {
    id: uuidv4(),
    text: "",
  };

  const handleChangeImage = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleAddInputDescription = () => {
    setDescriptionArray([...descriptionArray, newDescription]);
  };

  const handleDeleteInputDescription = (id: string) => {
    const newValue = descriptionArray.filter(
      (item: Description) => item.id !== id
    );
    setDescriptionArray(newValue);
  };

  const handleHeaderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files![0];
    const image = URL.createObjectURL(file);
    setShowHeaderImage(image);
    setFileHeader(file);
  };

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map(
      (description: Description) => {
        return {
          id: description.id,
          text: description.text,
        };
      }
    );

    if (!data?.name || data?.name === "") {
      toast("El nombre es obligatorio!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    if (descriptionArray.length === 0) {
      toast("La descripción es obligatoria!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    const isDescriptionEmpty = newDescriptionArray.some(
      (description: Description) => description.text === ""
    );

    if (isDescriptionEmpty) {
      toast("La descripción debe tener contenido!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#FFF",
          color: "#333",
        },
      });
      return;
    }

    if (fileHeader) {
      const url = "https://api.cloudinary.com/v1_1/dbp9am0cx/image/upload";
      const formData = new FormData();
      formData.append("file", fileHeader as string | Blob);
      formData.append("upload_preset", "reviewItem");
      const res = await fetch(url, { method: "post", body: formData });
      const imageData = await res.json();

      const responseApi = await updateReviewHome({
        variables: {
          input: {
            id: data?.id,
            name: data?.name,
            description: newDescriptionArray,
            avatar: imageData?.secure_url,
          },
        },
      });

      toast.success(responseApi?.data?.updateReviewHome?.message);
    } else {
      const responseApi = await updateReviewHome({
        variables: {
          input: {
            id: data?.id,
            name: data?.name,
            description: newDescriptionArray,
            avatar: data?.avatar,
          },
        },
      });

      toast.success(responseApi?.data?.updateReviewHome?.message);
    }
    router.push("/admin/review");
  };

  if (!data || !descriptionArray) return <Loading />;

  return (
    <div className="flex items-start">
      <div className="px-12 pt-10">
        <button
          className="border border-slate-300 rounded flex items-center justify-center px-3 py-2 text-slate-500 mb-8 w-32"
          onClick={() => router.push("/admin/review")}
        >
          <span className="mr-2">
            <BsFillArrowLeftCircleFill />
          </span>
          <span>Back</span>
        </button>
      </div>

      <div className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">
          Review of: <span className="text-slate-400">{data?.name}</span>
        </h1>

        {!data || !descriptionArray ? (
          <Loading />
        ) : (
          <section className="py-8">
            <div>
              <span className="block text-sm mb-2 text-slate-500">Title:</span>
              <input
                className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
                type="text"
                value={data?.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>

            <div className="py-4">
              <button
                className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-2"
                onClick={handleChangeImage}
              >
                Change image
              </button>
              <input
                type="file"
                ref={inputFileRef}
                onChange={handleHeaderFileChange}
                className="hidden"
              />
              <div className="pt-4">
                {!showHeaderImage ? (
                  <img src={data?.avatar} width={100} alt="" />
                ) : (
                  <img src={showHeaderImage} width={100} alt="" />
                )}
              </div>
            </div>

            <div>
              <h3 className="text-slate-600 mt-4">Description:</h3>

              {descriptionArray.length === 0 ? (
                <span className="block py-4 text-slate-900">
                  No description available
                </span>
              ) : (
                descriptionArray.map(
                  (description: Description, index: number) => (
                    <div key={description.id} className="flex py-4">
                      <textarea
                        className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300 resize-none h-32"
                        value={description.text}
                        onChange={(e) => {
                          const text = e.target.value;
                          setDescriptionArray(
                            (currentDescription: Description[]) =>
                              produce(currentDescription, (v) => {
                                v[index].text = text;
                              })
                          );
                        }}
                      ></textarea>
                      <button
                        className="block p-2 text-2xl px-5 text-red-500 bg-slate-100 ml-4 rounded"
                        onClick={() =>
                          handleDeleteInputDescription(description.id)
                        }
                      >
                        <BsTrash />
                      </button>
                    </div>
                  )
                )
              )}
            </div>

            <button
              className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-8"
              onClick={handleAddInputDescription}
            >
              Add input description
            </button>

            <div className="border border-slate-200"></div>

            <button
              className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
              onClick={handleUpdate}
            >
              Update
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default ReviewItemId;
