import React from "react";
import clsx from "clsx";

interface PolygonBoxProps {
  className?: string;
  children?:React.ReactNode;
}

const PolygonBox: React.FC<PolygonBoxProps> = ({ className,children }) => {
  return (
    <div
      className={clsx("w-20 h-20 bg-bggreen/90 ", className)}
      style={{
        clipPath: "polygon(95% 0, 100% 25%, 100% 100%, 5% 100%, 0% 75%, 0 0)",
      }}
    >
      {children}
    </div>
  );
};

export default PolygonBox;
