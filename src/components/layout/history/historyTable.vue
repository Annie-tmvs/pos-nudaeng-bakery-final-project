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
            ຍອດຂາຍມື້ນີ້: <b class="text-info"> {{ items.length }}</b> ສິນຄ້າ
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
            @click="viewInfo(view.id)"
            v-b-modal.modal-scrollable
            >View</b-button
          >
        </template>
      </v-data-table>
    </v-card>

    <!-- modal -->
    <b-modal
      id="modal-scrollable"
      hide-header
      hide-footer
      size="lg"
      scrollable
      title="Scrollable Content"
      v-if="view"
    >
      <div :value="view.id">
        <div>
          <h3 style="display: flex; justify-content: center">
            {{ view }}
          </h3>

          <div>
            <table class="table">
              <tbody>
                <tr>
                  <td>gender:</td>
                  <td>{{ view.firstname }}</td>
                </tr>
              </tbody>
            </table>
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
        { text: "ພະນັກງານ", value: "user_id" },
        { text: "ຈຳນວນສິນຄ້າ", value: "quantity_total" },
        { text: "ລາຄາລວມ", value: "price_total" },
        { text: "ຊຳລະ", value: "receipt_image" },
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

        const view = await axios.get("api/order", {
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
</style>
