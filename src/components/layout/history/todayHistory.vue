<template>
  <div>
    <v-card class="card-cont">
      <v-card-title class="search-bar">
        <div class="search">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </div>
        <div class="d-flex flex-direction-row gap-2">
          <div class="card">
            <!-- {{ moment(item.created_at).format("M/D/yy") }} -->
            <!-- <p>{{ moment(new Date()).format("M/D/yy") }}</p>
            <p>{{ new Date().toLocaleString("nl-NL").substring(0, 10) }}</p> -->
            <h6>
              ຍອດຂາຍມື້ນີ້:
              <b class="text-warning">
                {{
                  todayItem.filter(
                    (item) =>
                      new Date(item.created_at)
                        .toLocaleString("nl-NL")
                        .substring(0, 10) ==
                      new Date().toLocaleString("nl-NL").substring(0, 10)
                  ).length
                }}
                </b
              >
              ສິນຄ້າ
            </h6>
          </div>
          <!-- <div class="card">
            <h6>
              ຍອດຂາຍທັງໝົດ: <b class="text-info"> {{ items.length }}</b> ສິນຄ້າ
            </h6>
          </div> -->
        </div>
      </v-card-title>
      <v-data-table
        class="table-body"
        :headers="headers"
        :items="todayItem"
        :search="search"
      >
        <template v-slot:item.status="{ item }">
          <i class="fa-solid fa-circle-check fa-md p-2 text-success"></i
          ><span>ດຳເນີນການສຳເລັດ</span>
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ new Date(item.created_at).toLocaleString("nl-NL") }}
        </template>
        <template v-slot:item.action="{ item }">
          <b-button
            variant="outline-primary"
            v-b-modal.modal-scrollable
            @click="historyById(item.id)"
            >View</b-button
          >
        </template>
      </v-data-table>
    </v-card>
    <!-- Modal -->
    <div v-if="viewItem">
      <b-modal id="modal-scrollable" size="lg" hide-footer>
        <div class="modal-content">
          <div class="head-content">
            <h4 class="text-center">ລາຍລະອຽດ</h4>
            <h6 class="text-center">ລະຫັດບິນ: {{ viewItem.id }}</h6>
            <div class="customer-info">
              <div>
                <p class="mt-1">
                  User Id: {{ viewItem.user_id }} <br />
                  Role:
                  {{ viewItem.roles }}
                </p>
                <h6>ຊື່: {{ viewItem.firstname }}</h6>
                <h6>ເບີໂທ: {{ viewItem.tel }}</h6>
              </div>
              <div>
                <h6>
                  ວັນທີ:
                  {{
                    new Date(viewItem.created_at)
                      .toLocaleString("nl-NL")
                      .substring(0, 10)
                  }}
                </h6>
                <h6>
                  ເວລາ :
                  {{
                    new Date(viewItem.created_at)
                      .toLocaleString("nl-NL")
                      .substring(21, 9)
                  }}
                </h6>
              </div>
            </div>
            <hr class="mt-3" />
            <div class="product-detail">
              <h5 class="text-warning">ລາຍການສິນຄ້າ:</h5>
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
                    <tr v-for="(history, i) in viewItem.order_detail" :key="i">
                      <td>{{ history.id }}</td>
                      <td>{{ history.name }}</td>
                      <td>{{ history.quantity }}</td>
                      <td>{{ history.price }} kip/ {{ history.unit }}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="total-content">
                  <p>
                    <b>ລາຄາລວມ: </b
                    ><span class="text-danger">
                      {{ viewItem.price_total }}</span
                    >
                    kip
                  </p>
                </div>
                <hr class="mt-3" />
                <div class="payment" v-show="viewItem.receipt_image !== null">
                  <h><b>ຕິດຄັດການຊ່ຳລະ</b></h>
                  <div class="img-payment">
                    <img
                      width="300"
                      alt="image"
                      :src="
                        'http://127.0.0.1:8000/storage/' +
                        viewItem.receipt_image
                      "
                    />
                  </div>
                </div>
                <div
                  class="location-content"
                  v-show="viewItem.location !== null"
                >
                  <div class="location-des">
                    <h><b>ສະຖານທີ່: </b></h>
                    <p class="txt-location">{{ viewItem.location }}</p>
                  </div>
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
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
export default {
  data() {
    return {
      originalDate: "2023-08-04T19:41:49.000000Z",
      search: "",
      historyDetail: [],
      viewItem: null,
      items: [],
      todayItem: [],
      headers: [
        {
          text: "ເລກບິນ",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "ສະຖານະ", value: "status" },
        { text: "User Id", value: "user_id" },
        { text: "role", value: "roles" },
        { text: "ເວລາ", value: "created_at" },
        { text: "ລາຄາລວມ", value: "price_total" },
        // { text: "ຊຳລະ", value: "receipt_image" },
        { text: "action", value: "action" },
      ],
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
      .then((response) => {
        this.items = response.data.reverse();
        // this.todayItem = response.data.filter((item) => item.status == "1");
        this.todayItem = response.data.filter(
          (item) =>
            new Date(item.created_at)
              .toLocaleString("nl-NL")
              .substring(0, 10) ==
              new Date().toLocaleString("nl-NL").substring(0, 10) &&
            item.status == "1"
        );
        console.log(items);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    moment: function () {
      return moment();
    },
    dayjs: function () {
      return dayjs();
    },
    //------------------------------------------------------------------------------//
    historyById(item) {
      console.log("history:" + item);
      const token = localStorage.getItem("token");
      axios
        .get("api/getOrderById/" + item, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.viewItem = res.data;
          console.log(viewItem);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/colors";
.card-cont {
  padding: 1rem;
}
.table-body {
  height: 420px;
  overflow: auto;
}
.search-bar {
  display: flex;
  justify-content: space-between;
  .search {
    width: 500px;
  }
  .card {
    background-color: #000000;
    // background-color: $green;
    padding: 0.8rem;
    display: flex;
    // width: 190px;
    height: fit-content;
    justify-content: center;
    align-items: center;
    color: white;
  }
}
.modal-content {
  padding: 1rem;
  .head-content {
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
</style>
