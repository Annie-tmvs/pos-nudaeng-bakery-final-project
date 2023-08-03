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
          <tr v-show="item.status != 1">
            <td class="td-cont1"></td>
            <td><!-- {{ item.id }} -->2</td>
            <td>
              <div class="text-secondary">
                <small
                  >user id: 4
                  <!-- {{ item.user_id }} -->
                </small>
              </div>
              <div>{{ item.name }}</div>
            </td>
            <td class="td-cont1">
              <!-- {{ moment(item.created_at).format("DD/MM/YYYY") }} -->03/07/2023
            </td>
            <td class="td-cont1">
              {{ moment(item.created_at).format("hh:ss a") }}
            </td>
            <td>
              <i class="fa-solid fa-circle-check fa-md p-2 text-success"></i
              ><span>ດຳເນີນການສຳເລັດ</span>
            </td>
            <td class="btn-content">
              <div class="btn" tag="text" v-b-modal.modal-scrollable>
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
    <b-modal id="modal-scrollable" size="lg" hide-header hide-footer scrollable>
      <div class="modal-content">
        <div class="head-content">
          <h4>ລາຍລະອຽດ</h4>
          <div class="customer-info">
            <div>
              <p class="mt-1">Order Id: 4</p>
              <p>ຊື່: Keo</p>
              <p>ເບີໂທ: 55789255</p>
            </div>
            <div>
              <p>ວັນທີ: 03/07/2023</p>
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
          <div class="payment">
            <h><b>ຕິດຄັດການຊ່ຳລະ</b></h>
            <div class="img-payment">
              <img alt="image" />
            </div>
          </div>
          <div class="location-content">
            <div class="location-des">
              <h><b>ສະຖານທີ່: </b></h>
              <p class="txt-location">ນາສ້ຽວ ຮ່ອມ 15/6</p>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <!-- <div v-if="showModalInfo">
      <b-modal
        id="modal-scrollable"
        hide-header
        hide-footer
        hide-header-close
        scrollable
        size="lg"
      >
        <div class="modal-content">
          <div class="head-content">
            <h4>ລາຍລະອຽດ</h4>
            <div class="customer-info">
              <div>
                <p class="mt-1">User Id: {{ showModalInfo.id }}</p>
                <p>
                  ຊື່: {{ showModalInfo.name }}
                  {{ showModalInfo.username }}
                </p>
              </div>
              <div>
                <p>ເວລາ : 3-7-2023, 11:35</p>
                <p>ເບີໂທ: {{ showModalInfo.phone }}</p>
              </div>
            </div>
            <hr class="mt-3" />

            <div class="product-detail">
              <h><b>ລາຍການສິນຄ້າ:</b></h>
              <div class="pro-table">
                <table class="table">
                  <thead>
                    <tr>
                      <th>ລຳດັບ</th>
                      <th>ຊື່ສຶນຄ້າ</th>
                      <th>ຈຳນວນ</th>
                      <th>ລາຄາ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>cake</td>
                      <td>2</td>
                      <td>100,000 kip</td>
                    </tr>
                  </tbody>
                </table>
                <div class="total-content">
                  <p><b>ລາຄາລວມ: </b><span>100,000</span> kip</p>
                </div>
              </div>
            </div>

            <div class="payment">
              <h><b>ຕິດຄັດການຊ່ຳລະ</b></h>
              <div class="img-payment">
                <img alt="image" />
              </div>
            </div>

            <div class="location-content">
              <div class="location-des">
                <h><b>ສະຖານທີ່: </b></h>
                <p class="txt-location">{{ showModalInfo.address }}</p>
              </div>
              <div class="map-content">
                <p><b>ແຜນທີ່: </b></p>
                <div class="googlemap">
                  <qr-code
                    text="https://maps.app.goo.gl/BeAm2gaKuFAo3xXs8?g_st=ic"
                    size="250"
                    error-level="L"
                  >
                  </qr-code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </div> -->
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
      .then((res) => {
        this.info = res.data;
      });
  },
  methods: {
    showModal(itemId) {
      const token = localStorage.getItem("token");
      axios
        .get(`api/order/${itemId}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.showModalData = res.data;
        });
    },
    updateStatus() {
      const token = localStorage.getItem("token");
      axios
        .post("api/order", {
          id: this.showModalData.id, // replace with the ID of the row you want to update
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
  },
  methods: {
    moment: function () {
      return moment();
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
  }
  .customer-info {
    padding-top: 1rem;
    display: flex;
    align-items: end;
    justify-content: space-between;
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
