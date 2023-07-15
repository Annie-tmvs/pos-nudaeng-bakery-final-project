<template>
  <div class="products-content">
    <div class="header-content">
      <div>
        <h2>ໜ້າຈັດການສິນຄ້າ</h2>
        <small>Products</small>
      </div>
    </div>
    <hr class="my-3" />
    <!-- list type -->
    <div class="type-list-content">
      <h5><b>ລາຍການສິນຄ້າ</b></h5>
      <div class="form-content">
        <div>
          <input
            type="text"
            v-model="search"
            class="search-bar"
            placeholder="ຄົ້ນຫາ"
          />
        </div>
        <div class="btn btn-add"><p>ເພີ່ມເມນູສິນຄ້າ</p></div>
      </div>

      <div class="table-content">
        <table class="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>ຮູບພາບ</th>
              <th>ຊື່ປະເພດສິນຄ້າ</th>
              <th>ຊື່ສິນຄ້າ</th>
              <th>ລາຍລະອຽດ</th>
              <th>ຈຳນວນ</th>
              <th>ລາຄາ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>image</td>
              <td>typename</td>
              <td>name</td>
              <td>description</td>
              <td>quantity</td>
              <td>price</td>
              <td class="btn-col">
                <div class="btn btn-primary">ແກ້ໄຂ</div>
                <div class="btn btn-danger">ລຶບ</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/scss/colors";
* {
  padding: 0;
  margin: 0;
  text-decoration: none;
  list-style: none;
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
.form-content {
  display: flex;
  width: fill;
  justify-content: space-between;
  align-items: end;
  .btn-add {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    height: fit-content;
    border: 1px solid rgb(0, 0, 0);
    color: rgb(0, 0, 0);
    background-color: #f2c942;
    height: 35px;
    width: 120px;
  }
}
.products-content {
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
//table
.btn-col {
  .btn {
    margin-right: 1rem;
    width: 70px;
    height: 30px;
  }
}
.table-content {
  height: 360px;
  overflow: auto;
}
.table {
  th {
    padding-bottom: 1.5rem;
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
    height: 50px;
  }
}
</style>
