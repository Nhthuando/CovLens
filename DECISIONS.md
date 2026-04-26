# DECISIONS.md — Quyết định kiến trúc & kỹ thuật

> Ghi lại mọi quyết định quan trọng: tại sao chọn cái này thay vì cái kia.  
> Khi cần thay đổi → ghi vào đây thay vì chỉnh thẳng code mà không ghi chú.

---

## Template

```
### [Ngày] — [Tiêu đề quyết định]
**Vấn đề:** ...
**Các lựa chọn đã xem xét:** A, B, C
**Quyết định:** Chọn A
**Lý do:** ...
**Trade-off:** ...
```



---



## Quyết định đã chốt

### [2026-04-25] — Đơn giản hóa auth: chỉ dùng JWT_SECRET, không refresh token
**Vấn đề:** Flow access + refresh token làm tăng độ phức tạp ở giai đoạn đầu (rotate, blacklist, revoke)  
**Các lựa chọn đã xem xét:** Access + refresh token đầy đủ; chỉ dùng 1 JWT_SECRET với access token  
**Quyết định:** Chỉ dùng `JWT_SECRET` cho v1.0, không triển khai refresh token  
**Lý do:** Ưu tiên ship nhanh backend core, giảm số moving parts khi mới khởi tạo hệ thống auth  
**Trade-off:** UX đăng nhập kém mượt hơn (token hết hạn cần login lại), bảo mật phiên không linh hoạt bằng refresh flow

---

### [2026-04-25] — Chuẩn hóa cấu trúc thư mục theo client/server
**Vấn đề:** Tài liệu ban đầu dùng naming backend/frontend, nhưng workspace thực tế đã khởi tạo theo client/server  
**Các lựa chọn đã xem xét:** Đổi toàn bộ về backend/frontend; giữ client/server và cập nhật tài liệu liên quan  
**Quyết định:** Giữ client/server làm chuẩn cho toàn bộ dự án  
**Lý do:** Tránh churn do rename sớm, nhất quán với repo hiện tại, không ảnh hưởng kiến trúc tổng thể  
**Trade-off:** Cần map thuật ngữ khi đọc tài liệu cũ còn dùng backend/frontend

---

### [2026-04-25] — Ưu tiên hoàn thiện backend trước frontend
**Vấn đề:** Task setup ban đầu yêu cầu chạy song song backend + frontend, trong khi backend mới khởi tạo và còn nhiều hạng mục nền tảng  
**Các lựa chọn đã xem xét:** Làm song song backend/frontend; hoàn thiện backend trước rồi mới chuyển frontend  
**Quyết định:** Chọn chiến lược backend-first cho giai đoạn đầu dự án  
**Lý do:** Giảm context switching, chốt API contract sớm, giúp frontend triển khai nhanh và ít rework hơn  
**Trade-off:** Demo UI xuất hiện muộn hơn; cần cập nhật thứ tự task trong planning files cho nhất quán

---

### [Khởi đầu] — Chỉ support 2 ngôn ngữ: JavaScript và Python
**Vấn đề:** Support nhiều ngôn ngữ làm tăng scope quá lớn  
**Quyết định:** Chỉ làm JS + Python trong v1.0  
**Lý do:** tree-sitter support tốt cả 2, ecosystem testing mature, dễ demo  
**Trade-off:** Không support Java/TypeScript → có thể mở rộng sau

---

### [Khởi đầu] — Dùng Groq API thay vì self-trained model
**Vấn đề:** Cần AI generate unit test cho uncovered code  
**Các lựa chọn:** Groq API, HuggingFace Inference API, self-trained model  
**Quyết định:** Groq API với llama-3.3-70b-versatile  
**Lý do:** Free tier đủ dùng, latency thấp, chất lượng output tốt, có kinh nghiệm từ SAM Editor  
**Trade-off:** Phụ thuộc vào third-party API, có rate limit

---

### [Khởi đầu] — Dùng BullMQ + Redis cho async jobs
**Vấn đề:** Coverage runs có thể mất 30–60 giây, không thể block HTTP request  
**Quyết định:** BullMQ làm job queue, polling từ frontend  
**Lý do:** BullMQ mature, type-safe, retry built-in; polling đơn giản hơn WebSocket cho v1.0  
**Trade-off:** Cần thêm Redis; polling tạo thêm HTTP requests

---

### [Khởi đầu] — Phân tích từng file, không phải toàn bộ project
**Vấn đề:** Multi-file analysis cực kỳ phức tạp  
**Quyết định:** User chọn 1 file cụ thể để analyze  
**Lý do:** Đơn giản hóa scope, vẫn đủ để demo và impress  
**Trade-off:** Không reflect real-world usage hoàn toàn

---

### [Khởi đầu] — React Flow cho CFG visualization
**Vấn đề:** Cần render directed graph interactive trên browser  
**Các lựa chọn:** D3.js, React Flow, vis.js, Cytoscape.js  
**Quyết định:** React Flow  
**Lý do:** Layout algorithm có sẵn, TypeScript support tốt, API thân thiện với React, zoom/pan built-in  
**Trade-off:** Bundle size lớn hơn D3

---



## Quyết định đang cân nhắc

> Ghi vào đây khi chưa chốt

| Vấn đề | Đang xem xét | Deadline quyết định |
|---------|-------------|-------------------|
| Dùng SQLite (dev) hay Postgres ngay từ đầu? | SQLite dev → Postgres prod | Trước task 1.2 |
| Deploy: Railway vs Render vs Fly.io? | Cả 3 đều free tier | Trước Phase 5 |

