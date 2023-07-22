<template>
  <div class="app">
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
      <table class="table">
        <thead>
          <tr>
            <th>ເລກບິນ</th>
            <th>ວັນທີ & ເວລາ</th>
            <th>ພະນັກງານ</th>
            <th>ສິນຄ້າ</th>
            <th>ຈຳນວນ</th>
            <th>ລາຄາ</th>
          </tr>
        </thead>

        <tbody v-for="(item, i) in items" :key="i">
          <tr>
            <td>{{ item.id }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <div
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      opened: [],
      search: "",
      currentPage: 1,
      itemsPerPage: 6,
      items: "",
    };
  },
  mounted() {
    axios.get("/posts").then((res) => (this.items = res.data));
  },
  computed: {
    filteredAndDisplayedItems() {
      const filteredItems = this.items.filter((item) => {
        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const displayedItems = filteredItems.slice(start, end);
      return displayedItems;
    },
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
  },
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
  // margin: 1rem 0;
  padding-left: 1.5rem;
  font-size: 13px;
  margin: 1rem 1rem 1rem 0;
}
.table-content {
  display: flex;
  width: 100%;
  height: 360px;
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
  &:hover {
    color: red;
  }
}
.accordion-content {
  background-color: $gray;
  padding: 1.5rem 2rem;
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
