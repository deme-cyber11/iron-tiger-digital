# MCP Server Evaluation Guide

## Purpose

Create comprehensive evaluations to test whether LLMs can effectively use your MCP server to answer realistic, complex questions.

The measure of quality of an MCP server is NOT how well the server implements tools, but how well these implementations enable LLMs to answer realistic and difficult questions.

## Evaluation Requirements

Each evaluation must contain exactly 10 questions. Each question must be:

- **Independent**: Not dependent on other questions
- **Read-only**: Only non-destructive operations required
- **Complex**: Requiring multiple tool calls and deep exploration
- **Realistic**: Based on real use cases humans would care about
- **Verifiable**: Single, clear answer that can be verified by string comparison
- **Stable**: Answer won't change over time

## Five-Step Process

### Step 1: Documentation Inspection

Review the MCP server's capabilities:
- List all available tools
- Understand input/output schemas
- Note any limitations or constraints

### Step 2: Tool Analysis

For each tool, understand:
- What data it can access
- What operations it supports
- How it relates to other tools

### Step 3: Content Exploration

Use READ-ONLY operations to explore:
- Available data and its structure
- Relationships between entities
- Edge cases and interesting patterns

### Step 4: Question Generation

Create questions that:
- Require multiple tool calls
- Need reasoning across data sources
- Test edge cases and error handling
- Mirror real-world use cases

### Step 5: Answer Verification

For each question:
- Solve it yourself using the tools
- Verify the answer is correct
- Ensure the answer is stable
- Confirm it's a single, clear value

## Strong vs Weak Questions

### Strong Questions

- "Find the user who created the most repositories in 2024 that contain Python code. What is their username?"
- "Which project has the longest average issue resolution time? Return the project key."
- "Find all channels that mention 'deployment' in their topic. How many total members do they have combined?"

### Weak Questions

- "How many users are there?" (Too simple, single tool call)
- "List all repositories" (No specific answer)
- "What is the latest commit?" (Answer changes over time)

## Output Format

Create an XML file with this structure:

```xml
<evaluation>
  <qa_pair>
    <question>Your complex question here</question>
    <answer>Single verifiable answer</answer>
  </qa_pair>
  <qa_pair>
    <question>Another complex question</question>
    <answer>Another answer</answer>
  </qa_pair>
  <!-- 8 more qa_pairs... -->
</evaluation>
```

## Answer Format Guidelines

- Use exact values (numbers, IDs, names)
- Avoid ambiguous answers
- Use consistent formatting
- Keep answers concise (single value or short phrase)

## Running Evaluations

To test your MCP server against the evaluation:

1. Load the evaluation XML file
2. For each question, let the LLM use the MCP tools to find the answer
3. Compare the LLM's answer to the expected answer
4. Track accuracy across all 10 questions

A well-designed MCP server should enable LLMs to correctly answer at least 8 out of 10 evaluation questions.
