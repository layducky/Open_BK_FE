import { BulletItem } from "@/components/ui/bulletItem";

export default function Page() {
  const sampleData = {
    objectives: [
      { iconType: "objective", text: "Objective 1" },
      { iconType: "objective", text: "Objective 2" },
      { iconType: "objective", text: "Objective 3" },
      { iconType: "objective", text: "Objective 4" },
    ],
    description: "Loren ipsum",
  };

  const halfLength = Math.ceil(sampleData.objectives.length / 2);
  const firstColumn = sampleData.objectives.slice(0, halfLength);
  const secondColumn = sampleData.objectives.slice(halfLength);

  return (
    <div >
      <div className="py-4">
        <h1 className="font-bold text-2xl">
          What you will learn
        </h1>
        <div className="flex flex-wrap gap-10 justify-between items-center mt-2.5 max-w-full text-base text-black w-[587px]">
          <div className="flex flex-col self-stretch px-1.5 my-auto">
            {firstColumn.map((objective, index) => (
              <BulletItem key={index} {...objective} />
            ))}
          </div>
          <div className="flex flex-col self-stretch px-1.5 my-auto">
            {secondColumn.map((objective, index) => (
              <BulletItem key={index} {...objective} />
            ))}
          </div>
        </div>
      </div>

      <div className="py-4">
        <h2 className="font-bold text-2xl">Description</h2>
        <p className="mt-2.5 text-sm tracking-wide leading-5 text-justify max-md:max-w-full">
          {sampleData.description}
        </p>
      </div>
    </div>
  );
}
