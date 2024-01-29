import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ObjectType } from "@/types/utils";
import {
  CustomForm,
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTextArea,
  useCustomForm,
} from "@/components/form/forms";
import { Trash } from "lucide-react";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const inlineFormSchema = z.object({
  checkbox: z.boolean(),
  input: z.string(),
});

const formSchema = z.object({
  file: z
    .any()
    .refine((file) => file !== null, "Veuillez-sélectionner un fichier.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
    .refine(
      (file) => ACCEPTED_TYPES.includes(file?.type),
      "Seulement les fichiers xlsx sont acceptés."
    ),
  select: z.string().min(1, "Veuillez sélectionner une option."),
  textarea: z.string().min(1, "Veuillez remplir ce champ."),
  checkbox: z.boolean(),
  input2: z.string().max(3, "Max 3").min(1, "Min 1"),
  inputRegex: z
    .string()
    .min(1, "Veuillez entrer un .")
    .regex(/^[0-9]{9}$/, " suivi de 9 chiffres."),
  objectElement: z.object({
    obj1: z.string(),
    obj2: z.string(),
  }),
  arrayElement: z.array(inlineFormSchema),
});

const defaultValue = {
  file: null,
  select: "",
  checkbox: false,
  inputRegex: "",
  objectElement: {
    obj1: "",
    obj2: "",
  },
  arrayElement: [
    {
      checkbox: false,
      input: "",
    },
  ],
  input2: "",
};

export function Home2() {
  function onSubmit(values: ObjectType) {
    // Form data est nécessaire pour envoyé un fichier en POST.
    const formData = new FormData();
    formData.append("file", values.file);

    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Example form</CardTitle>
        <CardDescription>
          This is an example form with all the components.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <CustomForm
          schema={formSchema}
          onSubmit={onSubmit}
          defaultValues={defaultValue}
        >
          <FormSelect
            name={"select"}
            label={"Select Options"}
            placeholder={"Options"}
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
              { label: "Option 4", value: "4" },
            ]}
          />
          <FormCheckbox name={"checkbox"} label={"Checkbox"} />
          <FormInput
            name={"inputRegex"}
            label={"Input Regex"}
            placeholder={"Value"}
          />
          <FormInput
            name={"objectElement.obj1"}
            label={"Object 1"}
            placeholder={"Object"}
          />
          <FormInput
            name={"input2"}
            label={"BLAHHAHA 1"}
            placeholder={"Object"}
          />
          <FormTextArea
            name={"textarea"}
            label={"Textarea"}
            placeholder={"Écrire quelque chose..."}
          />
          <FormInline />
          <FormField
            name="file"
            render={({ field: { ref, name, onChange } }) => (
              <FormItem>
                <FormLabel>Fichier</FormLabel>
                <FormControl>
                  <Input
                    id="file"
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    ref={ref}
                    name={name}
                    onChange={(e) => {
                      onChange(e.target.files?.[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CustomForm>
      </CardContent>
    </Card>
  );
}

/**
 * Inline form example. Gonna be used for forms thats contains multiple
 * elements that could be repeatable.
 *
 * @returns
 */
export function FormInline() {
  const formArray = useCustomForm();

  const control = formArray.control;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "arrayElement",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horses</CardTitle>
        <CardDescription>Inline</CardDescription>
      </CardHeader>
      <CardContent>
        {fields.map((item, index: number) => {
          return (
            <Card>
              <CardContent key={item.id}>
                <FormInput
                  name={`arrayElement.${0}.input`}
                  label={"Input"}
                  placeholder={"Input"}
                />
                <FormCheckbox
                  name={`arrayElement.${0}.checkbox`}
                  label={"Checkbox"}
                />
                <Button
                  variant={"destructive"}
                  onClick={() => remove(index)}
                  className="flex justify-center items-center self-center"
                >
                  <Trash className="w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          onClick={() => {
            append({ checkbox: false, input: "" });
          }}
        >
          append
        </Button>
      </CardFooter>
    </Card>
  );
}
