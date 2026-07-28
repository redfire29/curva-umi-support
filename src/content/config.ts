import { defineCollection, z } from 'astro:content';

const songsCollection = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      date: z.string(),
      streamName: z.string(),
      showList: z.boolean().optional(),
      showDate: z.boolean().optional(),
      songList: z.array(
        z.object({
          showDate: z.boolean().optional(),
          songName: z.string(),
          singer: z.string().optional(),
          songTime: z.string().optional(),
          songLink: z.string()
        })
      ).optional().default([])
    })
  )
});

export const collections = {
  'songs': songsCollection,
};
