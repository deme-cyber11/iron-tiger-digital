# Skills and Agents Collection

This directory contains Claude Code skills from multiple sources including the [AI Labs Claude Skills repository](https://github.com/ailabs-393/ai-labs-claude-skills), [Anthropic Official Skills](https://github.com/anthropics/skills), and community repositories.

## Important: Browser Automation

> **dev-browser** is our primary method for Claude Code (or any coding agent) to access the web. Use this skill for:
> - Real-time feedback on localhost during development
> - Visual audits and testing of web applications
> - Internet browsing for research and tasks
> - Form filling, screenshots, and web automation
>
> This is currently our best process for agents to interact with browsers and get live feedback.

## Available Skills

The following skills are available in the `skills/` directory:

### Anthropic Official Skills
- **skill-creator** - Guide for creating effective Claude skills with proper structure, progressive disclosure, and best practices
- **mcp-builder** - Build high-quality MCP (Model Context Protocol) servers for Python or TypeScript
- **frontend-design** - Create distinctive, production-grade frontend interfaces that avoid generic AI aesthetics

### Business & Analytics
- **brand-analyzer** - Analyze and evaluate brand positioning and strategy
- **business-analytics-reporter** - Generate business analytics reports
- **business-document-generator** - Create professional business documents
- **deal-submission** - Handle deal submissions and processing
- **finance-manager** - Financial management and analysis tools
- **startup-validator** - Validate startup ideas and business models

### Development & Technical
- **agent-builder-skill** - Build AI agents using Claude SDK
- **cicd-pipeline-generator** - Generate CI/CD pipeline configurations
- **clone-website** - Clone any website into Next.js 16 code using Firecrawl MCP
- **codebase-documenter** - Document codebases automatically
- **dev-browser** - Browser automation with persistent page state for testing and web interactions
- **docker-containerization** - Create Docker configurations and containerize applications
- **frontend-enhancer** - Enhance frontend applications
- **tech-debt-analyzer** - Analyze and report on technical debt
- **test-specialist** - Generate and manage tests

### Data & Analytics
- **csv-data-visualizer** - Visualize CSV data
- **data-analyst** - Perform data analysis tasks

### Content & Marketing
- **content-creator** - Brand voice analysis, SEO optimization, and content frameworks for marketing
- **document-skills** - Document management and creation skills
- **pitch-deck** - Create pitch decks
- **research-paper-writer** - Write research papers
- **script-writer** - Write scripts for various purposes
- **seo-optimizer** - Optimize content for SEO
- **social-media-generator** - Generate social media content
- **storyboard-manager** - Manage and create storyboards

### Professional Tools
- **resume-manager** - Create and manage resumes
- **personal-assistant** - Personal productivity assistant

### Specialized
- **nutritional-specialist** - Nutritional analysis and planning
- **travel-planner** - Plan travel itineraries

## Usage

Each skill directory contains:
- `SKILL.md` - Skill description and instructions (required)
- `scripts/` - Python/Bash scripts for automation (optional)
- `references/` - Reference documentation loaded on-demand (optional)
- `assets/` - Templates, images, and other resources (optional)

## Sources

Skills are sourced from multiple repositories:
- **Anthropic Official**: https://github.com/anthropics/skills
- **AI Labs**: https://github.com/ailabs-393/ai-labs-claude-skills
- **Community (alirezarezvani)**: https://github.com/alirezarezvani/claude-skills
- **Community (julianromli)**: https://github.com/julianromli/ai-skills

Last updated: 2025-12-21

## Using Skills in Other Projects

To use a skill in another project:

1. Copy the desired skill folder to your project's `.claude/skills/` directory
2. Claude will automatically detect skills based on the `SKILL.md` frontmatter
3. Skills trigger based on their `description` field matching user requests

## Notes

- Each skill is self-contained and can be used independently
- Skills use YAML frontmatter with `name` and `description` fields
- The `description` field determines when Claude activates the skill
- Reference files are loaded on-demand to save context window space
