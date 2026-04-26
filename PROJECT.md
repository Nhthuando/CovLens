# PROJECT.md — TestCovAI

**Tên dự án:** TestCovAI — Automated Test Coverage Analysis Tool with AI Recommendations  
**Loại:** Capstone project + Portfolio project  
**Developer:** Ht (Solo)  
**Bắt đầu:** [FILL: ngày bắt đầu]  
**Deadline capstone:** [FILL: ngày nộp]  
**Mục tiêu phụ:** Portfolio để apply backend internship tại Việt Nam

---

## Mô tả ngắn

Công cụ web giúp developer phân tích test coverage của source code, visualize Control Flow Graph, tính Cyclomatic Complexity, và dùng AI để tự động gợi ý unit test cho các đoạn code chưa được covered.

---

## Core Features

### Feature 1 — Static Analysis
- Parse source file → tính McCabe Cyclomatic Complexity (CC) mỗi function
- Build Control Flow Graph (CFG) từ AST
- Render CFG tương tác trên UI
- Hiển thị bảng breakdown: function name, CC score, risk level

### Feature 2 — Coverage Run + AI Suggestion
- Nhận folder chứa source + test file
- Chạy coverage trong Docker sandbox (isolated)
- Parse LCOV/Cobertura report
- Highlight covered (xanh) / uncovered (đỏ) lines trên UI
- Gọi Groq AI → generate unit tests cho uncovered code
- Hiển thị test case + giải thích

### Auth & Upload
- Email/Password + GitHub OAuth2
- Upload ZIP hoặc nhập GitHub repo URL

---

## Tech Stack

### Frontend
- React 18 + Vite + TypeScript
- React Router v6
- Axios + React Query
- React Flow (CFG visualization)
- Monaco Editor (code display với highlighting)
- TailwindCSS

### Backend
- Node.js 20 + Express.js
- Prisma ORM
- PostgreSQL (production) / SQLite (dev)
- JWT (access token 15m + refresh token 7d)
- GitHub OAuth2 (passport-github2)
- Multer (file upload)
- BullMQ + Redis (job queue)
- Dockerode (Docker container management)

### Analysis
- tree-sitter + tree-sitter-javascript + tree-sitter-python
- Custom CFG builder (Node.js)
- LCOV parser (lcov-parse)
- Cobertura parser (cobertura-parse)

### AI
- Groq API (llama-3.3-70b-versatile)
- Structured prompt engineering
- JSON output parsing + validation

### Infrastructure
- Docker (sandbox execution)
- Redis (BullMQ)
- Railway hoặc Render (deployment)
- GitHub Actions (CI/CD)

---

## Database Schema (tóm tắt)

```
User
  id, email, passwordHash?, githubId?, githubAccessToken?
  createdAt, updatedAt

Project  
  id, userId, name, description
  language (js | python)
  createdAt

Upload
  id, projectId, type (zip | github_url)
  storagePath, repoUrl?
  status (pending | ready | error)
  createdAt

AnalysisRun
  id, uploadId, fileRelativePath
  type (static | coverage)
  status (queued | running | done | failed)
  createdAt, completedAt

StaticResult
  id, analysisRunId
  functionName, startLine, endLine
  cyclomaticComplexity, riskLevel (low | medium | high)

CoverageResult
  id, analysisRunId
  totalLines, coveredLines, coveragePercent
  lcovRaw (text)

UncoveredSegment
  id, coverageResultId
  functionName, startLine, endLine

AISuggestion
  id, uncoveredSegmentId
  testCode, explanation
  model, promptTokens, completionTokens
  createdAt
```

---

## Ngôn ngữ support (v1.0)

**Chỉ support JavaScript và Python** — không cố gắng support thêm ngôn ngữ trong v1.0. Làm tốt 2 ngôn ngữ hơn làm tệ nhiều ngôn ngữ.

---

## Non-goals (v1.0 — sẽ KHÔNG làm)

- Multi-file analysis (chỉ phân tích 1 file tại một thời điểm)
- Real-time collaboration
- CI/CD integration (ngoài webhook trigger đơn giản)
- Mobile app
- Tự train AI model

---

## Constraints

- **Free tier only**: Groq free, Railway/Render free, không chi tiền infrastructure
- **Solo developer**: không optimize cho team workflow
- **Academic deadline**: có thể trade off completeness lấy on-time delivery

---

## Decisions Log

Xem file DECISIONS.md

---

## Architecture tóm tắt

```
Browser (React)
    │
    ▼
Express API Server
    ├── Auth routes (/api/auth)
    ├── Upload routes (/api/uploads)  
    ├── Analysis routes (/api/analysis)
    └── AI routes (/api/ai)
         │
         ├── BullMQ Worker (async jobs)
         │      ├── Coverage Job → Docker Container
         │      └── AI Job → Groq API
         │
         └── PostgreSQL (Prisma)
```
