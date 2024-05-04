"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { extractWebsiteName, generateHash } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { CONSTANTS } from "@/lib/constants";
import ColorPicker from "@/components/ui/color-picker";
import ContentTabs from "../_components/tabs";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(3, CONSTANTS.required).max(50),
  description: z.string().optional(),
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
  const { toast } = useToast();
  const router = useRouter();

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

      const res = await fetch("/api/pages/create", {
        method: "POST",
        body: JSON.stringify(page),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { result } = await res.json();

      if (!result) return;

      if (data.links.length <= 0) {
        toast({
          title: "Página criada com sucesso!",
          duration: 1500,
        });

        router.back();

        return;
      }

      const { rows } = result;
      const { id: pageId } = rows[0];

      const links = data.links.map((link) => ({
        ...link,
        page_id: pageId,
        name: !link.name ? extractWebsiteName(link.url) : link.name,
      }));

      const linksResponse = await fetch("/api/links/create", {
        method: "POST",
        body: JSON.stringify({
          links,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (linksResponse.ok) {
        toast({
          title: "Página criada com sucesso!",
          duration: 1500,
        });

        router.back();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-xl font-bold">Nova página</h1>

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

          <div className="flex flex-row justify-between pt-4">
            <h2 className="text-lg font-semibold">Conteúdo</h2>
          </div>

          <ContentTabs />

          <div className="fixed inset-x-0 bottom-0">
            <Button
              className="h-14 w-full rounded-none text-base"
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
