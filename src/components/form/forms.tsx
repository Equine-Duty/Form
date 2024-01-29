import { createContext, useContext } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { FormSchema, ObjectType } from "@/types/utils";
import { useTranslation } from "react-i18next";

type FormContextProps = UseFormReturn<ObjectType, unknown, undefined>;

/**
 * Full component for text area containing everything you need for a form.
 * It need to be wrapped in a CustomForm component.
 * 
 * @param name Name for the input. 
 * @param label Label for the input.
 * @param placeholder Placeholder for the input.
 * @returns 
 */

export function FormTextArea({ name, label, placeholder }: FormInputProps) {
  const form = useCustomForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="w-[180px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type FormInputProps = {
  name: string;
  label: string;
  placeholder: string;
};

/**
 * Full component for input containing everything you need for a form.
 * It need to be wrapped in a CustomForm component.
 *
 * @param name Name for the input.
 * @param label Label for the input.
 * @param placeholder Placeholder for the input.
 * @returns
 */
export function FormInput({ name, label, placeholder }: FormInputProps) {
  const form = useCustomForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} className="w-[180px]" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type FormSelectProps = {
  name: string;
  label: string;
  options: { label: string; value: string }[];
  placeholder: string;
};

/**
 * Full component for select containing everything you need for a form.
 * It need to be wrapped in a CustomForm component.
 *
 * @param name Name for the checkbox.
 * @param label Label for the checkbox.
 * @param options Options for the select.
 * @param placeholder Placeholder for the select.
 * @returns
 */
export function FormSelect({
  name,
  label,
  options,
  placeholder,
}: FormSelectProps) {
  const form = useCustomForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{placeholder}</SelectLabel>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

type FormCheckboxProps = {
  name: string;
  label: string;
};

/**
 * Full component for checkbox containing everything you need for a form.
 * It need to be wrapped in a CustomForm component.
 *
 * @param name Name for the checkbox.
 * @param label Label for the checkbox.
 * @returns
 */
export function FormCheckbox({ name, label }: FormCheckboxProps) {
  const form = useCustomForm();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { ref, name, onChange, value } }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={name}
                ref={ref}
                name={name}
                onCheckedChange={() => onChange(!value)}
              />
              <FormLabel htmlFor={name} className="ml-2">
                {label}
              </FormLabel>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type FormProps = {
  children: React.ReactNode;
  schema: FormSchema;
  onSubmit: (values: z.infer<FormSchema>) => void;
  defaultValues: z.infer<FormSchema>;
};

const FormContext = createContext<FormContextProps | undefined>(undefined);

/**
 * Custom form element that wrap the form and provide the context for the form.
 * 
 * @param children Content of the form
 * @param schema Zod schema for the form
 * @param defaultValues Default values for the schema
 * @returns Custom form element
 */
export function CustomForm({
  children,
  schema,
  defaultValues,
  onSubmit,
}: FormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { t } = useTranslation();

  return (
    <FormContext.Provider value={form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {children}
          <Button type="submit">{t("form.submit")}</Button>
        </form>
      </Form>
    </FormContext.Provider>
  );
}

/**
 * Hook to get the context of the form. Should be used only for custom component inside the form.
 * It need to be wrapped in a CustomForm component.
 * 
 * @returns Context of the form
 */
export function useCustomForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useCustomForm must be used within a CustomForm");
  }
  return context;
}
