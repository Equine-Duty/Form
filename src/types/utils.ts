import { z } from "zod";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ObjectType = { [x: string]: any };

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type FormSchema = z.ZodObject<any, any>;