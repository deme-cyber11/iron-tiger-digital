# Python MCP Server Implementation Guide

## Overview

This document provides Python-specific best practices and examples for implementing MCP servers using the MCP Python SDK (FastMCP).

## Quick Reference

### Key Imports
```python
from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel, Field, field_validator, ConfigDict
from typing import Optional, List, Dict, Any
from enum import Enum
import httpx
```

### Server Initialization
```python
mcp = FastMCP("service_mcp")
```

### Tool Registration Pattern
```python
@mcp.tool(name="tool_name", annotations={...})
async def tool_function(params: InputModel) -> str:
    # Implementation
    pass
```

## Server Naming Convention

Python MCP servers must follow this naming pattern:
- **Format**: `{service}_mcp` (lowercase with underscores)
- **Examples**: `github_mcp`, `jira_mcp`, `stripe_mcp`

## Tool Implementation

### Tool Naming

Use snake_case for tool names with service prefix:
- Use `slack_send_message` instead of just `send_message`
- Use `github_create_issue` instead of just `create_issue`

### Pydantic Models for Input Validation

```python
from pydantic import BaseModel, Field, field_validator, ConfigDict

class UserSearchInput(BaseModel):
    model_config = ConfigDict(
        str_strip_whitespace=True,
        validate_assignment=True,
        extra='forbid'
    )

    query: str = Field(..., description="Search string", min_length=2, max_length=200)
    limit: Optional[int] = Field(default=20, description="Max results", ge=1, le=100)
    offset: Optional[int] = Field(default=0, description="Results to skip", ge=0)
    response_format: ResponseFormat = Field(default=ResponseFormat.MARKDOWN)

    @field_validator('query')
    @classmethod
    def validate_query(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Query cannot be empty")
        return v.strip()
```

### Tool Registration

```python
@mcp.tool(
    name="example_search_users",
    annotations={
        "title": "Search Example Users",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": True
    }
)
async def example_search_users(params: UserSearchInput) -> str:
    '''Search for users in the Example system by name, email, or team.

    Args:
        params (UserSearchInput): Validated input parameters

    Returns:
        str: JSON-formatted response containing search results
    '''
    try:
        data = await _make_api_request("users/search", params={"q": params.query})
        return json.dumps(data, indent=2)
    except Exception as e:
        return _handle_api_error(e)
```

## Error Handling

```python
def _handle_api_error(e: Exception) -> str:
    if isinstance(e, httpx.HTTPStatusError):
        if e.response.status_code == 404:
            return "Error: Resource not found. Please check the ID is correct."
        elif e.response.status_code == 403:
            return "Error: Permission denied. You don't have access."
        elif e.response.status_code == 429:
            return "Error: Rate limit exceeded. Please wait before retrying."
        return f"Error: API request failed with status {e.response.status_code}"
    elif isinstance(e, httpx.TimeoutException):
        return "Error: Request timed out. Please try again."
    return f"Error: Unexpected error: {type(e).__name__}"
```

## Shared Utilities

```python
async def _make_api_request(endpoint: str, method: str = "GET", **kwargs) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.request(
            method,
            f"{API_BASE_URL}/{endpoint}",
            timeout=30.0,
            **kwargs
        )
        response.raise_for_status()
        return response.json()
```

## Response Formats

```python
from enum import Enum

class ResponseFormat(str, Enum):
    MARKDOWN = "markdown"
    JSON = "json"
```

## Running the Server

```python
if __name__ == "__main__":
    mcp.run()  # stdio transport (default)
    # OR
    mcp.run(transport="streamable_http", port=8000)  # HTTP transport
```

## Quality Checklist

- [ ] All tools implement 'name' and 'annotations' in the decorator
- [ ] All tools use Pydantic BaseModel for input validation
- [ ] All Pydantic Fields have explicit types and descriptions
- [ ] All tools have comprehensive docstrings
- [ ] Error messages are clear, actionable, and educational
- [ ] All async functions use `async def`
- [ ] Server name follows format: `{service}_mcp`
- [ ] Type hints are used throughout the code