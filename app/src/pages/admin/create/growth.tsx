import React from "react";
import { produce } from "immer";
import { BsFillArrowLeftCircleFill, BsTrash } from "react-icons/bs";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";
import { CREATE_GROWTH_ITEM } from "@/graphql/mutation/growthHome";
import toast from "react-hot-toast";

const CreateGrowthItem: React.FC = () => {
  const router = useRouter();

  const [title, setTitle] = React.useState<any>("");
  const [descriptionArray, setDescriptionArray] = React.useState<any>([
    {
      id: uuidv4(),
      text: "",
    },
  ]);

  const [createGrowthHome] = useMutation(CREATE_GROWTH_ITEM);

  const newDescription = {
    id: uuidv4(),
    text: "",
  };

  const handleAddNewInputDescription = () => {
    setDescriptionArray((currentDescription: any) => [
      ...currentDescription,
      newDescription,
    ]);
  };

  const handleDeleteInputDescription = (id: string) => {
    setDescriptionArray((currentDescription: any) =>
      currentDescription.filter((x: any) => x.id !== id)
    );
  };

  const handleUpdate = async () => {
    if (!title || title === "") {
      toast("El título es obligatorio!", {
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
      (description: any) => description.text === ""
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

    try {
      const res = await createGrowthHome({
        variables: {
          input: {
            title,
            description: descriptionArray,
          },
        },
      });

      toast.success(res?.data?.createGrowthHome?.message);
      router.push("/admin/growth");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <div className="px-12 pt-10">
        <button
          className="border border-slate-300 rounded flex items-center justify-center px-3 py-2 text-slate-500 mb-8 w-32"
          onClick={() => router.push("/admin/growth")}
        >
          <span className="mr-2">
            <BsFillArrowLeftCircleFill />
          </span>
          <span>Back</span>
        </button>
      </div>

      <div className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">Create a new item</h1>

        <div className="pt-8 pb-4">
          <span className="block text-sm mb-2 text-slate-500">Title:</span>
          <input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300"
          />
        </div>
        <div>
          <h3 className="text-slate-600 mt-4">Description:</h3>

          {descriptionArray.length === 0 ? (
            <span className="block py-4 text-slate-900">
              No description available
            </span>
          ) : (
            descriptionArray.map((description: any, index: number) => (
              <div key={description.id} className="flex py-4">
                <textarea
                  className="w-full block border border-slate-300 rounded px-3 py-2 focus:border-slate-500 focus:outline-0 transition-all duration-300 resize-none h-32"
                  placeholder="Enter a description"
                  onChange={(e) => {
                    const text = e.target.value;
                    setDescriptionArray((currentDescription: any) =>
                      produce(currentDescription, (v: any) => {
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

          <button
            className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mt-2 mb-8"
            onClick={handleAddNewInputDescription}
          >
            Add input description
          </button>
          <button
            className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-8"
            onClick={handleUpdate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGrowthItem;
