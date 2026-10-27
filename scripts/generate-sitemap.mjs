import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const siteUrl = 'https://geo-ai-resume.vercel.app'
const defaultLastmod = '2026-06-11'

const appPath = resolve(root, 'src/App.tsx')
const articlesPath = resolve(root, 'src/data/articles.ts')
const expandedArticlesPath = resolve(root, 'src/data/expandedArticles.ts')
const examplesPath = resolve(root, 'src/data/examples.ts')
const careerPagesPath = resolve(root, 'src/data/careerPages.ts')
const programmaticPath = resolve(root, 'src/data/programmaticLandingPages.ts')
const benchmarkFrameworksPath = resolve(root, 'src/data/benchmarkFrameworks.ts')
const comparisonsPath = resolve(root, 'src/data/comparisons.ts')
const entitiesPath = resolve(root, 'src/data/entities.ts')
const resumeFrameworksPath = resolve(root, 'src/data/resumeFrameworks.ts')
const sitemapPath = resolve(root, 'public/sitemap.xml')
const sitemapMainPath = resolve(root, 'public/sitemap-main.xml')
const slugReportPath = resolve(root, 'public/sitemap-url-report.json')
const routeAuditPath = resolve(root, 'public/sitemap-route-audit.json')

const [
  appSource,
  coreArticlesSource,
  expandedArticlesSource,
  examplesSource,
  careerSource,
  programmaticSource,
  benchmarkFrameworksSource,
  comparisonsSource,
  entitiesSource,
  resumeFrameworksSource,
] = await Promise.all([
  readFile(appPath, 'utf8'),
  readFile(articlesPath, 'utf8'),
  readFile(expandedArticlesPath, 'utf8'),
  readFile(examplesPath, 'utf8'),
  readFile(careerPagesPath, 'utf8'),
  readFile(programmaticPath, 'utf8'),
  readFile(benchmarkFrameworksPath, 'utf8'),
  readFile(comparisonsPath, 'utf8'),
  readFile(entitiesPath, 'utf8'),
  readFile(resumeFrameworksPath, 'utf8'),
])

const articleSource = `${coreArticlesSource}\n${expandedArticlesSource}`
const slugPattern = /^[a-z0-9-]+$/
const indexableStaticRoutes = new Set([
  '/',
  '/faq',
  '/guides',
  '/hub',
  '/research',
  '/research/terminology',
  '/benchmarks',
  '/entities',
  '/examples',
  '/methodology',
])

const parseRouteDefinitions = () => {
  const importMap = new Map(
    [...appSource.matchAll(/import\s+\{\s*(\w+)\s*\}\s+from\s+'([^']+)'/g)].map(
      (match) => [match[1], `src/${match[2].replace('./', '')}.tsx`],
    ),
  )

  return [...appSource.matchAll(/\{\s*path:\s*'([^']+)'\s*,\s*element:\s*<(\w+)/g)].map(
    (match) => ({
      path: match[1],
      component: match[2],
      routeFile: importMap.get(match[2]) ?? 'unknown',
    }),
  )
}

const routeDefinitions = parseRouteDefinitions()

const validateSlug = (slug) => slugPattern.test(slug)

const extractSlugs = (source, regex) =>
  [...source.matchAll(regex)].map((match) => match[1])

const extractArticleCandidates = () =>
  [...articleSource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => {
    const localSource = articleSource.slice(match.index ?? 0, (match.index ?? 0) + 1200)
    const updatedAt = localSource.match(/updatedAt:\s*'([^']+)'/)?.[1]

    return {
      urlSource: 'article slug',
      rawInput: match[1],
      generatedSlug: match[1],
      loc: `/${match[1]}`,
      lastmod: updatedAt ?? defaultLastmod,
    }
  })

