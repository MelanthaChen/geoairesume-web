import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const guides = [
  {
    slug: 'achievement-bullets-guide.html',
    title: 'Writing Clear Achievement Bullets',
    description: 'A practical guide to describing work with truthful scope, actions, and outcomes.',
    intro: 'A useful resume bullet helps a reader understand what changed because of your work. It gives enough context to make the contribution understandable, names the action you took, and describes an outcome only when you can support it. A concise bullet is easier to scan when it keeps those details in a natural order.',
    sections: [
      ['Start with the work', 'Name the project, customer need, operational problem, or team responsibility before describing the result. A reader should not have to infer what a phrase such as “improved efficiency” refers to. Add the role or setting when it changes how the contribution should be understood.'],
      ['Choose precise action words', 'Use verbs that describe the work you actually performed: analyzed, coordinated, tested, documented, designed, or maintained. “Led” should describe real leadership, and “built” should identify something you made. Clear verbs make the difference between personal ownership and general team participation visible.'],
      ['Use evidence carefully', 'A number can clarify scale, time, volume, or change when it comes from a record you can explain. If no reliable measure exists, describe the concrete deliverable instead. Do not invent percentages or imply that a team result belonged to one person. Accuracy makes an achievement more credible than a dramatic but unsupported claim.'],
      ['Edit for a quick read', 'Remove repeated setup, internal jargon, and adjectives that do not add information. Keep the important noun and verb near the beginning, then retain only context needed to understand the result. Read the bullet aloud and check that a person outside your previous team could follow it.'],
    ],
    faqs: [['Should every bullet include a number?', 'No. Use a figure when it is accurate and useful for understanding the scope or result. A specific deliverable can be stronger than an estimate that cannot be verified.'], ['How long should an achievement bullet be?', 'There is no universal word limit. Keep the sentence focused enough that a reader can identify the action and evidence without rereading it.']],
  },
  {
    slug: 'application-readiness-guide.html',
    title: 'A Practical Application Readiness Check',
    description: 'A careful checklist for reviewing a resume before sending an application.',
    intro: 'Application readiness is the point at which a resume is clear, accurate, and tailored enough for a particular opportunity. It does not mean that a document can guarantee an interview. A dependable review checks whether the reader can find relevant experience, understand the candidate’s contribution, and verify the basic details needed to continue a conversation.',
    sections: [
      ['Confirm the target', 'Read the role description and identify its central responsibilities, required skills, and working context. Select evidence from your experience that relates to those needs. Keep the resume truthful: a requirement is a prompt to find relevant evidence, not a reason to claim experience you do not have.'],
      ['Check the document structure', 'Use consistent section headings, dates, and job-title formatting. Put the most relevant information where a reader can find it quickly. Remove broken page breaks, stray symbols, inconsistent punctuation, and layout choices that make dates or role descriptions difficult to follow.'],
      ['Review every claim', 'Check names, dates, credentials, links, and project descriptions against your own records. Make sure each result reflects your contribution and each technical term is one you can discuss. If a claim depends on an estimate, either verify the estimate or replace it with a concrete description.'],
      ['Make a final human pass', 'Read the document on a small screen and as a printed page if those formats matter for the application. Ask whether a person can identify your target, evidence, and next step. A clear application is easier to evaluate than a crowded document filled with keywords or visual effects.'],
    ],
    faqs: [['Can a checklist predict an interview?', 'No. A checklist can catch clarity and accuracy problems, but hiring decisions depend on the role, applicant pool, and employer process.'], ['Should I tailor every application?', 'Tailor when the role calls for different evidence or language. Keep the underlying facts consistent and change emphasis rather than inventing new experience.']],
  },
  {
    slug: 'ats-clarity-guide.html',
    title: 'Clear Resume Formatting for Applicant Systems',
    description: 'Understand readable document structure without relying on unsupported ATS score promises.',
    intro: 'Applicant tracking systems differ in their features and settings, so no single formatting rule guarantees that every system will interpret a resume perfectly. A practical approach is to make the document readable for people while keeping its structure straightforward. Clear section labels and consistent text help both a hurried reviewer and software that extracts document fields.',
    sections: [
      ['Use familiar section labels', 'Headings such as Experience, Education, Skills, and Projects tell a reader what kind of information follows. Creative labels can be meaningful in a portfolio, but an unfamiliar heading on a resume may make the content harder to find. Use the simplest label that accurately describes the section.'],
      ['Keep the reading order obvious', 'Avoid layouts where columns, floating text boxes, or decorative sidebars separate a job title from its dates and description. If you use a designed template, export it and inspect the extracted text to see whether the reading order remains sensible. The file should still communicate when its visual styling is removed.'],
      ['Write keywords in context', 'Include a skill term when it accurately describes your experience and supports the role you are pursuing. Place it in a project, responsibility, or accomplishment that shows how you used it. Repeating a phrase without context can make the document less useful to people and does not prove competence.'],
      ['Verify the submitted file', 'Follow the employer’s requested format. Open the final PDF or document, select and copy a few lines, and check that text appears in the expected order. Confirm that links work and that the filename is professional. These simple checks improve reliability without claiming to know how a specific employer configures its system.'],
    ],
    faqs: [['Is a two-column resume always rejected?', 'No universal rule applies to every system. A simpler layout usually makes reading order easier to inspect, while the employer’s instructions should guide the file format.'], ['Does an ATS score reflect hiring quality?', 'A score from a third-party checker is only an estimate based on that tool’s own criteria. It cannot represent every employer system or substitute for a human review.']],
  },
  {
    slug: 'career-change-guide.html',
    title: 'Explaining a Career Change Through Relevant Evidence',
    description: 'Show how experience, projects, and learning connect to a new role without overstating fit.',
    intro: 'A career change often asks a resume to connect experience from different settings. The strongest connection is specific: a skill used in one role may help with a responsibility in another, but the resume should show the context rather than assume the reader will make the link. The goal is to explain transferable evidence honestly and keep the target role clear.',
    sections: [
      ['Name the direction', 'Use a concise summary or target line when it helps orient the reader. Describe the type of work you are pursuing and the relevant strengths you can demonstrate. Avoid presenting a future career goal as if it were already a job title you have held.'],
      ['Translate rather than relabel', 'Explain what a past responsibility involved in language the new field can understand. Customer support may involve issue diagnosis and clear documentation; event coordination may involve scheduling, vendors, and contingency planning. Keep the original context visible so the translation remains credible.'],
      ['Add recent evidence', 'A relevant project, course, volunteer assignment, or portfolio sample can show recent practice. Describe the question you worked on, your contribution, and what you learned. Do not imply that a short course has the same scope as professional experience; let each piece of evidence stand on its own.'],
      ['Keep chronology understandable', 'Preserve accurate dates and titles while giving more space to the experiences that support the new direction. A brief explanation can clarify an unusual transition, but personal details are optional. The reader needs to understand readiness, not a private history that is not relevant to the work.'],
    ],
    faqs: [['Should I remove unrelated jobs?', 'Not automatically. Earlier work may show transferable skills or continuity. Keep it concise when it is less relevant, and retain details that help explain your evidence.'], ['Can a summary hide a lack of experience?', 'A summary should orient the reader, not conceal a gap. Pair it with concrete projects, learning, or responsibilities that show what you can do today.']],
  },
  {
    slug: 'early-career-resume-guide.html',
    title: 'Building an Early-Career Resume with Concrete Evidence',
    description: 'Present education, projects, internships, and community work with useful context.',
    intro: 'Early-career applicants may have fewer full-time roles, but they can still show how they learn, contribute, and complete work. Coursework, internships, part-time jobs, projects, and community responsibilities can all be useful when the resume explains what the candidate did and why the experience relates to the opportunity. The document should make potential easy to evaluate without inflating scope.',
    sections: [
      ['Choose relevant material', 'Select projects and responsibilities based on the target role, not on a desire to list everything. A class project can demonstrate research, analysis, writing, or collaboration when those actions are visible. Include enough context for a reader to understand the assignment and your individual contribution.'],
      ['Describe the process', 'When a project has no business outcome, explain the question, method, tool, or deliverable. A clear account of how you organized information or tested an idea is more useful than a claim that the work was “successful” without evidence. Distinguish team results from your part of the work.'],
      ['Place education thoughtfully', 'Keep institution, program, and completion information accurate. Recent or role-specific learning may belong near the top, while older or less relevant coursework can be shorter. Include a course only when it adds information about preparation that is not already clear elsewhere.'],
      ['Show dependable work habits', 'Part-time employment, caregiving, volunteering, and campus activities may show reliability, communication, or responsibility. Describe the actual task and context. A resume does not need to label a person “hard-working” when it can show the work they completed.'],
    ],
    faqs: [['Can a student include a class assignment?', 'Yes, when it is relevant and described accurately. Identify it as coursework or a project and explain your own contribution.'], ['Should I list a GPA?', 'Include it when it is accurate and useful for the application or specifically requested. It is not required on every resume.']],
  },
  {
    slug: 'resume-gap-guide.html',
    title: 'Explaining Employment Gaps with Clarity and Privacy',
    description: 'Decide when a resume gap needs context and how to keep the explanation concise.',
    intro: 'A period away from paid work does not erase a person’s abilities or determine whether they are ready for a role. A resume can show a clear chronology while directing attention to current skills and relevant experience. Candidates can decide how much personal context to share; private health, family, or financial details are not required just to make a resume understandable.',
    sections: [
      ['Use dates consistently', 'Choose a month-and-year or year-only format that represents your work history truthfully, then apply it consistently. Do not alter dates to conceal a transition. If a short interval is not material to the application, the resume can simply continue with the next role.'],
      ['Return attention to readiness', 'Recent projects, coursework, volunteer responsibilities, contract work, or caregiving can be included when they are relevant and the candidate wants to share them. Explain the activity plainly and avoid implying that it was paid employment if it was not. The purpose is to add useful context, not justify personal choices.'],
      ['Keep an explanation brief', 'If a gap is likely to raise a question, one short factual sentence can provide context. The resume is not the only place to discuss a transition; a conversation may be more appropriate when detail is needed. Avoid apologetic language and move back to the experience that supports the role.'],
      ['Review for privacy', 'Remove personal details that are not needed to evaluate qualifications. A candidate can describe a career break without disclosing a diagnosis, family circumstance, or other sensitive information. The level of detail should remain the candidate’s decision and should match the purpose of the application.'],
    ],
    faqs: [['Do I have to explain every gap?', 'No. Use context when it helps a reader understand the chronology or when an application asks for it. Personal disclosure is optional.'], ['Can I use a functional resume to hide dates?', 'A skills-focused format can emphasize relevant capabilities, but it should still present work history clearly and accurately when requested.']],
  },
  {
    slug: 'resume-review-guide.html',
    title: 'A Human Review Framework for Resume Clarity',
    description: 'Review structure, evidence, readability, completeness, and role relevance.',
    intro: 'A resume review is most useful when it asks concrete questions rather than assigning a mysterious score. A reader can check whether the target is clear, whether the evidence supports each claim, and whether the document is complete enough to understand the candidate’s work. GeoAIResume uses this educational framework to organize a careful review, not to make hiring decisions.',
    sections: [
      ['Check the first impression', 'After a quick glance, can a reader identify the kind of role you want and the experience most relevant to it? If the answer is unclear, adjust ordering and wording before adding more design. A simple heading and focused summary often communicate more than a long list of adjectives.'],
      ['Trace claims to evidence', 'For each important statement, ask what work supports it. A result may come from a deliverable, a process change, a customer interaction, or a verified measure. Replace claims that lack a clear basis with accurate descriptions of responsibilities and outputs.'],
      ['Test readability and completeness', 'Check for consistent dates, role names, spelling, and working links. Make sure abbreviations are understandable and the document uses enough white space to scan. Try reading the extracted text as plain text; the order should still make sense without color or layout.'],
      ['Match the review to the role', 'A good review considers the application’s actual context. A research role may need clear methods and writing samples; an operations role may need process and coordination examples. The framework can guide questions, but it cannot replace the employer’s requirements or a qualified human judgment.'],
    ],
    faqs: [['Does this framework grade a candidate?', 'No. It helps organize document feedback. It does not score people, rank applicants, or predict employment outcomes.'], ['Can one resume work for every role?', 'A core resume can preserve accurate history, but emphasis and examples may need to change when the target responsibilities differ.']],
  },
  {
    slug: 'role-keywords-guide.html',
    title: 'Using Role Keywords Honestly and in Context',
    description: 'Align resume language to a role while keeping every skill claim accurate.',
    intro: 'Role keywords can help a reader recognize relevant experience, but they only carry meaning when the resume shows how the candidate used them. A careful review compares the job description with actual responsibilities, projects, and tools. It does not copy every phrase or turn a skill list into a substitute for evidence.',
    sections: [
      ['Separate requirements from preferences', 'Job descriptions often mix essential responsibilities, preferred experience, and broad organizational language. Identify the work the role actually involves, then look for honest examples in your background. This helps you prioritize the few terms that describe real fit rather than echoing every phrase.'],
      ['Use the employer’s language carefully', 'When a familiar term accurately describes your experience, using the employer’s wording can improve clarity. Keep enough context to show what the term means in your work. If the wording overstates your role, choose a more precise phrase even if it is less prominent in the job listing.'],
      ['Show skill through examples', 'A bullet about analyzing customer feedback, maintaining a data pipeline, or coordinating a launch explains more than a bare keyword. Mention tools only when you used them and can discuss the work. A truthful example is easier to evaluate than a dense list that combines unrelated capabilities.'],
      ['Avoid repetition without meaning', 'Repeating the same term in every section adds little information and can make the resume harder to read. Use a clear skills section for concise reference, then connect important skills to a project or responsibility. The document should sound natural when read by a person.'],
    ],
    faqs: [['Should I copy keywords from a job posting?', 'Use a term when it accurately describes your experience. Rephrase or omit requirements you do not meet rather than suggesting a skill you lack.'], ['Do keyword tools know what every employer searches for?', 'No. They can compare text using their own rules, but cannot reveal every employer’s system or hiring criteria.']],
  },
  {
    slug: 'software-engineer-resume-guide.html',
    title: 'Explaining Software Engineering Work on a Resume',
    description: 'Describe technical scope, decisions, collaboration, and outcomes in clear language.',
    intro: 'A software engineering resume should help technical and nontechnical readers understand what was built and why it mattered. A list of languages and frameworks is not enough to show scope. Pair tools with the problem, system boundary, and contribution so that a reviewer can follow the work without guessing which parts belonged to you.',
    sections: [
      ['Describe a system in context', 'Name the product area, service, internal tool, or user problem before listing implementation details. Explain whether the work improved reliability, reduced manual steps, added a capability, or supported a team. Context allows a reader to understand the purpose of a technology choice.'],
      ['Make ownership precise', 'Distinguish individual work from team outcomes. “Implemented the API endpoint” is clearer than “owned the platform” when your contribution was one component. If you coordinated a design or review, name that work directly. Precise ownership protects credibility and helps an interviewer ask useful follow-up questions.'],
      ['Connect tools to decisions', 'Mention a language or framework when it helps explain how the work was done. Pair it with a decision, constraint, test, or integration where appropriate. A stack list can remain brief; the experience section should demonstrate how technical choices supported the project.'],
      ['Use measures only when verified', 'Latency, reliability, adoption, or throughput figures can clarify impact when they come from dependable records and the candidate can explain the measurement. If the result is not quantified, describe the shipped feature, supported workflow, or resolved issue rather than guessing.'],
    ],
    faqs: [['Should I list every technology I have tried?', 'No. Prioritize tools relevant to the target role and experience you can discuss. A short, accurate list is more informative than an exhaustive inventory.'], ['Can a personal project count as experience?', 'It can show practice when labeled accurately. Describe the project scope, users if known, implementation, and current state without implying employment.']],
  },
  {
    slug: 'accessible-resume-guide.html',
    title: 'Making Resume Documents Easier to Read and Navigate',
    description: 'Use clear structure, readable text, and dependable document formatting.',
    intro: 'A readable resume helps people find information without fighting its layout. Accessibility is not a decorative extra: clear headings, sensible reading order, and sufficient contrast make the document easier to use in different formats. A candidate can test both the visible page and the text order that a screen reader or document parser may encounter.',
    sections: [
      ['Use a clear hierarchy', 'Make section headings distinct and consistent. Use meaningful text for headings instead of styling ordinary paragraphs to look large. A predictable hierarchy helps readers scan and allows assistive tools to identify the structure when the file format preserves semantic information.'],
      ['Keep the reading order logical', 'Avoid placing essential details in images, charts, or floating objects. If columns are used, verify that text extraction reads the content in a sensible sequence. Contact information and key experience should remain available as selectable text rather than only as a graphic.'],
      ['Choose legible presentation', 'Use comfortable type size, restrained emphasis, and strong contrast between text and background. Do not rely on color alone to distinguish categories. These choices help readers on small screens and in printed copies, while keeping attention on the candidate’s evidence.'],
      ['Check the exported file', 'Open the submitted version, inspect it at normal scale, and copy text into a plain editor to review order. Confirm links and document title where relevant. If a format is requested by the employer, follow that instruction and verify that the final file opens correctly.'],
    ],
    faqs: [['Are graphics always inaccessible?', 'Not always, but essential facts should remain available in text. Decorative graphics should not carry information a reader needs to evaluate the application.'], ['Is a PDF always the best format?', 'Use the format requested by the employer. A well-made PDF can preserve layout, while an editable document may be preferred in other processes.']],
  },
]

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const head = (guide) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(guide.title)} | GeoAIResume</title><meta name="description" content="${escapeHtml(guide.description)}"><link rel="canonical" href="https://geo-ai-resume.vercel.app/${guide.slug}"><script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: guide.title, description: guide.description, author: { '@type': 'Organization', name: 'GeoAIResume Editorial Team' }, datePublished: '2026-10-27', dateModified: '2026-10-27', mainEntityOfPage: `https://geo-ai-resume.vercel.app/${guide.slug}` })}</script><script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: guide.faqs.map(([name, answer]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text: answer } })) })}</script><style>body{font:18px/1.7 system-ui,sans-serif;color:#17212b;max-width:850px;margin:3rem auto;padding:0 1.25rem}nav{display:flex;flex-wrap:wrap;gap:1rem}a{color:#087f5b}h1,h2{line-height:1.2}footer{margin-top:3rem;border-top:1px solid #ddd;padding-top:1rem;color:#475569}</style></head><body><header><a href="/">GeoAIResume</a><nav aria-label="Resume guide library"><a href="/">Home</a><a href="/faq">Site FAQ</a><a href="/research">Research</a></nav></header><main><article><p>Fictional editorial resource · Updated October 27, 2026</p><h1>${escapeHtml(guide.title)}</h1><p>${escapeHtml(guide.intro)}</p>${guide.sections.map(([title, copy]) => `<section><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy)}</p></section>`).join('')}<section><h2>Frequently asked questions</h2>${guide.faqs.map(([question, answer]) => `<h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p>`).join('')}</section><p>GeoAIResume is a fictional educational demo. This guide provides general information and does not promise interviews, hiring outcomes, or compatibility with a particular employer system.</p></article></main><footer>GeoAIResume · Fictional educational demo</footer></body></html>`

await mkdir(resolve('public'), { recursive: true })
for (const guide of guides) {
  const html = head(guide)
  const wordCount = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
  if (wordCount < 250) throw new Error(`${guide.slug} has only ${wordCount} words`)
  await writeFile(resolve('public', guide.slug), `${html}\n`)
}
console.log(`Generated ${guides.length} crawlable resume guides`)
