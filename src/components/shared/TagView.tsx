"use client"

import { addSearchHistory } from "@/service/search";
import { useRouter } from "next/navigation";

type Props = {
  tagText: string;
};

export default function TagView({ tagText }: Props) {

  const router = useRouter();

  return (
    <div
      className={`cursor-pointer py-1 px-3 rounded-2xl text-soma-blue-50 text-sm sm:text-base bg-white hover:bg-soma-grey-25 transition-all`}
      onClick={() => {
        router.push(`/search?q=${tagText}&isTag=true`);
        addSearchHistory(tagText, true);
      }}
    >
      {tagText}
    </div>
  );
}
