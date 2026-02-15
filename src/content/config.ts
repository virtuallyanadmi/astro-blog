import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string().default('jonathan'),
    date: z.coerce.date(),
    subheadline: z.string().optional(),
    teaser: z.string().optional(),
    categories: z.string().or(z.array(z.string())).optional(),
    tags: z.array(z.string()).optional(),
    image: z.object({
      title: z.string().optional(),
      thumb: z.string().optional(),
      homepage: z.string().optional(),
      caption: z.string().optional(),
      caption_url: z.string().optional(),
    }).optional(),
    comments: z.boolean().default(false),
  }),
});

export const collections = { blog };
