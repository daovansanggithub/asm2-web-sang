// b1: lấy phần tử của trang cần làm
const formDangKi = document.getElementById("formRegister");

//b2 : lấy phần tử từ input nhập vào
const username = document.getElementById("userName");
const email = document.getElementById("email");
const pass = document.getElementById("password");
const repass = document.getElementById("rePassword");

// các biến liên quan đến lỗi
const user_err = document.getElementById("userNameErr");
const email_err = document.getElementById("emailErr");
const pass_err = document.getElementById("passwordErr");
const repass_err = document.getElementById("rePasswordErr");

// Lấy dữ liệu từ localStorage
// phải ép kiểu JSON thì các phương thức của js mới có thể giao tiếp đc
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

// validate email js
// kiểm tra định dạng email đúng thì mới cho vào
// mấy kí tự khó hiểu thì vào trong web: regex101.com

/**
 * validate địa chỉ email
 * @param {*} email : chuỗi email mà người dùng nhập vào
 * @returns : dữ liệu nếu đúng định dạng, undifined nếu email không đúng định dạng
 */
function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

// b3 : lắng nghe sự kiện submit. chặn reload và kiểm tra đầu vào đặc biệt khiểm tra ô mật khẩu và ô kiểm tra mật khẩu phải khớp với nhau
formDangKi.addEventListener("submit", function (e) {
  // Đầu tiên===== ngăn chặn hoạt động mặc định của sự kiện submit
  e.preventDefault();

  // Sau đó======xác thực các điều kiện đầu vào trong ô input
  // khi người dùng để trống thì sẽ hiển thị lỗi, ngược lại người dùng nhập vào thì ẩn thông báo lỗi
  // làm cho tất cả các ô mà người dùng cần truyền vào
  if (!username.value) {
    user_err.style.display = "block";
  } else {
    user_err.style.display = "none";
  }

  if (!email.value) {
    email_err.style.display = "block";
  } else {
    email_err.style.display = "none";

    // kiểm tra định dạng email =======
    if (!validateEmail(email.value)) {
      email_err.style.display = "block";
      email_err.innerHTML = "Email không đúng định dạng";
    }
  }

  if (!pass.value) {
    pass_err.style.display = "block";
  } else {
    pass_err.style.display = "none";
  }

  if (!repass.value) {
    repass_err.style.display = "block";
  } else {
    repass_err.style.display = "none";
  }

  //tiếp theo========kiểm tra mật khẩu và nhập lại mật khẩu
  // so sánh 2 giá trị truyền vào
  if (pass.value !== repass.value) {
    // khi 2 trường này khác nhau thì hiển thị thông báo lên
    repass_err.style.display = "block";

    // do thông báo được fit cứng là : mật không không được để trống
    // nên chúng ta cần sử dụng DOM của js để thay đổi thông báo này thành : mật khẩu không khớp
    repass_err.innerHTML = "Mật khẩu không khớp";
  }

  // gửi dữ liệu từ form lên local storage================ b4
  // vì ở trên có nhiều câu điều kiện rẽ nhánh nên phải sử dụng điều kiện bên dưới
  // vidu : nếu email không đúng định dạng thì không cho gửi lên trên khi nào tất cả đúng quy tắc thì mới cho tải lên
  if (
    username.value &&
    email.value &&
    pass.value &&
    repass.value &&
    pass.value == repass.value &&
    validateEmail(email.value)
  ) {
    // Lấy dữ liệu từ form và gộp thành 1 đối tượng uer
    // sau đó muốn lưu được thì phải có dữ liệu ở trên local
    // tiếp đưa dữ liệu này lên local
    const user = {
      UserId: Math.ceil(Math.random() * 1000000), // mã Math.ceil(Math.random() * 1000000) sẽ tạo ra một số nguyên ngẫu nhiên trong khoảng từ 1 đến 1.000.000.
      Username: username.value,
      Email: email.value,
      Password: pass.value,
    };

    // đã có userLocal đc tạo ở bên trên rồi nhưng nó chỉ là 1 mảng rỗng
    // cần phải push user vào trong mẩng userLocal thì local của mình mới có dữ liệu dcd
    userLocal.push(user);

    // Lưu trữ dữ liệu lên local
    localStorage.setItem("users", JSON.stringify(userLocal));

    // delay thời gian chuyển trang sang form đăng nhập
    setTimeout(function () {
      //chuyển hướng về trang đăng nhập sau 0,5gi
      window.location.href = "login.html";
    }, 500);
  }
});
