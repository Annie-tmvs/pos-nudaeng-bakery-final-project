<template>
  <div class="type-products-content">
    <div class="header-content">
      <div>
        <h2>ໜ້າຈັດການປະເພດສິນຄ້າ</h2>
        <small>Product Type</small>
      </div>
    </div>
    <hr class="my-3" />
    <div class="body">
      <div class="form-content">
        <h5><b>ເພີ່ມປະເພດສິນຄ້າ</b></h5>
        <div class="form-group">
          <div>
            <p for="type-product">ຊື່ປະເພດສິນຄ້າ:</p>
            <input
              class="input-text"
              type="text"
              placeholder="ຊື່ປະເພດສິນຄ້າ"
            />
          </div>
          <div>
            <p for="slug">Slug:</p>
            <input class="input-text" type="text" placeholder="slug" />
          </div>
          <div>
            <p for="slug">ຮູບພາບ:</p>
            <input
              class="upload-file"
              type="file"
              accept="image/*"
              placeholder="ເພີ່ມຮູບພາບ"
            />
          </div>
          <div class="btn-content">
            <div class="button btn">ເພີ່ມ</div>
          </div>
        </div>
      </div>
      <!-- list type -->
      <div class="type-list-content">
        <h5><b>ລາຍການປະເພດສິນຄ້າ</b></h5>
        <div>
          <input
            type="text"
            v-model="search"
            class="search-bar"
            placeholder="ຄົ້ນຫາ"
          />
        </div>
        <div class="table-content">
          <table class="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>ຮູບພາບ</th>
                <th>ຊື່ປະເພດສິນຄ້າ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>id</td>
                <td>image</td>
                <td>name</td>
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
.type-products-content {
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
.form-group {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}
.input-text {
  width: 15rem;
  height: 2.5rem;
  border: 1px solid black;
  background-color: white;
  border-radius: 5px;
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  font-size: 13px;
}
.upload-file {
  width: 15rem;
  height: 2.5rem;
  border: 1px solid black;
  background-color: white;
  border-radius: 5px;
  margin: 0.5rem 0;
  font-size: 15px;
}
.btn-content {
  display: flex;
  align-items: center;
  padding: 2rem 0;
  .button {
    color: white;
    background-color: rgb(0, 0, 0);
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 2.5rem;
    &:hover {
      color: rgb(0, 0, 0);
      background-color: $yellow;
    }
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
    padding-left: 2rem;
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
    padding-left: 2rem;
    width: 100% * 0.2;
    height: 50px;
  }
}
</style>
