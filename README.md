# NUS SDS Datathon 2026

Website sự kiện bằng tiếng Anh, xây dựng với Next.js App Router, React, TypeScript strict và Tailwind CSS. Nội dung giữ nguyên các mốc lịch sử năm 2026; đăng ký mặc định không khả dụng. Không cần API key, tài khoản cloud hay dịch vụ ngoài để chạy.

## Chạy trên máy

Sử dụng **Node.js 24 LTS**, bản đã kiểm tra **24.20.0**, và **npm 11.19.0**. Nếu dùng nvm:

```bash
nvm install
nvm use
npm ci
npm run dev
```

Mở http://localhost:3000. Nếu đã có Node.js 24, chỉ cần hai lệnh npm.

## Các lệnh

| Lệnh | Chức năng |
| --- | --- |
| `npm run dev` | Chạy môi trường phát triển |
| `npm run build` | Build production, không tải font từ xa |
| `npm run start` | Chạy production sau khi build |
| `npm run lint` | ESLint; cảnh báo cũng làm kiểm tra thất bại |
| `npm run typecheck` | Sinh kiểu route và kiểm tra TypeScript strict |
| `npm test` | Kiểm tra trạng thái CTA, URL an toàn và ngày theo múi giờ bằng test runner có sẵn của Node.js |

Để kiểm tra và chạy bản production:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run start
```

## Cấu trúc chính

```text
src/app/                    Route /, layout, metadata, CSS và trang 404
src/components/layout/      Header, footer và menu di động
src/components/ui/          Container và tiêu đề section dùng chung
src/features/event/         Cấu hình, kiểu dữ liệu, logic đăng ký, test và các section
public/images/              Logo dùng trong website
docs/                       Kiến trúc, hướng dẫn nội dung và roadmap
References/                 Ảnh gốc người dùng cung cấp, được giữ nguyên
```

## Chỉnh nội dung và đăng ký

Chỉnh **`src/features/event/config.ts`** để đổi nội dung, ngày, nơi tổ chức, giải thưởng, email, Instagram hoặc đường dẫn logo. Ngày dùng định dạng `YYYY-MM-DD`, không thêm giờ. FAQ về ngày và timeline dùng chung các giá trị ngày. Đọc [hướng dẫn chỉnh sửa](docs/content-editing.md) để biết từng trường.

Đăng ký dùng hai trường trong cùng file:

```ts
registrationUrl: null,
registrationStatus: "unavailable",
```

Khi có URL đã xác minh, điền URL tuyệt đối bắt đầu bằng `https://` hoặc `http://`, rồi đổi trạng thái thành `"open"`. Ví dụ dưới đây chỉ minh họa, phải thay bằng URL thực:

```ts
registrationUrl: "https://example.com/your-registration-form",
registrationStatus: "open",
```

Đóng đăng ký bằng `registrationStatus: "closed"`. Trạng thái đóng luôn ưu tiên; URL thiếu hoặc không hợp lệ luôn vô hiệu hóa CTA. Tất cả CTA dùng `RegistrationCTA`, link hoạt động mở tab mới và có thông báo cho trình đọc màn hình. **Không tự đổi trạng thái theo ngày hiện tại.** Trong production cần build lại sau khi sửa cấu hình.

Màu, font hệ thống, spacing và radius nằm ở đầu **`src/app/globals.css`**. Logo production là **`public/images/sds-logo.jpg`**, được sao chép nguyên bản từ `References/sds_logo.jpg`. Khi thay logo, cập nhật cả đường dẫn, kích thước và alt text trong cấu hình; giữ tỷ lệ gốc và đặt logo có nền trắng trên nền sáng.

## Phạm vi và triển khai sau này

Đã có landing page, menu di động, CTA, FAQ native, trang 404, title/description/Open Graph dạng văn bản và hỗ trợ reduced motion. Phần lớn giao diện là Server Components; chỉ menu di động cần Client Component.

Chưa có authentication, database, form đăng ký nội bộ, dashboard, chat, quản lý đội hoặc Team Finder. Xem [kiến trúc](docs/architecture.md) và [roadmap](docs/roadmap.md).

Chưa chọn domain hoặc dịch vụ hosting. Khi có domain, thêm `metadataBase`, canonical và URL Open Graph thực trong `src/app/layout.tsx`; chỉ thêm ảnh social preview khi có asset được duyệt. Không có URL production giả.

## Phiên bản và lưu ý dependency

Phiên bản được ghim và lưu trong `package-lock.json`: Next.js 16.4.0, React 19.3.0, Tailwind CSS 4.3.3, TypeScript 5.9.3, ESLint 9.39.5. Thiết lập theo tài liệu chính thức của [Next.js](https://nextjs.org/docs/app/getting-started/installation), [ESLint cho Next.js](https://nextjs.org/docs/app/api-reference/config/eslint), [Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs) và [Node.js LTS](https://nodejs.org/en/about/previous-releases).

ESLint 9 đã hết hỗ trợ, nhưng là major tương thích với các plugin React, import và accessibility hiện được `eslint-config-next@16.4.0` sử dụng. Không ép các peer dependency lên ESLint 10. Kiểm tra lại khả năng nâng cấp khi Next.js cập nhật bộ plugin.

Ngày 12 October 2026, `npm audit --omit=dev` không báo lỗ hổng. Audit đầy đủ báo 5 mục high, cùng bắt nguồn từ dependency `braces` trong chuỗi công cụ lint. [Advisory GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) chưa có bản vá. Mẫu glob trong dự án là nội bộ; website không đưa input từ khách truy cập vào công cụ này. Giữ cấu hình lint tương thích, không chạy `npm audit fix --force` để hạ Next.js config về major cũ. Kiểm tra lại vào **12 November 2026** hoặc trước khi triển khai, tùy mốc nào đến trước.

Ảnh poster chưa được cung cấp. Nội dung sự kiện dùng các dữ kiện trong `Prompt.txt`; nguồn bài đăng được lưu trong cấu hình để đối chiếu thủ công sau này.

## Kết quả kiểm tra bản đầu tiên

Ngày 12 October 2026:

- Cài sạch bằng `npm ci` thành công; không có peer dependency không hợp lệ.
- `npm test`: 5 test đạt, gồm các tổ hợp trạng thái/URL đăng ký và ngày ở ba múi giờ.
- Lint không có lỗi/cảnh báo; typecheck strict và production build đạt. Route `/` được prerender tĩnh.
- Chromium: kiểm tra 320, 390, 768, 1024 và 1440px; ảnh tải được, không tràn ngang, không có lỗi console hoặc request thất bại trên trang chính.
- Kiểm tra skip link, Tab/Enter, Escape và trả focus cho menu, anchor navigation, đóng menu khi đổi sang desktop, FAQ bằng bàn phím, CTA mặc định bị vô hiệu hóa và trang 404 với link quay về.
- Axe kiểm tra các nhóm WCAG 2 A/AA và 2.1 AA: không phát hiện lỗi ở các chiều rộng trên, kể cả menu mở và FAQ mở. Đây là kiểm tra tự động, chưa phải đánh giá đầy đủ bằng trình đọc màn hình.
- Đã mở cả hai website tham khảo bằng Chromium. Công cụ kiểm tra browser được cài ngoài dự án, không thêm dependency chạy ứng dụng.

Chưa kiểm tra Firefox/Safari hoặc thiết bị di động thật; chưa kiểm tra form đăng ký thực vì chưa có URL; chưa triển khai website.
