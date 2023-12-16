"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, MinusCircleIcon, PlusIcon } from "lucide-react";
import { extractWebsiteName, generateHash, isColorDark } from "@/lib/utils";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { CONSTANTS } from "../../../lib/constants";
import ColorPicker from "@/components/ui/color-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(3, CONSTANTS.required).max(50),
  description: z.string().min(3, CONSTANTS.required).max(100),
  background: z.string().min(3, CONSTANTS.required).max(100),
  text: z.string().optional(),
  links: z.array(
    z.object({
      name: z.string().optional(),
      url: z
        .string()
        .min(3, CONSTANTS.required)
        .max(100)
        .url(CONSTANTS.invalidUrl),
    })
  ),
});

export default function CreatePage() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      background: "",
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const onAddLink = () => {
    if (fields.length >= 5) return;

    append({ name: "", url: "" });
  };

  const onRemoveLink = (index: number) => {
    if (fields.length <= 0) return;

    remove(index);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (!user) return;

      const { id } = user;
      const slug = generateHash(8);

      const page = {
        slug,
        userId: id,
        text: data.text,
        title: data.title,
        description: data.description,
        background: data.background,
      };

      const res = await fetch("/api/create-page", {
        method: "POST",
        body: JSON.stringify(page),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { result } = await res.json();

      if (!result) return;

      const { rows } = result;
      const { id: pageId } = rows[0];

      const links = data.links.map((link) => ({
        ...link,
        page_id: pageId,
        name: extractWebsiteName(link.url),
      }));

      const linksResponse = await fetch("/api/create-links", {
        method: "POST",
        body: JSON.stringify({
          links,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (linksResponse.ok) {
        window.location.href = `/pages`;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-4">
      <h1 className="text-2xl font-bold">Nova página</h1>

      <Form {...form}>
        <form
          className="space-y-4 pb-14"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título da página</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex.: Links oficiais - John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ex.: Links oficiais do John Doe"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="background"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor de fundo</FormLabel>
                <FormControl>
                  <ColorPicker
                    color={field.value}
                    onChange={(color) => field.onChange(color)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor do texto</FormLabel>
                <FormControl>
                  <ColorPicker
                    color={field.value || ""}
                    onChange={(color) => field.onChange(color)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row justify-between">
            <h2 className="text-lg font-semibold">Links - {fields.length}/5</h2>
            <button type="button" onClick={onAddLink}>
              <PlusIcon className="w-8 h-8 text-black dark:text-black" />
            </button>
          </div>

          {fields.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              Nenhum link adicionado
            </p>
          )}

          {fields.map((field, index) => (
            <div
              className="flex flex-row items-center space-x-4"
              key={field.id}
            >
              <FormField
                control={form.control}
                name={`links.${index}.url`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Ex.: https://x.com/johndoeex"
                        autoCapitalize="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <MinusCircleIcon
                className="w-8 h-8 text-red-500 dark:text-red-500"
                onClick={() => onRemoveLink(index)}
              />
            </div>
          ))}

          <div className="fixed inset-x-0 bottom-0">
            <Button
              className="rounded-none w-full text-base h-14"
              size="lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Carregando..." : "Criar página"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
