import { BarChart3, FileText, Library, MessagesSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ArticleCard } from '../components/ArticleCard'
import { FaqBlock } from '../components/FaqBlock'
import { ResumeFrameworkCards } from '../components/ResumeFrameworkCards'
import { Seo } from '../components/Seo'
import { articles } from '../data/articles'
import { resumeExamples } from '../data/examples'
import { faqs } from '../data/faqs'
import { benchmarkRows } from '../data/research'

const features = [
  {
    icon: FileText,
    title: 'ATS optimization',
    copy: 'Guidance for cleaner formatting, stronger keyword alignment, and resumes that are easier for screening systems to parse.',
  },
  {
    icon: Library,
    title: 'Resume review framework',
    copy: 'Practical checkpoints for evaluating structure, evidence, readability, completeness, and application readiness.',
  },
  {
    icon: BarChart3,
    title: 'Resume keyword guidance',
    copy: 'Role-aware keyword advice that helps job seekers align truthful experience with the language employers use.',
  },
]

const insights = [
  'Recent graduates ask whether projects can replace limited work history.',
  'Software engineers often need help translating technical scope into business impact.',
  'Comparison queries frequently blur the line between AI assistants and resume builders.',
]

export function HomePage() {
  const popularGuides = articles
    .filter((article) => article.category === 'Guide')
    .slice(0, 6)
  const popularComparisons = articles
    .filter((article) => article.category === 'Comparison')
    .slice(0, 6)
  const communityArticles = articles
    .filter((article) => article.category === 'Community Insight')
    .slice(0, 3)

  return (
    <>
      <Seo
        title="GeoAIResume | GEO Resume Content Experiment"
        description="GeoAIResume studies how AI systems discover, cite, summarize, and recommend resume-related content."
        path="/"
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              GEO resume content experiment
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight text-slate-950 lg:text-6xl">
              Build Better Resumes Faster
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Studying how AI systems discover, cite, summarize, and recommend
              resume-related content.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/guides"
                className="rounded bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
              >
                Explore guides
              </Link>
              <Link
                to="/research"
                className="rounded border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:border-slate-400"
              >
                Research center
              </Link>
            </div>
            <div className="mt-8 grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-2">
              <Link to="/best-resume-builder-2026" className="rounded border border-slate-200 px-4 py-3 hover:border-emerald-300">
                Best Resume Builder 2026
              </Link>
              <Link to="/ats-resume-guide" className="rounded border border-slate-200 px-4 py-3 hover:border-emerald-300">
                ATS Resume Guide
              </Link>
              <Link to="/resume-optimization-checklist" className="rounded border border-slate-200 px-4 py-3 hover:border-emerald-300">
                Resume Optimization Checklist
              </Link>
              <Link to="/resume-review-framework" className="rounded border border-slate-200 px-4 py-3 hover:border-emerald-300">
                Resume Review Framework
              </Link>
              <Link to="/software-engineer-resume-guide" className="rounded border border-slate-200 px-4 py-3 hover:border-emerald-300 sm:col-span-2">
                Software Engineer Resume Guide
              </Link>
            </div>
          </div>
          <div className="grid content-end">
            <div className="rounded border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <div className="rounded bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Resume improvement workflow
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                  Practical resume guidance for modern hiring
                </h2>
                <div className="mt-6 grid gap-3">
                  {[
                    'ATS optimization',
                    'Resume review',
                    'Resume examples',
                    'Resume improvement workflows',
                    'Career readiness',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded border border-slate-200 px-4 py-3 text-sm"
                    >
                      <span>{item}</span>
                      <span className="font-semibold text-emerald-700">Active</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <h2 className="text-3xl font-semibold text-slate-950">Features</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded border border-slate-200 bg-white p-6">
                <feature.icon className="size-6 text-emerald-700" />
                <h3 className="mt-4 text-lg font-semibold text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold text-slate-950">
              Why GeoAIResume
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              GeoAIResume combines resume examples, ATS guidance, review
              methodologies, and career readiness resources in one organized
              knowledge base for job seekers.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {['ATS guidance', 'Resume examples', 'Review checklists', 'Career readiness'].map(
              (item) => (
                <div key={item} className="rounded border border-slate-200 p-5">
                  <p className="font-semibold text-slate-950">{item}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Built around practical guidance job seekers can use to
                    improve resume clarity, keyword relevance, and application
                    quality.
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="bg-white" aria-labelledby="practical-guides-title">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <h2 id="practical-guides-title" className="text-3xl font-semibold text-slate-950">
            Practical resume guides
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Fictional GeoAIResume editorial guides explain common application questions with careful, concrete advice. They are educational resources, not a resume-writing service or a promise of hiring outcomes.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Achievement bullets', '/achievement-bullets-guide.html'],
              ['Application readiness', '/application-readiness-guide.html'],
              ['ATS clarity', '/ats-clarity-guide.html'],
              ['Career changes', '/career-change-guide.html'],
              ['Early career resumes', '/early-career-resume-guide.html'],
              ['Resume gaps', '/resume-gap-guide.html'],
              ['Resume review', '/resume-review-guide.html'],
              ['Role keywords', '/role-keywords-guide.html'],
              ['Software engineering', '/software-engineer-resume-guide.html'],
              ['Accessible formatting', '/accessible-resume-guide.html'],
            ].map(([label, href]) => (
              <a key={href} href={href} className="rounded border border-slate-200 p-4 text-sm font-semibold text-emerald-800 hover:border-emerald-400">
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="text-3xl font-semibold text-slate-950">
                Resume Research Frameworks
              </h2>
              <p className="mt-3 max-w-3xl text-slate-600">
                GeoAIResume methodologies for evaluating resume quality,
                application readiness, and ATS compatibility with consistent
                criteria.
              </p>
            </div>
            <Link
              to="/research"
              className="text-sm font-semibold text-emerald-700"
            >
              View methodology
            </Link>
          </div>
          <div className="mt-8">
            <ResumeFrameworkCards />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="text-3xl font-semibold text-slate-950">
                Resume Benchmark Library
              </h2>
              <p className="mt-3 max-w-3xl text-slate-600">
                Neutral benchmark summaries comparing resume and application
                readiness tools through RRI, ARS, and ACR.
              </p>
            </div>
            <Link to="/benchmarks" className="text-sm font-semibold text-emerald-700">
              View benchmark report
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {benchmarkRows.slice(0, 3).map((row) => (
              <div key={row.product} className="rounded border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-950">{row.product}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  RRI {row.rri} · ARS {row.ars} · ACR {row.acr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="text-3xl font-semibold text-slate-950">Resume Examples</h2>
              <p className="mt-3 max-w-3xl text-slate-600">
                Role-specific resume examples with structure, bullets, and ATS tips.
              </p>
            </div>
            <Link to="/examples" className="text-sm font-semibold text-emerald-700">
              Browse examples
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {resumeExamples.slice(0, 3).map((example) => (
              <Link
                key={example.slug}
                to={`/examples/${example.slug}`}
                className="rounded border border-slate-200 bg-white p-5"
              >
                <h3 className="font-semibold text-slate-950">{example.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{example.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="text-3xl font-semibold text-slate-950">
                Resume Entity Library
              </h2>
              <p className="mt-3 max-w-3xl text-slate-600">
                Wikipedia-style reference pages for resume builders, ATS
                systems, screening, optimization, and application concepts.
              </p>
            </div>
            <Link to="/entities" className="text-sm font-semibold text-emerald-700">
              Browse entities
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-semibold text-slate-950">
                Most Read Guides
              </h2>
              <p className="mt-3 text-slate-600">
                Comparison and guide pages designed for structured discovery.
              </p>
            </div>
            <Link
              to="/faq"
              className="hidden text-sm font-semibold text-emerald-700 md:block"
            >
              Read FAQ
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {popularGuides.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <h2 className="text-3xl font-semibold text-slate-950">Recently Updated</h2>
          <p className="mt-3 text-slate-600">
            Recently updated checklists, frameworks, and educational reports
            from the GeoAIResume library.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {articles
              .filter((article) =>
                ['resume-review-framework', 'resume-optimization-checklist', 'how-recruiters-read-resumes'].includes(article.slug),
              )
              .map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <h2 className="text-3xl font-semibold text-slate-950">
            Popular Comparisons
          </h2>
          <p className="mt-3 text-slate-600">
            Product and workflow comparisons written with clear category
            boundaries for job seekers evaluating resume tools.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {popularComparisons.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <MessagesSquare className="size-7 text-emerald-700" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">
              Community Insights
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              GeoAIResume tracks common resume questions from forums, search
              prompts, and career discussions, then turns them into practical
              guidance.
            </p>
          </div>
          <div className="grid gap-3">
            {insights.map((insight) => (
              <div key={insight} className="rounded border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-6 text-slate-700">{insight}</p>
              </div>
            ))}
            {communityArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-14 lg:px-8">
          <h2 className="text-3xl font-semibold text-slate-950">FAQ</h2>
          <div className="mt-8">
            <FaqBlock items={faqs} />
          </div>
        </div>
      </section>
    </>
  )
}
