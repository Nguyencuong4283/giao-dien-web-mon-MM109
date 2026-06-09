# Giao Diện Web Giới Thiệu Trường Đại Học Công Nghệ Thông Tin (UIT)
### Bài tập thực hành môn: MM109

Trang web giới thiệu về Trường Đại học Công nghệ Thông tin - ĐHQG-HCM được thiết kế với giao diện Dark Mode hiện đại, tối ưu hóa hiển thị, hiệu ứng chuyển động mượt mà và tương thích tốt trên cả máy tính lẫn thiết bị di động.

---

## 🚀 Hướng Dẫn Chạy Trang Web (Cho Người Không Biết Code)

Bạn không cần biết lập trình hay cài đặt các công cụ phức tạp để xem trang web này. Dưới đây là 3 cách đơn giản để chạy web:

### Cách 1: Mở trực tiếp bằng trình duyệt (Nhanh & Dễ nhất)
* **Bước 1:** Tải thư mục này về máy tính của bạn và giải nén (nếu tải dạng file `.zip`).
* **Bước 2:** Tìm tệp tin có tên là **`index.html`** (có biểu tượng trình duyệt web của bạn).
* **Bước 3:** **Nhấp đúp chuột** (double-click) vào tệp **`index.html`** đó.
* **Bước 4:** Trang web sẽ ngay lập tức được mở ra trên trình duyệt web mặc định của bạn (như Google Chrome, Cốc Cốc, Safari, Edge) để bạn trải nghiệm.

---

### Cách 2: Mở thông qua ứng dụng VS Code (Dành cho học tập)
Nếu bạn có cài đặt ứng dụng lập trình **Visual Studio Code (VS Code)**:
* **Bước 1:** Mở VS Code lên, chọn **File** -> **Open Folder** và chọn thư mục chứa dự án này.
* **Bước 2:** Cài đặt Extension có tên là **Live Server** (tìm kiếm trong mục Extensions bên lề trái VS Code).
* **Bước 3:** Nhấp chuột phải vào tệp **`index.html`** trong danh sách tệp của VS Code và chọn **Open with Live Server**.
* **Bước 4:** Trang web sẽ tự động mở trên trình duyệt web và tự động cập nhật mỗi khi bạn chỉnh sửa nội dung.

---

### Cách 3: Chạy bằng dòng lệnh Python (Giống chạy web thật)
Nếu máy tính của bạn đã cài đặt sẵn ngôn ngữ **Python**:
* **Bước 1:** Mở ứng dụng **Terminal** (trên máy Mac) hoặc **Command Prompt (CMD)** (trên Windows).
* **Bước 2:** Di chuyển terminal đến thư mục chứa dự án này.
* **Bước 3:** Nhập dòng lệnh sau và nhấn Enter:
  ```bash
  python3 -m http.server 8080
  ```
  *(Trên Windows có thể thay `python3` bằng `python`)*
* **Bước 4:** Mở trình duyệt web bất kỳ và truy cập vào địa chỉ: **[http://localhost:8080](http://localhost:8080)** để xem trang web.

---

## 📂 Danh Sách Các Tệp Tin Trong Thư Mục

* **`index.html`:** Tệp tin chính chứa bố cục, văn bản và liên kết bản đồ, tin tức của trang web.
* **`styles.css`:** Tệp tin định dạng màu sắc, giao diện (Dark-mode), font chữ và các chuyển động đẹp mắt.
* **`script.js`:** Tệp tin lập trình các chức năng như: đếm số tự động, chuyển đổi thông tin giữa các Khoa, bộ lọc phân loại tin tức.
* **`logo_converted.png` / `logo_anniversary_converted.png`:** Các hình ảnh logo chính thức của trường và huy hiệu kỷ niệm 20 năm thành lập.
* **`campus_real.jpg` / `vision_mission.jpg` / `scholarship_news.jpg`:** Các hình ảnh thực tế được tải trực tiếp từ website của trường.
