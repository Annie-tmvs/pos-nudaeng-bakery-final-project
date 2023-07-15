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

        <tbody v-for="(item, i) in filteredAndDisplayedItems" :key="i">
          <tr class="table-body">
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.name }}</td>
            <td>
              <div
                class="btn-view"
                @click="item.showDetails = !item.showDetails"
              >
                <i
                  v-if="!item.showDetails"
                  class="fa-solid fa-eye fa-md"
                  style="color: green"
                ></i>
                <i
                  v-else-if="item.showDetails"
                  class="fa-solid fa-eye-slash fa-md"
                  style="color: red"
                ></i>
                <span>{{ item.showDetails ? " ປິດ" : "ສະແດງ" }}</span>
              </div>
            </td>
          </tr>
          <tr v-if="item.showDetails">
            <td colspan="6" class="accordion-content">
              <div class="accordion-table">
                <table class="table" height="150px">
                  <thead>
                    <tr collaps="4">
                      {{
                        item.acc
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
export default {
  data() {
    return {
      opened: [],
      search: "",
      currentPage: 1,
      itemsPerPage: 5,
      items: [
        {
          name: "item 1",
          type: "type 1",
          showDetails: false,
          acc: "acc 1",
          visible: true,
        },
        {
          name: "item 2",
          type: "type 2",
          showDetails: false,
          acc: "acc 2",
          visible: true,
        },
        {
          name: "item 3",
          type: "type 3",
          showDetails: false,
          acc: "acc 3",
          visible: true,
        },
        {
          name: "item 1",
          type: "type 1",
          showDetails: false,
          acc: "acc 1",
          visible: true,
        },
        {
          name: "item 2",
          type: "type 2",
          showDetails: false,
          acc: "acc 2",
          visible: true,
        },
        {
          name: "item 3",
          type: "type 3",
          showDetails: false,
          acc: "acc 3",
          visible: true,
        },
        {
          name: "item 1",
          type: "type 1",
          showDetails: false,
          acc: "acc 1",
          visible: true,
        },
        {
          name: "item 2",
          type: "type 2",
          showDetails: false,
          acc: "acc 2",
          visible: true,
        },
        {
          name: "item 3",
          type: "type 3",
          showDetails: false,
          acc: "acc 3",
          visible: true,
        },
        {
          name: "item 2",
          type: "type 2",
          showDetails: false,
          acc: "acc 2",
          visible: true,
        },
        {
          name: "item 3",
          type: "type 3",
          showDetails: false,
          acc: "acc 3",
          visible: true,
        },
        {
          name: "item 2",
          type: "type 2",
          showDetails: false,
          acc: "acc 2",
          visible: true,
        },
        {
          name: "item 3",
          type: "type 3",
          showDetails: false,
          acc: "acc 3",
          visible: true,
        },
      ],
    };
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
  margin: 1rem 0;
  padding-left: 1.5rem;
  font-size: 13px;
  // margin: 2rem 1rem 1rem 0;
}
.table-content {
  display: flex;
  width: 100%;
  padding: 1rem;
  background-color: white;
  border-radius: 5px 5px 0 0;
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
