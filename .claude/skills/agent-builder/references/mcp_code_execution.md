# MCP Code Execution Pattern

## Overview

The MCP + Code Execution pattern reduces token usage by 98% (150K → 2K tokens) for complex agent workflows by presenting MCP tools as code APIs instead of direct tool calls.

## When to Use

**Use MCP + Code Execution when:**
- Agent needs 10+ tools
- Complex data processing workflows
- Multi-step operations with intermediate results
- Data transformations between tools
- Need to filter/aggregate data before returning to model

**Use Direct Tool Calling when:**
- Agent needs 2-5 simple tools
- Straightforward lookup/action workflows
- No complex data processing
- Quick prototyping

## How It Works

### Traditional MCP (Token Heavy)
```
1. Load ALL tool definitions into context → 50K+ tokens
2. Model calls tool → passes through context
3. Tool returns data → passes through context
4. Model processes → uses more tokens
5. Repeat for each tool call
```

### MCP + Code Execution (Token Efficient)
```
1. MCP tools exposed as code APIs on filesystem → 0 tokens
2. Agent discovers tools on-demand → minimal tokens
3. Agent writes code to compose tools → executes in sandbox
4. Data stays in execution environment → 0 tokens
5. Only final results return to context → minimal tokens
```

## Implementation Pattern

### Step 1: Generate Filesystem Structure

Convert MCP servers into code modules:

```
servers/
├── google-drive/
│   ├── getDocument.ts
│   ├── searchFiles.ts
│   ├── uploadFile.ts
│   └── index.ts
├── salesforce/
│   ├── updateRecord.ts
│   ├── queryRecords.ts
│   ├── createOpportunity.ts
│   └── index.ts
├── slack/
│   ├── sendMessage.ts
│   ├── getChannels.ts
│   └── index.ts
└── skills/
    └── saved_workflows.ts
```

### Step 2: Create Tool Wrappers

Each tool becomes a typed function:

```typescript
// servers/google-drive/getDocument.ts
interface GetDocumentInput {
  documentId: string;
  fields?: string[];
}

interface GetDocumentResponse {
  content: string;
  title: string;
  lastModified: string;
}

/**
 * Retrieves a document from Google Drive
 * 
 * @param input - Document ID and optional fields
 * @returns Document content and metadata
 */
export async function getDocument(
  input: GetDocumentInput
): Promise<GetDocumentResponse> {
  return callMCPTool<GetDocumentResponse>(
    'google_drive__get_document', 
    input
  );
}
```

### Step 3: Agent Writes Composition Code

Agent explores filesystem and writes code on-demand:

```typescript
// Agent-generated code
import { getDocument } from './servers/google-drive/getDocument';
import { updateRecord } from './servers/salesforce/updateRecord';

// Fetch document
const doc = await getDocument({ 
  documentId: 'abc123' 
});

// Extract only relevant parts
const summary = doc.content
  .split('\n')
  .filter(line => line.includes('Action Item'))
  .join('\n');

// Update Salesforce record
await updateRecord({
  objectType: 'SalesMeeting',
  recordId: '00Q5f000001abcXYZ',
  data: {
    Notes: summary,
    LastUpdated: new Date().toISOString()
  }
});

console.log('Updated Salesforce with action items');
```

## Key Benefits

### 1. Progressive Tool Discovery

**Problem:** Traditional MCP loads all 50 tool definitions upfront → 50K tokens

**Solution:** Agent explores filesystem on-demand:
```typescript
// Agent can list available servers
const servers = await fs.readdir('./servers');
// ['google-drive', 'salesforce', 'slack']

// Then explore specific server
const gdrive_tools = await fs.readdir('./servers/google-drive');
// ['getDocument.ts', 'searchFiles.ts', ...]

// Read only needed tool
const tool_code = await fs.readFile('./servers/google-drive/getDocument.ts');
```

**Result:** Load only 2-3 relevant tools → ~500 tokens

### 2. Context-Efficient Data Handling

**Problem:** Large data passes through context multiple times

**Solution:** Process data in execution environment:
```typescript
// Fetch large spreadsheet
const sheet = await sheets.getData({ sheetId: 'xyz' });
// sheet.data has 10,000 rows → would be 100K+ tokens in context

// Filter and aggregate in code (not in context)
const summary = sheet.data
  .filter(row => row.status === 'active')
  .reduce((acc, row) => {
    acc.totalRevenue += row.revenue;
    acc.count += 1;
    return acc;
  }, { totalRevenue: 0, count: 0 });

// Return only summary → ~50 tokens
console.log({ 
  activeCustomers: summary.count,
  totalRevenue: summary.totalRevenue 
});
```

### 3. Privacy-Preserving Data Flows

**Problem:** Sensitive data exposed in model context

