# So sánh giữa NestJS và Express
## Cấu trúc và tổ chức mã nguồn
- Express: Không áp đặt cấu trúc, nhà phát triển tự quyết định tổ chức
- NestJS: Áp đặt cấu trúc rõ ràng với controllers, providers, modules
## TypeScript
- Express: cần phải tự cấu hình thêm để dùng typescript
- NestJS: Được xây dựng với TypeScript từ đầu, tận dụng tối đa các tính năng của TypeScript
## Dependency Injection
- Express: Không có sẵn, cần thư viện bên thứ ba
- NestJS: Có hệ thống DI tích hợp sẵn
##  Middleware và xử lý request
- Express: Hệ thống middleware đơn giản
- NestJS: Mở rộng middleware và thêm Guards, Interceptors, Pipes, Exception filters
## Khả năng mở rộng và bảo trì
- Express: đơn giản và linh hoạt, nhưng có thể dẫn đến mã nguồn khó bảo trì trong các dự án lớn nếu không có cấu trúc rõ ràng.
- NestJS cung cấp cấu trúc và quy ước giúp các dự án lớn dễ bảo trì và mở rộng. 


# Sự khác nhau giữa Provider và Controller?
- Khi có một request, controller sẽ lấy các dữ liệu, tham số từ request như param, querry, header... sau đó chuyển sang cho provider  
- Provider sẽ xử lý request dựa trên các tham số được truyền từ controller bằng các logic nghiệp vụ
- Quy trình này tương tự như việc controller đóng vai là một "người bồi bàn", tiếp nhận các yêu cầu của khách hàng và chuyển nó đến provider - " người đầu bếp"

- Như vậy sự khác nhau giữa Provider và Controller nằm ở chức năng của bọn chúng, provider thì đảm nhận việc tương tác với database và xử lý các tác vụ, logic còn controller đảm nhận việc nhận request, truyền các dữ liệu của request đến provider và sau đó phản hồi.  

# Dependency Injection là gì và làm backend có cần thiết phải có không hay Nestjs đang dư thừa?
## Dependency Injection là gì?
- Dependency Injection: giống như nghĩa của nó, đó là một designed partten giúp chúng ta tiêm một đối tượng khác vào một class ( thường dùng để làm thuộc tính )

## Giả sử khi không dùng DI
- Khi ta muốn kiểm thử một class, nó sẽ trực tiếp tạo ra một đối tượng thực trong database dẫn đến việc kiểm thử sẽ chậm, khó tạo ra các tình huống đặc biệt như lỗi ...,
- Điều trên dẫn đến việc liên quan đến nhiều thành phần khác nên nó không thực sự là một unit test.

** Nếu khi dùng DI, ta có thể kiểm thử với mockData, song NestJs cũng có các công cụ hỗ trợ chúng ta thực hiện kiểm thử dễ dàng như @nestjs/testing"

## Tóm lại 
Dependency Injection giúp dễ dàng kiểm thử vì nó cho phép:
- Cô lập thành phần cần test khỏi các dependency (ta có thể dễ dàng thay thế các dependency thành các đối tượng giả)
- Giả lập các tình huống khó tạo ra với dependency thật (tương tự như trên, ta có thể dùng các đối tượng giả)
- Tạo test nhanh, ổn định và đáng tin cậy (không cần phải kết nối database, chờ thòi gian phản hồi)

# Middlewares trong Nextjs khác gì Guards, Interceptors, Pipes, Exception filters?
- Các phần đã nêu trong câu hỏi trên đều có vai trò, thời điểm thực thi riêng khi xử lý các request/response.
## Đầu tiên về thứ tự thực thi
Request → Middleware → Guards → Interceptors (trước) → Pipes → Controller → Interceptors (sau) → Response

Nếu có exception: → Exception Filters → Response

## Khả năng tích hợp với Dependency Injection
- Middlewares có khả năng tích hợp DI hạn chế: Do được khởi tạo từ rất sớm, trước khi container DI giải quyết các dependency
- Ngược lại các thành phần khác lại có thể tích hợp đầy đủ với hệ thống DI của NestJS

## Khả năng truy cập context
- Middlewares trong NextJs được kế thừa từ Express.js nên có khả năng truy cập rất hạn chế (chỉ truy cập được 3 tham số req, res, next )
- Ngược lại các thành phần khác đều có quyền truy cập đến các thông tin về handler được gọi của request. Như vậy các thành phần này sẽ biết được thêm ( route nào sẽ xử lý request, truy cập  truy cập metadata từ decorators ...)

## Ưu điểm của middlewares so với phần còn lại
- Có thể xử lý các route chưa được định nghĩa.
- Có khả năng chặn request hoàn toàn và ngay lập tức. Giúp xử lý các truy cập không hợp lệ 