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
            <h6>
              ຍອດຂາຍມື້ນີ້:
              <b class="text-warning">
                {{
                  items.filter(
                    (item) =>
                      moment(item.created_at).format("L") ==
                      moment().format("L")
                  ).length
                }}</b
              >
              ສິນຄ້າ
            </h6>
          </div>
          <div class="card">
            <h6>
              ຍອດຂາຍທັງໝົດ: <b class="text-info"> {{ items.length }}</b> ສິນຄ້າ
            </h6>
          </div>
        </div>
      </v-card-title>
      <v-data-table
        class="table-body"
        :headers="headers"
        :items="items"
        :search="search"
      >
        <template v-slot:item.created_at="{ item }">
          {{ moment().format("DD.MM.YYYY") }}
          {{ item.created_at }}
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
      <b-modal id="modal-scrollable" size="lg" hide-footer scrollable>
        <div class="modal-content">
          <div class="head-content">
            <h4 class="text-center">ລາຍລະອຽດ</h4>
            <h6 class="text-center">ລະຫັດບິນ: {{ viewItem.id }}</h6>
            <div class="customer-info">
              <div>
                <p class="mt-1">
                  User Id: {{ viewItem.user_id }}, <br />
                  Role:
                  {{ viewItem.customer.roles }}
                </p>
                <h6>
                  ຊື່: {{ viewItem.customer.firstname }}
                  {{ viewItem.customer.lastname }}
                </h6>
                <h6>ເບີໂທ: 59863141</h6>
              </div>
              <div>
                <h6>
                  ວັນທີ: {{ moment(viewItem.created_at).format("DD/MM/YYYY") }}
                </h6>
                <h6>
                  ເວລາ : {{ moment(viewItem.created_at).format("hh:mm a") }}
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
                      <th>ຊື່ສິນຄ້າ</th>
                      <th>ຈຳນວນ</th>
                      <th>ລາຄາ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ເຄັກຊ໊ອກໂກ້ແລັດ</td>
                      <td>1</td>
                      <td>75000 kip</td>
                    </tr>
                  </tbody>
                </table>
                <div class="total-content">
                  <p>
                    <b>ລາຄາລວມ: </b><span class="text-warning">75000</span> kip
                  </p>
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
export default {
  data() {
    return {
      originalDate: "2023-08-04T19:41:49.000000Z",
      search: "",
      historyDetail: [],
      viewItem: null,
      items: [],
      headers: [
        {
          text: "ເລກບິນ",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "ລະຫັດພະນັກງານ", value: "user_id" },
        { text: "ເວລາ", value: "created_at" },
        // { text: "ວັນທີ", value: "created_at" },

        { text: "ລາຄາລວມ", value: "price_total" },
        // { text: "ຊຳລະ", value: "receipt_image" },
        { text: "action", value: "action" },
      ],
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("api/order", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        this.items = response.data.reverse();
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
    format_date(value) {
      if (value) {
        return moment(String(value)).format("L");
      }
    },
    //------------------------------------------------------------------------------//
    historyById(item) {
      console.log("history:" + item);
      const token = localStorage.getItem("token");
      axios
        .get("api/order/" + item, {
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
  computed: {
    formattedDate() {
      return moment(this.originalDate).format("YYYY-MM-DD");
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
  height: 430px;
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
    width: 190px;
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
