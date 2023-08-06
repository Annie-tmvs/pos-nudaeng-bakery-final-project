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
            <div></div>
          </div>
          <hr class="my-3" />

          <div>
            <b-tabs
              content-class="mt-0"
              justified
              nav-class="bg-secondary "
              active-nav-item-class="font-weight-bold text-uppercase bg-dark text-white "
            >
              <b-tab title="All" active title-link-class="text-white">
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
                      <button
                        style="font-weight: bold"
                        @click="addItemToCart(item)"
                        v-if="item.quantity != 0"
                      >
                        <Span>Add to Cart</Span>
                      </button>
                      <div
                        v-else
                        style="
                          widht: fill;
                          background-color: rgb(230, 14, 14);
                          color: white;
                          border-radius: 5px;
                        "
                      >
                        <small>OUT OF STROCK</small>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab
                @click="pdType(index.id)"
                v-for="(index, i) in productType"
                :key="i"
                :title="index.name"
                title-link-class="text-white"
              >
                <div class="wrapper">
                  <div
                    class="card card-menu"
                    v-for="(item, i) in productID.product"
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
                      <button
                        style="font-weight: bold"
                        @click="addItemToCart(item)"
                        v-if="item.quantity != 0"
                      >
                        <Span>Add to Cart</Span>
                      </button>
                      <div
                        v-else
                        style="
                          widht: fill;
                          background-color: rgb(230, 14, 14);
                          color: white;
                          border-radius: 5px;
                        "
                      >
                        <small>OUT OF STROCK</small>
                      </div>
                    </div>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </b-col>

      <!-- Order list -->
      <b-col class="order-content"
        ><div class="order">
          <h4>ລາຍການຊື້</h4>
          <small> order list </small>
          <div
            class="d-flex flex-direction-row justify-content-end gap-4 my-3 px-2"
          >
            <div>
              <small> {{ cartItems.length }} in cart</small>
            </div>
            <v-spacer></v-spacer>
            <button v-b-modal.modal-scrollable>
              <small> <i class="fa-solid fa-print fa-sm"></i> print</small>
            </button>
            <button @click="deleteAllItem()">
              <small> <i class="fa-solid fa-trash-can fa-sm"></i> Clear</small>
            </button>
          </div>
          <hr class="my-3" />
          <!-- <hr class="my-3 "/> -->
          <div v-if="cartItems.length != 0" class="order-list">
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
          <div
            class="order-list d-flex flex-column justify-content-center align-items-center"
            v-else
          >
            <img
              width="150"
              alt="image"
              src="https://media.discordapp.net/attachments/905843816697835591/1137442038946734091/empty-cart.png?width=640&height=640"
            />
            <h5
              class="mt-2"
              style="color: rgb(211, 211, 211); font-weight: 700"
            >
              No product
            </h5>
          </div>
          <!-- total-card -->
          <div class="total-content">
            <div class="total-card">
              <div class="row">
                <div>
                  <h5><b>ລາຄາລວມ:</b></h5>
                </div>
                <div class="text-end">
                  <p>
                    <b>{{ calculateTotalPrice() }} Kip</b>
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div class="btn-pay">
              <div type="button" @click="submitOrder">ຊຳລະເງີນ</div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>

    <!-- modal bill---------------------------------------------------------------------------------------------->
    <b-modal id="modal-scrollable" size="md" hide-footer>
      <div class="my-5 mx-3" v-for="(bill, i) in items" :key="i">
        <div class="d-flex justify-content-center">
          <img
            width="180"
            alt="image"
            src="https://media.discordapp.net/attachments/905843816697835591/1117780591329431563/IMG_1434.png?width=625&height=625"
          />
        </div>
        <div class="text-center mb-3">
          <h6>RECEIPT</h6>
          <p>Nudaeng Bakery</p>
          <p class="mt-2">Tel: 020 98256261</p>
        </div>
        <div class="py-2">
          <div class="d-flex flex-row justify-content-between align-items-end">
            <div>
              <p>
                <small><b>ຕິດຕາມ:</b></small>
              </p>
              <p><small>Instagram: nudaeng_bakery</small></p>
              <h6><small>Facebook: Nudaeng Bakery</small></h6>
            </div>
            <div>
              <p>
                <small><b>ລະຫັດບິນ: </b>{{ bill.id }}</small>
              </p>
              <p>
                <small
                  >ວັນທີ:
                  {{
                    new Date(bill.created_at).toLocaleString().substring(0, 8)
                  }}</small
                >
              </p>
              <h6>
                <small
                  >ເວລາ:
                  {{
                    new Date(bill.created_at).toLocaleString().substring(21, 9)
                  }}</small
                >
              </h6>
            </div>
          </div>
        </div>
        <div>
          <p><b>ພະນັກງານຂາຍ: </b>{{ bill.firstname }}</p>
          <hr class="mt-3" />
          <table class="table text-center">
            <thead>
              <tr>
                <th class="text-start">ຊື່ສຶນຄ້າ</th>
                <th>ຈຳນວນ</th>
                <th>ລາຄາ/ຫົວໜ່ວຍ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pro, i) in bill.order_detail" :key="i">
                <td class="text-start">{{ pro.name }}</td>
                <td>{{ pro.quantity }}</td>
                <td>{{ pro.price }} kip/ {{ pro.unit }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="text-start" collapse="3">
                <td colspan="3"><b>ລາຄາລວມ: </b>{{ bill.price_total }} ກີບ</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button style="width: 100px; height: 50px">
          <i class="fa-solid fa-print"></i> print
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      filteredProducts: "",
      productType: "",
      product: "",
      productID: "",
      menuItems: "",
      cartItems: [],
      userInfo: "",

      items: "",
      perPage: 3,
      currentPage: 1,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    axios
      .get("api/users/selOne/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        this.userInfo = response.data;
        console.log("userInfo");
      });
    //--------------------------------------------------------------------------------------//
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
    //---------------------------------------------------------------------------------------//
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
    //------------------------------------------------------------------------------------------//
    axios
      .get("api/allorderwithdetail", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const newItem = response.data.reverse();
        this.items = [newItem[0]];

        console.log(items);
      })
      .catch((e) => {
        console.log(e);
      });
    //-----------------------------------------------------------------------------------------//
    this.filterProducts();
  },
  //---------------------------------------------------------------------------------------//
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
      if (newCounter < item.quantity) {
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
    //--------------------------------------------------------------------------------//
    pdType(item) {
      const token = localStorage.getItem("token");
      axios
        .get("api/product_type/" + item, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          this.productID = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
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
    //------------------------------------------------------------------------------------//
    submitOrder() {
      console.log("submit order");
      const token = localStorage.getItem("token");
      axios
        .post(
          "api/order",
          {
            tel: this.userInfo.phone_number,
            location: "ໜ້າຮ້ານ",
            price_total: this.calculateTotalPrice(),
            order_details: this.cartItems.map((item) => ({
              ...item,
              product_id: item.id,
              quantity: item.counter,
            })),
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(({ data }) => {
          // alert("ສັ່ງຊື້ສຳເລັດ");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            iconColor: "limegreen",
            width: 600,
            padding: "3em",
            timer: 1500,
          });
          // this.$router.push({ path: "/user" });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          console.log(data);
        })
        .catch((error) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "ເກີດຂໍ້ຜິດພາດ!!!",
            text: "something was wrong!!!",
            showConfirmButton: true,
            width: 600,
            padding: "3em",
            iconColor: "crimson",
            confirmButtonText: "ຕົກລົງ",
            confirmButtonColor: "#1d2186",
          });
          console.error("Error:", error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/scss/colors";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@400;700&display=swap");

//------------------------------------------------------------------------------------------------------------------//
* {
  font-family: "Noto Sans Lao", sans-serif;
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
    text-align: center;
    align-items: center;
    flex-direction: column;
    justify-content: center;
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
      // color: crimson;
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
  // background-color: cadetblue;
  height: 580px;
  .card-menu {
    overflow: hidden;
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
  height: 170px;
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
    height: 50px;
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
