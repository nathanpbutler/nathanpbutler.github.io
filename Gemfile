source "https://rubygems.org"

# Use GitHub Pages gem to match production environment
gem "github-pages", group: :jekyll_plugins

# Plugins are included in github-pages gem
# but listed here for documentation
gem "jekyll-seo-tag"
gem "jekyll-sitemap"

# Windows and JRuby does not include zoneinfo files
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1", :platforms => [:windows]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
