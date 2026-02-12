/**
 * Data Service with caching and lazy loading
 * - In-memory caching to avoid redundant fetches
 * - Lazy loading for better performance
 * - Parallel request deduplication
 */

type CacheEntry<T> = {
  data: T
  timestamp: number
}

export interface Project {
  title: string
  img: string
  tags: string
  slug: string
  repo?: string
  description?: string
  screenshots?: string[]
  showRepo?: boolean
}

export interface Experience {
  title: string
  slug: string
  company: string
  role: string
  duration: string
  description: string
  skills: string
  img: string
  screenshots?: string[]
}

export interface Skill {
  category: string
  items: string[]
}

export interface Education {
  school: string
  degree: string
  year: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  credentialUrl?: string
}

/**
 * Get current language from i18n
 */
function getCurrentLanguage(): string {
  try {
    const lang = localStorage.getItem('i18nextLng') || 'fr'
    return lang.startsWith('en') ? 'en' : 'fr'
  } catch {
    return 'fr'
  }
}

/**
 * Get data file path based on language
 */
function getDataPath(basePath: string): string {
  const lang = getCurrentLanguage()
  if (lang === 'en') {
    return basePath.replace('.json', '-en.json')
  }
  return basePath
}

// Cache storage
const cache = new Map<string, CacheEntry<any>>()
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour
const pendingRequests = new Map<string, Promise<any>>()

/**
 * Fetch data with intelligent caching
 */
async function fetchData<T>(path: string): Promise<T> {
  const cacheKey = path

  // Return cached data if valid
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T
  }

  // Deduplicate parallel requests
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey)!
  }

  // Fetch and cache
  const request = fetch(path)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`)
      return res.json()
    })
    .then(data => {
      cache.set(cacheKey, { data, timestamp: Date.now() })
      pendingRequests.delete(cacheKey)
      return data
    })
    .catch(err => {
      pendingRequests.delete(cacheKey)
      console.error(`Error loading ${path}:`, err)
      throw err
    })

  pendingRequests.set(cacheKey, request)
  return request
}

/**
 * Preload data in background
 */
export function preloadData(basePath: string): void {
  const path = getDataPath(basePath)
  if (!cache.has(path) && !pendingRequests.has(path)) {
    fetchData(path).catch(() => {}) // Silent fail for preload
  }
}

/**
 * Load all projects
 */
export async function loadProjects(): Promise<Project[]> {
  const path = getDataPath('/data/projects.json')
  return fetchData<Project[]>(path)
}

/**
 * Load specific project by slug
 */
export async function loadProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await loadProjects()
  return projects.find(p => p.slug === slug) || null
}

/**
 * Load all experiences
 */
export async function loadExperiences(): Promise<Experience[]> {
  const path = getDataPath('/data/experiences.json')
  return fetchData<Experience[]>(path)
}

/**
 * Load specific experience by slug
 */
export async function loadExperienceBySlug(slug: string): Promise<Experience | null> {
  const experiences = await loadExperiences()
  return experiences.find(e => e.slug === slug) || null
}

/**
 * Load all skills
 */
export async function loadSkills(): Promise<Skill[]> {
  const path = getDataPath('/data/skills.json')
  return fetchData<Skill[]>(path)
}

/**
 * Load all education records
 */
export async function loadEducation(): Promise<Education[]> {
  return fetchData<Education[]>('/data/education.json')
}

/**
 * Load all certifications
 */
export async function loadCertifications(): Promise<Certification[]> {
  return fetchData<Certification[]>('/data/certifications.json')
}

/**
 * Load prompts and pictures
 */
export async function loadPromptsPics(): Promise<any> {
  return fetchData('/data/prompts_pics_pro.json')
}

/**
 * Clear cache (useful for development)
 */
export function clearCache(): void {
  cache.clear()
}

/**
 * Get cache stats (for debugging)
 */
export function getCacheStats() {
  return {
    cachedItems: cache.size,
    pendingRequests: pendingRequests.size,
    cacheSize: Array.from(cache.values()).reduce((sum, entry) => {
      return sum + JSON.stringify(entry.data).length
    }, 0)
  }
}
