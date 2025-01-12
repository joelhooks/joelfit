import { z } from 'zod'

export const codeBlockSchema = z.object({
  language: z.string().optional(),
  code: z.string(),
})

export const technicalDetailSchema = z.object({
  title: z.string(),
  description: z.string(),
  examples: z.array(codeBlockSchema).optional(),
})

export const contentSchema = z.object({
  metadata: z.object({
    title: z.string(),
    author: z.string().optional(),
    date: z.string().optional(),
    summary: z.string(),
  }),
  introduction: z.string(),
  mainPoints: z.array(z.string()),
  sections: z.array(z.object({
    title: z.string(),
    content: z.string(),
    subsections: z.array(z.object({
      title: z.string(),
      content: z.string(),
    })).optional(),
  })),
  codeExamples: z.array(codeBlockSchema).optional(),
  technical: z.object({
    details: z.array(technicalDetailSchema),
    implementation: z.array(codeBlockSchema),
  }).optional(),
  references: z.array(z.string()).optional(),
}) 