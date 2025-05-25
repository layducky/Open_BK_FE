import * as React from "react"
import Star from "@/public/svg/star.svg";
import StarHalf from "@/public/svg/star_half.svg";
import StarEmpty from "@/public/svg/star_empty.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonClick } from "@/components/common/buttons/button";

const RatingBar: React.FC<{
    stars: number,
    percentage: number
}> = ({ stars, percentage }) => {
    return (
      <div className="flex gap-1.5 items-center">
        <div className="flex flex-col self-stretch my-auto w-[179px]">
          <div className="flex flex-col items-start bg-zinc-400 max-md:pr-5">
            <div className="flex shrink-0 h-1.5 bg-amber-400 w-[121px]" />
          </div>
        </div>
        <div className="flex gap-0.5 items-center self-stretch px-0.5 my-auto text-xs tracking-wide leading-none text-center text-black whitespace-nowrap">
          <div className="self-stretch my-auto">{stars}</div>
          <Star/>
          <div className="self-stretch my-auto">({percentage}%)</div>
        </div>
      </div>
    );
  };


const StarRating: React.FC<{
    rating: number
}> = ({ rating }) => {
    const full = Math.floor(rating);
    const hasHalf = (rating % 1) !== 0;

    return (
      <div className="flex gap-1 items-center self-stretch my-auto">
        {[...Array(full)].map((_, index) => (
           <Star key={index}/>
        ))}
        {hasHalf && <StarHalf />}
        {[...Array(5 - full - (hasHalf ? 1 : 0))].map((_, index) => (
            <StarEmpty key={index} />
        ))}
      </div>
    );
  };

const ReviewCard: React.FC<{
    review: {
        username: string,
        avatar: string,
        date: string,
        rating: number,
        comment: string
    }
}> = ({ review }) => {
    return (
      <div className="flex flex-col justify-center px-2.5 mt-2.5 w-full max-md:max-w-full">
        <div className="flex flex-wrap gap-2.5 items-center w-full max-md:max-w-full">
            <Avatar className="h-[46px] w-[46px]">
              <AvatarImage src={review.avatar}></AvatarImage>
              <AvatarFallback>{review.username}</AvatarFallback>
            </Avatar>
          <div className="flex flex-wrap flex-1 shrink gap-10 justify-between items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
            <div className="self-stretch my-auto text-base tracking-wide text-black">
              {review.username}
            </div>
            <div className="flex gap-5 justify-between items-center self-stretch my-auto w-[182px]">
              <div className="self-stretch my-auto text-sm tracking-wide leading-none text-black text-opacity-50">
                {review.date}
              </div>
              <StarRating rating={review.rating} />
            </div>
          </div>
        </div>
        <div className="mt-2.5 text-sm tracking-wide leading-5 text-justify text-black max-md:max-w-full">
          {review.comment}
        </div>
      </div>
    );
  };

export default function Page() {
    const reviewsData = [
        {
          username: "User A",
          avatar: "",
          date: "2 days ago",
          rating: 3,
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a finibus felis. Etiam interdum orci magna, eget tempus elit euismod ac. Sed enim odio, volutpat non venenatis vel, pellentesque a magna. In finibus ex tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta facilisis lacus sit amet interdum."
        },
        {
          username: "User B",
          avatar: "",
          date: "3 days ago",
          rating: 4,
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a finibus felis. Etiam interdum orci magna, eget tempus elit euismod ac. Sed enim odio, volutpat non venenatis vel, pellentesque a magna. In finibus ex tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta facilisis lacus sit amet interdum."
        },
        {
          username: "User C",
          avatar: "",
          date: "5 days ago",
          rating: 3.5,
          comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a finibus felis. Etiam interdum orci magna, eget tempus elit euismod ac. Sed enim odio, volutpat non venenatis vel, pellentesque a magna. In finibus ex tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta facilisis lacus sit amet interdum."
        }
    ]

    return (
      <div>
        <div className="flex overflow-hidden flex-wrap gap-5 items-center px-2.5 pb-2.5 w-full border-b border-black border-opacity-50 max-md:max-w-full">
          <div className="flex flex-col justify-center items-center self-stretch p-1.5 my-auto">
            <div className="flex gap-1.5 items-center text-3xl leading-none text-center text-black">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/4d2e3c9ca02843ada293db57d2cfd6d0/13f6bc8e5b67e065c6290dc75007369d9d1123029addd28aae5cd4b31b093e25?apiKey=4d2e3c9ca02843ada293db57d2cfd6d0&"
                className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
                alt=""
              />
              <div className="self-stretch my-auto">
                <span className="font-bold">4.5 </span>
              </div>
            </div>
            <div id="reviews" className="text-xs tracking-wide leading-none text-black">
              123 reviews
            </div>
          </div>
          <div className="flex flex-col justify-center self-stretch my-auto min-w-[240px]">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="mt-1.5 first:mt-0">
                <RatingBar stars={stars} percentage={60} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-5 w-full max-md:max-w-full">
          {reviewsData.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
        <div className="flex flex-col justify-center items-end mt-5 w-full text-sm font-semibold text-black">
          <div className="flex flex-col px-1 max-w-full py-4">
            {/* <ButtonClick className="w-[180px]">View all comments</ButtonClick> */}
          </div>
        </div>
      </div>
    );
}