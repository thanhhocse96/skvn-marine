# Explain For 5 Years Old

## Status

UI test hiện tại: **FAIL / chưa đạt visual**.

Lý do: trang test đã có code và component, nhưng hình nhìn trong browser chưa giống reference. Nó vẫn bị ảnh hưởng bởi layout mặc định của WordPress/GeneratePress ở runtime, và chưa được kiểm bằng screenshot chuẩn desktop/mobile.

File này ghi lại đã làm gì, tại sao làm vậy, và cái gì còn phải sửa.

---

## Nói đơn giản

Hãy tưởng tượng website là một cái hộp đồ chơi.

- WordPress là cái bàn để bày đồ chơi.
- GeneratePress là cái khung bàn có sẵn.
- `skvn-marine` là bộ màu, miếng dán, và cách sắp đồ chơi riêng của mình.
- Pattern là các cụm đồ chơi đã ráp sẵn để sau này đặt vào trang nhanh hơn.

Phase này chưa phải làm trang chủ hoàn chỉnh. Phase này là làm mấy miếng Lego nền trước:

- màu chính,
- nút,
- card,
- section,
- trust strip,
- newsletter band.

Nhưng khi đem mấy miếng đó đặt thử lên bàn WordPress, cái bàn vẫn còn đồ mặc định như sidebar, title, widget. Vì vậy nhìn không giống reference.

---

## Đã Làm Được Gì

### 1. Design tokens

File:

```text
wp-content/themes/skvn-marine/theme.json
wp-content/themes/skvn-marine/style.css
```

Đã tạo màu nền tảng cho SKVN:

```text
skvn-blue-950
skvn-blue-900
skvn-blue-700
skvn-teal-600
skvn-sky-50
skvn-slate-700
skvn-white
```

Tại sao làm:

Website cần một bộ màu chung. Nếu không có token, mỗi section sẽ tự chọn màu lung tung, sau này sửa rất cực.

### 2. Layout CSS cơ bản

File:

```text
wp-content/themes/skvn-marine/style.css
```

Đã thêm class nền:

```text
skvn-container
skvn-section
skvn-button
skvn-button--primary
skvn-card
skvn-site-header
skvn-site-footer
```

Tại sao làm:

Các pattern cần ngôn ngữ chung. Section nào cũng phải biết container rộng bao nhiêu, nút bo góc ra sao, card có shadow thế nào.

### 3. Block styles

File:

```text
wp-content/themes/skvn-marine/inc/block-styles.php
```

Đã register style:

```text
SKVN Primary button
SKVN Section group
SKVN Card group
SKVN Rounded Media image
```

Tại sao làm:

Để trong editor có thể chọn style cho core block mà không cần custom block riêng.

### 4. Starter pattern

File:

```text
wp-content/themes/skvn-marine/patterns/section-intro.php
```

Pattern này là section đơn giản gồm heading + paragraph.

Tại sao làm:

Nó là viên gạch nhỏ nhất để test spacing, typography, section wrapper.

### 5. Trust feature strip

File:

```text
wp-content/themes/skvn-marine/patterns/trust-strip.php
```

Pattern có 4 item:

```text
Fresh from the Coast
Clear Origin
Export Packaging
Quality Checked
```

Tại sao làm:

Reference có dải lợi ích/tin cậy nằm gần footer hoặc dưới hero. Đây là phần dùng lại nhiều, nên làm thành pattern.

### 6. Newsletter signup band

File:

```text
wp-content/themes/skvn-marine/patterns/newsletter-band.php
```

Pattern có:

```text
Title
Description
CTA button
Replaceable Image block
```

Không có custom form handler.

Tại sao làm:

Theo protocol, theme không tự xử lý form. Nếu sau này cần submit thật thì dùng CF7 hoặc form plugin đúng scope.

Image dùng core Image block để user thay ảnh trong editor được.

---

## Đã Test Gì

### Có test pass

File:

```text
tests/theme-baseline.test.mjs
```

Test này kiểm tra:

