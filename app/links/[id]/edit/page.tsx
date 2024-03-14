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
import { useRouter } from "next/navigation";
import { useToast } from "../../../../components/ui/use-toast";
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
    }),
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
  const { toast } = useToast();
  const { back } = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const { data: page, isLoading: isPageLoading } = useQuery({
    queryKey: ["page", params.id],
    queryFn: () => fetchPageData(params.id, user?.id),
    enabled: !!user,
    select: (data) => data?.result?.rows[0],
  });

  const { data: links, isLoading: isLinksLoading } = useQuery({
    queryKey: ["links", params.id, page?.links],
    queryFn: () => fetchLinksData(params.id),
    enabled: !!page,
    select: (data) => data?.result?.rows,
    staleTime: 0,
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
      setIsLoading(false);

      toast({
        title: "Página atualizada com sucesso",
        duration: 1500,
      });

      back();
    },
  });

  const loading = isLoading || isPageLoading || isLinksLoading;

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

    try {
      setIsLoading(true);

      const item = form.getValues("links")[index];

      if (item.id) {
        await fetch(`/api/links/${item.id}/delete`, {
          method: "DELETE",
        });
      }

      toast({
        title: "Link removido com sucesso!",
        duration: 1500,
      });

      remove(index);
    } catch (err) {
      toast({
        title: "Erro ao remover link!",
        duration: 1500,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
      toast({
        title: "Erro ao atualizar página",
        duration: 1500,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!page || !links) return;

    setIsLoading(false);
    form.reset({ ...page, links });
  }, [page, links]);

  return (
    <div className="flex flex-col space-y-4 p-4">
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
                    {...field}
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row justify-between">
            <h2 className="text-lg font-semibold">Links - {fields.length}/5</h2>
            <button type="button" onClick={onAddLink}>
              <PlusIcon className="h-8 w-8 text-black dark:text-black" />
            </button>
          </div>

          {fields.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              {loading ? "Carregando" : "Nenhum link adicionado"}
            </p>
          )}

          {fields.map((field, index) => (
            <div
              className="relative flex flex-col items-center space-y-2 rounded-lg bg-gray-100 p-3"
              key={field.id}
            >
              {loading && (
                <Loader2
                  className="absolute right-4 top-4 h-4 w-4 animate-spin"
                  color="red"
                />
              )}
              {!loading && (
                <TrashIcon
                  onClick={() => onRemoveLink(index)}
                  className="absolute right-4 top-4 h-4 w-4"
                  color="red"
                />
              )}
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
                        {...field}
                        disabled={loading}
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
                        disabled={loading}
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
              className="h-14 w-full rounded-none text-base"
              size="lg"
              type="submit"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Carregando" : "Salvar alterações"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
