addProduct(product) {
  // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
  let cartItem = this.cartItems.find(
    item => item.product.id == product.id
  );
  if (!cartItem) {
    cartItem = {
      product,
      count: 1
    };
    this.cartItems.push(cartItem);
  } else {
    cartItem.count++;
  }

  this.onProductUpdate(cartItem);
}

updateProductCount(productId, amount) {
  // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
  let cartItem = this.cartItems.find(item => item.product.id == productId);
  cartItem.count += amount;

  if (cartItem.count == 0) {
    this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
  }

  this.onProductUpdate(cartItem);
}

isEmpty() {
  // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
  return this.cartItems.length === 0;
}

getTotalCount() {
  // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
  return this.cartItems.reduce((sum, item) => sum + item.count, 0);
}

getTotalPrice() {
  // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
  return this.cartItems.reduce(
    (sum, item) => sum + item.product.price * item.count,
    0
  );
}

renderProduct(product, count) {
@@ -84,21 +107,99 @@ export default class Cart {
}

renderModal() {
  // ...ваш код
  this.modal = new Modal();

  this.modal.setTitle("Your order");

  this.modalBody = document.createElement(`div`);

  for (let { product, count } of this.cartItems) {
    this.modalBody.append(this.renderProduct(product, count));
  }

  this.modalBody.append(this.renderOrderForm());

  this.modalBody.addEventListener("click", this.onModalBodyClick);

  this.modalBody.querySelector("form").onsubmit = (event) => this.onSubmit(event);

  this.modal.setBody(this.modalBody);

  // when modal is closed, we forget about it, don't update it any more
  this.modal.elem.addEventListener('modal-close', () => {
    this.modal = null;
    this.modalBody = null;
  });

  this.modal.open();
}

onProductUpdate(cartItem) {
  // ...ваш код
onModalBodyClick = (event) => {
  if (event.target.closest(".cart-counter__button")) {
    let productElem = event.target.closest("[data-product-id]");
    let productId = productElem.dataset.productId;
    this.updateProductCount(
      productId,
      event.target.closest(".cart-counter__button_plus") ? 1 : -1
    );
  }
};

onProductUpdate({product, count}) {
  this.cartIcon.update(this);

  if (!this.modal || !document.body.classList.contains('is-modal-open')) {
    return;
  }

  if (this.cartItems.length == 0) {
    // No products, close the modal
    this.modal.close();
    return;
  }

  if (count == 0) {
    this.modalBody.querySelector(`[data-product-id="${product.id}"]`).remove();
  } else {
    this.modalBody.querySelector(`[data-product-id="${product.id}"] .cart-counter__count`).innerHTML = count;

    this.modalBody.querySelector(`[data-product-id="${product.id}"] .cart-product__price`).innerHTML = '€' + (count * product.price).toFixed(2);
  }

  this.modalBody.querySelector(`.cart-buttons__info-price`).innerHTML = '€' + this.getTotalPrice().toFixed(2);
}

onSubmit(event) {
  // ...ваш код
async onSubmit(event) {
  event.preventDefault();

  this.modalBody
    .querySelector('button[type="submit"]')
    .classList.add("is-loading");
  let form = this.modalBody.querySelector('.cart-form');
  let userData = new FormData(form);

  await fetch('https://httpbin.org/post', { method: 'POST', body: userData });

  this.modal.setTitle("Success!");
  this.modalBody
    .querySelector('button[type="submit"]')
    .classList.remove("is-loading");

  this.cartItems = [];
  this.cartIcon.update(this);

  this.modalBody.innerHTML = `
    <div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>
    `;
};

addEventListeners() {
  this.cartIcon.elem.onclick = () => this.renderModal();
}
}