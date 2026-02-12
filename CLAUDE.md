# Iron Tiger Digital — Project Rules

## Context Limit Warning

When you detect the conversation is approaching ~90% of the context window (e.g., messages are being compressed, context is getting long, or you've had 15+ substantial back-and-forth exchanges with tool use), proactively:

1. **Warn the user**: "We're approaching the context limit for this chat."
2. **Generate a continuation prompt**: Write a ready-to-paste prompt that summarizes:
   - Current session number and latest commit
   - What was completed this session
   - What's in progress or remaining
   - Any testing gaps or pending items
   - Which skills/tools to use
3. **Suggest starting a new chat** before context degrades.

Do this BEFORE hitting the limit — don't wait until messages are already being lost.

## Project Conventions

- Static HTML/CSS site, no frameworks — edit files directly
- Shared CSS in `css/shared.css`, page-specific CSS inline in `<style>` blocks
- Use `iron-tiger-design` skill when building/redesigning pages
- Use `iron-tiger-mobile-test` skill after any visual changes for QA
- Use dev-browser (standalone mode) for visual testing
- Always push to origin after completing work, note commit hash in memory
- Update MEMORY.md at end of each session with completed work
