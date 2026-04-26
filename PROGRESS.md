# PROGRESS.md — Trạng thái tiến độ

> File này được cập nhật sau mỗi task hoàn thành.  
> AI Copilot đọc file này để biết đang ở đâu mà không cần hỏi lại.

---

## Tổng quan

| Thông tin | Giá trị |
|-----------|---------|
| Bắt đầu | 2026-04-25 |
| Session gần nhất | 2026-04-25 |
| Phase hiện tại | Phase 1 — Project Setup & Auth |
| Task hiện tại | 1.6 — GitHub OAuth2 callback flow |
| Tuần hiện tại | 1 / 20 |
| Tiến độ ước tính | 25% |

---

## Phase 1 — Project Setup & Auth (Tuần 1–2)

**Mục tiêu:** User đăng ký/đăng nhập được, upload file lên được

| # | Task | Trạng thái | Ghi chú |
|---|------|-----------|---------|
| 1.1 | Khởi tạo monorepo (backend + frontend folder) | ✅ Hoàn thành | Chuẩn hóa cấu trúc theo client/server |
| 1.2 | Setup Express + Prisma + PostgreSQL | ✅ Hoàn thành | Express bootstrap + Prisma config + kết nối DB |
| 1.3 | Thiết kế và migrate DB schema (User, Project, Upload) | ✅ Hoàn thành | Migration init đã apply, schema up-to-date |
| 1.4 | API: POST /auth/register + POST /auth/login (JWT) | ✅ Hoàn thành | Đã test runtime: register 201, login 200, sai mật khẩu 401, invalid input 400 |
| 1.5 | Middleware: verifyToken, errorHandler, requestLogger | ✅ Hoàn thành | verifyToken + errorHandler + requestLogger + protected route test pass |
| 1.6 | GitHub OAuth2 callback flow | 🔄 Đang làm | Task hiện tại |
| 1.7 | Refresh token flow (rotate + blacklist) | ❌ Bỏ qua / Out of scope | Theo quyết định JWT_SECRET only |
| 1.8 | API: POST /uploads/zip + POST /uploads/github-url | ⬜ Chưa làm | |
| 1.9 | File extraction + validation (zip bomb check) | ⬜ Chưa làm | |
| 1.10 | Frontend: Login/Register page + auth flow | ⬜ Chưa làm | |

---

## Phase 2 — Static Analysis Engine (Tuần 3–6)

**Mục tiêu:** Parse code, tính CC, build và render CFG

| # | Task | Trạng thái | Ghi chú |
|---|------|-----------|---------|
| 2.1 | Tích hợp tree-sitter, parse JS file → AST | ⬜ Chưa làm | |
| 2.2 | Extract function list từ AST | ⬜ Chưa làm | |
| 2.3 | Tính McCabe CC từng function | ⬜ Chưa làm | |
| 2.4 | Build CFG nodes/edges từ AST (JS, flat functions) | ⬜ Chưa làm | ⚠️ Rủi ro cao |
| 2.5 | Handle CFG phức tạp (nested, loops, try/catch) | ⬜ Chưa làm | ⚠️ Rủi ro cao |
| 2.6 | API: POST /analysis/static | ⬜ Chưa làm | |
| 2.7 | Lưu StaticResult vào DB | ⬜ Chưa làm | |
| 2.8 | Frontend: upload file selector + trigger analysis | ⬜ Chưa làm | |
| 2.9 | Frontend: CC breakdown table | ⬜ Chưa làm | |
| 2.10 | Frontend: CFG render với React Flow | ⬜ Chưa làm | |
| 2.11 | Thêm support Python (tree-sitter-python) | ⬜ Chưa làm | |

---

## Phase 3 — Coverage Execution (Tuần 7–11)

**Mục tiêu:** Chạy test coverage trong Docker sandbox, parse kết quả

