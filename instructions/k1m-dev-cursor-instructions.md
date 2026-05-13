# Cursor AI Instructions: Fix All SEO, Design & GEO Issues for k1m.dev

You are working on a static personal website for a GTM engineer. The site is a single HTML page at the root (`index.html`) plus a blog directory. Apply all fixes below in order of priority. Do not change any existing copy unless explicitly instructed.

---

## PRIORITY 1 — Fix Now (Breaks SEO / First Impressions)

### 1.1 Fix the H1 typo

Find:
```html
<h1>Growth Revenue with AI-Driven GTM Engineering & Automation</h1>
```
Replace with:
```html
<h1>Grow Revenue with AI-Driven GTM Engineering & Automation</h1>
```

---

### 1.2 Add social proof to the hero section

Immediately below the hero subtitle paragraph (the one ending "…using AI, analytics, and modern tools."), add a logo bar and a single stat strip:

```html
<!-- Social proof strip -->
<div class="social-proof-strip">
  <p class="proof-label">Trusted tools & platforms</p>
  <div class="logo-grid">
    <span class="logo-pill">HubSpot</span>
    <span class="logo-pill">Salesforce</span>
    <span class="logo-pill">Clay</span>
    <span class="logo-pill">Gong</span>
    <span class="logo-pill">Apollo</span>
    <span class="logo-pill">n8n</span>
    <span class="logo-pill">GCP</span>
    <span class="logo-pill">AWS</span>
  </div>
  <div class="proof-stats">
    <span>$15M ARR scaled</span>
    <span>·</span>
    <span>Churn cut from 36% → 14%</span>
    <span>·</span>
    <span>15–20 hrs/week saved in manual ops</span>
  </div>
</div>
```

Add these CSS rules (or into your existing stylesheet):
```css
.social-proof-strip { margin: 2rem 0; text-align: center; }
.proof-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted, #888); margin-bottom: 0.75rem; }
.logo-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-bottom: 1rem; }
.logo-pill { font-size: 0.8rem; font-weight: 500; padding: 4px 12px; border: 1px solid currentColor; border-radius: 20px; opacity: 0.65; }
.proof-stats { font-size: 0.85rem; opacity: 0.7; display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; }
```

---

### 1.3 Regroup the services grid (10 cards → 4 categories)

The current "Intelligent Automation" section has 10 service cards with no grouping. Wrap them into 4 named category groups using this structure. Keep all existing card content unchanged — only add the wrapper markup and category headings:

**Group 1 — Lead Generation & Outbound**
- Lead Automation
- Cold Call AI Agent
- Outbound Sequencing Engine

**Group 2 — CRM & Revenue Stack**
- CRM & Revenue Stack Build-out
- AI Reception & CRM Integration
- CRM / ERP / CDP Unification

**Group 3 — Intelligence & Analytics**
- Conversation Intelligence & Deal Coaching
- Revenue Dashboards & BI Pipelines
- Demand Gen & Attribution

**Group 4 — Infrastructure & DevOps**
- GTM Infrastructure & DevOps

Wrap each group like this:
```html
<div class="service-category">
  <h3 class="category-label">Lead Generation & Outbound</h3>
  <div class="service-cards-grid">
    <!-- existing cards for this group -->
  </div>
</div>
```

Add CSS:
```css
.service-category { margin-bottom: 2.5rem; }
.category-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted, #888); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(128,128,128,0.2); }
```

---

## PRIORITY 2 — High SEO Impact

### 2.1 Add JSON-LD structured data

Inside `<head>`, before `</head>`, add:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://k1m.dev/#keyvan",
      "name": "Keyvan Montazeri",
      "alternateName": "K1",
      "url": "https://k1m.dev/",
      "sameAs": [
        "https://linkedin.com/in/keyvan-montazeri",
        "https://github.com/goolz"
      ],
      "jobTitle": "GTM Engineer & AI Automation Consultant",
      "description": "GTM engineer with 20+ years of experience building AI-driven revenue systems, CRM infrastructure, and automation workflows for startups and scale-ups.",
      "knowsAbout": ["GTM Engineering", "AI Automation", "Revenue Operations", "HubSpot", "Salesforce", "Clay", "n8n", "Google Cloud Platform"]
    },
    {
      "@type": "WebSite",
      "@id": "https://k1m.dev/#website",
      "url": "https://k1m.dev/",
      "name": "k1m.dev — AI Revenue Growth, GTM Engineering & Automation",
      "author": { "@id": "https://k1m.dev/#keyvan" }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://k1m.dev/#service",
      "name": "k1m.dev GTM Engineering Services",
      "url": "https://k1m.dev/",
      "provider": { "@id": "https://k1m.dev/#keyvan" },
      "serviceType": ["GTM Engineering", "AI Automation", "CRM Build-out", "Revenue Operations", "Lead Generation Automation"],
      "areaServed": "Worldwide",
      "description": "AI-powered GTM systems including lead automation, CRM build-out, revenue dashboards, and outbound sequencing for B2B startups and scale-ups."
    }
  ]
}
</script>
```

---

### 2.2 Add a FAQ section

Add a new section just before the final CTA section (`## Ready to Improve Performance and Revenue?`). Use `FAQPage` schema:

