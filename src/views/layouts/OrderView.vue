<template>
  <div class="order-content">
    <div class="header-content">
      <div>
        <h2>ໜ້າລາຍການສັ່ງຊື້</h2>
        <small>Order</small>
      </div>
    </div>
    <hr class="my-3" />
    <div class="body-content">
      <div class="current-order">
        <div class="order-detail">
          <h5><b>ລາຍການສັ່ງຊື້ໃໝ່ :</b></h5>
          <div class="card-cont">
            <div class="card card-current">
              <h6>
                ສິນຄ້າລໍຖ້າດຳເນີນການ:
                <b class="text-warning">
                  {{ items.filter((item) => item.status == 0).length }}</b
                >
                ສິນຄ້າ
              </h6>
            </div>
            <div class="card card-old">
              <h6>
                ສິນຄ້າທີ່ດຳເນີນການສຳເລັດ:
                <b> {{ items.filter((item) => item.status == 1).length }}</b>
                ສິນຄ້າ
              </h6>
            </div>
          </div>
        </div>
        <order-card />
      </div>
      <div class="accept-order">
        <h5><b>ລາຍການສັ່ງຊື້ທີ່ຈັດສົ່ງແລ້ວ :</b></h5>
        <old-order-card />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OrderCard from "@/components/layout/order/OrderCard.vue";
import OldOrderCard from "@/components/layout/order/OldOrderCard.vue";
export default {
  components: { OrderCard, OldOrderCard },
  data() {
    return {
      items: "",
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
      .then((res) => (this.items = res.data));
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
.order-content {
  padding: 2rem 1.5rem;
  height: 100vh;
  overflow: auto;
  width: 100%;
  background-color: $gray;
  .header-content {
    display: flex;
    gap: 5rem;
    align-items: end;
  }
  h2 {
    font-weight: bold;
  }
}
.body-content {
  padding: 1rem;
  //   background-color: #fff;
  .current-order {
    margin-bottom: 2rem;
  }
  .order-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-cont {
      display: flex;
      gap: 1rem;
      .card-current {
        background-color: #1f1f1f;
        padding: 1rem;
        display: flex;
        height: fit-content;
        justify-content: center;
        align-items: center;
        color: white;
      }
      .card-old {
        background-color: #000000;
        padding: 1rem;
        display: flex;
        height: fit-content;
        justify-content: center;
        align-items: center;
        color: rgb(255, 255, 255);
        b {
          color: rgb(36, 225, 30);
        }
      }
    }
  }
}
</style>
