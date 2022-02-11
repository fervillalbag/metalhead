import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { FileType } from "@/types/file";
import { useMutation } from "@apollo/client";
import { CREATE_SLIDE } from "@/graphql/mutation/slide";
import toast from "react-hot-toast";

const CreateCommunityBanner: React.FC = () => {
  const router = useRouter();

  const [showBannerImage, setshowBannerImage] = useState<string | null>(null);
  const [fileBannerImage, setFileBannerImage] = useState<
    FileType | null | Blob
  >(null);

  const inputFileRef = useRef<any>(null);

  const [createSlide] = useMutation(CREATE_SLIDE);

  const handleHeaderFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    const file = target.files![0];
    const image = URL.createObjectURL(file);
    setshowBannerImage(image);
    setFileBannerImage(file);
  };

  const handleChangeImage = () => {
    inputFileRef.current.click();
  };

  const handleCreateBanner = async () => {
    try {
      const url = process.env.URL_CLOUDINARY_RES;
      const formData = new FormData();
      formData.append("file", fileBannerImage as string | Blob);
      formData.append(
        "upload_preset",
        process.env.CLOUDINARY_NAME_PRESET_BANNER as string
      );
      const res = await fetch(url as string, {
        method: "post",
        body: formData,
      });
      const imageData = await res.json();

      const response = await createSlide({
        variables: {
          input: {
            image: imageData?.secure_url,
          },
        },
      });
      toast.success(response?.data?.createSlide?.message);
      router.push("/admin/community");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <div className="px-12 pt-10">
        <button
          className="border border-slate-300 rounded flex items-center justify-center px-3 py-2 text-slate-500 mb-8 w-32"
          onClick={() => router.push("/admin/community")}
        >
          <span className="mr-2">
            <BsFillArrowLeftCircleFill />
          </span>
          <span>Back</span>
        </button>
      </div>

      <div className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">Create a new banner</h1>

        <div className="pt-4">
          <div className="pt-3">
            <button
              className="border border-slate-300 rounded block px-3 py-2 text-slate-500 mb-2"
              onClick={handleChangeImage}
            >
              {showBannerImage ? "Change image" : "Add new banner"}
            </button>
            <input
              ref={inputFileRef}
              type="file"
              className="hidden"
              onChange={handleHeaderFileChange}
            />
          </div>
        </div>

        {showBannerImage && (
          <div className="pt-4">
            <img src={showBannerImage} alt="" width={200} />
          </div>
        )}

        <div>
          <button
            className="bg-slate-700 text-white rounded block px-8 text-lg py-2 mt-6"
            onClick={handleCreateBanner}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunityBanner;