```html
<!-- FAQ Section -->
<section id="faq" aria-label="Frequently asked questions">
  <h2>Frequently Asked Questions</h2>

  <div class="faq-list">

    <details class="faq-item">
      <summary>What is GTM Engineering?</summary>
      <p>GTM (Go-To-Market) Engineering is the discipline of building and operating the technical systems that power a company's revenue motion — CRM configuration, lead automation, outbound sequencing, attribution pipelines, and AI tooling. Unlike traditional sales ops, GTM Engineering combines software engineering skills with deep revenue knowledge to build systems that are fast, reliable, and data-driven.</p>
    </details>

    <details class="faq-item">
      <summary>How does AI lead generation compare to hiring an SDR?</summary>
      <p>An AI SDR pipeline (built on tools like Clay, Apollo, and HubSpot) can process 300–500 leads per month with GPT-personalized outreach, instant follow-up, and 24/7 availability — at a fraction of the cost of a full-time SDR hire. It doesn't replace relationship-driven selling, but it eliminates the manual prospecting and sequencing work that consumes most SDR time.</p>
    </details>

    <details class="faq-item">
      <summary>What does a typical CRM build-out engagement look like?</summary>
      <p>A full CRM build-out typically covers: HubSpot or Salesforce configuration from scratch, defining lead lifecycle stages and pipeline structure, setting up lead scoring rules and routing logic, building automation triggers, and creating executive dashboards. Most engagements take 4–8 weeks depending on complexity and data migration needs.</p>
    </details>

    <details class="faq-item">
      <summary>What is an ICP and how do intent signals help?</summary>
      <p>ICP stands for Ideal Customer Profile — a precise definition of the company type and buyer persona most likely to convert and retain. Intent signals are behavioral data points (job postings, funding announcements, technology installs, web activity) that indicate a company is actively in-market for a solution. Combining a tight ICP with real-time intent signals dramatically improves outbound conversion rates by prioritizing outreach to buyers who are ready now.</p>
    </details>

    <details class="faq-item">
      <summary>Do you work with early-stage startups or only established companies?</summary>
      <p>Both. Early-stage startups benefit most from CRM setup, AI SDR pipelines, and outbound infrastructure that lets a small team punch above its weight. Growth-stage companies typically need CRM unification, BI pipelines, attribution, and conversation intelligence. The $15M ARR engagement started at 4 people — the systems were built to scale with the company.</p>
    </details>

    <details class="faq-item">
      <summary>Which tools and platforms do you work with?</summary>
      <p>Core stack: HubSpot, Salesforce, Clay, Apollo, ZoomInfo, Gong, n8n, Make, AWS, GCP/BigQuery, Segment, Terraform, GitHub Actions. Outbound: Instantly, Smartlead, LinkedIn Sales Navigator. BI: Looker, Metabase, custom GCP pipelines. The right tools are chosen based on your stage, budget, and existing stack — not a fixed template.</p>
    </details>

  </div>
</section>
```

Add CSS:
```css
.faq-list { max-width: 720px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid rgba(128,128,128,0.2); padding: 0.75rem 0; }
.faq-item summary { font-weight: 500; cursor: pointer; list-style: none; padding: 0.25rem 0; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::before { content: '+ '; opacity: 0.4; }
details[open] .faq-item summary::before,
.faq-item[open] summary::before { content: '− '; }
.faq-item p { margin: 0.75rem 0 0.5rem; font-size: 0.95rem; opacity: 0.85; line-height: 1.7; }
```

