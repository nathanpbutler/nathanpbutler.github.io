# GitHub Pages Personal Portfolio - AI Agent Instructions

## Project Overview
Jekyll-based personal portfolio site for Nathan Butler (broadcast operations & media technology professional). Single-page portfolio with modular structure, theme toggle, and automatic GitHub Pages deployment.

**Live URL**: https://nathanpbutler.github.io
**Previous Site**: https://nathanbutler.dev (hosted on Amazon Lightsail)
**Migration**: Redesigned from static HTML into modular Jekyll architecture

## Jekyll Architecture

### Directory Structure
```
/
├── _config.yml                 # Site configuration, personal info, settings
├── _layouts/
│   ├── default.html           # Base layout with <head>, header, footer
│   └── home.html              # Homepage layout (extends default)
├── _includes/
│   ├── head.html              # <head> tag contents
│   ├── header.html            # Navigation bar with theme toggle
│   ├── footer.html            # Footer with copyright
│   ├── hero.html              # Hero section with profile
│   ├── about.html             # About section
│   ├── skills.html            # Skills grid
│   ├── experience.html        # Experience timeline
│   └── projects.html          # Projects section
├── _data/
│   ├── experience.yml         # Work history (structured data)
│   ├── skills.yml             # Skill categories
│   ├── projects.yml           # Project showcase
│   └── social.yml             # Social media links
├── assets/
│   ├── css/
│   │   └── main.scss          # Main styles (Jekyll processes SCSS)
│   ├── js/
│   │   └── main.js            # Theme toggle, smooth scroll, animations
│   └── images/
│       └── profile.jpg        # Profile photo
├── index.html                 # Homepage (uses 'home' layout)
└── Gemfile                    # Ruby dependencies (optional for local dev)
```

### Design System

**Theme System**: Three-mode color scheme using CSS custom properties
- **Light mode**: White background, dark text
- **Dark mode**: Dark background, light text
- **Auto mode**: Follows system preference via `prefers-color-scheme`

Colors (defined in `assets/css/main.scss`):
```scss
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #2c3e50;
  --text-secondary: #6c757d;
  --accent: #3498db;        // Brand blue
  --border: #e9ecef;
  --card-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #e9ecef;
  --text-secondary: #adb5bd;
  --accent: #5dade2;
  --border: #495057;
}
```

**Typography**: System font stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

**Responsive Breakpoint**: Mobile-first with single breakpoint
- Mobile: `@media (max-width: 768px)`
- Changes: Single column grids, smaller typography, stacked layouts

### Key Components

#### Header with Theme Toggle (_includes/header.html)
- Fixed position navigation (`assets/css/main.scss`)
- Theme button cycles: auto → light → dark → auto
- Persists in `localStorage.themeMode` (`assets/js/main.js`)
- Mobile: Hide nav links, show only theme toggle

#### Hero Section (_includes/hero.html)
- Grid layout: Profile image (200x200 circular) + content
- Social links from `_data/social.yml` with SVG icons
- Mobile: Stacks vertically, image first

#### Experience Timeline (_includes/experience.html)
- Vertical timeline with CSS pseudo-elements
- Left border line with circular markers
- Each item: Title, Company (accent color), Date, Bullet points
- Data source: `_data/experience.yml`

#### Skills Grid (_includes/skills.html)
- Auto-fit grid: `repeat(auto-fit, minmax(250px, 1fr))`
- Cards with category heading + description
- Data source: `_data/skills.yml`

#### Projects (_includes/projects.html)
- Manual curation via `_data/projects.yml`
- No client-side API calls (unlike original site which used GitHub API with localStorage caching)
- Each project: name, url, description, language, language_color

### Data Files Structure

**_data/experience.yml**:
```yaml
- title: "Content Services Operator"
  company: "Seven Network"
  location: "Melbourne, VIC"
  period: "Aug 2019 – Present"
  responsibilities:
    - "Ingest footage, create proxies..."
    - "Build automation tools..."
```

**_data/skills.yml**:
```yaml
- category: "Post-Production"
  description: "Adobe Premiere Pro, Media Encoder..."
```

**_data/projects.yml**:
```yaml
- name: "libopx"
  url: "https://github.com/nathanpbutler/libopx"
  description: "MXF and Teletext caption processing library"
  language: "C#"
  language_color: "#178600"

- name: "mt.net"
  url: "https://github.com/nathanpbutler/mt.net"
  description: "A .NET port of the Go-based media thumbnailing tool mt"
  language: "C#"
  language_color: "#178600"
```

**_data/social.yml**:
```yaml
- name: GitHub
  url: https://github.com/nathanpbutler
  icon: |
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <!-- SVG path data -->
    </svg>
```

## Jekyll Configuration

### _config.yml Structure
```yaml
# Site settings
title: "Nathan Butler"
subtitle: "Broadcast Operations & Media Technology Professional"
description: "Media operations professional with nearly 20 years in television production and post-production..."
url: "https://nathanpbutler.github.io"
baseurl: ""

# Personal info
location: "Melbourne, VIC, Australia"
github_username: nathanpbutler
linkedin_username: nathanpbutler

# Build settings
theme: null
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap

# Exclude from build
exclude:
  - Gemfile
  - Gemfile.lock
  - README.md
  - .github

# SCSS settings
sass:
  style: compressed
```

