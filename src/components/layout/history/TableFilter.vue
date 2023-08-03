<template>
  <div>
    <!-- <input type="text" v-model="search" /> -->
    <div class="top-content">
      <input
        type="text"
        v-model="search"
        class="search-bar"
        placeholder="ຄົ້ນຫາ"
      />
      <div class="d-flex gap-3">
        <div class="card">
          <h6>
            ຍອດຂາຍມື້ນີ້: <b class="text-info"> {{ items.length }}</b> ສິນຄ້າ
          </h6>
        </div>
        <!-- <div class="card">
          <h6>
            ຍອດຂາຍມື້ນີ້: <b class="text-info"> {{ items.length }}</b> ສິນຄ້າ
          </h6>
        </div> -->
      </div>
    </div>

    <div class="table-content">
      <!-- {{ items }} -->
      <table class="table">
        <thead>
          <tr>
            <th>ເລກບິນ</th>
            <th>ວັນທີ & ເວລາ</th>
            <th>ພະນັກງານ</th>
            <th>ຈຳນວນສິນຄ້າ</th>
            <th>ລາຄາລວມ</th>
            <th>ລາຍລະອຽດ</th>
          </tr>
        </thead>

        <tbody v-for="(item, i) in items" :key="i">
          <tr class="table-body">
            <td>{{ item.userId }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div class="btn-view" @click="item.id = !item.id">
                <i
                  v-if="!item.id"
                  class="fa-solid fa-eye fa-md"
                  style="color: green"
                ></i>
                <i
                  v-else-if="item.id"
                  class="fa-solid fa-eye-slash fa-md"
                  style="color: red"
                ></i>
                <span>{{ item.id ? " ປິດ" : "ສະແດງ" }}</span>
              </div>
            </td>
          </tr>

          <tr v-if="item.id">
            <td colspan="6" class="accordion-content">
              <div class="accordion-table">
                <table class="table" height="150px">
                  <thead>
                    <tr collaps="4">
                      {{
                        item.id
                      }}
                    </tr>
                    <tr>
                      <td>ລຳດັບ</td>
                      <td>ຊື່ສິນຄ້າ</td>
                      <td>ຈຳນວນ</td>
                      <td>ລາຄາ</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.</td>
                      <td>cake</td>
                      <td>quantity</td>
                      <td>price</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div class="pagination"> -->
      <!-- <b-pagination
        class="pagination-btn"
        :total-rows="totalRows"
        v-model="currentPage"
        :per-page="perPage"
        aria-controls="my-table"
      /> -->
      <!-- <div
        tag="button"
        class="btn pagination-btn"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        <i class="fa-solid fa-angles-left"></i>
      </div>
      <div>
        <span class="pagination-info">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
      </div>
      <div
        tag="button"
        class="btn pagination-btn"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        <i class="fa-solid fa-angles-right"></i>
      </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fab: true,
      opened: [],
      search: "",
      currentPage: 1,
      perPage: 6,
      paginatedItems: [],
      items: "",
    };
  },
  mounted() {
    axios
      .get("/posts", {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((res) => {
        this.items = res.data.reverse();
        this.paginatedItems = this.items.slice(
          (this.currentPage - 1) * this.perPage,
          this.currentPage * this.perPage
        );
      });
  },

  // computed: {
  //   filteredAndDisplayedItems() {
  //     const filteredItems = this.items.filter((item) => {
  //       return item.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
  //     });
  //     const start = (this.currentPage - 1) * this.itemsPerPage;
  //     const end = start + this.itemsPerPage;
  //     const displayedItems = filteredItems.slice(start, end);
  //     return displayedItems;
  //   },
  //   totalPages() {
  //     return Math.ceil(this.items.length / this.itemsPerPage);
  //   },
  // },
};
</script>

<style lang="scss" scoped>
@import "@/scss/colors";
.top-content {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  margin-bottom: 1rem;
  .card {
    background-color: #000000;
    // background-color: $green;
    padding: 1rem;
    display: flex;
    width: 190px;
    height: fit-content;
    justify-content: center;
    align-items: center;
    color: white;
  }
}
.search-bar {
  width: 30rem;
  height: 2.5rem;
  border: 0px solid black;
  background-color: white;
  border-radius: 15px;
  margin: 1rem 0;
  padding-left: 1.5rem;
  font-size: 13px;
  // margin: 2rem 1rem 1rem 0;
}
.table-content {
  display: flex;
  width: 100%;
  height: 380px;
  overflow: auto;
  padding: 1rem;
  background-color: white;
  border-radius: 5px 5px 0 0;
  th {
    position: sticky;
  }
}
.btn-view {
  cursor: pointer;
  span {
    padding: 0 10px;
  }
}
.accordion-content {
  background-color: $gray;
  padding: 1.5rem 1rem;
  .accordion-table {
    padding: 1rem 2rem;
    background-color: #fff;
    border-radius: 10px;
  }
}
.table-body {
  height: 50px;
}
.pagination {
  display: flex;
  width: 100%;
  background-color: black;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  gap: 1rem;
  color: white;

  .btn {
    background-color: $blue;
    color: white;
  }
}
</style>
