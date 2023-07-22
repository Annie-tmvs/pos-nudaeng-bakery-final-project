<template>
  <div class="history-content">
    <div class="header-content">
      <div>
        <h2>ໜ້າປະວັດການຂາຍ</h2>
        <small>History</small>
      </div>
    </div>
    <hr class="my-3" />
    <div class="table-content">
      <history-table />
    </div>
  </div>
</template>

<script>
import TableFilter from "@/components/layout/history/TableFilter.vue";
import TableFilterTwo from "@/components/layout/history/TableFilterTwo.vue";
import HistoryTable from "@/components/layout/history/historyTable.vue";
export default {
  components: { TableFilter, TableFilterTwo, HistoryTable },
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
