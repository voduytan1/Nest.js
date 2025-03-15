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


# Sự khác nhau giữa provider và Controller?
## Chức năng chính: 
- Provider: Xử lý logic nghiệp vụ, ương tác với cơ sở dữ liệu, thực hiện các tác vụ phức tạp.
- Controller: Xử lý HTTP request, định tuyến, và trả về response
## Trách nhiệm:
- Provider: "Cung cấp" các dịch vụ và chức năng
- Controller: "Điều khiển" luồng request và response
## Vị trí trong kiến trúc:
- Provider: Lớp trung gian hoặc lớp trong, không tiếp xúc trực tiếp với client
- Controller: Lớp ngoài cùng, tiếp xúc trực tiếp với client

** Tóm lại Controller có trách nhiệm như "Người bồi bàn". Còn Provider giống như "Người đầu bếp" **

# Dependency Injection là gì và làm backend có cần thiết phải có không hay Nestjs đang dư thừa?
## Dependency Injection là gì?
- Dependency Injection (Tiêm phụ thuộc) là một mẫu thiết kế (design pattern) trong lập trình, được sử dụng để quản lý các phụ thuộc (dependencies) giữa các thành phần trong ứng dụng. Thay vì một lớp tự tạo ra các đối tượng mà nó cần (dependencies), những đối tượng này sẽ được "tiêm" vào lớp đó từ bên ngoài vào
- ví dụ: 

`// Không sử dụng DI`
`class UserService {`
`  private database = new Database(); // Tự tạo dependency`
  
`  getUsers() {`
`    return this.database.query('SELECT * FROM users');`
`  }`
`}`

`// Sử dụng DI`
`class UserService {`
`  constructor(private database: Database) {} // Nhận dependency từ bên ngoài`
  
`  getUsers() {`
`    return this.database.query('SELECT * FROM users');`
`  }`
`}`

## Giả sử khi không dùng DI
- Khi ta muốn kiểm thử một class, nó sẽ trực tiếp tạo ra một đối tượng thực trong database dẫn đến việc kiểm thử sẽ chậm, khó tạo ra các tình huống đặc biệt như lỗi ...,
- Điều trên dẫn đến việc liên quan đến nhiều thành phần khác nên nó không thực sự là một unit test.

** Nếu khi dùng DI, ta có thể kiểm thử với mockData, song NestJs cũng có các công cụ hỗ trợ chúng ta thực hiện kiểm thử dễ dàng"

## Tóm lại 
Dependency Injection giúp dễ dàng kiểm thử vì nó cho phép:
- Cô lập thành phần cần test khỏi các dependency
- Kiểm soát đầu vào/đầu ra của các dependency
- Giả lập các tình huống khó tạo ra với dependency thật
- Tạo test nhanh, ổn định và đáng tin cậy

# Middlewares trong Nextjs khác gì Guards, Interceptors, Pipes, Exception filters?
- Các phần đã nêu trong câu hỏi trên đều có vai trò, thời điểm thực thi riêng khi xử lý các request/response.
## Đầu tiên về thứ tự thực thi
Request → Middleware → Guards → Interceptors (trước) → Pipes → Controller → Interceptors (sau) → Response

Nếu có exception: → Exception Filters → Response

Ví dụ cho dễ hiểu:
- Middlewares: Nhân viên tiếp tân/bảo vệ kiểm tra, lấy thông tin cơ bản của khách hàng
- Guards: Nhân viên kiểm tra đặt bàn/thẻ thành viên (quyết định có cho vào hay không)
- Interceptors: Quản lý nhà hàng theo dõi trải nghiệm, ghi lại thời gian phục vụ
- Pipes: Bếp trưởng kiểm tra nguyên liệu, yêu cầu đặc biệt của khách
- Controller: Đầu bếp nấu món theo yêu cầu
- Exception Filters: Nhân viên xử lý/Quản lý cửa hàng khiếu nại khi có sự cố

## Khả năng tích hợp với Dependency Injection
- Middlewares có khả năng tích DI hạn chế
- Ngược lại các thành phần khác lại có thể tích hợp đầy đủ với hệ thống DI của NestJS

## Khả năng truy cập context
- Middlewares trong NextJs được kế thừa từ Express.js nên có khả năng truy cập rất hạn chế (chỉ truy cập được 3 tham số req, res, next )
- Ngược lại các thành phần khác đều có quyền truy cập đến ExecutionContext - một lớp trừu tượng cung cấp truy cập đầy đủ về ngữ cảnh của request. Như vậy các thành phần này sẽ biết được thêm ( route nào sẽ xử lý request, truy cập  truy cập metadata từ decorators ...)