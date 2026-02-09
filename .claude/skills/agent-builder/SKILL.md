---
name: agent-builder
description: Rapid AI agent development framework using Claude SDK. Use when users need to build AI agents, create agentic systems, implement tool-calling workflows, or set up production agents. Covers single-step agents (Level 1), multi-step strategic agents (Level 2), and multi-agent systems (Level 3).
---

# Agent Builder

Build production-ready AI agents quickly using Claude SDK and proven patterns.

## Quick Start

**Two Approaches Based on Complexity:**

**🚀 NEW: MCP + Code Execution** (for complex agents with 10+ tools)
- 98% fewer tokens (150K → 2K)
- Tools as code APIs on filesystem
- Agent writes code to compose tools
- Data processing in sandbox

**Classic: Direct Tool Calling** (for simple agents with 2-5 tools)
- System Prompt + Tools + Loop
- Traditional function calling
- Fast to prototype

## Core Components

**For MCP + Code Execution:**
1. **Filesystem Structure** - Tools as code modules
2. **Code Execution Sandbox** - Where agent code runs
3. **System Prompt** - Instructions for code-first approach

**For Direct Tool Calling:**
1. **System Prompt** - Instructions and rules
2. **Tools** - Function definitions (2-5 to start)
3. **Loop** - Think → Act → Observe (Claude SDK handles)

## Agent Classification

Ask user to identify workflow type:

- **Level 1 (Single-step)**: Lookup or simple action → Use basic tool calling
- **Level 2 (Multi-step)**: Research → analyze → act → Use strategic planning
- **Level 3 (Multi-agent)**: Complex workflow needing specialists → Use coordinator pattern

**Default to Level 1 unless user explicitly needs multi-step.**

## Architecture Decision

**Choose MCP + Code Execution if:**
- Agent needs 10+ tools
- Complex data processing between tools
- Multi-step workflows with intermediate results
- Need to filter/transform large datasets
- **Result: 98% fewer tokens (150K → 2K)**

**Choose Direct Tool Calling if:**
- Agent needs 2-5 simple tools
- Straightforward lookup/action workflows
- Quick prototyping needed
- Simple, predictable workflows

See references/mcp_code_execution.md for detailed comparison.

## Required User Information

Before building, get from user:

```
PROJECT: [name]
GOAL: [specific problem to solve]
SUCCESS METRIC: [how to measure it works]
USERS: [who uses it, how many]

MUST HAVE ACCESS TO:
- [ ] APIs: [list with credentials]
- [ ] Databases: [connection strings]
- [ ] Documents: [links/uploads]

WORKFLOW TYPE:
[ ] Level 1: Single-step
[ ] Level 2: Multi-step  
[ ] Level 3: Multi-agent

MUST NEVER:
- [prohibited actions]

APPROVAL NEEDED FOR:
- [high-risk actions]

TEST SCENARIOS (10+):
1. User asks: "[example]" → Should: "[expected]"
```

## Build Process

### Phase 1: Setup

**Option A: MCP + Code Execution (Recommended for Complex Agents)**

```bash
# Install MCP servers
npm install @modelcontextprotocol/server-gdrive
npm install @modelcontextprotocol/server-salesforce

# Generate filesystem structure from MCP tools
servers/
├── google-drive/
│   ├── getDocument.ts
│   └── searchFiles.ts
└── salesforce/
    └── updateRecord.ts

# Each tool is a typed function wrapper
// No tokens consumed until agent reads the file
```

**Option B: Claude SDK with Direct Tool Calling (Simple Agents)**

```python
from anthropic import Anthropic

client = Anthropic(api_key="your-key")
```

**Model Selection (both approaches):**
- Complex reasoning → Claude Sonnet 4.5
- Standard tasks → Claude Sonnet 4
- Speed/cost → Claude Haiku

### Phase 2: System Prompt

**For MCP + Code Execution:**
```markdown
You are a [ROLE] with access to MCP servers as code APIs.

Available in ./servers/:
- google-drive: getDocument, searchFiles
- salesforce: updateRecord, queryRecords

Process:
1. Explore ./servers/ to discover tools
2. Read tool files to understand APIs
3. Write TypeScript code to compose tools
4. Keep data processing in execution environment
5. Return only final results

EXAMPLES:
User: "Update Salesforce with notes from doc abc123"
You: 
const doc = await gdrive.getDocument({ documentId: 'abc123' });
await salesforce.updateRecord({ 
  objectType: 'Meeting',
  data: { Notes: doc.content }
});
```

**For Direct Tool Calling:**
```markdown
You are a [ROLE] for [COMPANY].

Your tools:
- tool_name: When to use it
- another_tool: When to use it

RULES:
- ALWAYS [required behavior]
- NEVER [prohibited behavior]

EXAMPLES:
User: "[example question]"
You: [think: reasoning] → [action: tool(params)] → [response: answer]
```

**Critical:** Include 2-3 examples showing tool/code usage.

### Phase 3: Tools

Define 2-5 tools using this pattern:
```python
tools = [{
    "name": "search_web",
    "description": "Search web for current information",
    "input_schema": {
        "type": "object",
        "properties": {
            "query": {"type": "string", "description": "Search query"}
        },
        "required": ["query"]
    }
}]
```

**Tool categories:**
- **Search/RAG**: Get information (search_web, query_docs)
- **Action APIs**: Take action (send_email, create_ticket)
- **Human-in-loop**: Get approval (ask_confirmation)

