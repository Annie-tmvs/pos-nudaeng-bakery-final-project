<template>
  <div>
    <b-row>
      <b-col class="home-content" cols="8">
        <div class="menu-content">
          <div class="header-content">
            <div>
              <h2>ໜ້າເມນູ</h2>
              <small>Home</small>
            </div>
          </div>
          <hr class="my-3" />

          <!-- Type product -->
          <div class="card-type-content" v-b-scrollspy>
            <div class="card card-type">
              <router-link to="" tag="a" @click="showAllItems()"
                >ທັງໝົດ</router-link
              >
            </div>
            <div
              class="card card-type"
              v-for="(index, i) in productType"
              :key="i"
            >
              <router-link to="" tag="a" @click="pdType(index.id)">{{
                index.name
              }}</router-link>
            </div>
          </div>

          <!-- Card body -->
          <div class="wrapper">
            <div
              class="card card-menu"
              v-for="(item, i) in product"
              :key="i.id"
            >
              <div>
                <div class="img">
                  <img
                    class="img-body"
                    :src="'http://127.0.0.1:8000/storage/' + item.img"
                    alt="image"
                  />
                </div>
                <div class="card-text">
                  <label
                    ><b style="color: black"> {{ item.name }}</b></label
                  >
                  <label
                    >stock:<b style="color: rgb(242, 210, 51)">
                      {{ item.quantity }}</b
                    ></label
                  >
                  <label
                    >ລາຄາ:
                    <span style="color: black"
                      >{{ item.price }}/ {{ item.unit }}</span
                    ></label
                  >
                </div>
                <button @click="addItemToCart(item)">
                  <Span>Add to Cart</Span>
                </button>
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
          <div
            class="d-flex flex-direction-row justify-content-end gap-3 my-3 px-2"
          >
            <div>
              <small> {{ cartItems.length }} in cart</small>
            </div>
            <v-spacer></v-spacer>
            <button @click="deleteAllItem()">
              <small>
                <i class="fa-solid fa-trash-can fa-sm"></i> Clear all</small
              >
            </button>
            <!-- <button>
              <small> <i class="fa-solid fa-print fa-sm"></i> Print</small>
            </button> -->
          </div>
          <!-- <hr class="my-3 "/> -->
          <div class="order-list">
            <div
              class="card card-order"
              v-for="(item, i) in cartItems"
              :key="i"
            >
              <div class="img">
                <img
                  alt="image"
                  :src="'http://127.0.0.1:8000/storage/' + item.img"
                />
              </div>
              <div class="card-main">
                <div class="top-cont">
                  <div>
                    <h>{{ item.name }}</h>
                    <p>ລາຄາ: {{ item.price * item.counter }} kip</p>
                    <div class="quantity-content">
                      <button
                        class="btn-qty"
                        v-on:click="decrementQuantity(item)"
                      >
                        -
                      </button>
                      <div class="quantity">
                        <p>{{ item.counter }}</p>
                      </div>
                      <button
                        class="btn-qty"
                        v-on:click="incrementQuantity(item)"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <button @click="deleteItem(item)">
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
              <!-- <div class="row">
                    <div>
                      <h>ຈຳນວນ :</h>
                    </div>
                    <div>
                      <p>{{ cartTotalQuantity }}</p>
                    </div>
                  </div> -->
              <div class="row">
                <div>
                  <h>ລາຄາລວມ :</h>
                </div>
                <div class="text-end">
                  <p>{{ calculateTotalPrice() }} Kip</p>
                </div>
              </div>
            </div>
            <div @click="deleteAllItem()" class="btn-pay">
              <div type="button">ຊຳລະເງີນ</div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      filteredProducts: "",
      productType: "",
      product: "",
      cartItems: [],
      menuItems: "",
      login: { phone_number: "", password: "" },
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("api/product_type", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        this.productType = response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .get("api/product", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        this.product = response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    this.filterProducts();
  },

  //-------------------------------------------------------------------------------//
  methods: {
    addItemToCart(item) {
      console.log(item);

      // Check if the item already exists in the cart
      const existingItem = this.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (!existingItem) {
        this.cartItems.push({ ...item, counter: 1 });
      } else {
        // If the item already exists in the cart, increment the counter
        existingItem.counter += 1;
        console.log(
          "Item already exists in the cart. Incremented the counter."
        );
      }
    },

    //-------------------------------------------------------------------------------//
    decrementQuantity(item) {
      const newCounter = item.counter - 1; // Increment the counter
      if (newCounter >= 1) {
        this.cartItems = this.cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, counter: newCounter }
            : cartItem
        );
      }
    },

    incrementQuantity(item) {
      const newCounter = item.counter + 1; // Increment the counter
      if (newCounter <= item.quantity) {
        this.cartItems = this.cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, counter: newCounter }
            : cartItem
        );
      }
    },

    deleteItem(item) {
      this.cartItems.splice(this.cartItems.indexOf(item));
    },
    deleteAllItem() {
      this.cartItems.splice(this.cartItems);
    },
    //-------------------------------------------------------------------------------//
    calculateTotalPrice() {
      let totalPrice = 0;
      for (const item of this.cartItems) {
        totalPrice += item.price * item.counter;
      }
      return totalPrice;
    },
    //-------------------------------------------------------------------------------//
    showAllItems() {
      const token = localStorage.getItem("token");
      axios
        .get("api/product", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.menuItems = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    //--------------------------------------------------------------------------------//
    // pdType(id) {
    //   const token = localStorage.getItem("token");
    //   console.log("product type: " + id);

    //   axios
    //     .get("api/product", {
    //       headers: {
    //         Authorization: "Bearer " + token,
    //       },
    //     })
    //     .then((response) => {
    //       const filteredItems = response.data.filter(
    //         (item) => item.product_type_id === id
    //       );
    //       this.menuItems = filteredItems;
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // },
    //------------------------------------------------------------------------------------------------------------------------------------//
    saveOrder(event) {
      event.preventDefault();
    },
    saveData() {
      const token = localStorage.getItem("token");
      const fromData = fromData();
      fromData.append("_method", "PATH");
      axios.post("/order", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
  },
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
}
//card type product
.card-type-content {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  // width: fill;
  // overflow: auto;
  // position: relative;
  .card-type {
    width: 100px;
    height: 45px;
    align-items: center;
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
    // a.router-link-active {
    //   background: $yellow;
    //   color: black;
    // }
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
  height: 440px;
  .card-menu {
    display: flex;
    max-width: 175px;
    height: 260px;
    div {
      padding: 12px;
      color: #1471cf;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .img {
        width: 155px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $gray;
        border-radius: 5px;
        .img-body {
          width: 155px;
          height: 120px;
          object-fit: cover;
          border-radius: 5px;
        }
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
        height: 110px;
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
          // background-color: #1471cf;
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
    padding: 0 10px;
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
.quantity-content {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  width: 160px;
  // background-color: #ececec;
}
.quantity {
  display: flex;
  height: 25px;
  width: 50px;
  margin: 0 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ececec;
  border-radius: 10px;
  p {
    color: black !important;
  }
  // input {
  //   width: 50px;
  // }
}
.btn-qty {
  border-radius: 25px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: goldenrod;
}
</style>