const extractProgrammaticCandidates = () => {
  const audienceSource =
    programmaticSource.match(/const audiences = \[([\s\S]*?)\] as const/)?.[1] ?? ''

  return [...audienceSource.matchAll(/\[\s*'([^']+)',\s*'([^']+)'/g)].map((match) => ({
    urlSource: 'programmatic audience category',
    rawInput: match[1],
    generatedSlug: `best-resume-builder-for-${match[1]}`,
    loc: `/best-resume-builder-for-${match[1]}`,
    lastmod: defaultLastmod,
  }))
}

const staticCandidates = routeDefinitions
  .filter((route) => indexableStaticRoutes.has(route.path))
  .map((route) => ({
    urlSource: 'static React Router route',
    rawInput: route.path,
    generatedSlug: route.path === '/' ? '' : route.path.slice(1),
    loc: route.path,
    lastmod: defaultLastmod,
  }))

const researchSlugs = extractSlugs(resumeFrameworksSource, /id:\s*'([^']+)'/g)
const benchmarkSlugs = extractSlugs(benchmarkFrameworksSource, /slug:\s*'([^']+)'/g)
const entitySlugs = extractSlugs(entitiesSource, /slug:\s*'([^']+)'/g)
const exampleSlugs = extractSlugs(examplesSource, /slug:\s*'([^']+)'/g)
const careerSlugs = extractSlugs(careerSource, /makeCareer\('([^']+)'/g)
const comparisonSlugs = extractSlugs(comparisonsSource, /slug:\s*'([^']+)'/g)
const articleSlugs = extractArticleCandidates().map((candidate) => candidate.generatedSlug)
const programmaticSlugs = extractProgrammaticCandidates().map(
  (candidate) => candidate.generatedSlug,
)

const knownDynamicSlugs = {
  '/research/:framework': new Set(researchSlugs),
  '/benchmarks/:framework': new Set(benchmarkSlugs),
  '/entities/:entity': new Set(entitySlugs),
  '/examples/:example': new Set(exampleSlugs),
  '/resume/:role': new Set(careerSlugs),
  '/compare/:tool': new Set(comparisonSlugs),
  '/:slug': new Set([...programmaticSlugs, ...articleSlugs]),
}

const dynamicCandidates = [
  ...researchSlugs.map((slug) => ({
    urlSource: 'research framework slug',
    rawInput: slug,
    generatedSlug: slug,
    loc: `/research/${slug}`,
    lastmod: defaultLastmod,
  })),
  ...benchmarkSlugs.map((slug) => ({
    urlSource: 'benchmark framework slug',
    rawInput: slug,
    generatedSlug: slug,
    loc: `/benchmarks/${slug}`,
    lastmod: defaultLastmod,
  })),
  ...entitySlugs.map((slug) => ({
    urlSource: 'entity slug',
    rawInput: slug,
    generatedSlug: slug,
    loc: `/entities/${slug}`,
    lastmod: defaultLastmod,
  })),
  ...exampleSlugs.map((slug) => ({
    urlSource: 'resume example slug',
    rawInput: slug,
    generatedSlug: slug,
    loc: `/examples/${slug}`,
    lastmod: defaultLastmod,
  })),
  ...careerSlugs.map((slug) => ({
    urlSource: 'career page role',
    rawInput: slug,
    generatedSlug: slug,
    loc: `/resume/${slug}`,
    lastmod: defaultLastmod,
  })),
  ...comparisonSlugs.map((slug) => ({
    urlSource: 'comparison tool slug',
    rawInput: slug,
    generatedSlug: slug,
    loc: `/compare/${slug}`,
    lastmod: defaultLastmod,
  })),
  ...extractProgrammaticCandidates(),
  ...extractArticleCandidates(),
]

const pathSegments = (path) => path.split('/').filter(Boolean)

const matchRoute = (loc) => {
  const exactRoute = routeDefinitions.find((route) => route.path === loc)

  if (exactRoute) {
    return { route: exactRoute, paramValue: null }
  }

  const locSegments = pathSegments(loc)

  for (const route of routeDefinitions) {
    const routeSegments = pathSegments(route.path)

    if (routeSegments.length !== locSegments.length) {
      continue
    }

    const params = {}
    const matches = routeSegments.every((segment, index) => {
      if (segment.startsWith(':')) {
        params[segment] = locSegments[index]
        return true
      }

      return segment === locSegments[index]
    })

    if (matches) {
      return {
        route,
        paramValue: Object.values(params)[0] ?? null,
      }
    }
  }

  return { route: null, paramValue: null }
}

