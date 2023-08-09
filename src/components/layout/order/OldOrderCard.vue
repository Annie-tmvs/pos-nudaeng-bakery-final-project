<template>
  <div>
    <div class="card-content">
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
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          class="table-body"
          :headers="headers"
          :items="info"
          :search="search"
        >
          <template v-slot:item.created_at="{ item }">
            {{ new Date(item.created_at).toLocaleString() }}
          </template>
          <template v-slot:item.status="{ item }">
            <i class="fa-solid fa-circle-check fa-md p-2 text-success"></i
            ><span>ດຳເນີນການສຳເລັດ</span>
          </template>
          <template v-slot:item.action="{ item }">
            <div class="d-flex flex-row gap-2">
              <div tag="btn" v-b-modal.modal4 @click="oldOrderById(item.id)">
                <p style="color: #e0852a">
                  <i class="fa-solid fa-file-lines fa-sm p-2"></i>
                  ລາຍລະອຽດ
                </p>
              </div>
              <p>||</p>
              <div
                tag="btn"
                v-b-modal.modal5
                variant="primary"
                @click="printById(item.id)"
              >
                <p style="color: #304cb5">
                  <i class="fa-solid fa-print fa-sm p-2"></i> Print
                </p>
              </div>
            </div>
            <!-- <div class="d-flex justify-content-end mt-3">
              <b-button
                v-b-modal.modal5
                variant="primary"
                @click="printById(item.id)"
              >
                <i class="fa-solid fa-print fa-sm p-2"></i> Print
              </b-button>
            </div> -->
          </template>
        </v-data-table>
      </v-card>
      <!-- <table class="table table-first">
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
        <tbody v-for="(item, i) in infoFilter" :key="i.id">
          <tr v-if="item.status == 1">
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
                v-b-modal.modal4
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
      </table> -->
    </div>

    <!-- Modal -->
    <div v-if="oldOrderID">
      <b-modal id="modal4" size="lg" hide-footer>
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
    <!-- modal bill---------------------------------------------------------------------------------------------->
    <div v-if="print">
      <b-modal id="modal5" size="md" hide-footer class="modal-content">
        <!-- {{ print }} -->
        <div id="pdfRef">
          <div class="my-5 bill-content">
            <div class="d-flex justify-content-center">
              <img width="180" alt="image" src="../../../assets/nudaeng.png" />
            </div>
            <div class="text-center mb-3">
              <h6>RECEIPT</h6>
              <p>Nudaeng Bakery</p>
              <p class="mt-2">Tel: 020 98256261</p>
            </div>
            <div class="py-2">
              <div
                class="d-flex flex-row justify-content-between align-items-end"
              >
                <div>
                  <p>
                    <small><b>ຕິດຕາມ:</b></small>
                  </p>
                  <h6><small>Instagram: nudaeng_bakery</small></h6>
                  <h6><small>Facebook: Nudaeng Bakery</small></h6>
                </div>
                <div>
                  <p>
                    <small><b>ລະຫັດບິນ: </b>{{ print.id }}</small>
                  </p>
                  <h6>
                    <small
                      >ວັນທີ:
                      {{
                        new Date(print.created_at)
                          .toLocaleString()
                          .substring(0, 8)
                      }}</small
                    >
                  </h6>
                  <h6>
                    <small
                      >ເວລາ:
                      {{
                        new Date(print.created_at)
                          .toLocaleString()
                          .substring(21, 9)
                      }}</small
                    >
                  </h6>
                </div>
              </div>
            </div>
            <div>
              <h6><b>ລູກຄ້າ: </b>{{ print.firstname }}</h6>
              <h6><b>ເບີຕິດຕໍ່: </b>{{ print.tel }}</h6>
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
                  <tr v-for="(pro, i) in print.order_detail" :key="i">
                    <td class="text-start">{{ pro.name }}</td>
                    <td>{{ pro.quantity }}</td>
                    <td>{{ pro.price }} kip/ {{ pro.unit }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="text-start" collapse="3">
                    <td colspan="3">
                      <b>ລາຄາລວມ: </b>{{ print.price_total }} ກີບ
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div
              style="
                word-wrap: break-word;
                white-space: pre-wrap;
                white-space: -moz-pre-wrap;
                white-space: -pre-wrap;
                white-space: -o-pre-wrap;
                padding-bottom: 5rem;
              "
            >
              <h6>
                <b>ສະຖານທີ່ຈັດສົ່ງ: </b>
                <span>
                  {{ print.location }}
                </span>
              </h6>
            </div>
            <div class="text-center">
              <h6><b>ຂໍຂອບໃຈ</b></h6>
              <small>Thanks you !</small>
            </div>
          </div>
        </div>
        <hr class="mt-3" />
        <div class="d-flex justify-content-end">
          <button @click="exportPDF" style="width: 100px; height: 50px">
            <i class="fa-solid fa-print"></i> print
          </button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ref } from "vue";
import moment from "moment";
import axios from "axios";
export default {
  components: {},
  props: {
    user: {},
  },
  data() {
    return {
      search: "",
      info: [],
      infoFilter: [],
      showModalInfo: null,
      oldOrderID: null,
      print: [],
      items: "",
      headers: [
        {
          text: "ເລກບິນ",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "ລູກຄ້າ", value: "user_id" },
        { text: "ເວລາ", value: "created_at" },
        // { text: "role", value: "roles" },
        { text: "ສະຖານະ", value: "status" },
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
      .then((res) => {
        // this.infoFilter = res.data.filter((item) => item.roles == "Customer");
        const newinfo = res.data.filter(
          (item) => item.roles == "Customer" && item.status == "1"
        );
        this.info = newinfo.reverse();
      });
    //------------------------------------------------------------------------------------------//
    // axios
    //   .get("api/allorderwithdetail", {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   })
    //   .then((response) => {
    //     const newItem = response.data.reverse();

    //     console.log("roles allow ===>", newItem);

    //     this.items = response.data;
    //     console.log(this.items);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
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
    printById(printItem) {
      console.log("print order:" + printItem);
      const token = localStorage.getItem("token");
      axios
        .get("api/getOrderById/" + printItem, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.print = res.data;
          console.log(printItem);
        });
    },
    //------------------------------------------------------------------------------------------------//
    exportPDF() {
      const input = document.getElementById("pdfRef");
      html2canvas(input).then((canvas) => {
        const imgWidth = 124;
        const pageHeight = 100;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= pageHeight;
        const doc = new jsPDF("p", "mm");
        doc.addImage(
          canvas,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          "",
          "FAST"
        );
        heightLeft -= 148;

        // Output the PDF as a Blob
        const pdfBlob = doc.output("blob");

        // Create a URL for the Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tab
        const newTab = window.open(pdfUrl, "_blank");

        // Optionally revoke the URL after some time to free up memory
        setTimeout(() => {
          URL.revokeObjectURL(pdfUrl);
        }, 1000);

        // Wait for the new tab to load and trigger the print function
        newTab.onload = () => {
          newTab.print();
        };
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
.bill-content {
  // border: 1px solid black;
  // background-color: #c66060;
  padding: 1rem;
  top: 1rem;
}

html,
body {
  font-family: "Noto Sans Lao", sans-serif;
}

.card-cont {
  padding: 1rem;
}
.table-body {
  height: 380px;
  overflow: auto;
}
.search {
  width: 500px;
}

.card-content {
  margin: 1rem 0;
  // padding: 0 2rem;
  // height: 480px;
  overflow: auto;
  border-radius: 10px;
  // background-color: #fff;
}
.table-first {
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