### Gemfile Configuration
Uses `github-pages` gem to match GitHub Pages production environment exactly:

```ruby
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
gem "jekyll-seo-tag"
gem "jekyll-sitemap"

platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", :platforms => [:windows]
```

**Important**: Uses Jekyll 3.9.x (via github-pages gem), not Jekyll 4.x, to match GitHub Pages production.

### GitHub Projects Implementation

Uses **manual curation** via `_data/projects.yml`:
- Full control over displayed projects
- No API rate limits or caching issues
- Requires manual updates when adding new projects
- Clean, reliable approach for portfolio sites

To add a project, edit `_data/projects.yml` with name, url, description, language, and language_color.

## Development Workflow

### Local Development
```bash
# Install dependencies (first time)
bundle install

# Run local server
bundle exec jekyll serve

# With live reload
bundle exec jekyll serve --livereload

# Visit http://localhost:4000
```

### File Editing Patterns

**Update content only**: Edit YAML files in `_data/`
- No HTML changes needed
- Clean separation of content and presentation

**Update styles**: Edit `assets/css/main.scss`
- Jekyll compiles SCSS automatically
- Use variables, nesting, mixins

**Update layout/structure**: Edit files in `_layouts/` or `_includes/`
- Liquid templating: `{% include hero.html %}`
- Access config: `{{ site.title }}`
- Loop data: `{% for job in site.data.experience %}`

### Common Tasks

**Add new job**: Edit `_data/experience.yml`, add to top of array

**Add skill category**: Edit `_data/skills.yml`, add new entry

**Add project**: Edit `_data/projects.yml`, add new entry

**Change theme colors**: Edit CSS custom properties in `assets/css/main.scss`

**Update profile photo**: Replace `assets/images/profile.jpg` (optimize first)

## Deployment

### GitHub Pages Automatic Build
1. Push to `main` branch
2. GitHub Actions runs Jekyll build automatically
3. Site deploys in 1-2 minutes
4. Check Actions tab for build status

### Custom Domain Migration from Lightsail

**Step 1: Verify GitHub Pages Works**
- Push site to GitHub
- Settings → Pages → Source = "Deploy from branch" → main
- Test at https://nathanpbutler.github.io

**Step 2: Configure Custom Domain**
- Settings → Pages → Custom domain → enter domain
- This creates a `CNAME` file in repository
- Enable "Enforce HTTPS" (after DNS propagates)

**Step 3: Update DNS in Amazon Lightsail**
- For apex domain (e.g., `example.com`):
  - Add 4 `A` records pointing to:
    - 185.199.108.153
    - 185.199.109.153
    - 185.199.110.153
    - 185.199.111.153
- For www subdomain:
  - Add `CNAME` record → `nathanpbutler.github.io`

**Step 4: Wait for DNS Propagation**
- Usually 24-48 hours
- Check with: `dig yourdomain.com` or `nslookup yourdomain.com`
- GitHub auto-provisions SSL certificate via Let's Encrypt

## JavaScript Functionality

### Theme Toggle (`assets/js/main.js`)
```javascript
// Cycle through modes, persist to localStorage
// Listen to system preference changes
// Update button UI (emoji + text)
```

### Smooth Scroll
```javascript
// Anchor links scroll smoothly to sections
document.querySelectorAll('a[href^="#"]')...
```

### Fade-in Animations
```javascript
// IntersectionObserver for scroll-triggered animations
// Add .fade-in class when elements enter viewport
```

## Git Ignore Configuration

The `.gitignore` excludes:
- **Jekyll build files**: `_site/`, `.jekyll-cache/`, `.sass-cache/`, `vendor/`, `.bundle/`
- **Lock file**: `Gemfile.lock` (auto-generated by bundler)
- **OS files**: `.DS_Store`, `Thumbs.db`, `Desktop.ini`, `ehthumbs.db`
- **Editor files**: `.vscode/`, `.idea/`, `*.swp`, `*.swo`, `*~`

## Performance & Best Practices

- **Images**: Optimize before commit (WebP preferred, max 500KB)
- **CSS**: SCSS compiled and minified via Jekyll (sass: style: compressed)
- **No external dependencies**: Self-contained (no CDN libraries)
- **Accessibility**: Semantic HTML, proper heading hierarchy, contrast ratios
- **SEO**: Uses `jekyll-seo-tag` plugin for meta tags
- **Profile photo**: Place `profile.jpg` in `assets/images/` (400x400px+, square)

## Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Uses: CSS custom properties, grid, IntersectionObserver, matchMedia
- Mobile tested on iOS Safari and Android Chrome
- Tested in WSL (Windows Subsystem for Linux) environment

## Migration Notes
- **Previous hosting**: Amazon Lightsail at https://nathanbutler.dev
- **Original design**: Single-file HTML with inline CSS/JS and GitHub API integration
- **New architecture**: Modular Jekyll structure with YAML data files
- **Design preserved**: Identical visual appearance and functionality
- **Improvements**: Better maintainability, no API rate limits, cleaner separation of concerns
