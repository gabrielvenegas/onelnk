import { DndProvider, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

import { Input } from "../../../components/ui/input";
import { PageForm } from "../create/page";
import { TouchBackend } from "react-dnd-touch-backend";
import { TrashIcon } from "lucide-react";
import update from "immutability-helper";
import { useFormContext } from "react-hook-form";

interface DraggableFieldProps {
  id: string;
  index: number;
  moveField: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

const ItemTypes = {
  FIELD: "field",
};

const DraggableField: React.FC<DraggableFieldProps> = ({
  id,
  index,
  moveField,
  children,
}) => {
  const [, drag] = useDrag({
    type: ItemTypes.FIELD,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.FIELD,
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveField(item.index, index);
        item.index = index;
      }
    },
  });

  return <div ref={(node) => drag(drop(node))}>{children}</div>;
};

export default function DraggableLinks({
  onRemoveLink,
}: {
  onRemoveLink: (index: number) => void;
}) {
  const form = useFormContext<PageForm>();
  const fields = form.getValues("links");

  console.log(fields);
  const moveField = (dragIndex: number, hoverIndex: number) => {
    const dragField = fields[dragIndex];
    console.log(dragField);
    // Update your state here
  };

  return (
    <DndProvider
      backend={TouchBackend}
      options={{
        scrollAngleRanges: [
          { start: 30, end: 150 },
          { start: 210, end: 330 },
        ],
      }}
    >
      {fields.map((field, index) => (
        <DraggableField
          key={field.position}
          id={field.id!}
          index={index}
          moveField={moveField}
        >
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
        </DraggableField>
      ))}
    </DndProvider>
  );
}