**Solution:** Tokenize in execution environment:
```typescript
// Read customer data with PII
const customers = await sheets.getData({ sheetId: 'customers' });

// Tokenize sensitive fields
const tokenMap = new Map();
const sanitized = customers.data.map(row => {
  const token = generateToken();
  tokenMap.set(token, {
    email: row.email,
    phone: row.phone
  });
  return {
    ...row,
    email: token,
    phone: token
  };
});

// Model sees only tokens
// When calling downstream APIs, restore real values
await salesforce.updateRecords(
  sanitized.map(row => ({
    ...row,
    email: tokenMap.get(row.email).email,
    phone: tokenMap.get(row.phone).phone
  }))
);
```

### 4. Reusable Skills

**Problem:** Agent rewrites same logic repeatedly

**Solution:** Save working code to skills directory:
```typescript
// skills/generate_sales_report.ts
export async function generateSalesReport(quarter: string) {
  const opportunities = await salesforce.queryRecords({
    object: 'Opportunity',
    filters: { quarter, status: 'Closed Won' }
  });
  
  const revenue = opportunities.reduce(
    (sum, opp) => sum + opp.amount, 
    0
  );
  
  return {
    quarter,
    totalRevenue: revenue,
    deals: opportunities.length,
    avgDealSize: revenue / opportunities.length
  };
}

// Agent can import and reuse
import { generateSalesReport } from './skills/generate_sales_report';
const q4 = await generateSalesReport('Q4-2024');
```

## System Prompt for MCP + Code

```markdown
You are an agent with access to MCP servers exposed as code APIs.

Available servers are in the ./servers/ directory:
- google-drive: Document operations
- salesforce: CRM operations
- slack: Messaging operations

Process:
1. Explore ./servers/ to discover available tools
2. Read tool files to understand parameters
3. Write TypeScript code to compose tools
4. Process data in the execution environment
5. Return only final results or summaries

Key principles:
- Load tools on-demand (don't read all upfront)
- Keep large data in execution environment
- Filter/transform data before logging results
- Save reusable logic to ./skills/

Example:
User: "Update Salesforce with notes from doc abc123"
You: 
1. Read ./servers/google-drive/getDocument.ts to understand API
2. Read ./servers/salesforce/updateRecord.ts to understand API
3. Write code:
   const doc = await gdrive.getDocument({ documentId: 'abc123' });
   await salesforce.updateRecord({ 
     objectType: 'Meeting',
     data: { Notes: doc.content }
   });
```

## Common Patterns

### Pattern 1: Data Pipeline
```typescript
// Fetch → Transform → Load
const rawData = await source.getData();
const cleaned = transformData(rawData);
await destination.load(cleaned);
```

### Pattern 2: Polling Loop
```typescript
// Check periodically without round-tripping through context
while (true) {
  const messages = await slack.getNewMessages({ channel: 'alerts' });
  if (messages.length > 0) {
    await processMessages(messages);
  }
  await sleep(60000); // 1 minute
}
```

### Pattern 3: Batch Operations
```typescript
// Process many items without individual context round-trips
const items = await getItemsToProcess();
const results = await Promise.all(
  items.map(item => processItem(item))
);
console.log({ processed: results.length, success: results.filter(r => r.success).length });
```

### Pattern 4: Conditional Logic
```typescript
// Complex branching without consulting model each time
const customer = await crm.getCustomer({ id: customerId });

if (customer.value > 100000) {
  await assignToEnterpriseTeam(customer);
} else if (customer.status === 'at_risk') {
  await createRetentionTask(customer);
} else {
  await routeToGeneralSupport(customer);
}
```

## Security Considerations

**Sandbox Environment:**
- Code runs in isolated execution environment
- Limited file system access
- No network access except through MCP tools
- Resource limits (CPU, memory, time)
- Monitoring and logging

**Code Review:**
- Log all generated code before execution
- Implement approval for destructive operations
- Rate limiting on code execution
- Timeout limits (e.g., 30 seconds)

## Performance Comparison

| Scenario | Traditional MCP | MCP + Code | Improvement |
|----------|----------------|------------|-------------|
| 50 tool definitions | 50,000 tokens | 500 tokens | 99% |
| Fetch + filter 10K rows | 150,000 tokens | 2,000 tokens | 98.7% |
| Multi-step pipeline (5 tools) | 80,000 tokens | 3,000 tokens | 96.3% |
| Polling loop (10 iterations) | 200,000 tokens | 5,000 tokens | 97.5% |

## Migration Guide

**From Direct Tool Calling → MCP + Code:**

1. Generate filesystem structure from existing tool definitions
2. Update system prompt to reference ./servers/ directory
3. Add code execution sandbox to agent runtime
4. Test with simple workflows first
5. Gradually migrate complex workflows

**Best Practices:**
- Start with MCP + Code for new complex agents
- Use direct calling for simple prototypes
- Hybrid: Use code for data processing, direct calling for simple actions
- Monitor token usage to validate improvements

## References

- Anthropic Blog: "Code execution with MCP: building more efficient AI agents"
- Cloudflare "Code Mode": Similar pattern for Workers platform
- MCP Protocol: https://modelcontextprotocol.io