| # | Task | Trạng thái | Ghi chú |
|---|------|-----------|---------|
| 3.1 | Setup Dockerode, pull base images (node:20-slim, python:3.12-slim) | ⬜ Chưa làm | ⚠️ Rủi ro cao |
| 3.2 | Tạo container, copy code vào, chạy test, lấy output | ⬜ Chưa làm | |
| 3.3 | Security: --network=none, memory limit, CPU limit, timeout | ⬜ Chưa làm | |
| 3.4 | Auto-cleanup container sau mỗi run | ⬜ Chưa làm | |
| 3.5 | Parse LCOV report → line coverage data | ⬜ Chưa làm | |
| 3.6 | Parse Cobertura XML → line coverage data | ⬜ Chưa làm | |
| 3.7 | Setup BullMQ + Redis, tạo CoverageQueue | ⬜ Chưa làm | |
| 3.8 | Job worker: nhận job → run Docker → parse → lưu DB | ⬜ Chưa làm | |
| 3.9 | API: POST /analysis/coverage (enqueue job) | ⬜ Chưa làm | |
| 3.10 | API: GET /analysis/:id/status (polling) | ⬜ Chưa làm | |
| 3.11 | Lưu CoverageResult + UncoveredSegment vào DB | ⬜ Chưa làm | |
| 3.12 | Frontend: Monaco Editor với line highlighting | ⬜ Chưa làm | |
| 3.13 | Frontend: coverage stats card (% covered, lines) | ⬜ Chưa làm | |
| 3.14 | Frontend: polling UI (loading state khi job chạy) | ⬜ Chưa làm | |

---

## Phase 4 — AI Test Suggestion (Tuần 12–14)

**Mục tiêu:** Groq API generate test cases cho uncovered code

| # | Task | Trạng thái | Ghi chú |
|---|------|-----------|---------|
| 4.1 | Thiết kế prompt template (system + user) | ⬜ Chưa làm | |
| 4.2 | Build prompt từ uncovered segment + source context | ⬜ Chưa làm | |
| 4.3 | Gọi Groq API, handle rate limit và timeout | ⬜ Chưa làm | |
| 4.4 | Parse JSON output → validate test code | ⬜ Chưa làm | |
| 4.5 | Lưu AISuggestion vào DB | ⬜ Chưa làm | |
| 4.6 | API: POST /ai/suggest | ⬜ Chưa làm | |
| 4.7 | Frontend: hiển thị test case trong code block | ⬜ Chưa làm | |
| 4.8 | Frontend: nút "Copy to clipboard" + "Regenerate" | ⬜ Chưa làm | |

---

## Phase 5 — Polish & Launch (Tuần 15–20)

| # | Task | Trạng thái | Ghi chú |
|---|------|-----------|---------|
| 5.1 | Global error handling + logging (Winston/Pino) | ⬜ Chưa làm | |
| 5.2 | Input validation toàn bộ API (Zod) | ⬜ Chưa làm | |
| 5.3 | Rate limiting (express-rate-limit) | ⬜ Chưa làm | |
| 5.4 | Unit tests cho analysis engine | ⬜ Chưa làm | |
| 5.5 | Integration tests cho auth flow | ⬜ Chưa làm | |
| 5.6 | Analysis history + so sánh coverage giữa 2 lần chạy | ⬜ Chưa làm | |
| 5.7 | GitHub webhook trigger (tùy chọn) | ⬜ Chưa làm | |
| 5.8 | Dockerfile + docker-compose cho toàn app | ⬜ Chưa làm | |
| 5.9 | Deploy lên Railway/Render | ⬜ Chưa làm | |
| 5.10 | README.md hoàn chỉnh (setup, screenshots, arch diagram) | ⬜ Chưa làm | |
| 5.11 | Báo cáo capstone | ⬜ Chưa làm | |

---

## Legend
- ⬜ Chưa làm
- 🔄 Đang làm
- ✅ Hoàn thành
- ❌ Bỏ qua / Out of scope
- ⚠️ Cần chú ý đặc biệt

---

## Nhật ký thay đổi scope

> Ghi lại mỗi khi quyết định thêm/bớt/thay đổi feature

| Ngày | Thay đổi | Lý do |
|------|---------|-------|
| 2026-04-25 | Giữ naming client/server thay cho backend/frontend | Đồng bộ với workspace thực tế, tránh rename churn |
| 2026-04-25 | Ưu tiên backend-first trước khi làm frontend | Giảm context switching, chốt API contract sớm |
| 2026-04-25 | Bỏ refresh token ở v1.0, chỉ dùng JWT_SECRET | Giảm độ phức tạp giai đoạn đầu, ship nhanh backend core |