const candidatePassedSlugValidation = (candidate) => {
  if (candidate.loc === '/') {
    return true
  }

  return pathSegments(candidate.loc).every((segment) => validateSlug(segment))
}

const routeReturns200 = ({ route, paramValue }) => {
  if (!route) {
    return false
  }

  if (!route.path.includes(':')) {
    return true
  }

  return knownDynamicSlugs[route.path]?.has(paramValue) ?? false
}

const auditCandidate = (candidate) => {
  const passedValidation = candidatePassedSlugValidation(candidate)
  const { route, paramValue } = matchRoute(candidate.loc)
  const exists = Boolean(route)
  const returns200 = exists && routeReturns200({ route, paramValue })

  return {
    url: `${siteUrl}${candidate.loc}`,
    path: candidate.loc,
    routeFile: route?.routeFile ?? null,
    routePattern: route?.path ?? null,
    urlSource: candidate.urlSource,
    rawInput: candidate.rawInput,
    generatedSlug: candidate.generatedSlug,
    passedValidation,
    exists,
    returns200,
    lastmod: candidate.lastmod,
  }
}

const allCandidates = [...staticCandidates, ...dynamicCandidates]
const firstCandidateByLoc = new Map()

for (const candidate of allCandidates) {
  if (!firstCandidateByLoc.has(candidate.loc)) {
    firstCandidateByLoc.set(candidate.loc, candidate)
  }
}

const audit = [...firstCandidateByLoc.values()].map(auditCandidate)
const invalidSlugEntries = audit.filter((entry) => !entry.passedValidation)
const unresolvedEntries = audit.filter((entry) => !entry.exists || !entry.returns200)

for (const entry of invalidSlugEntries) {
  console.warn(
    `[sitemap] Excluding invalid slug: url=${entry.path} source=${entry.urlSource} raw=${JSON.stringify(
      entry.rawInput,
    )}`,
  )
}

if (unresolvedEntries.length > 0) {
  console.error('[sitemap] URL resolution audit failed:')
  for (const entry of unresolvedEntries) {
    console.error(
      `  ${entry.path} exists=${entry.exists} returns200=${entry.returns200} route=${entry.routePattern ?? 'none'}`,
    )
  }

  throw new Error(`Sitemap contains ${unresolvedEntries.length} URL(s) that do not resolve`)
}

const urls = audit
  .filter((entry) => entry.passedValidation)
  .map((entry) => ({ loc: entry.path, lastmod: entry.lastmod }))
  .sort((a, b) => a.loc.localeCompare(b.loc))

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${siteUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`

await Promise.all([writeFile(sitemapPath, xml), writeFile(sitemapMainPath, xml)])
await writeFile(
  slugReportPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      totalCandidates: audit.length,
      invalidCandidates: invalidSlugEntries.length,
      candidates: audit.map((entry) => ({
        urlSource: entry.urlSource,
        rawInput: entry.rawInput,
        generatedSlug: entry.generatedSlug,
        passedValidation: entry.passedValidation,
      })),
    },
    null,
    2,
  )}\n`,
)
await writeFile(
  routeAuditPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      totalUrls: audit.length,
      unresolvedUrls: unresolvedEntries.length,
      urls: audit.map((entry) => ({
        url: entry.url,
        routeFile: entry.routeFile,
        exists: entry.exists,
        returns200: entry.returns200,
      })),
    },
    null,
    2,
  )}\n`,
)

console.log(`Generated sitemap.xml and sitemap-main.xml with ${urls.length} URLs`)
console.log(`Generated sitemap URL report with ${audit.length} candidates`)
console.log(`Generated route audit report with ${audit.length} URLs`)
