# TECH_NOTES.md — Ghi chú kỹ thuật & Concept mới

> File này ghi lại các concept quan trọng, gotchas, và snippets đã được verify.  
> AI Copilot dùng file này để giải thích đúng context project, không giải thích chung chung.

---

## tree-sitter

### Cách hoạt động
tree-sitter là incremental parser — parse source code thành Concrete Syntax Tree (CST), khác với AST (Abstract Syntax Tree) vì giữ lại toàn bộ token kể cả whitespace, comments. Với mục đích phân tích, ta dùng như AST.

### Các node type quan trọng (JavaScript)
```
function_declaration       → function foo() {}
arrow_function             → const foo = () => {}
method_definition          → class { foo() {} }
if_statement               → if (...) {}
for_statement              → for (...) {}
while_statement            → while (...) {}
do_statement               → do {} while (...)
switch_statement           → switch (...) { case: }
try_statement              → try {} catch {}
return_statement           → return ...
throw_statement            → throw ...
binary_expression (&&, ||) → điều kiện logic
```

### Snippet khởi tạo
```javascript
const Parser = require('tree-sitter');
const JavaScript = require('tree-sitter-javascript');

const parser = new Parser();
parser.setLanguage(JavaScript);

const tree = parser.parse(sourceCode);
const rootNode = tree.rootNode;
```

### Traverse tree
```javascript
function traverse(node, callback) {
  callback(node);
  for (let i = 0; i < node.childCount; i++) {
    traverse(node.child(i), callback);
  }
}
```

---

## McCabe Cyclomatic Complexity

### Công thức
`CC = E - N + 2P`  
Trong đó: E = số edges, N = số nodes, P = số connected components (thường = 1)

### Cách tính đơn giản từ code (không cần vẽ CFG)
`CC = 1 + số decision points`

Decision points là:
- `if`, `else if`
- `for`, `while`, `do...while`
- `case` trong switch (mỗi case 1 điểm)
- `&&`, `||` trong điều kiện
- `catch` trong try/catch
- `? :` (ternary)

### Risk levels
| CC | Mức độ |
|----|-------|
| 1–5 | Low — đơn giản |
| 6–10 | Medium — cần chú ý |
| 11–20 | High — phức tạp, khó test |
| >20 | Very High — cần refactor |

---

## Control Flow Graph (CFG)

### Định nghĩa
- **Node**: một basic block — đoạn code chạy tuần tự, không có branch
- **Edge**: luồng điều khiển từ block này sang block khác
- **Entry node**: bắt đầu hàm
- **Exit node**: kết thúc hàm (return, throw, hoặc cuối function)

### Ví dụ đơn giản
```javascript
function foo(x) {        // Block 1: entry
  if (x > 0) {           // Branch → Block 2 (true) or Block 3 (false)
    return x;            // Block 2: exit
  }
  return -x;             // Block 3: exit
}
```
CFG: Entry → [x>0?] → Block2(return x) | Block3(return -x)

### Format lưu trong DB / truyền lên frontend
```json
{
  "nodes": [
    { "id": "n1", "label": "entry", "code": "function foo(x)", "type": "entry" },
    { "id": "n2", "label": "if x > 0", "code": "if (x > 0)", "type": "condition" },
    { "id": "n3", "label": "return x", "code": "return x", "type": "exit" },
    { "id": "n4", "label": "return -x", "code": "return -x", "type": "exit" }
  ],
  "edges": [
    { "id": "e1", "source": "n1", "target": "n2", "label": "" },
    { "id": "e2", "source": "n2", "target": "n3", "label": "true" },
    { "id": "e3", "source": "n2", "target": "n4", "label": "false" }
  ]
}
```

---

## Dockerode

### Cách chạy container và lấy output
```javascript
const Docker = require('dockerode');
const docker = new Docker();

async function runInSandbox(code, testFile) {
  const container = await docker.createContainer({
    Image: 'node:20-slim',
    Cmd: ['sh', '-c', 'cd /app && npm test -- --coverage'],
    HostConfig: {
      Memory: 256 * 1024 * 1024,    // 256MB
      NanoCpus: 500000000,            // 0.5 CPU
      NetworkMode: 'none',            // no internet
      AutoRemove: true,
    },
    WorkingDir: '/app',
  });
  
  // Copy files vào container trước khi start
  // Dùng container.putArchive() với tar stream
  
  await container.start();
  
  // Stream logs ra
  const stream = await container.logs({ follow: true, stdout: true, stderr: true });
  
  // Timeout sau 60 giây
  const timeout = setTimeout(() => container.kill(), 60000);
  await container.wait();
  clearTimeout(timeout);
}
```

