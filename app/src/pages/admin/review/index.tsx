import React from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@apollo/client";

import client from "@/config/apollo";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";
import { GET_REVIEW_INFO } from "@/graphql/queries/reviewInfo";
import { UPDATE_REVIEW_INFO } from "@/graphql/mutation/reviewInfo";
import { GET_REVIEW_HOME } from "@/graphql/queries/reviewHome";
import { DELETE_REVIEW_HOME_ITEM } from "@/graphql/mutation/reviewHome";

const ReviewInfoAdmin = () => {
  const router = useRouter();

  const [data, setData] = React.useState<any>(null);
  const [descriptionArray, setDescriptionArray] = React.useState<any>([]);
  const [dataItems, setDataItems] = React.useState<any>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [itemDelete, setItemDelete] = React.useState<string>("");
  const [error, setError] = React.useState<any>({
    type: "",
    status: false,
  });

  const [updateReviewHomeInfo] = useMutation(UPDATE_REVIEW_INFO);
  const [deleteReviewHome] = useMutation(DELETE_REVIEW_HOME_ITEM);

  React.useEffect(() => {
    (async () => {
      const { data: reviewInfo } = await client.query({
        query: GET_REVIEW_INFO,
        fetchPolicy: "network-only",
      });

      const { data: reviewItems } = await client.query({
        query: GET_REVIEW_HOME,
        fetchPolicy: "network-only",
      });

      setData(reviewInfo?.getReviewInfoHome);
      setDataItems(reviewItems?.getReviewHome);
      setDescriptionArray(reviewInfo?.getReviewInfoHome?.description);
    })();
  }, []);

  const newDescription = {
    id: uuidv4(),
    text: "",
  };

  const handleAddInputDescription = () => {
    setDescriptionArray([...descriptionArray, newDescription]);
  };

  const handleDeleteInputDescription = (id: string) => {
    const newValue = descriptionArray.filter((item: any) => item.id !== id);
    setDescriptionArray(newValue);
  };

  const handleDeleteReviewItem = async (id: string) => {
    try {
      const response = await deleteReviewHome({
        variables: {
          id,
        },
      });
      console.log(response);
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const newDescriptionArray = descriptionArray.map((description: any) => {
      return {
        id: description.id,
        text: description.text,
      };
    });

    if (!data || data?.title === "") {
      setError({
        type: "El título es obligatorio",
        status: true,
      });
      return;
    }

    try {
      const response = await updateReviewHomeInfo({
        variables: {
          input: {
            id: data?.id,
            title: data?.title,
            description: newDescriptionArray,
          },
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }

    setError({
      type: "",
      status: false,
    });
  };

  if (!data || !descriptionArray || !dataItems) return <Loading />;

  return (
    <div className="p-4">
      <div>
        <input
          type="text"
          value={data?.title}
          className="border w-11/12 p-2"
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>

      <div className="py-4">
        {descriptionArray.map((description: any) => (
          <div key={description.id} className="flex py-4">
            <textarea
              className="border w-11/12 p-2"
              value={description.text}
              onChange={(e) =>
                setDescriptionArray((currentDescription: any) =>
                  currentDescription.map((x: any) =>
                    x.id === description.id
                      ? {
                          ...x,
                          text: e.target.value,
                        }
                      : x
                  )
                )
              }
            ></textarea>
            <button
              className="block p-2 border"
              onClick={() => handleDeleteInputDescription(description.id)}
            >
              delete
            </button>
          </div>
        ))}
      </div>

      <Modal showModal={showModal}>
        <div className="flex flex-col justify-center h-full items-center">
          <h1>¿Desea eliminar?</h1>

          <div className="grid grid-cols-2 gap-x-4">
            <button
              className="block p-2 border"
              onClick={() => {
                handleDeleteReviewItem(itemDelete);
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

      <button
        className="block border p-2 mb-3"
        onClick={handleAddInputDescription}
      >
        agregar campo
      </button>
      <button className="border block p-2" onClick={handleUpdate}>
        actualizar
      </button>

      {error.status && <span className="block">{error.type}</span>}

      <div className="grid grid-cols-3 gap-x-10 mt-8">
        {dataItems.map((item: any) => (
          <div key={item.id} className="border p-3">
            <span className="block">{item.name}</span>

            <button
              className="block border p-2 mt-4"
              onClick={() => router.push(`/admin/review/${item.id}`)}
            >
              Editar
            </button>
            <button
              className="block border p-2 mt-4"
              onClick={() => {
                setShowModal(true);
                setItemDelete(item.id);
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <button
        className="border p-2 mt-8"
        onClick={() => router.push("/admin/create/review")}
      >
        agregar nueva review
      </button>
    </div>
  );
};

export default ReviewInfoAdmin;
