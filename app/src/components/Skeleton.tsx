import React from "react";

interface SkeletonIprops {
  type: string;
}

const Skeleton: React.FC<SkeletonIprops> = ({ type }) => {
  const classes = `bg-slate-200 overflow-hidden my-3 rounded-md ${
    type === "text"
      ? "w-full h-6"
      : type === "title"
      ? "w-1/2 h-8 mb-4"
      : type === "avatar"
      ? "w-24 h-24 rounded-full"
      : type === "thumbnail"
      ? "w-full h-full"
      : ""
  }`;
  return <div className={classes}></div>;
};

export default Skeleton;
