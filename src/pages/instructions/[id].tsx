import React from "react";
import { useRouter } from "next/router";
import { getInstructionData } from "~/lib/instructionData";
import { InstructionDataType } from "~/lib/types";
import InstructionTable from "~/components/InstructionTable";

const Instruction = (props: {
  treeAuthority: string;
  instructionData: InstructionDataType[];
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center  bg-zinc-900 font-mono">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-[3rem]">
          Instructions
        </h2>
        <p className="text-sm text-white md:text-lg">
          Tree Authority: {props.treeAuthority}
        </p>
      </div>
      <p className="mb-8 text-sm text-white md:text-lg">
        Displaying the most recent 100 instructions involving the given tree
        authority
      </p>
      <button
        onClick={handleBackClick}
        className="absolute left-8 top-8 text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <InstructionTable data={props.instructionData} />
    </div>
  );
};

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const treeAuthority = id as string;
  const instructionData = await getInstructionData(treeAuthority);
  return {
    props: {
      treeAuthority: treeAuthority,
      instructionData: instructionData,
    },
  };
}

export default Instruction;
