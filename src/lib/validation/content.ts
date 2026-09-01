import { z } from 'zod'

const optionalText = (maximum = 500) => z.string().trim().max(maximum).optional().transform((value) => value || null)
const optionalInteger = z.coerce.number().int().min(0).max(9999).optional()

export const teamInputSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2).max(120),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  ageGroup: optionalText(80),
  league: optionalText(120),
  description: optionalText(2000),
  activeSeason: optionalText(40),
  sortOrder: optionalInteger.default(0),
  isActive: z.boolean(),
})

export const personInputSchema = z.object({
  id: z.string().uuid().optional(),
  teamId: z.string().uuid(),
  fullName: z.string().trim().min(2).max(120),
  position: z.string().trim().min(2).max(100).optional(),
  jobTitle: z.string().trim().min(2).max(100).optional(),
  shirtNumber: z.coerce.number().int().min(0).max(99).optional(),
  sortOrder: optionalInteger.default(0),
  isActive: z.boolean(),
})

export const matchInputSchema = z.object({
  id: z.string().uuid().optional(),
  teamId: z.string().uuid(),
  homeTeam: z.string().trim().min(2).max(120),
  awayTeam: z.string().trim().min(2).max(120),
  competition: z.string().trim().min(2).max(120),
  week: z.coerce.number().int().min(1).max(99).optional(),
  matchDate: z.string().optional().transform((value) => value || null),
  kickoffTime: z.string().optional().transform((value) => value || null),
  stadium: optionalText(160),
  homeScore: z.coerce.number().int().min(0).optional(),
  awayScore: z.coerce.number().int().min(0).optional(),
  status: z.enum(['scheduled', 'postponed', 'completed', 'cancelled']),
  isHome: z.boolean(),
  isActive: z.boolean(),
}).superRefine((value, context) => {
  if (value.homeTeam === value.awayTeam) context.addIssue({ code: 'custom', message: 'Ev sahibi ve deplasman takımı aynı olamaz.' })
  if (value.status === 'completed' && (value.homeScore === undefined || value.awayScore === undefined)) context.addIssue({ code: 'custom', message: 'Tamamlanan maçta iki skor da gereklidir.' })
  if ((value.homeScore === undefined) !== (value.awayScore === undefined)) context.addIssue({ code: 'custom', message: 'Skorlar birlikte girilmelidir.' })
})

export const newsInputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(3).max(180),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().trim().min(10).max(500),
  content: z.string().trim().min(10).max(20000),
  category: z.string().trim().min(2).max(60),
  status: z.enum(['draft', 'published']),
  publishedAt: z.string().optional(),
}).superRefine((value, context) => {
  if (value.status === 'published' && !value.publishedAt) context.addIssue({ code: 'custom', message: 'Yayın tarihi gereklidir.', path: ['publishedAt'] })
})

export const galleryInputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(2).max(160),
  description: optionalText(1000),
  category: z.string().trim().min(2).max(60),
  takenAt: z.string().optional().transform((value) => value || null),
  sortOrder: optionalInteger.default(0),
  isActive: z.boolean(),
})

export const settingsInputSchema = z.object({
  homeHeroTitle: z.string().trim().min(2).max(160),
  homeHeroText: z.string().trim().max(1000),
  clubDescription: z.string().trim().max(3000),
  address: z.string().trim().max(500),
  phone: z.string().trim().max(60),
  email: z.string().trim().email().max(160),
  instagramUrl: z.string().url().optional().or(z.literal('')).transform((value) => value || null),
  facebookUrl: z.string().url().optional().or(z.literal('')).transform((value) => value || null),
  youtubeUrl: z.string().url().optional().or(z.literal('')).transform((value) => value || null),
})
