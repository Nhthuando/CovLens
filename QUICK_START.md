# QUICK_START.md — Cách dùng hệ thống Copilot này

## Bắt đầu session mới với AI Copilot

### Bước 1: Copy đoạn này vào chat với AI

```
Bạn là PM và mentor của tôi trong dự án TestCovAI. 
Đọc các file sau theo thứ tự và bắt đầu session:

--- COPILOT.md ---

--- PROJECT.md ---

--- PROGRESS.md ---

--- CURRENT_TASK.md ---

```

### Bước 2: Đợi AI xác nhận đã đọc và tóm tắt trạng thái

### Bước 3: Làm việc bình thường

---

## Các lệnh hay dùng

### Báo xong task
```
/done

Tôi đã hoàn thành task 1.1. Đây là kết quả:
[paste tree output hoặc screenshot]
[paste output của curl test]
```

### Bị stuck
```
/stuck

Tôi đang bị stuck ở [mô tả vấn đề].
Tôi đã thử: [những gì đã thử]
Lỗi gặp phải: [error message]
```

### Hỏi concept
```
/explain tree-sitter AST traversal
```

### Nhờ review code
```
/review

[paste code cần review]
```

### Xem task tiếp theo
```
/next
```

---

## Cập nhật PROGRESS.md sau khi xong task

Khi AI báo task hoàn thành và cần cập nhật, làm theo:
1. Mở file `.ai/PROGRESS.md`
2. Thay `⬜` thành `✅` cho task vừa xong
3. Cập nhật "Task hiện tại" và "Tuần hiện tại"
4. Copy nội dung CURRENT_TASK.md mới từ AI paste vào file

---

## Tips

- **Mỗi session nên paste lại 4 file** — AI không nhớ giữa các chat
- **CURRENT_TASK.md là quan trọng nhất** — cập nhật ngay khi chuyển task
- **Nếu AI hỏi "bạn đang làm đến đâu"** → nghĩa là bạn quên paste PROGRESS.md
- **Nếu AI overwhelm bạn với quá nhiều thứ** → gõ "làm từng bước một thôi"
- **Nếu AI đưa code hoàn chỉnh ngay** → nhắc "mentor mode, hướng dẫn tôi tự làm"

---

## File structure của `.ai/`

```
.ai/
├── QUICK_START.md     ← File này — đọc đầu tiên
├── COPILOT.md         ← Vai trò và quy tắc của AI
├── PROJECT.md         ← Toàn bộ context dự án (không đổi nhiều)
├── PROGRESS.md        ← Tiến độ (cập nhật thường xuyên)
├── CURRENT_TASK.md    ← Task đang làm (cập nhật mỗi task)
├── DECISIONS.md       ← Log quyết định kiến trúc
└── TECH_NOTES.md      ← Ghi chú kỹ thuật, snippets đã verify
```
