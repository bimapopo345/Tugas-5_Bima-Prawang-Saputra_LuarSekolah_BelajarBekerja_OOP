const product = [
  {
    id: 0,
    image: "image/gg-1.jpg",
    title: "Z Flip Foldable Mobile",
    price: 120,
  },
  { id: 1, image: "image/hh-2.jpg", title: "Air Pods Pro", price: 60 },
  { id: 2, image: "image/ee-3.jpg", title: "250D DSLR Camera", price: 230 },
  { id: 3, image: "image/aa-1.jpg", title: "Head Phones", price: 100 },
];

const categories = product; // This line can be simplified as no Set is needed for unique items
let i = 0;
document.getElementById("root").innerHTML = categories
  .map((item) => {
    return `<div class='box'>
    <div class='img-box'>
      <img class='images' src=${item.image}></img>
    </div>
    <div class='bottom'>
      <p>${item.title}</p>
      <h2>${item.price}.00</h2>
      <button onclick='addtocart(${i++})'>Add to cart</button>
    </div>
  </div>`;
  })
  .join("");

let cart = [];

function addtocart(a) {
  cart.push({ ...categories[a] });
  displaycart();
}

function delElement(a) {
  cart.splice(a, 1);
  displaycart();
}

function displaycart() {
  let j = 0,
    total = 0;
  document.getElementById("count").innerHTML = cart.length;
  document.getElementById("cartItem").innerHTML =
    cart.length === 0
      ? "Your cart is empty"
      : cart
          .map((item) => {
            total += item.price;
            return `<div class='cart-item'>
        <div class='row-img'>
          <img class='rowimg' src=${item.image}>
        </div>
        <p style='font-size:12px;'>${item.title}</p>
        <h2 style='font-size: 15px;'>${item.price}.00</h2>
        <i class='fa-solid fa-trash' onclick='delElement(${j++})'></i>
      </div>`;
          })
          .join("");
  document.getElementById("total").innerHTML = `${total}.00`;
}

function clearCart() {
  cart = [];
  displaycart();
}

let timeoutHandle;

function startPayment() {
  document.getElementById("confirmOrderInput").style.display = "block";
  document.getElementById("confirmOrderButton").style.display = "block";
  document.getElementById("paymentStatus").textContent = "";
  clearInterval(timeoutHandle); // Pastikan interval sebelumnya dihentikan
}

function confirmOrder() {
  clearInterval(timeoutHandle); // Hentikan interval sebelumnya jika ada
  let timeLeft = 30; // Atur waktu mundur
  document.getElementById(
    "paymentStatus"
  ).textContent = `Waktu tersisa: ${timeLeft} detik`;

  timeoutHandle = setInterval(function () {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timeoutHandle);
      document.getElementById("paymentStatus").textContent =
        "Waktu pembayaran habis";
      resetPaymentForm();
    } else {
      document.getElementById(
        "paymentStatus"
      ).textContent = `Waktu tersisa: ${timeLeft} detik`;
    }
  }, 1000);
}

document
  .getElementById("confirmOrderInput")
  .addEventListener("input", function (e) {
    if (e.target.value.toLowerCase() === "bayar") {
      clearInterval(timeoutHandle);
      document.getElementById("paymentStatus").textContent =
        "Pembayaran berhasil";
      resetPaymentForm();
    }
  });

function resetPaymentForm() {
  clearInterval(timeoutHandle); // Pastikan interval dihentikan
  document.getElementById("confirmOrderInput").style.display = "none";
  document.getElementById("confirmOrderButton").style.display = "none";
  document.getElementById("confirmOrderInput").value = ""; // Kosongkan input
}
