import * as React from "react";
import Check from "/public/svg/check.svg";
import Download from "/public/svg/download.svg";
import Certificate from "/public/svg/certificate.svg";
import Infinity from "/public/svg/infinity.svg";
import Video from "/public/svg/video.svg";
import Test from "/public/svg/test.svg";
type BulletItemProps = {
  bulletType?: string;
  iconType: string;
  text: string | number;
  ID?: string; // Optional ID for link items
};

export function BulletItem({ bulletType, iconType, text, ID }: BulletItemProps) {
  let Icon: React.ComponentType;
  switch (iconType) {
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
  const border = "border-t-2 border-dotted border-solid border-gray-300 py-4";
  const Type = bulletType || "normal";

  return (
    <div className={`w-full md:w-[98%] ${Type === "normal" ? "" : border}`}>
      <div className="flex gap-2.5 items-center mt-1.5">
        <div>
          <Icon />
        </div>
        {Type === "link" && iconType === "test" ? (
          <a
          href={typeof text === "string" ? `/test/${ID}` : "#"}
          className="text-blue-600 underline"
          >
          {text}
          </a>
        ) : (
          <div>{text}</div>
        )}
      </div>
    </div>
  );
}
