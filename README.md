# EventHub UI Demo

Ứng dụng di động mẫu xây dựng bằng Expo và React Native, mô phỏng luồng khởi động, giới thiệu ứng dụng, đăng nhập và đăng ký của **EventHub**.

## Tính năng hiện có

- Splash screen tự chuyển tiếp sau 2,5 giây hoặc khi người dùng chạm vào màn hình.
- Ba màn hình onboarding, có nút **Skip**, **Next** và **Start**.
- Màn hình đăng nhập với email, mật khẩu, ghi nhớ đăng nhập và liên kết sang đăng ký.
- Màn hình đăng ký với kiểm tra thông tin cơ bản và quay lại đăng nhập sau khi đăng ký thành công.
- Các nút Google/Facebook hiện mới là giao diện minh hoạ; chưa kết nối dịch vụ xác thực.

## Công nghệ

- Expo
- React 19
- React Native
- `@expo/vector-icons`

## Yêu cầu

- Node.js (khuyến nghị bản LTS)
- npm
- Expo Go trên thiết bị thật, hoặc Android Emulator / iOS Simulator để chạy ứng dụng di động

## Cài đặt và chạy

```bash
npm install
npm start
```

Sau khi Expo khởi động, chọn một trong các cách sau:

```bash
# Mở trên Android
npm run android

# Mở trên iOS (macOS)
npm run ios

# Mở trên trình duyệt
npm run web
```

Bạn cũng có thể quét mã QR mà Expo hiển thị bằng ứng dụng Expo Go.

## Luồng màn hình

```text
Splash → Onboarding 1 → Onboarding 2 → Onboarding 3 → Đăng nhập
                  └──────────── Skip ───────────────────────────┘

Đăng nhập ⇄ Đăng ký
```

Việc chuyển màn hình hiện được quản lý trực tiếp trong `App.js` bằng state cục bộ, chưa sử dụng thư viện điều hướng.

## Cấu trúc thư mục

```text
.
├── App.js                    # Điều phối luồng các màn hình
├── index.js                  # Điểm khởi động Expo
├── app.json                  # Cấu hình Expo
├── assets/                   # Icon và splash icon của ứng dụng
└── src/
    ├── assets/image/         # Ảnh minh hoạ cho các màn hình
    └── screens/
        ├── SplashScreen.js
        ├── Onboarding1Screen.js
        ├── Onboarding2Screen.js
        ├── Onboarding3Screen.js
        ├── SignInScreen.js
        └── SignUpScreen.js
```

## Lưu ý

Đây là bản demo giao diện. Đăng nhập, đăng ký, quên mật khẩu và đăng nhập qua mạng xã hội chưa gọi API hay lưu trữ dữ liệu người dùng.
