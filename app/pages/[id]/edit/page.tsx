"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
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
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { CONSTANTS } from "../../../../lib/constants";
import ColorPicker from "@/components/ui/color-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sql } from "@vercel/postgres";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, CONSTANTS.required).max(50),
  description: z.string().min(3, CONSTANTS.required).max(100),
  background: z.string().min(3, CONSTANTS.required).max(100),
  text: z.string().optional(),
  links: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().optional(),
      url: z
        .string()
        .min(3, CONSTANTS.required)
        .max(100)
        .url(CONSTANTS.invalidUrl),
    })
  ),
});

export default function EditPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
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

  const onRemoveLink = async (index: number) => {
    if (fields.length <= 0) return;

    const item = form.getValues("links")[index];

    if (item.id) {
      await fetch(`/api/delete-link/${item.id}`, {
        method: "DELETE",
      });
    }

    remove(index);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (!user) return;

      await fetch("/api/update-page", {
        method: "PUT",
        body: JSON.stringify({
          page: { ...data, id: params.id },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const links = form.getValues("links").map((link: any) => ({
        ...link,
        name: link.name || extractWebsiteName(link.url),
        page_id: link.page_id || params.id,
      }));

      const linksResponse = await fetch("/api/update-links", {
        method: "PUT",
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

  useEffect(() => {
    if (!params.id || !user) return;

    (async () => {
      setIsLoading(true);

      const pageResponse = await fetch(
        `/api/get-page?id=${params.id}&userId=${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { result } = await pageResponse.json();

      if (!result) return;

      const { rows: pages } = result;

      if (pages.length === 0) return;

      const page = pages[0];

      const linksResponse = await fetch(`/api/get-links?pageId=${page.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { result: linksResult } = await linksResponse.json();

      if (!linksResult) return;

      const { rows: links } = linksResult;

      form.reset({ ...page, links });

      setIsLoading(false);
    })();
  }, [params.id]);

  return (
    <div className="flex flex-col p-4 space-y-4">
      <h1 className="text-2xl font-bold">Edição de página</h1>

      <Form {...form}>
        {/* <Dialog> */}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                    {/* {form.getValues(`links.${index}.name`) ? (
                        <DialogTrigger className="font-semibold text-sm">
                          {form.getValues(`links.${index}.name`)}
                        </DialogTrigger>
                      ) : (
                        <DialogTrigger className="font-semibold text-sm">
                          Definir nome
                        </DialogTrigger>
                      )} */}
                    <FormControl>
                      <Input
                        placeholder="Ex.: https://x.com/johndoeex"
                        autoCapitalize="off"
                        disabled={isLoading}
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
              {isLoading ? "Carregando..." : "Salvar alterações"}
            </Button>
          </div>
        </form>
        {/* </Dialog> */}
      </Form>
    </div>
  );
}
