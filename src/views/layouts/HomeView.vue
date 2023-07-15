<template>
  <v-app>
    <div>
      <b-container>
        <b-row>
          <b-col class="home-content" cols="8">
            <div class="menu-content">
              <div class="header-content">
                <div>
                  <h2>ໜ້າເມນູ</h2>
                  <small>Home</small>
                </div>
                <!-- search -->
                <div>
                  <input type="text" class="search-bar" placeholder="ຄົ້ນຫາ" />
                </div>
              </div>
              <hr class="my-3" />

              <!-- Type product -->
              <div class="card-type-content" v-b-scrollspy>
                <div class="card card-type"><a href="#">ທັງໝົດ</a></div>
              </div>
              <!-- Card body -->
              <div class="wrapper">
                <div
                  class="card card-menu"
                  v-for="item in menuItems"
                  :key="item.id"
                >
                  <div>
                    <!-- <img v-bind:src="post.img" alt="image" /> -->
                    <div class="img">image</div>
                    <p>title</p>
                    <button @click="addToCart(item)">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
          <!-- Order list -->
          <b-col class="order-content"
            ><div class="order">
              <h4>ລາຍການຊື້</h4>
              <small> order list </small>
              <!-- <hr class="my-3 "/> -->
              <div class="order-list">
                <div
                  class="card card-order"
                  v-for="item in cartItems"
                  :key="item.id"
                >
                  <div class="img">
                    <img alt="image" />
                  </div>
                  <div class="card-main">
                    <div class="top-cont">
                      <div>
                        <h
                          >{{ item.name }} {{ item.quantity }}
                          {{ item.totalPrice }}</h
                        >
                        <p>tpye</p>
                      </div>
                      <div>
                        <button @click="removeFromCart(item)">
                          <i class="fa-solid fa-trash fa-sm"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- total-card -->
              <div class="total-content">
                <div class="total-card">
                  <h5><b>ລວມ</b></h5>
                  <hr />
                  <div class="row">
                    <div>
                      <h>ຈຳນວນ :</h>
                    </div>
                    <div>
                      <p>quantity</p>
                    </div>
                  </div>
                  <div class="row">
                    <div>
                      <h>ລາຄາລວມ :</h>
                    </div>
                    <div>
                      <p>$price total Kip</p>
                    </div>
                  </div>
                </div>
                <div class="btn-pay">
                  <div type="button">ຊຳລະເງີນ</div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </v-app>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      counter: 1,
      cartItems: [],
      menuItems: [
        { id: 1, name: "Item 1", price: 10, stock: 5 },
        { id: 2, name: "Item 2", price: 20, stock: 10 },
        { id: 3, name: "Item 3", price: 30, stock: 3 },
      ],
    };
  },
  methods: {
    changeCounter: function (num) {
      this.counter += +num;
      console.log(this.counter);
      !isNaN(this.counter) && this.counter > 1
        ? this.counter
        : (this.counter = 1);
    },
    addToCart(item) {
      const existingItem = this.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        if (existingItem.quantity < item.stock) {
          existingItem.quantity += 1;
        } else {
          console.log(`Maximum stock reached for ${item.name}`);
        }
      } else {
        this.cartItems.push({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          totalPrice: item.price, // add totalPrice property
        });
      }

      // update totalPrice for all cart items
      this.cartItems.forEach((i) => (i.totalPrice = i.price * i.quantity));
    },
    removeFromCart(item) {
      const existingItem = this.cartItems.find((i) => i.id === item.id);
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        const index = this.cartItems.indexOf(existingItem);
        this.cartItems.splice(index, 1);
      }
    },
    incrementQuantity(item) {
      if (item.quantity < item.stock) {
        item.quantity += 1;
      } else {
        console.log(`Maximum stock reached for ${item.name}`);
      }
    },
    decrementQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.removeFromCart(item);
      }
    },
    isMaxStockReached(item) {
      const existingItem = this.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        return existingItem.quantity >= item.stock;
      } else {
        return false;
      }
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
@import "@/scss/colors";
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
}
.home-content {
  background-color: $gray;
  .menu-content {
    height: 100vh;
    width: 100%;
    padding: 2rem 1.5rem;
    .header-content {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      align-items: end;
    }
    h2 {
      font-weight: bold;
    }
  }
  .search-bar {
    width: 30rem;
    height: 2.5rem;
    border: 0px solid black;
    background-color: white;
    border-radius: 15px;
    // margin: 1rem 0;
    padding-left: 1.5rem;
    font-size: 13px;
  }
}
//card type product
.card-type-content {
  display: flex;
  gap: 5px;

  // width: fill;
  // overflow: auto;
  // position: relative;
  .card-type {
    width: 100px;
    height: 45px;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-items: center;
    border-radius: 10px;
    a {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: black;
      background: white;
      border-radius: 10px;
      font-size: 14px;
      // border: 1px solid black;
      // box-shadow: rgba(0, 0, 0, 0.118) 0px 1px 6px,
      //   rgba(0, 0, 0, 0.118) 0px 1px 4px;
      &:hover {
        background: $yellow;
        color: black;
      }
      &:focus {
        background: $yellow;
        color: black;
      }
    }
  }
}

// Card menu
.wrapper {
  display: flex;
  justify-content: start;
  // align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
  overflow: auto;
  height: 500px;
  .card-menu {
    display: flex;
    max-width: 175px;
    height: 220px;
    div {
      padding: 12px;
      color: #1471cf;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 155px;
        height: 120px;
        object-fit: cover;
        background-color: $gray;
        border-radius: 5px;
      }
      p {
        padding-top: 1rem;
      }
      button {
        color: chocolate;
      }
    }
  }
}

// order -content
.order-content {
  padding: 2rem 1rem 1rem 1rem;
  .order {
    text-align: center;
    h4 {
      font-weight: bold;
    }
    small {
      color: $dark-gray;
    }
    .order-list {
      padding: 0 0.5rem;
      margin-top: 1.5rem;
      height: 370px;
      overflow: auto;
      .card-order {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        padding: 7px 15px 7px 7px;
        height: 90px;
        width: 200;
        text-align: start;
        margin-bottom: 1rem;
        .img {
          width: 100px;
          height: 100%;
          display: flex;
          text-align: center;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            background-color: beige;
            border-radius: 5px;
          }
        }
      }
      .card-main {
        flex: 1;

        .top-cont {
          display: flex;
          width: fill;
          background-color: #1471cf;
          justify-content: space-between;
          p {
            font-size: small;
            color: $dark-gray;
          }
          i {
            color: $red;
          }
        }
      }
    }
  }
}
//number quantity
.btn {
  // border: 1px solid #e1e8ee;
  width: 25px;
  height: 25px;
  background-color: $yellow;
  /*   border-radius: 6px; */
  cursor: pointer;
}
button:focus,
input:focus {
  outline: 0;
  // background-color: $yellow;
}

//total content
.total-content {
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  width: calc(100% * 1 / 3);
  flex-direction: column;
  background-color: $yellow;
  // border-radius: 5px;
  padding: 1rem;
  hr {
    margin: 1rem 0;
  }
  .total-card {
    text-align: start;
    .row {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      div {
        flex: 1;
      }
    }
  }
}
.btn-pay {
  display: flex;
  width: fill;
  margin-top: 1rem;
  div {
    display: flex;
    width: 100%;
    color: white;
    background-color: black;
    border-radius: 10px;
    height: 45px;
    align-items: center;
    justify-content: center;
  }
}
</style>
