import { z } from 'zod'

const codeBlockSchema = z.object({
  language: z.string().optional(),
  code: z.string(),
  path: z.string().optional(),
  explanation: z.string().optional()
})

export const contentSchema = z.object({
  metadata: z.object({
    title: z.string(),
    author: z.string().optional(),
    date: z.string().optional(),
    summary: z.string()
  }),
  introduction: z.string(),
  mainPoints: z.array(z.string()),
  sections: z.array(z.object({
    title: z.string(),
    content: z.string(),
    subsections: z.array(z.object({
      title: z.string(),
      content: z.string()
    })).optional()
  })),
  codeExamples: z.array(codeBlockSchema).optional(),
  technical: z.object({
    details: z.array(z.object({
      title: z.string(),
      description: z.string(),
      examples: z.array(codeBlockSchema).optional()
    })),
    implementation: z.array(codeBlockSchema).optional()
  }).optional(),
  references: z.array(z.object({
    title: z.string(),
    url: z.string().url()
  })).optional()
})

export type Content = z.infer<typeof contentSchema> 