"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { slugify } from "@/lib/utils";

export default function CreateAccount() {
  const [slug, setSlug] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const { replace } = useRouter();

  const searchParams = useSearchParams();
  const slugToSet = searchParams.get("slug");
  const slugExists = searchParams.get("slugExists");

  function onSubmit() {
    if (!slug || slug.length <= 0) return;
    setDisabled(true);

    replace(`/api/pages/create-external?slug=${slug}`);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (hasError) {
      setHasError(false);
    }

    const { value } = e.target;
    const slugfyiedValue = slugify(value);

    setSlug(slugfyiedValue);
  }

  useEffect(() => {
    if (!slugToSet) return;

    setSlug(slugToSet);
  }, [slugToSet]);

  useEffect(() => {
    if (slugExists) {
      setDisabled(false);
      setHasError(true);
    }
  }, [slugExists]);

  return (
    <>
      <div className="flex flex-row items-center md:m-auto w-full md:w-2/5 space-x-4">
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
          disabled={disabled}
          className="transition-colors duration-500"
        >
          {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Criar meu link
        </Button>
      </div>
      {hasError && (
        <small className="text-red-500">Este nome já está sendo usado</small>
      )}
    </>
  );
}
