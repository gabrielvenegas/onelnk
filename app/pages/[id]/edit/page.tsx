"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, PlusIcon, TrashIcon } from "lucide-react";
import { fetchLinksData, updateLinks } from "@/services/links";
import { fetchPageData, updatePage } from "@/services/page";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { CONSTANTS } from "@/lib/constants";
import ColorPicker from "@/components/ui/color-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { extractWebsiteName } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, CONSTANTS.required).max(50),
  description: z.string().optional(),
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

  const { data: page } = useQuery({
    queryKey: ["page"],
    queryFn: () => fetchPageData(params.id, user?.id),
    enabled: !!user,
    select: (data) => data?.result?.rows[0],
  });

  const { data: links } = useQuery({
    queryKey: ["links"],
    queryFn: () => fetchLinksData(params.id),
    enabled: !!page,
    select: (data) => data?.result?.rows,
  });

  const { mutateAsync: updatePageMutate } = useMutation({
    mutationKey: ["page"],
    mutationFn: (data: z.infer<typeof formSchema>) => updatePage(data),
  });

  const { mutate: updateLinksMutate } = useMutation({
    mutationKey: ["links"],
    mutationFn: ({
      links,
    }: {
      links: z.infer<typeof formSchema>["links"][number][];
    }) => updateLinks(links),
    onSuccess: () => {
      window.location.href = `/pages`;
    },
  });

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
      await fetch(`/api/links/${item.id}/delete`, {
        method: "DELETE",
      });
    }

    remove(index);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user) return;

    try {
      setIsLoading(true);

      await updatePageMutate(data);

      const links = form.getValues("links").map((link: any) => ({
        ...link,
        name: !link.name ? extractWebsiteName(link.url) : link.name,
        page_id: link.page_id || params.id,
      }));

      updateLinksMutate({
        links,
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!page || !links) return;

    form.reset({ ...page, links });
  }, [page, links]);

  return (
    <div className="flex flex-col p-4 space-y-4">
      <h1 className="text-xl font-bold">Edição de página</h1>

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
                    selectedColor={field.value}
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
                    selectedColor={field.value || ""}
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
              className="flex flex-col relative items-center space-y-2 bg-gray-100 rounded-lg p-3"
              key={field.id}
            >
              <TrashIcon
                onClick={() => onRemoveLink(index)}
                className="absolute top-4 w-4 h-4 right-4"
                color="red"
              />

              <FormField
                control={form.control}
                name={`links.${index}.url`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>URL do link</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Ex.: https://x.com/johndoeex"
                        autoCapitalize="off"
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`links.${index}.name`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nome do link (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex.: Instagram"
                        autoCapitalize="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
      </Form>
    </div>
  );
}
