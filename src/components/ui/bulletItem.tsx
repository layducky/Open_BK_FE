import * as React from "react";
import Check from "@/public/svg/check.svg";
import Download from "@/public/svg/download.svg";
import Certificate from "@/public/svg/certificate.svg";
import Infinity from "@/public/svg/infinity.svg";
import Video from "@/public/svg/video.svg";
import Test from "@/public/svg/test.svg";

export const BulletItem: React.FC<{
  text: string | number;
  type: string;
}> = ({ text, type }) => {
  //* Pass as a FC
  let Icon: React.FC;
  switch (type) {
    case "objective":
      Icon = Check;
      break;
    case "download":
      Icon = Download;
      break;
    case "infinity":
      Icon = Infinity;
      break;
    case "certificate":
      Icon = Certificate;
      break;
    case "video":
      Icon = Video;
      break;
    case "test":
      Icon = Test;
      break;
    default:
      Icon = Check;
  }

  return (
    <div className="flex gap-2.5 items-center mt-1.5">
      <div>
        <Icon />
      </div>
      <div>{text}</div>
    </div>
  );
};
