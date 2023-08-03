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
        <div class="card">
          <h6>
            ຍອດຂາຍ: <b class="text-info"> {{ items.length }}</b> ສິນຄ້າ
          </h6>
        </div>
      </v-card-title>
      <v-data-table
        class="table-body"
        :headers="headers"
        :items="items"
        :search="search"
      >
        <template v-slot:item.created_at="{ item }">
          {{ moment(item.created_at).format("L") }}
        </template>
        <template v-slot:item.action="{ item }">
          <b-button
            variant="outline-primary"
            @click="viewInfo(item.id)"
            v-b-modal.modal-scrollable
            >View</b-button
          >
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal -->
    <b-modal id="modal-scrollable" size="lg" hide-header hide-footer scrollable>
      <div class="modal-content">
        <div class="head-content">
          <h4 class="text-center">ລາຍລະອຽດ</h4>
          <div class="customer-info">
            <div>
              <p class="mt-1">ລະຫັດບິນ: 1</p>
              <p>ຊື່ພະນັກງານ: Annie</p>
              <p>ເບີໂທ: 59863141</p>
            </div>
            <div>
              <p>ວັນທີ: 07/31/2023</p>
              <p>ເວລາ : 12:30</p>
            </div>
          </div>
          <hr class="mt-3" />
          <div class="product-detail">
            <h><b>ລາຍການສິນຄ້າ:</b></h>
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
                <p><b>ລາຄາລວມ: </b><span>75000</span> kip</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      search: "",
      items: [],
      view: [],
      headers: [
        {
          text: "ເລກບິນ",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "ເວລາ", value: "created_at" },
        { text: "ລະຫັດພະນັກງານ", value: "user_id" },
        // { text: "ຈຳນວນສິນຄ້າ", value: "quantity_total" },
        { text: "ລາຄາລວມ", value: "price_total" },
        // { text: "ຊຳລະ", value: "receipt_image" },
        { text: "action", value: "action" },
      ],
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("api/alload", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        this.items = response.data;
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    moment: function () {
      return moment();
    },
    async viewInfo(id) {
      if (id !== null) {
        const token = localStorage.getItem("token");

        const view = await axios.get("api/order/alload", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        this.view = view.data;
        console.log(view);
      }
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
