# Reusable Tool Patterns

## Search & Retrieval Tools

### Web Search
```python
{
    "name": "search_web",
    "description": "Search the internet for current information, news, or facts",
    "input_schema": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "Search query"
            }
        },
        "required": ["query"]
    }
}
```

### Document Search (RAG)
```python
{
    "name": "search_docs",
    "description": "Search company knowledge base or documentation",
    "input_schema": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "What to search for"
            },
            "max_results": {
                "type": "integer",
                "description": "Number of results to return",
                "default": 5
            }
        },
        "required": ["query"]
    }
}
```

### Database Query
```python
{
    "name": "query_database",
    "description": "Run SQL query on company database. READ ONLY access.",
    "input_schema": {
        "type": "object",
        "properties": {
            "sql": {
                "type": "string",
                "description": "SQL SELECT query"
            }
        },
        "required": ["sql"]
    }
}
```

## Action Tools

### Send Email
```python
{
    "name": "send_email",
    "description": "Send an email to recipient",
    "input_schema": {
        "type": "object",
        "properties": {
            "to": {
                "type": "string",
                "description": "Recipient email address"
            },
            "subject": {
                "type": "string",
                "description": "Email subject line"
            },
            "body": {
                "type": "string",
                "description": "Email body content"
            },
            "cc": {
                "type": "array",
                "items": {"type": "string"},
                "description": "CC recipients (optional)"
            }
        },
        "required": ["to", "subject", "body"]
    }
}
```

### Create Ticket
```python
{
    "name": "create_ticket",
    "description": "Create support or issue ticket in tracking system",
    "input_schema": {
        "type": "object",
        "properties": {
            "title": {
                "type": "string",
                "description": "Ticket title"
            },
            "description": {
                "type": "string",
                "description": "Detailed description of issue"
            },
            "priority": {
                "type": "string",
                "enum": ["low", "medium", "high", "urgent"],
                "description": "Ticket priority level"
            },
            "assignee": {
                "type": "string",
                "description": "Who to assign ticket to (optional)"
            }
        },
        "required": ["title", "description"]
    }
}
```

### Update CRM
```python
{
    "name": "update_crm",
    "description": "Update customer record in CRM system",
    "input_schema": {
        "type": "object",
        "properties": {
            "customer_id": {
                "type": "string",
                "description": "Customer ID"
            },
            "field": {
                "type": "string",
                "enum": ["status", "notes", "next_followup"],
                "description": "Field to update"
            },
            "value": {
                "type": "string",
                "description": "New value"
            }
        },
        "required": ["customer_id", "field", "value"]
    }
}
```

## Human-in-the-Loop Tools

### Ask for Confirmation
```python
{
    "name": "ask_confirmation",
    "description": "Request human approval before taking risky action",
    "input_schema": {
        "type": "object",
        "properties": {
            "action": {
                "type": "string",
                "description": "Action that needs approval"
            },
            "reason": {
                "type": "string",
                "description": "Why this action is needed"
            },
            "risks": {
                "type": "string",
                "description": "Potential risks or concerns"
            }
        },
        "required": ["action", "reason"]
    }
}
```

### Request Information
```python
{
    "name": "request_info",
    "description": "Ask user for additional information needed to proceed",
    "input_schema": {
        "type": "object",
        "properties": {
            "question": {
                "type": "string",
                "description": "What information is needed"
            },
            "context": {
                "type": "string",
                "description": "Why this information is needed"
            }
        },
        "required": ["question"]
    }
}
```

## Analysis Tools

### Run Calculation
```python
{
    "name": "calculate",
    "description": "Perform mathematical calculations or data analysis",
    "input_schema": {
        "type": "object",
        "properties": {
            "expression": {
                "type": "string",
                "description": "Mathematical expression to evaluate"
            },
            "data": {
                "type": "array",
                "description": "Optional dataset for analysis"
            }
        },
        "required": ["expression"]
    }
}
```

### Generate Report
```python
{
    "name": "generate_report",
    "description": "Create formatted report from data",
    "input_schema": {
        "type": "object",
        "properties": {
            "data": {
                "type": "object",
                "description": "Data to include in report"
            },
            "format": {
                "type": "string",
                "enum": ["pdf", "csv", "json"],
                "description": "Report output format"
            },
            "template": {
                "type": "string",
                "description": "Report template to use"
            }
        },
        "required": ["data", "format"]
    }
}
```

## Tool Implementation Pattern

```python
def execute_tool(tool_name: str, parameters: dict) -> str:
    """
    Generic tool execution handler.
    
    Args:
        tool_name: Name of tool to execute
        parameters: Tool parameters from Claude
        
    Returns:
        String result to send back to Claude
    """
    try:
        if tool_name == "search_web":
            results = web_search_api.search(parameters["query"])
            return json.dumps(results)
            
        elif tool_name == "send_email":
            email_api.send(
                to=parameters["to"],
                subject=parameters["subject"],
                body=parameters["body"],
                cc=parameters.get("cc", [])
            )
            return "Email sent successfully"
            
        elif tool_name == "ask_confirmation":
            # Implement your confirmation UI
            approved = show_confirmation_dialog(
                action=parameters["action"],
                reason=parameters["reason"]
            )
            return "approved" if approved else "denied"
            
        else:
            return f"Unknown tool: {tool_name}"
            
    except Exception as e:
        return f"Error executing {tool_name}: {str(e)}"
```

## Tool Design Best Practices

1. **Clear descriptions**: Explain exactly what the tool does and when to use it
2. **Required vs optional**: Mark required fields clearly
3. **Enums for choices**: Use enum when there are specific valid values
4. **Default values**: Provide sensible defaults for optional params
5. **Error handling**: Return clear error messages
6. **Idempotent when possible**: Safe to call multiple times
7. **Rate limiting**: Implement usage limits for expensive operations
8. **Logging**: Log all tool calls for debugging and auditing
