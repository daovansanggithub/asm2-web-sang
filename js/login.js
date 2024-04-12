// lấy dữ liệu từ form sau đó so sánh với dữ liệu lưu trữ trên local ko ?
// nếu khớp thì thành công và chuyển form

// lấy element của trang
const form_login = document.getElementById("formLogin");

// lấy element của người dùng
const email = document.getElementById("email");
const password = document.getElementById("password");

// lấy element thông báo
const err = document.getElementById("err");

// lắng sự kiện submit từ ffỏm
form_login.addEventListener("submit", function (e) {
  // ngăn chặn sự kiện load lại trang
  e.preventDefault();

  // b1======kiểm tra người dùng phải nhập vào đầy đc
  // =====lấy dữ liệu từ local về
  // Lấy dữ liệu từ localStorage
  // phải ép kiểu JSON thì các phương thức của js mới có thể giao tiếp đc
  const userLocal = JSON.parse(localStorage.getItem("users")) || [];

  // b3=====tìm kiếm email và mật khẩu người dùng nhập vào có tồn tại ở trên local ko?
  const finUser = userLocal.find(
    (user) => user.Email === email.value && user.Password === password.value
  );
  // nếu có thì đăng nhập thành công và chuyển hướng trang
  // nếu không thì thông báo cho người dùng nhập lại dữ liệu
  if (!finUser) {
    err.style.display = "block";
  } else {
    window.location.href = "index.html";

    // lưu thông tin của user đăng nhập lên local
    localStorage.setItem("userLogin", JSON.stringify(finUser));
  }
});