### Phase 4: Agent Loop

```python
def run_agent(user_message):
    messages = [{"role": "user", "content": user_message}]
    
    response = client.messages.create(
        model="claude-sonnet-4",
        max_tokens=4096,
        system=system_prompt,
        tools=tools,
        messages=messages
    )
    
    # Handle tool calls in loop
    while response.stop_reason == "tool_use":
        tool_use = next(block for block in response.content if block.type == "tool_use")
        
        # Execute tool
        tool_result = execute_tool(tool_use.name, tool_use.input)
        
        # Continue conversation
        messages.append({
            "role": "assistant",
            "content": response.content
        })
        messages.append({
            "role": "user",
            "content": [{
                "type": "tool_result",
                "tool_use_id": tool_use.id,
                "content": tool_result
            }]
        })
        
        response = client.messages.create(
            model="claude-sonnet-4",
            max_tokens=4096,
            system=system_prompt,
            tools=tools,
            messages=messages
        )
    
    return response.content[0].text
```

### Phase 5: Test

Run all test scenarios from user requirements:
```python
for scenario in test_scenarios:
    result = run_agent(scenario.input)
    # Verify matches expected behavior
```

**Fix common issues:**
- Agent ignores tool → Add example to system prompt
- Wrong parameters → Improve tool description
- Too slow → Switch to Sonnet 4 or Haiku

### Phase 6: Evaluation

Create automated evaluation:
```python
def evaluate_agent():
    judge = Anthropic(api_key="your-key")
    
    for scenario in eval_dataset:
        output = run_agent(scenario.input)
        
        # Use Claude as judge
        score = judge.messages.create(
            model="claude-sonnet-4.5",
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": f"""Score this agent response (0-100):
                
                User asked: {scenario.input}
                Agent responded: {output}
                Expected behavior: {scenario.expected}
                
                Criteria:
                - Correctness (40%)
                - Tool usage (30%)
                - Response quality (20%)
                - Safety (10%)
                
                Return only the score."""
            }]
        )
        
        scores.append(int(score.content[0].text))
    
    return sum(scores) / len(scores)
```

**Pass threshold:** Average score ≥80%

### Phase 7: Security

Add these 3 controls:
```python
# 1. Rate limiting
if user_requests_today > 100:
    reject()

# 2. Cost guard  
if transaction_amount > 100:
    require_human_approval()

# 3. Data access control
allowed_tables = ["public_data", "customer_info"]
if table not in allowed_tables:
    reject()
```

### Phase 8: Deploy

1. Test locally with all scenarios
2. Deploy to 10% traffic → monitor 24hrs
3. If metrics good → 100%
4. If metrics bad → rollback

**Rollback if:**
- Error rate >2%
- Latency >2x expected
- Cost >1.5x budget

## Metrics to Track

Monitor these 4:
1. **Success rate**: % tasks completed
2. **User satisfaction**: thumbs up/down ratio
3. **Cost**: $ per interaction
4. **Latency**: response time (ms)

## Level 2: Multi-Step Agents

For multi-step workflows, add planning:
```python
system_prompt = """
You solve multi-step problems by:
1. Breaking down the goal into steps
2. Executing each step with appropriate tools
3. Synthesizing results into final answer

Always show your plan before starting.
"""
```

**Use context engineering:** Selectively include relevant info at each step.

## Level 3: Multi-Agent Systems

Use coordinator pattern:
```python
coordinator_prompt = """
You are a project coordinator managing specialist agents:
- research_agent: Gathers information
- analysis_agent: Analyzes data
- writer_agent: Creates content

Delegate tasks to specialists and synthesize results.
"""
```

**Only build Level 3 if:**
- Multiple distinct workflows needed
- Each workflow needs different expertise
- Team can maintain multiple agents

## Common Patterns

**RAG (Retrieval-Augmented Generation):**
```python
{
    "name": "query_docs",
    "description": "Search company documentation",
    "input_schema": {
        "type": "object",
        "properties": {
            "query": {"type": "string"}
        }
    }
}
```

**Human-in-the-Loop:**
```python
{
    "name": "ask_confirmation",
    "description": "Get human approval before risky action",
    "input_schema": {
        "type": "object",
        "properties": {
            "action": {"type": "string"},
            "reason": {"type": "string"}
        }
    }
}
```

## Quick Reference

```
ESSENTIALS:
1. System prompt (who, tools, rules, examples)
2. Tools (2-5 to start)
3. Loop (Claude SDK provides)
4. Eval (10+ test cases, 80% threshold)
5. Monitor (4 metrics)

MODELS:
- Sonnet 4: Most use cases
- Sonnet 4.5: Complex reasoning
- Haiku: Speed/cost optimization

FIX ISSUES:
- Not using tools? Add example
- Wrong params? Better description
- Too slow? Switch model
- Hallucinating? Add RAG, require sources
```

## Resources

See references/ for:
- `mcp_code_execution.md`: Complete guide to MCP + Code pattern (98% token reduction)
- `workflow_examples.md`: Complete agent implementations
- `tool_patterns.md`: Reusable tool definitions

## Best Practices

1. **Start simple**: Level 1 first, expand only if needed
2. **Test early**: Run test scenarios from day 1
3. **Add examples**: System prompt needs 2-3 concrete examples
4. **Limit tools**: Start with 2-5, add more only if necessary
5. **Monitor metrics**: Track success rate, satisfaction, cost, latency
6. **Iterate fast**: Ship prototype, improve based on real usage
