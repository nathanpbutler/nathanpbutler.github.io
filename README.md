# nathanpbutler.github.io

Personal portfolio website built with Jekyll and hosted on GitHub Pages.

## Setup

### Prerequisites
- Ruby (version 2.7 or higher)
- Bundler

### Local Development

1. Install dependencies:
```bash
bundle install
```

2. Add your profile photo:
   - Place a photo named `profile.jpg` in `assets/images/`
   - Recommended size: 400x400px or larger (1:1 aspect ratio)
   - Optimize before committing (max 500KB)

3. Run the local server:
```bash
bundle exec jekyll serve
```

4. Visit http://localhost:4000

### Updating Content

All content is managed through YAML files in the `_data/` directory:

- **Experience**: Edit `_data/experience.yml`
- **Skills**: Edit `_data/skills.yml`
- **Projects**: Edit `_data/projects.yml`
- **Social Links**: Edit `_data/social.yml`

Site configuration (name, subtitle, etc.) is in `_config.yml`.

## Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch.

## Custom Domain Setup

See `.github/copilot-instructions.md` for detailed instructions on migrating from Lightsail to GitHub Pages.
