import Link from "next/link";
import * as React from "react";

const SocialIcon: React.FC<{
  src: string;
  alt: string;
}> = ({ src, alt }) => (
  <img
    loading="lazy"
    src={src}
    alt={alt}
    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
  />
);

const socialIcons = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/4d2e3c9ca02843ada293db57d2cfd6d0/808108d75f498ff093a58f2531405a83c2a68d3d4e60b3a4dcceaeb49f1ca2bf?apiKey=4d2e3c9ca02843ada293db57d2cfd6d0&",
    alt: "Social media icon 1",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/4d2e3c9ca02843ada293db57d2cfd6d0/6be144b4ecf3ce0cee8b531c1d3eefa4b314ee1ffe83e0955f9acb9d9ee23f49?apiKey=4d2e3c9ca02843ada293db57d2cfd6d0&",
    alt: "Social media icon 2",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/4d2e3c9ca02843ada293db57d2cfd6d0/cd0b25f2c1f5c9463afe5f94a89ef363a0586daf9b1d836ce38edee750f0a377?apiKey=4d2e3c9ca02843ada293db57d2cfd6d0&",
    alt: "Social media icon 3",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/4d2e3c9ca02843ada293db57d2cfd6d0/0d31fb915c7ddadf15318c64f037fb47e2d512af048fc55a63359d2b96e9dd11?apiKey=4d2e3c9ca02843ada293db57d2cfd6d0&",
    alt: "Social media icon 4",
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="flex overflow-hidden flex-wrap justify-left items-center p-8 w-full bg-sky-800 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col justify-between self-stretch w-60 min-w-[240px]">
        <div className="flex gap-4 items-center self-start">
          {socialIcons.map((icon, index) => (
            <SocialIcon key={index} {...icon} />
          ))}
        </div>
        <p className="mt-14 leading-6 text-white font-[number:var(--sds-typography-body-font-weight-regular)] text-[length:var(--sds-typography-body-size-medium)] max-md:mt-10">
          © 2024 OpenBK. All rights reserved.
        </p>
      </div>

      <div
        id="group2"
        className="flex flex-col leading-snug text-white min-w-[240px] w-[262px]"
      >
        <Link href="#" className="mt-3 hover:underline ">
          Become a collaborator
        </Link>
        <Link href="#" className="mt-3 hover:underline ">
          About us
        </Link>
        <Link href="#" className="mt-3 hover:underline ">
          Contact us
        </Link>
      </div>

      <div
        id="group3"
        className="flex flex-col leading-snug text-white min-w-[240px] w-[262px]"
      >
        <Link href="#" className="mt-3 hover:underline ">
          Terms of service
        </Link>
        <Link href="#" className="mt-3 hover:underline ">
          Privacy policy
        </Link>
        <Link href="#" className="mt-3 hover:underline ">
          Cookie settings
        </Link>
      </div>

      <div
        id="group4"
        className="flex flex-col leading-snug text-white min-w-[240px] w-[262px]"
      >
        <Link href="#" className="mt-3 hover:underline ">
          News and blog
        </Link>
        <Link href="#" className="mt-3 hover:underline ">
          Help and support
        </Link>
        <Link href="#" className="mt-3 hover:underline ">
          Careers
        </Link>
      </div>
    </footer>
  );
};