```text
theme.json có màu cần thiết
không dùng font size clamp/vw
style.css có class nền
block-styles.php có register style
pattern files tồn tại
trust strip có 4 item
newsletter có image block
newsletter không có form handler custom
```

Ý nghĩa:

Đây là **structure/smoke test**. Nó chứng minh file có đúng contract cơ bản.

Nó **không chứng minh UI nhìn đúng**.

### PHP syntax pass

Đã từng chạy `php -l` cho:

```text
functions.php
block-styles.php
section-intro.php
trust-strip.php
newsletter-band.php
```

Ý nghĩa:

PHP không bị lỗi cú pháp.

Nó **không chứng minh UI đẹp**.

---

## Cái Gì Chưa Đạt

### 1. UI test page chưa đạt

Trang:

```text
http://localhost:8080/pattern-ui-test-0-2-0/
```

Tình trạng:

```text
FAIL visual
```

Lý do:

```text
Page ban đầu còn default GeneratePress title
Page ban đầu còn sidebar/widgets
Layout không phải full-width test surface
Chưa có screenshot desktop/mobile làm bằng chứng
Chưa match reference cụ thể
```

### 2. Test hiện tại chưa phải visual regression

Test Node hiện tại chỉ đọc file.

Nó không mở browser, không chụp screenshot, không so bố cục.

Vì vậy không được gọi là UI pass.

### 3. Header/footer chưa xong

Trong milestone 0.2.0, header/footer vẫn chưa done.

Vì vậy nếu page test trông chưa giống một site thật thì đúng. Nó mới là test component, chưa phải homepage hoàn chỉnh.

---

## Vì Sao Làm Theo Cách Này

### Không tạo custom block

Protocol nói V1 ưu tiên:

```text
Core Gutenberg blocks
Theme patterns
Theme CSS
WooCommerce native blocks
```

Nên trust strip và newsletter được làm bằng pattern trước.

Lý do:

Nếu tạo custom block sớm, sẽ tăng logic, tăng build/test, tăng rủi ro. Pattern đủ cho visual section đơn giản.

### Không làm form handler trong newsletter

Protocol cấm custom-code quote/form handler trong theme.

Nên newsletter band chỉ có CTA placeholder.

Khi cần form thật, dùng CF7 hoặc form stack đã quyết định.

### Không sửa GeneratePress parent

Protocol cấm sửa parent theme.

Mọi thay đổi nằm trong:

```text
wp-content/themes/skvn-marine/
```

---

## Quy Tắc Test Đúng Từ Giờ

Một UI test chỉ được coi là pass khi có đủ:

```text
[ ] Page no-sidebar
[ ] Page full-width content
[ ] Default page title hidden nếu đang test custom hero
[ ] Không có Search widget
[ ] Không có Recent Posts
[ ] Không có Recent Comments
[ ] Desktop screenshot checked
[ ] Mobile screenshot checked
[ ] So với reference cụ thể
[ ] Ghi rõ phần giống và phần khác
```

Nếu thiếu screenshot:

```text
Không được gọi là UI pass.
Chỉ được gọi là smoke pass.
```

---

## Hướng Làm Tiếp

Khi tiếp tục phase 0.2.0, thứ tự nên là:

```text
1. Fix test page layout: full-width, no-sidebar, no default title.
2. Chọn một reference duy nhất cho lần test đó.
3. Dựng hero + trust strip + newsletter trong cùng visual direction.
4. Chụp desktop screenshot.
5. Chụp mobile screenshot.
6. Nếu đạt mới tick homepage test page.
```

Không nên tick thêm visual acceptance chỉ bằng code/file test.

---

## Current Milestone Note

Milestone 0.2.0 hiện có các mục đã tick:

```text
Theme tokens reviewed/refined
theme.json reviewed/refined
Base typography/layout implemented
Block styles implemented
Starter patterns implemented
Trust feature strip reusable pattern implemented
Newsletter signup band reusable pattern implemented
```

Nhưng cần hiểu đúng:

```text
Các mục này đã pass mức code/structure.
Chưa pass mức visual UI.
```

UI test page hiện tại phải được xem là:

```text
Created, but visual failed.
Needs redesign/retest when human is ready.
```