### Security checklist
- [ ] `NetworkMode: 'none'` — không có internet
- [ ] Memory limit: 256MB
- [ ] CPU limit: 0.5 core  
- [ ] Timeout: 60 giây → kill container
- [ ] `AutoRemove: true` — tự xóa sau khi chạy xong
- [ ] Chạy với non-root user trong container
- [ ] Read-only filesystem ngoại trừ /tmp

---

## LCOV Format

### Ví dụ LCOV output
```
SF:src/math.js            ← Source File
FN:1,add                  ← Function name, start line
FN:5,multiply
FNDA:3,add                ← Function hits: 3 lần gọi hàm add
FNDA:0,multiply           ← 0 lần gọi multiply → uncovered
FNF:2                     ← Total functions
FNH:1                     ← Functions hit (covered)
DA:1,3                    ← Line 1, hit 3 lần
DA:2,3
DA:5,0                    ← Line 5, hit 0 lần → uncovered
DA:6,0
LF:4                      ← Total lines
LH:2                      ← Lines hit
BRH:0                     ← Branch hits
BRF:0                     ← Total branches
end_of_record
```

### Parse bằng lcov-parse
```javascript
const lcovParse = require('lcov-parse');

lcovParse(lcovContent, (err, data) => {
  // data[0].lines.details = [{ line: 1, hit: 3 }, { line: 5, hit: 0 }]
  const uncoveredLines = data[0].lines.details
    .filter(d => d.hit === 0)
    .map(d => d.line);
});
```

---

## Groq API — Prompt Template

### System prompt cho AI test suggestion
```
You are an expert software testing assistant. 
Your task is to generate unit test cases for uncovered code segments.

Rules:
1. Generate tests using the same testing framework detected in the project
2. Each test must target a specific uncovered line or branch
3. Include edge cases: null/undefined inputs, boundary values, error conditions
4. Output ONLY valid JSON, no markdown, no explanation outside JSON

Output format:
{
  "tests": [
    {
      "name": "should return -1 when input is negative",
      "code": "test('should return -1...', () => { ... })",
      "targets_line": 15,
      "explanation": "This test covers the else branch when x < 0"
    }
  ]
}
```

### User prompt template
```
Source file: {filename}
Language: {language}
Testing framework: {framework} (jest/mocha/pytest)

Function to test:
```{language}
{functionCode}
```

Existing test coverage: {coveragePercent}%

Uncovered lines: {uncoveredLines}

Uncovered code segments:
```{language}
{uncoveredCode}
```

Generate unit tests to cover the uncovered segments above.
```

---

## BullMQ — Pattern cơ bản

```javascript
// Queue definition
import { Queue, Worker } from 'bullmq';

const coverageQueue = new Queue('coverage-runs', {
  connection: { host: 'localhost', port: 6379 }
});

// Enqueue job
const job = await coverageQueue.add('run-coverage', {
  uploadId: '123',
  fileRelativePath: 'src/math.js',
});

// Worker
const worker = new Worker('coverage-runs', async (job) => {
  const { uploadId, fileRelativePath } = job.data;
  // ... run Docker container
  // ... parse LCOV
  // ... save to DB
}, { connection: { host: 'localhost', port: 6379 } });

// Poll status từ frontend
// GET /analysis/:jobId/status
// → { status: 'queued' | 'running' | 'done' | 'failed', result?: ... }
```

---

## Checklist trước khi commit

- [ ] Không có file `.env` hoặc secret trong commit
- [ ] `npm run build` pass không lỗi TypeScript
- [ ] Không có `console.log` debug còn sót
- [ ] API error response đúng format `{ error: string, code?: string }`
- [ ] Prisma migration đã được tạo nếu thay đổi schema