Then add `FAQPage` JSON-LD alongside the existing structured data script (or as a second script tag in `<head>`):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is GTM Engineering?",
      "acceptedAnswer": { "@type": "Answer", "text": "GTM (Go-To-Market) Engineering is the discipline of building and operating the technical systems that power a company's revenue motion — CRM configuration, lead automation, outbound sequencing, attribution pipelines, and AI tooling." }
    },
    {
      "@type": "Question",
      "name": "How does AI lead generation compare to hiring an SDR?",
      "acceptedAnswer": { "@type": "Answer", "text": "An AI SDR pipeline can process 300–500 leads per month with GPT-personalized outreach at a fraction of the cost of a full-time SDR hire." }
    },
    {
      "@type": "Question",
      "name": "What does a typical CRM build-out engagement look like?",
      "acceptedAnswer": { "@type": "Answer", "text": "A full CRM build-out covers HubSpot or Salesforce configuration, lead lifecycle stages, scoring rules, automation triggers, and executive dashboards. Most engagements take 4–8 weeks." }
    },
    {
      "@type": "Question",
      "name": "What is an ICP and how do intent signals help?",
      "acceptedAnswer": { "@type": "Answer", "text": "ICP stands for Ideal Customer Profile. Intent signals are behavioral data points indicating a company is actively in-market. Combining a tight ICP with real-time intent signals improves outbound conversion rates." }
    },
    {
      "@type": "Question",
      "name": "Which tools and platforms do you work with?",
      "acceptedAnswer": { "@type": "Answer", "text": "Core stack: HubSpot, Salesforce, Clay, Apollo, ZoomInfo, Gong, n8n, Make, AWS, GCP/BigQuery, Segment, Terraform, GitHub Actions." }
    }
  ]
}
</script>
```

---

### 2.3 Create a sitemap.xml

Create `/sitemap.xml` at the root of the project:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://k1m.dev/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://k1m.dev/tech-engineer.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://k1m.dev/blog/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://k1m.dev/blog/Build-a-Lead-Machine-That-Gets-Smarter-Every-Week.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://k1m.dev/blog/Stop-Churn-Before-It-Starts-Talking.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://k1m.dev/blog/Signal-Capture-From-Gong-Call-to-CRM-Action-in-Under-60-Seconds.html</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

### 2.4 Create a robots.txt

Create `/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://k1m.dev/sitemap.xml
```

---

### 2.5 Add context to case study results

In the "Proven Results" section, add a short context line below each result stat. Do not change the existing stat callouts — only add the `<p class="case-context">` line beneath each one:

- Below "↓ Speed-to-lead: days → minutes" → add:
  `<p class="case-context">B2B SaaS portfolio companies, 2023–2024. Eliminated dedicated SDR headcount.</p>`

- Below "↑ Order volume +30–40% · ↓ Fulfillment time −60%" → add:
  `<p class="case-context">E-commerce / manufacturing platform, mid-market. Migration from manual workflow to cloud-native.</p>`

- Below "↓ Reporting lag: 3–4 days → same-day" → add:
  `<p class="case-context">Multi-location B2B operator. GCP/BigQuery pipeline replacing manual spreadsheet reporting.</p>`

- Below "↓ Monthly churn: 36% → 14%" → add:
  `<p class="case-context">B2B SaaS, Series A. End-to-end trial event tracking enabling growth experiments tied to retention.</p>`

- Below "↓ Manual ops: 15–20 hrs/week saved" → add:
  `<p class="case-context">B2B company, 2022–2023. HubSpot lifecycle automation from first ad click to CS handoff.</p>`

- Below "↑ $15M ARR · 4 → 200+ employees" → add:
  `<p class="case-context">Fintech startup, employee #1. Owned SDR, AE, demand gen, CRM, and BI through all growth stages.</p>`

Add CSS:
```css
.case-context { font-size: 0.78rem; opacity: 0.55; margin-top: 0.4rem; line-height: 1.5; }
```

---

## PRIORITY 3 — GEO / AI Optimization

### 3.1 Create /llms.txt

Create `/llms.txt` at the root:

