# Complete Agent Workflow Examples

## Example 1: Customer Support Agent (Level 1)

```python
from anthropic import Anthropic

client = Anthropic(api_key="your-key")

# System Prompt
system_prompt = """
You are a customer support agent for Acme Corp.

Your tools:
- search_kb: Search knowledge base for answers
- get_order_status: Check order status by order ID
- create_ticket: Create support ticket for escalation

RULES:
- ALWAYS search knowledge base before creating tickets
- NEVER promise refunds without manager approval
- Be friendly and helpful

EXAMPLES:
User: "Where is my order #12345?"
You: [think: need order status] → [action: get_order_status("12345")] → [response: "Your order is out for delivery!"]

User: "How do I return an item?"
You: [think: policy question] → [action: search_kb("return policy")] → [response: policy details]
"""

# Tools
tools = [
    {
        "name": "search_kb",
        "description": "Search knowledge base for company policies and FAQs",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search query"}
            },
            "required": ["query"]
        }
    },
    {
        "name": "get_order_status",
        "description": "Get current status of an order",
        "input_schema": {
            "type": "object",
            "properties": {
                "order_id": {"type": "string", "description": "Order ID"}
            },
            "required": ["order_id"]
        }
    },
    {
        "name": "create_ticket",
        "description": "Create escalation ticket for complex issues",
        "input_schema": {
            "type": "object",
            "properties": {
                "title": {"type": "string"},
                "description": {"type": "string"},
                "priority": {"type": "string", "enum": ["low", "medium", "high"]}
            },
            "required": ["title", "description"]
        }
    }
]

# Tool implementations
def execute_tool(name, params):
    if name == "search_kb":
        # Call your KB API
        return kb_api.search(params["query"])
    elif name == "get_order_status":
        # Call your order API
        return order_api.get_status(params["order_id"])
    elif name == "create_ticket":
        # Call your ticketing API
        return ticket_api.create(**params)

# Agent loop
def run_agent(user_message):
    messages = [{"role": "user", "content": user_message}]
    
    response = client.messages.create(
        model="claude-sonnet-4",
        max_tokens=4096,
        system=system_prompt,
        tools=tools,
        messages=messages
    )
    
    while response.stop_reason == "tool_use":
        tool_use = next(block for block in response.content if block.type == "tool_use")
        tool_result = execute_tool(tool_use.name, tool_use.input)
        
        messages.append({"role": "assistant", "content": response.content})
        messages.append({
            "role": "user",
            "content": [{
                "type": "tool_result",
                "tool_use_id": tool_use.id,
                "content": str(tool_result)
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

## Example 2: Research Assistant (Level 2)

```python
system_prompt = """
You are a research assistant that helps with multi-step analysis.

Your tools:
- search_web: Search internet for current information
- search_papers: Search academic papers
- analyze_data: Run statistical analysis on datasets

PROCESS:
1. Break down complex questions into steps
2. Gather information from multiple sources
3. Synthesize findings into comprehensive answer

RULES:
- ALWAYS cite sources
- Show your research plan before starting
- Combine multiple sources for complete picture

EXAMPLES:
User: "What's the impact of remote work on productivity?"
You: [plan: 1. Search recent studies 2. Find statistics 3. Analyze trends 4. Synthesize]
     [action: search_papers("remote work productivity 2024")]
     [action: search_web("remote work statistics")]
     [response: comprehensive analysis with citations]
"""

tools = [
    {
        "name": "search_web",
        "description": "Search internet for current information",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string"}
            },
            "required": ["query"]
        }
    },
    {
        "name": "search_papers",
        "description": "Search academic papers and research",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string"},
                "year_min": {"type": "integer"}
            },
            "required": ["query"]
        }
    }
]

# Agent maintains conversation history for multi-step reasoning
def run_research_agent(user_message, conversation_history=[]):
    messages = conversation_history + [{"role": "user", "content": user_message}]
    
    # Same loop as before, but maintains full history
    # This enables multi-step reasoning across tool calls
```

## Example 3: Data Analyst Agent (Level 2)

```python
system_prompt = """
You are a data analyst that helps interpret business data.

Your tools:
- query_database: Run SQL queries on company database
- create_visualization: Generate charts from data
- calculate_metrics: Compute business metrics

PROCESS:
1. Understand the business question
2. Identify relevant data sources
3. Query and analyze data
4. Create visualizations if helpful
5. Provide insights and recommendations

RULES:
- ALWAYS validate SQL before running
- Explain methodology clearly
- Include confidence levels in predictions

EXAMPLES:
User: "What are our top-performing products this quarter?"
You: [think: need sales data by product]
     [action: query_database("SELECT product, SUM(revenue) FROM sales WHERE quarter='Q1' GROUP BY product ORDER BY revenue DESC LIMIT 10")]
     [action: create_visualization(data, type="bar_chart")]
     [response: analysis with chart]
"""
```

## Example 4: Multi-Agent System (Level 3)

```python
# Coordinator Agent
coordinator_prompt = """
You are a project coordinator managing specialist agents.

Your specialist agents:
- research_agent: Gathers information and finds sources
- writer_agent: Creates content and documents  
- code_agent: Writes and tests code

PROCESS:
1. Understand the full project goal
2. Break into sub-tasks for each specialist
3. Delegate to appropriate agents
4. Review and integrate their outputs
5. Deliver complete result

EXAMPLES:
User: "Create a blog post about AI trends with code examples"
You: [plan: research_agent for trends, code_agent for examples, writer_agent for post]
     [delegate: research_agent("find top 3 AI trends in 2024")]
     [delegate: code_agent("create code example for trend 1")]
     [delegate: writer_agent("write blog post using research and code")]
     [response: complete blog post]
"""

# Individual specialist agents have focused prompts
research_agent_prompt = """
You are a research specialist. 
Your only job is to find accurate information and cite sources.
Use search_web and search_papers tools extensively.
"""

writer_agent_prompt = """
You are a content writer.
Your only job is to create engaging, well-structured content.
You receive research and create polished documents.
"""

code_agent_prompt = """
You are a code specialist.
Your only job is to write clean, tested code examples.
You receive requirements and produce working code.
"""
```
