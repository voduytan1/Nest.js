# So sánh giữa NestJS và Express
## Cấu trúc và tổ chức mã nguồn
- Express: Không áp đặt cấu trúc, nhà phát triển tự quyết định tổ chức
- NestJS: Áp đặt cấu trúc rõ ràng với controllers, providers, modules
## TypeScript
- Express: cần phải tự cấu hình thêm để dùng typescript
- NestJS: Được xây dựng với TypeScript từ đầu, tận dụng tối đa các tính năng của TypeScript
## Dependency Injection
- Express: Không có sẵn, cần thư viện bên thứ ba
- NestJS: Có hệ thống DI mạnh mẽ tích hợp sẵn
##  Middleware và xử lý request
- Express: Hệ thống middleware đơn giản
- NestJS: Mở rộng middleware và thêm Guards, Interceptors, Pipes, Exception filters
## Khả năng mở rộng và bảo trì
- Express: đơn giản và linh hoạt, nhưng có thể dẫn đến mã nguồn khó bảo trì trong các dự án lớn nếu không có cấu trúc rõ ràng.
- NestJS cung cấp cấu trúc và quy ước giúp các dự án lớn dễ bảo trì và mở rộng. 