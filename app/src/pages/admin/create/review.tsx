import React from "react";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { BsFillArrowLeftCircleFill, BsTrash } from "react-icons/bs";
import toast from "react-hot-toast";

import { useMutation } from "@apollo/client";
import { CREATE_REVIEW_HOME } from "@/graphql/mutation/reviewHome";
import Loading from "@/components/Loading";
import { ReviewData } from "@/types/review";
import { Description } from "@/types/description";
import { FileType } from "@/types/file";

const CreateReviewAdmin: React.FC = () => {
  const router = useRouter();

  const [data, setData] = React.useState<ReviewData>({
    name: "",
    avatar: "",
  });
  const [descriptionArray, setDescriptionArray] = React.useState<Description[]>(
    [
      {
        id: uuidv4(),
        text: "",
      },
    ]
  );
  const [showAvatarImage, setShowAvatarImage] = React.useState<string | null>(
    null
  );
  const [fileAvatar, setFileAvatar] = React.useState<FileType | null | Blob>(
    null
  );

  const inputFileRef = React.useRef<HTMLInputElement | null>(null);
  const [createReviewHome] = useMutation(CREATE_REVIEW_HOME);

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
    setDescriptionArray((currentDescription: Description[]) => [
      ...currentDescription,
      newDescription,
    ]);
  };

  const handleDeleteInputDescription = (id: string) => {
    setDescriptionArray((currentDescription: Description[]) =>
      currentDescription.filter((x: Description) => x.id !== id)
    );
  };

  const handleHeaderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files![0];
    const image = URL.createObjectURL(file);
    setShowAvatarImage(image);
    setFileAvatar(file);
  };

  const handleCreateReview = async () => {
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

    if (!fileAvatar) {
      toast("La imagen es obligatoria!", {
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

    const isDescriptionEmpty = descriptionArray.some(
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

    const url = "https://api.cloudinary.com/v1_1/dbp9am0cx/image/upload";

    try {
      const formData = new FormData();
      formData.append("file", fileAvatar as string | Blob);
      formData.append("upload_preset", "reviewItem");
      const res = await fetch(url, { method: "post", body: formData });
      const imageData = await res.json();
      const responseApi = await createReviewHome({
        variables: {
          input: {
            name: data?.name,
            description: descriptionArray,
            avatar: imageData?.secure_url,
          },
        },
      });

      toast.success(responseApi?.data?.createReviewHome?.message);
      router.push("/admin/review");
    } catch (error) {
      console.log(error);
    }
  };

  if (!data || !descriptionArray) return <Loading />;

  return (
    <div className="flex">
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
        <h1 className="text-3xl text-slate-600">Create a new review</h1>

        <div className="pt-8 pb-4">
          <div>
            <span className="block text-sm mb-2 text-slate-500">Name:</span>
            <input
              type="text"
              value={data?.name}
              className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="Introducir nombre"
            />
          </div>
        </div>

        <div className="pt-3">
          <button
            className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-2"
            onClick={handleChangeImage}
          >
            {showAvatarImage ? "Change image" : "Add image"}
          </button>
          <input
            ref={inputFileRef}
            type="file"
            onChange={handleHeaderFileChange}
            className="hidden"
          />
        </div>

        {showAvatarImage && (
          <div className="py-4">
            <img src={showAvatarImage} alt="" width={100} />
          </div>
        )}

        <div>
          <h3 className="text-slate-600 mt-4">Description:</h3>

          {descriptionArray.length === 0 ? (
            <span className="block py-4 text-slate-900">
              No description available
            </span>
          ) : (
            descriptionArray.map((description: Description, index: number) => (
              <div key={description.id} className="flex py-4">
                <textarea
                  className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300 resize-none h-32"
                  value={description.text}
                  onChange={(e) => {
                    const text = e.target.value;
                    setDescriptionArray((currentDescription: Description[]) =>
                      produce(currentDescription, (v) => {
                        v[index].text = text;
                      })
                    );
                  }}
                ></textarea>
                <button
                  className="block p-2 text-2xl px-5 text-red-500 bg-slate-100 ml-4 rounded"
                  onClick={() => handleDeleteInputDescription(description.id)}
                >
                  <BsTrash />
                </button>
              </div>
            ))
          )}
        </div>

        <button
          className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mt-2 mb-8"
          onClick={handleAddInputDescription}
        >
          Add input description
        </button>
        <button
          className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
          onClick={handleCreateReview}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateReviewAdmin;
