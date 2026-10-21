# NUS SDS Datathon 2026

Website sự kiện bằng tiếng Anh, xây dựng với Next.js App Router, React, TypeScript strict và Tailwind CSS. Nội dung giữ nguyên các mốc lịch sử năm 2026; các nút đăng ký mở Google Form do người dùng cung cấp. Không cần API key, tài khoản cloud hay dịch vụ ngoài để chạy.

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

`npm run start` phục vụ bản production tại **http://localhost:3000**. Sau khi cập nhật và build lại, dừng server cũ bằng `Ctrl+C` rồi chạy lại `npm run start`; server đang chạy có thể giữ HTML của build cũ và yêu cầu các file CSS/JS không còn tồn tại. Bản thiết kế đã duyệt được cập nhật tại cổng 3000; đây là triển khai trên máy local.

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
registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdu4_BHd9Aua3wc7cBTvlvC2P0KJeHwNw_lZVO8UYO1ft-jYg/viewform",
registrationStatus: "open",
```

Khi thay form, điền URL tuyệt đối bắt đầu bằng `https://` hoặc `http://` và giữ trạng thái `"open"`. Vô hiệu hóa đăng ký bằng `registrationUrl: null` và `registrationStatus: "unavailable"`.

Đóng đăng ký bằng `registrationStatus: "closed"`. Trạng thái đóng luôn ưu tiên; URL thiếu hoặc không hợp lệ luôn vô hiệu hóa CTA. Tất cả CTA dùng `RegistrationCTA`, link hoạt động mở tab mới và có thông báo cho trình đọc màn hình. **Không tự đổi trạng thái theo ngày hiện tại.** Trong production cần build lại sau khi sửa cấu hình.

Màu, font, spacing và radius nằm ở đầu **`src/app/globals.css`**. Nút mặt trời/mặt trăng trên header đổi giữa theme sáng (nền trắng, chữ đen, highlight vàng như trước) và theme tối (nền xanh đen `#0A0D14` tham khảo [LifeHack 2026](https://lifehack2026.nuscomputing.com/), chữ trắng, các ô thông tin `#0D1118`). Mặc định là theme tối; lựa chọn được lưu trong localStorage và khôi phục trước khi trang hiển thị. Nếu trình duyệt chặn lưu trữ, nút vẫn đổi theme cho trang đang mở. Bảng màu nằm trong `:root` (tối) và `:root[data-theme="light"]` (sáng), với typography và khoảng trắng tham khảo [Notion](https://www.notion.com/). Font [Inter](https://rsms.me/inter/) được lưu tại **`public/fonts/InterVariable.woff2`**, kèm giấy phép **`public/fonts/Inter-LICENSE.txt`**; không tải font từ dịch vụ ngoài khi build hoặc xem trang. Logo production là **`public/images/sds-logo.jpg`**, được sao chép nguyên bản từ `References/sds_logo.jpg`. Khi thay logo, cập nhật cả đường dẫn, kích thước và alt text trong cấu hình; giữ tỷ lệ gốc và đặt logo có nền trắng trên nền sáng.

## Phạm vi và triển khai sau này

Đã có landing page, menu di động, CTA, FAQ mở/đóng mượt trong 300 ms, trang 404, title/description/Open Graph dạng văn bản và hỗ trợ reduced motion. Phần lớn giao diện là Server Components; header, menu di động và từng câu FAQ là Client Components. FAQ hỗ trợ Enter/Space, giữ mỗi câu mở độc lập và tắt hiệu ứng khi bật reduced motion. Khi tải lại trang, vị trí cuộn trở về đầu, kể cả URL có fragment; đường kẻ dưới header chỉ hiện khi cuộn xuống và ẩn lại ở đầu trang.

Test trình duyệt cho header, hiệu ứng gõ tiêu đề, đổi theme và FAQ nằm ở `tests/header-scroll.test.mjs`, `tests/hero-typing.test.mjs`, `tests/theme-toggle.test.mjs` và `tests/faq-animation.test.mjs`, chạy với server local tại cổng 3000 và Playwright/Chromium đã cài ngoài dự án: `NODE_PATH=/path/to/browser-tools/node_modules node --test tests/*.test.mjs`.

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

## Kiểm tra giao diện sau khi thiết kế lại

Ngày 12 October 2026: Chromium tại 320, 390, 768, 1024 và 1440px không tràn ngang; Inter local tải thành công, nền trắng và tiêu đề weight 650. Menu desktop nằm giữa viewport, logo và đăng ký cách hai mép 24px; hover và nhấn giữ có nền xám. Section padding giảm còn 32–48px; chiều dài trang ở 1440px giảm từ khoảng 4.493px xuống khoảng 3.001px. Dates, venue, eligibility và prizes có ô riêng với icon, viền và highlight vàng. Menu, FAQ, điều hướng anchor, skip link, bàn phím, CTA không khả dụng và trang 404 đều đạt. Axe không phát hiện lỗi WCAG 2 A/AA hoặc 2.1 AA, kể cả menu và FAQ mở; không có lỗi console hoặc request thất bại. Giữ nguyên các giới hạn kiểm tra trình duyệt và triển khai ở trên.
