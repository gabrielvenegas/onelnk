"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FaInstagram,
  FaSquareFacebook,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { cn } from "../../../../lib/utils";
import { useState } from "react";

const socialMediaList = [
  {
    id: 1,
    Icon: FaXTwitter,
    uri: "https://x.com/",
    name: "x",
  },
  {
    id: 2,
    Icon: FaInstagram,
    uri: "https://instagram.com/",
    name: "instagram",
  },
  {
    id: 3,
    Icon: FaSquareFacebook,
    uri: "https://facebook.com/",
    name: "facebook",
  },
  {
    id: 4,
    Icon: FaTiktok,
    uri: "https://www.tiktok.com/",
    name: "tiktok",
  },
];

export default function SocialMedia() {
  const [link, setLink] = useState<{ name: string; url: string }>({
    name: "",
    url: "",
  });
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "links",
  });

  const onAddLink = () => {
    if (fields.length >= 5) return;

    append(link);
  };

  const onRemoveLink = (index: number) => {
    if (fields.length <= 0) return;

    remove(index);
  };

  const getColor = (name: string) => {
    // @ts-ignore
    const color = fields.find((v) => v.name === name);

    return color
      ? { text: "#FFF", button: "#000" }
      : { text: "#000", button: "#FFF" };
  };

  return (
    <Dialog>
      <div className="grid grid-cols-4 py-2 gap-2 w-[98vw]">
        {socialMediaList.map(({ id, Icon, name, uri }) => (
          <div key={id}>
            <DialogTrigger asChild>
              <Button
                key={id}
                variant="outline"
                size="icon"
                className="w-20 h-20"
                style={{
                  backgroundColor: getColor(name).button,
                }}
                type="button"
                onClick={() => setLink({ name, url: uri })}
              >
                <Icon size={40} color={getColor(name).text} />
              </Button>
            </DialogTrigger>
          </div>
        ))}
      </div>

      <DialogContent>
        <FormItem className="w-full">
          <FormLabel>URL do link</FormLabel>

          <FormControl>
            <Input
              placeholder="Ex.: https://x.com/johndoeex"
              autoCapitalize="off"
              defaultValue={link.url || ""}
              onChange={(e) => setLink({ ...link, url: e.target.value })}
              autoFocus
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={onAddLink}>
              Salvar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
