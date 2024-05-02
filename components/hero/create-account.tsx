"use client";

import { ChangeEvent, useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { slugify } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const { replace } = useRouter();
  const [slug, setSlug] = useState<string>("");

  function onSubmit() {
    if (!slug || slug.length <= 0) return;

    replace(`/links?new=true&slug=${slug}`);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const { value } = e.target;
    const slugfyiedValue = slugify(value);

    setSlug(slugfyiedValue);
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-2">
      <form>
        <div className="flex flex-row items-center space-x-2">
          <span className="md:text-lg font-semibold">
            https://onelnk.pro/to/
          </span>
          <Input
            className="text-base"
            placeholder="john-doe"
            required
            value={slug}
            onChange={onChange}
          />
          <Button
            onClick={onSubmit}
            type="button"
            className="transition-colors duration-500"
          >
            Criar seu link grátis
          </Button>
        </div>
      </form>
    </div>
  );
}
