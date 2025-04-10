import {z} from "zod";

export const linksSchemas = z.object({
    originalUrl: z.string().min(5, 'URL is required. The minimum symbols must be 5'),
});