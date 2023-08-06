<template>
  <div>
    <div class="card-content">
      <table class="table">
        <thead>
          <tr>
            <th class="th-cont1" style="border-radius: 10px 0 0 10px"></th>
            <th>ເລກບິນ</th>
            <th>ລູກຄ້າ</th>
            <th class="th-cont1">ວັນທີ</th>
            <th class="th-cont1">ເວລາ</th>
            <th>ສະຖານະ</th>
            <th style="border-radius: 0 10px 10px 0"></th>
          </tr>
        </thead>
        <tbody v-for="(item, i) in items" :key="i.id" :item="item">
          <tr v-show="item.status == 0">
            <td class="td-cont1"></td>
            <td>
              {{ item.id }}
            </td>
            <td>
              <div class="text-secondary">
                <small>user id: {{ item.user_id }}</small>
              </div>
              <div>{{ item.name }}</div>
            </td>
            <td class="td-cont1">
              {{ new Date(item.created_at).toLocaleString().substring(0, 8) }}
            </td>
            <td class="td-cont1">
              {{ new Date(item.created_at).toLocaleString().substring(21, 9) }}
            </td>
            <td>
              <i class="fa-solid fa-spinner fa-md p-2 text-warning"></i
              ><span>ກຳລັງລໍຖ້າດຳເນີນການ</span>
            </td>
            <td class="btn-content">
              <div
                class="btn"
                tag="text"
                v-b-modal.modal1
                @click="orderById(item.id)"
              >
                <p>
                  <i class="fa-solid fa-truck-ramp-box fa-sm p-2"></i>
                  ດຳເນີນການ
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal -->

    <div v-if="orderID">
      <b-modal id="modal1" hide-header hide-footer hide-header-close size="lg">
        <div class="modal-content">
          <div class="head-content">
            <h4>ລາຍລະອຽດ</h4>
            <h6>ລະຫັດບິນ: {{ orderID.id }}</h6>
            <div class="customer-info">
              <div class="text-start">
                <p class="mt-1">
                  User Id: {{ orderID.user_id }} <br />
                  Role:
                  {{ orderID.roles }}
                </p>
                <h6>ຊື່ລູກຄ້າ: {{ orderID.firstname }}</h6>
                <h6>ເບີໂທ: {{ orderID.tel }}</h6>
              </div>
              <div>
                <h6>
                  ວັນທີ:
                  {{
                    new Date(orderID.created_at)
                      .toLocaleString()
                      .substring(0, 8)
                  }}
                </h6>
                <h6>
                  ເວລາ:
                  {{
                    new Date(orderID.created_at)
                      .toLocaleString()
                      .substring(21, 9)
                  }}
                </h6>
              </div>
            </div>
            <hr class="mt-3" />
            <div class="product-detail">
              <h><b>ລາຍການສິນຄ້າ:</b></h>
              <div class="pro-table">
                <!-- table -->
                <table class="table">
                  <thead>
                    <tr>
                      <th>ລະຫັດ</th>
                      <th>ຊື່ສຶນຄ້າ</th>
                      <th>ຈຳນວນ</th>
                      <th>ລາຄາ/ຫົວໜ່ວຍ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(orderDe, i) in orderID.order_detail" :key="i">
                      <td>{{ orderDe.id }}</td>
                      <td>{{ orderDe.name }}</td>
                      <td>{{ orderDe.quantity }}</td>
                      <td>{{ orderDe.price }} kip/ {{ orderDe.unit }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="total-content">
                  <p>
                    <b>ລາຄາລວມ: </b><span>{{ orderID.price_total }}</span> kip
                  </p>
                </div>
              </div>
            </div>
            <div class="payment" v-show="orderID.receipt_image != null">
              <h><b>ຕິດຄັດການຊ່ຳລະ</b></h>
              <div class="img-payment">
                <img
                  width="300"
                  :src="
                    'http://127.0.0.1:8000/storage/' + orderID.receipt_image
                  "
                  alt="image"
                />
              </div>
            </div>
            <div class="location-content">
              <div v-show="orderID.location != null" class="location-des">
                <h><b>ສະຖານທີ່: </b></h>
                <p class="txt-location">{{ orderID.location }}</p>
              </div>
              <div class="button-content">
                <div
                  typ="btn"
                  class="btn btn-success"
                  @click="confirmOrder(orderID)"
                >
                  ຢືນຢັນ
                </div>
                <div typ="btn" class="btn btn-danger" @click="hideModal1">
                  ຍົກເລີກ
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      items: [],
      orderID: null,
      status: 1,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("api/allorderwithdetail", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.items = res.data.reverse();
        console.log(items);
      });
  },
  methods: {
    moment: function () {
      return moment();
    },
    hideModal1() {
      this.$root.$emit("bv::hide::modal", "modal1", "#btnShow");
    },
    orderById(item) {
      console.log("current order:" + item);
      const token = localStorage.getItem("token");
      axios
        .get("api/getOrderById/" + item, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.orderID = res.data;
          console.log(orderID);
        });
    },
    //--------------------------------------------------------------------------------------------//
    confirmOrder(orderID) {
      console.log(orderID.id);
      const formData = new FormData();
      formData.append("_method", "put");
      formData.append("status", this.status);

      const token = localStorage.getItem("token");
      axios
        .post("api/order/" + orderID.id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then(({ data }) => {
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
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          // alert("ດຳເນີນການສຳເລັດ");
          console.log(data);
        });
    },
    //---------------------------------------------------------------------------------------------//
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/colors";

// .head-table {
//   margin: 1rem 0;
//   padding: 5px 2rem;
//   border-radius: 10px;
//   background-color: black;
//   color: white;
// }

html,
body {
  font-family: "Noto Sans Lao", sans-serif;
}

.card-content {
  margin: 1rem 0;
  // padding: 0 2rem;
  height: 360px;
  overflow: auto;
  border-radius: 10px;
  background-color: #fff;
}
.table {
  th {
    padding-bottom: 1rem;
    width: 100% * 0.16;
    position: sticky;
    top: 0;
    margin: 1rem 0;
    height: 70px;
    font-size: 17px;
    background-color: rgb(0, 0, 0);
    color: white;
    // border-radius: 5px 0 0 5px;
    // padding: 5px 2rem;
  }
  .th-cont1 {
    padding-top: 10px;
    width: fit-content;
  }
  td {
    width: 100% * 0.16;
    height: 70px;
  }
  .td-cont1 {
    width: fit-content;
    height: 70px;
  }

  .btn {
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;
    color: #1d2186;
    width: fit-content;
    height: fit-content;
    border: 0;
    &:hover {
      color: rgb(255, 163, 52);
    }
  }
}
//modall
.modal-content {
  font-family: "Noto Sans Lao", sans-serif;
  width: fill;
  .head-content {
    padding: 2rem 2rem 0 2rem;
    // background-color: $yellow;
    h4 {
      text-align: center;
      font-weight: bold;
    }
    h6 {
      text-align: center;
      font-weight: 500;
    }
  }
  .customer-info {
    padding-top: 1rem;
    display: flex;
    align-items: end;
    justify-content: space-between;
    h6 {
      text-align: start;
    }
  }
}
.pro-table {
  margin-top: 7px;
  border: 1px solid rgb(164, 164, 164);
  margin-bottom: 1rem;
  .table {
    th {
      padding-bottom: 1.5rem;
      width: 100% * 0.2;
      position: sticky;
      top: 0;
      margin: 1rem 0;
      height: 50px;
      font-weight: normal;
      font-size: 17px;
      background-color: rgb(0, 0, 0);
      color: rgb(255, 255, 255);
    }
    td {
      width: 100% * 0.2;
      height: 50px;
    }
  }
}
.total-content {
  padding: 0 0.5rem;
  width: 100%;
  height: 40px;
  span {
    color: $red;
  }
}
.payment {
  .img-payment {
    margin-top: 7px;
    display: flex;
    height: 100%;
    width: 100%;
    object-fit: cover;
    background-color: #e2e2e2;
    justify-content: center;
  }
}
.location-content {
  padding: 1rem 0;
  .location-des {
    .txt-location {
      margin-top: 7px;
      padding: 0.5rem;
      border: 1px solid gray;
    }
  }
}
.map-content {
  .googlemap {
    display: flex;
    background-color: #e2e2e2;
    justify-content: center;
  }
}
.button-content {
  display: flex;
  justify-content: end;
  gap: 1rem;
  padding-top: 1.5rem;
  .btn {
    width: 100px;
  }
  .btn-success {
    background-color: rgb(45, 205, 45);

    &:hover {
      background-color: rgb(21, 143, 21);
    }
  }
  .btn-danger {
    background-color: rgb(232, 47, 47);

    &:hover {
      background-color: rgb(154, 32, 32);
    }
  }
}
</style>
