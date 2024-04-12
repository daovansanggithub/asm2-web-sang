const btn = document.querySelectorAll("button");

btn.forEach(function (button, index) {
  button.addEventListener("click", function (event) {
    var btnItem = event.target;
    var product = btnItem.parentElement;
    var productImg = product.querySelector("img").src;
    var productName = product.querySelector("h1").innerText;
    var productPrice = product.querySelector("span").innerText;

    addCart(productPrice, productImg, productName);
  });
});

function addCart(productPrice, productImg, productName) {
  var addtr = document.createElement("tr");

  var trcontent = `
    <tr>
      <td style="display: flex; align-items: center">
        <img style="width: 70px" src="${productImg}" alt="" />${productName}
      </td>
      <td>
        <p><span>${productPrice}</span><sup>đ</sup></p>
      </td>
      <td>
        <input style="width: 30px; outline: none" type="number" value="1" min="1" />
      </td>
      <td style="cursor: pointer"><span class="cart-delete">Xóa</span></td>
    </tr>`;
  addtr.innerHTML = trcontent;
  var cartTable = document.querySelector("tbody");
  cartTable.append(addtr);

  carttotal();
  deleteCart();
}

// ============================================tong tien====================
function carttotal() {
  var cartItem = document.querySelectorAll("tbody tr");
  var totalC = 0;

  for (var i = 0; i < cartItem.length; i++) {
    var inputValue = cartItem[i].querySelector("input").value;
    var productPrice = cartItem[i].querySelector("span").innerHTML;
    totalA = inputValue * productPrice * 1000;
    totalC = totalC + totalA;
  }

  var carttotalA = document.querySelector(".price-total span");
  var cartPrice = document.querySelector(".cart-icon span");
  carttotalA.innerHTML = totalC.toLocaleString("de-DE");
  cartPrice.innerHTML = totalC.toLocaleString("de-DE");
  inputchange();
}

// ------------------------------------delete----------------------
function deleteCart() {
  var cartItem = document.querySelectorAll("tbody tr");
  for (var i = 0; i < cartItem.length; i++) {
    var productT = document.querySelectorAll(".cart-delete");
    productT[i].addEventListener("click", function (event) {
      var cartDelete = event.target;
      var cartitemR = cartDelete.parentElement.parentElement;
      cartitemR.remove();
      carttotal();
      // console.log(cartitemR);
    });
  }
}

// =========================
// function inputchange() {
//   var cartItem = document.querySelectorAll("tbody tr");
//   for (var i = 0; i < cartItem.length; i++) {
//     var inputValue = cartItem[i].querySelector("input");
//     inputValue.addEventListener("change", function () {
//       carttotal();
//     });
//   }
// }

function inputchange() {
  var cartItem = document.querySelectorAll("tbody tr");
  for (var i = 0; i < cartItem.length; i++) {
    var inputValue = cartItem[i].querySelector("input");
    inputValue.addEventListener("change", function () {
      var parentRow = this.parentElement.parentElement;
      var productPrice = parentRow.querySelector("span").innerText;
      carttotal();
    });
  }
}

// ===================================================//
const cartbtn = document.querySelector(".fa-circle-xmark");
const cartshow = document.querySelector(".fa-cart-shopping");
cartshow.addEventListener("click", function () {
  document.querySelector(".cart").style.right = "0";
});

cartbtn.addEventListener("click", function () {
  document.querySelector(".cart").style.right = "-100%";
});