```
# k1m.dev — Keyvan Montazeri, GTM Engineer & AI Automation Consultant

## Who I am
Keyvan Montazeri (also known as K1) is a GTM engineer and AI automation consultant with 20+ years of experience. I build AI-driven revenue systems, CRM infrastructure, and automation workflows for B2B startups and scale-ups.

## What I do
- GTM Engineering: building the technical systems that power a company's revenue motion
- AI Lead Generation: Clay + GPT + HubSpot pipelines processing 300–500 leads/month
- CRM Build-out: HubSpot and Salesforce setup, lead scoring, lifecycle automation
- Revenue Dashboards: GCP/BigQuery pipelines, real-time pipeline visibility
- Outbound Sequencing: ICP definition, intent capture, multi-touch AI-personalized sequences
- Conversation Intelligence: Gong integration, deal risk signals, rep coaching
- GTM DevOps: n8n, Make, AWS, Terraform, CI/CD for sales and marketing infrastructure

## Key results
- Scaled a fintech startup from 4 employees to 200+ and $15M ARR as employee #1
- Reduced monthly churn from 36% to 14% via trial event tracking and growth experiments
- Cut fulfillment time by 60% and increased order volume 30–40% via supply chain automation
- Saved 15–20 hrs/week of manual ops via CRM lifecycle automation
- Reduced reporting lag from 3–4 days to same-day via GCP analytics pipelines

## Important pages
- Homepage: https://k1m.dev/
- Tech Engineer profile: https://k1m.dev/tech-engineer.html
- Blog: https://k1m.dev/blog/

## Contact
Email: hi@k1m.dev
LinkedIn: https://linkedin.com/in/keyvan-montazeri
GitHub: https://github.com/goolz
```

---

### 3.2 Strengthen the "About Me" section for entity disambiguation

Find the existing About Me section. Replace or augment the opening paragraph to make it unambiguous for AI indexing. Add an `id` to the section and a hidden machine-readable span:

```html
<section id="about" aria-label="About Keyvan Montazeri">
  <!-- Add this hidden span for entity disambiguation — not visible to users -->
  <span style="display:none" itemscope itemtype="https://schema.org/Person">
    <span itemprop="name">Keyvan Montazeri</span>
    <span itemprop="alternateName">K1</span>
    <span itemprop="jobTitle">GTM Engineer and AI Automation Consultant</span>
    <span itemprop="url">https://k1m.dev/</span>
    <span itemprop="sameAs">https://linkedin.com/in/keyvan-montazeri</span>
    <span itemprop="sameAs">https://github.com/goolz</span>
  </span>

  <!-- Keep all existing About Me content unchanged below this point -->
```

---

### 3.3 Add a glossary of key terms

Add a visually subtle "Glossary" section at the bottom of the page (above the footer), targeting AI models and long-tail search:

```html
<section id="glossary" aria-label="Key terms glossary" style="font-size: 0.85rem; opacity: 0.7; max-width: 720px; margin: 3rem auto;">
  <h2 style="font-size: 1rem; font-weight: 500; margin-bottom: 1rem;">Key terms</h2>
  <dl>
    <dt><strong>GTM Engineering</strong></dt>
    <dd>The practice of building technical systems — CRM, automation, data pipelines, AI tooling — that directly power a company's go-to-market motion and revenue growth.</dd>

    <dt><strong>ICP (Ideal Customer Profile)</strong></dt>
    <dd>A precise definition of the company type, industry, size, and buyer persona most likely to convert, retain, and expand. Used to focus outbound prospecting and marketing spend.</dd>

    <dt><strong>Intent signals</strong></dt>
    <dd>Behavioral data indicating a company is actively researching or in-market for a solution — examples include job postings, funding announcements, G2 category visits, and technology install changes.</dd>

    <dt><strong>Clay enrichment</strong></dt>
    <dd>Using Clay (a data enrichment platform) to pull firmographic, technographic, and intent data from multiple sources into a single lead record, then using AI to personalize outreach at scale.</dd>

    <dt><strong>Speed-to-lead</strong></dt>
    <dd>The time between a prospect expressing intent (filling a form, booking a demo, visiting a pricing page) and receiving a personalized response. Studies show response within 5 minutes increases conversion by 9×.</dd>

    <dt><strong>Revenue Operations (RevOps)</strong></dt>
    <dd>The alignment of sales, marketing, and customer success operations under a single data model and process framework, enabling consistent forecasting, attribution, and performance measurement.</dd>
  </dl>
</section>
```

---

## PRIORITY 4 — Polish & Conversion

### 4.1 Replace emoji icons with SVG or icon font

The sections currently use Unicode emoji (📈, ⚡, 📊, 👥, 📞, etc.) as visual anchors. Replace each with a consistent SVG icon or use a lightweight icon font like Phosphor or Heroicons. If the project already uses a CSS icon system, map accordingly. If not, use inline SVG — example replacement for 📈:

```html
<!-- Replace this: -->
📈

<!-- With this (Heroicons outline style): -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>
</svg>
```

Apply this pattern to all emoji icons throughout the page. Keep icon size consistent at 24×24.

---

### 4.2 Vary the CTA copy

The page currently has multiple identical "Book a Strategy Call →" CTAs. Keep the primary one in the hero and final CTA section. Change the in-page occurrences as follows:

- After the services grid → change to: `See How It Works →` (anchor to `#how-it-works`)
- After the capabilities list → change to: `View Case Studies →` (anchor to `#results`)
- Keep the final section CTA as: `Book a Strategy Call →`

---

### 4.3 Expand the footer

Replace the current minimal footer with:

```html
<footer>
  <div class="footer-grid">
    <div class="footer-col">
      <strong>k1m.dev</strong>
      <p>GTM Engineering & AI Automation for B2B startups and scale-ups.</p>
      <a href="https://github.com/goolz">GitHub</a>
      <a href="https://linkedin.com/in/keyvan-montazeri">LinkedIn</a>
      <a href="mailto:hi@k1m.dev">hi@k1m.dev</a>
    </div>
    <div class="footer-col">
      <strong>Services</strong>
      <a href="#capabilities">Lead Automation</a>
      <a href="#capabilities">CRM Build-out</a>
      <a href="#capabilities">Revenue Dashboards</a>
      <a href="#capabilities">GTM Infrastructure</a>
    </div>
    <div class="footer-col">
      <strong>Resources</strong>
      <a href="/blog/">Blog</a>
      <a href="/tech-engineer.html">Tech Engineer</a>
      <a href="#faq">FAQ</a>
      <a href="#results">Case Studies</a>
    </div>
    <div class="footer-col">
      <strong>Stay updated</strong>
      <p style="font-size:0.8rem; opacity:0.7;">GTM engineering insights, automation walkthroughs, and revenue frameworks.</p>
      <!-- Replace ACTION_URL with your newsletter form endpoint (Mailchimp, ConvertKit, etc.) -->
      <form action="ACTION_URL" method="POST" style="display:flex; gap:8px; flex-wrap:wrap;">
        <input type="email" name="email" placeholder="your@email.com" required style="flex:1; min-width:160px;">
        <button type="submit">Subscribe</button>
      </form>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 k1m.dev. All rights reserved.</span>
    <a href="/privacy.html">Privacy</a>
    <a href="/terms.html">Terms</a>
  </div>
</footer>
```

Add CSS:
```css
.footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 2rem; padding: 3rem 0 2rem; }
.footer-col { display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem; }
.footer-col strong { font-weight: 500; margin-bottom: 0.25rem; }
.footer-col a { opacity: 0.65; text-decoration: none; }
.footer-col a:hover { opacity: 1; }
.footer-bottom { border-top: 1px solid rgba(128,128,128,0.2); padding-top: 1.5rem; display: flex; gap: 1.5rem; font-size: 0.8rem; opacity: 0.5; flex-wrap: wrap; }
```

---

### 4.4 Add internal links from blog posts back to service sections

In each blog post HTML file, add a "Related service" callout block near the end of the article, before the footer. Example for the lead machine post:

```html
<aside class="related-service">
  <p>This walkthrough covers the <strong>Outbound Sequencing Engine</strong> service.</p>
  <a href="https://k1m.dev/#capabilities">See how it works on k1m.dev →</a>
</aside>
```

Map blog posts to services:
- `Build-a-Lead-Machine-That-Gets-Smarter-Every-Week.html` → Outbound Sequencing Engine
- `Stop-Churn-Before-It-Starts-Talking.html` → Conversation Intelligence & Deal Coaching
- `Signal-Capture-From-Gong-Call-to-CRM-Action-in-Under-60-Seconds.html` → Conversation Intelligence & Deal Coaching

Add CSS:
```css
.related-service { border-left: 3px solid currentColor; padding: 1rem 1.25rem; margin: 2rem 0; opacity: 0.75; font-size: 0.9rem; }
.related-service a { font-weight: 500; }
```

---

## Summary Checklist

Use this to track completion:

- [ ] 1.1 Fix H1 typo ("Growth" → "Grow")
- [ ] 1.2 Add social proof strip to hero section
- [ ] 1.3 Regroup 10 services into 4 categories
- [ ] 2.1 Add Person + Service + Website JSON-LD schema
- [ ] 2.2 Add FAQ section + FAQPage JSON-LD schema
- [ ] 2.3 Create sitemap.xml
- [ ] 2.4 Create robots.txt
- [ ] 2.5 Add context lines to all 6 case study results
- [ ] 3.1 Create /llms.txt
- [ ] 3.2 Add entity disambiguation markup to About section
- [ ] 3.3 Add glossary section
- [ ] 4.1 Replace emoji with SVG icons
- [ ] 4.2 Vary CTA copy across page
- [ ] 4.3 Expand footer with nav + newsletter
- [ ] 4.4 Add related-service callouts in blog posts
