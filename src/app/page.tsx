"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { InputBar } from "@/components/input-bar";
import { CitationBox, type Citation } from "@/components/citation-box";
import { CitationResponse } from "@/lib/citations.types";

export default function Home() {
  const searchParams = useSearchParams();

  const [url, setUrl] = useState("");
  const [citations, setCitations] = useState<null | CitationResponse>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateCitations(url);
  };

  const generateCitations = async (url: string) => {
    if (!url) return;
    if (searchParams.get("url") !== url) {
      const urlParams = new URLSearchParams();
      urlParams.set("url", url);
      history.pushState({}, "", `/?${urlParams.toString()}`);
    }

    const res = await fetch("/api/v1/citations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = (await res.json()) as CitationResponse;
    setCitations(data);
  };

  useEffect(() => {
    if (searchParams.has("url")) setUrl(searchParams.get("url")!);
  }, [searchParams]);

  return (
    <main className="w-full h-[100svh] grid place-items-center px-6">
      {citations ? (
        <CitationBox citations={citations} />
      ) : (
        <InputBar
          onSubmit={handleSubmit}
          inputChange={handleChange}
          className="max-w-[600px]"
        />
      )}
    </main>
  );
}
