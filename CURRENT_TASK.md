# CURRENT_TASK.md

> File này chứa task đang làm. Cập nhật mỗi khi chuyển sang task mới.  
> AI Copilot đọc file này để biết chính xác bạn đang làm gì.

---

## Task hiện tại

**Task ID:** 1.6  
**Tên:** GitHub OAuth2 callback flow  
**Phase:** 1 — Project Setup & Auth  
**Ước tính:** 4–6 giờ  
**Bắt đầu lúc:** 2026-04-26

---

## Mô tả

Tích hợp đăng nhập GitHub OAuth2 vào backend, tạo user nếu chưa tồn tại và trả JWT cho frontend callback flow.

---

## Yêu cầu cụ thể

1. Cài và cấu hình passport + passport-github2 + express-session
2. Tạo GitHub OAuth app, thêm GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL vào env
3. Tạo route GET /auth/github để redirect người dùng qua GitHub
4. Tạo route GET /auth/github/callback để nhận code từ GitHub
5. Trong callback: lấy profile, upsert user theo githubId/email
6. Generate JWT_SECRET token sau khi auth thành công
7. Redirect về frontend với token hoặc trả JSON tạm cho backend-only test
8. Xử lý case lỗi OAuth (deny permission, callback fail)

---

## Steps

1. Setup passport strategy trong server/src/config hoặc server/src/services
2. Khai báo serialize/deserialize user tối thiểu
3. Viết routes github start + callback
4. Viết service xử lý tìm/tạo user từ profile GitHub
5. Test flow end-to-end bằng browser

---

## Definition of Done (DoD)

Bạn hoàn thành task này khi tất cả các điều sau đều đúng:

- [ ] GET /auth/github redirect đúng sang màn hình GitHub authorize
- [ ] Callback thành công tạo hoặc cập nhật user githubId
- [ ] Callback trả về JWT hợp lệ
- [ ] Callback fail trả lỗi rõ ràng, không crash server
- [ ] Không lộ client secret/token nội bộ trong response log

---

## Ghi chú / Blockers

- Quyết định kiến trúc: auth v1.0 chỉ dùng JWT_SECRET, bỏ refresh token
- Ưu tiên backend-first, chưa triển khai task frontend

---

## Khi xong: báo copilot bằng lệnh `/done`

Paste output sau vào chat:
1. URL redirect của /auth/github
2. Output callback success (payload rút gọn)
3. Output callback fail (nếu test được)
