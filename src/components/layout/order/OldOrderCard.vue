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
        <tbody v-for="(item, i) in info" :key="i.id">
          <tr v-show="item.status == 1">
            <td class="td-cont1"></td>
            <td>{{ item.id }}</td>
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
              <i class="fa-solid fa-circle-check fa-md p-2 text-success"></i
              ><span>ດຳເນີນການສຳເລັດ</span>
            </td>
            <td class="btn-content">
              <div
                class="btn"
                tag="text"
                v-b-modal.modal-scrollable
                @click="oldOrderById(item.id)"
              >
                <p>
                  <i class="fa-solid fa-file-lines fa-sm p-2"></i>
                  ລາຍລະອຽດ
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal -->
    <div v-if="oldOrderID">
      <b-modal id="modal-scrollable" size="lg" hide-footer>
        <div class="modal-content">
          <div class="head-content">
            <h4>ລາຍລະອຽດ</h4>
            <h6>ລະຫັດບິນ: {{ oldOrderID.id }}</h6>
            <div class="customer-info">
              <div>
                <p class="mt-1">
                  Order Id: {{ oldOrderID.user_id }}<br />
                  Role:
                  {{ oldOrderID.roles }}
                </p>
                <h6>ຊື່ລູກຄ້າ: {{ oldOrderID.firstname }}</h6>
                <h6>ເບີໂທ: {{ oldOrderID.tel }}</h6>
              </div>
              <div>
                <h6>
                  ວັນທີ:
                  {{
                    new Date(oldOrderID.created_at)
                      .toLocaleString()
                      .substring(0, 8)
                  }}
                </h6>
                <h6>
                  ເວລາ:
                  {{
                    new Date(oldOrderID.created_at)
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
                    <tr
                      v-for="(orderDe, i) in oldOrderID.order_detail"
                      :key="i"
                    >
                      <td>{{ orderDe.id }}</td>
                      <td>{{ orderDe.name }}</td>
                      <td>{{ orderDe.quantity }}</td>
                      <td>{{ orderDe.price }} kip/ {{ orderDe.unit }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="total-content">
                  <p>
                    <b>ລາຄາລວມ: </b
                    ><span>{{ oldOrderID.price_total }}</span> kip
                  </p>
                </div>
              </div>
            </div>
            <div class="payment" v-show="oldOrderID.receipt_image != null">
              <h><b>ຕິດຄັດການຊ່ຳລະ</b></h>
              <div class="img-payment">
                <img
                  width="300"
                  alt="image"
                  :src="
                    'http://127.0.0.1:8000/storage/' + oldOrderID.receipt_image
                  "
                />
              </div>
            </div>
            <div class="location-content">
              <div class="location-des" v-show="oldOrderID.location != null">
                <h><b>ສະຖານທີ່: </b></h>
                <p class="txt-location">{{ oldOrderID.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  components: {},
  props: {
    user: {},
  },
  data() {
    return {
      info: [],
      showModalInfo: null,
      oldOrderID: null,
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
        this.info = res.data.reverse();
      });
  },
  methods: {
    moment: function () {
      return moment();
    },
    oldOrderById(oldItem) {
      console.log("old order:" + oldItem);
      const token = localStorage.getItem("token");
      axios
        .get("api/getOrderById/" + oldItem, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.oldOrderID = res.data;
          console.log(oldOrderID);
        });
    },
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
  margin: 1.5rem 0;
  // padding: 0 2rem;
  height: 360px;
  overflow: auto;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
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
    color: rgb(29, 33, 134);
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
</style>
