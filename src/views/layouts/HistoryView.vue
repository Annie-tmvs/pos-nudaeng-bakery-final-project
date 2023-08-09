<template>
  <div class="history-content">
    <div class="header-content">
      <div>
        <h2>ໜ້າປະວັດການຂາຍ</h2>
        <small>History</small>
      </div>
      <v-spacer></v-spacer>
      <h6 class="px-2">
        <b>ເວລາ: {{ new Date().toLocaleString("nl") }}</b>
      </h6>
    </div>
    <hr class="my-3" />
    <div class="table-content">
      <b-tabs
        content-class="mt-3"
        justified
        pills
        card
        nav-class="bg-secondary d-flex align-items-center rounded"
        active-nav-item-class="font-weight-bold text-uppercase bg-dark text-white py-3 rounded"
      >
        <b-tab title="ປະຫວັດມື້ນີ້" active title-link-class="text-white ">
          <today-history />
        </b-tab>
        <b-tab title="ປະຫວັດທັງໝົດ" title-link-class="text-white">
          <history-table />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import TableFilter from "@/components/layout/history/TableFilter.vue";
import TableFilterTwo from "@/components/layout/history/TableFilterTwo.vue";
import HistoryTable from "@/components/layout/history/historyTable.vue";
import TodayHistory from "@/components/layout/history/todayHistory.vue";
export default {
  components: { TableFilter, TableFilterTwo, HistoryTable, TodayHistory },
  methods: {
    moment: function () {
      return moment();
    },
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
.history-content {
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
</style>
