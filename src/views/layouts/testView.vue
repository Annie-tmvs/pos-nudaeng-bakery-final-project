<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-body">
        <h3>Item</h3>
        <label>Name</label> <label style="margin-left: 400px">Price</label>
        <div v-for="(item, index) in form" :key="item">
          <div class="row">
            <div class="col-sm-5">
              <input type="text" class="form-control" v-model="item.name" />
            </div>
            <!-------------------------- price input ------------------------------------------------>
            <div class="col-sm-5">
              <input
                @change="total_price = $event.target.value"
                type="number"
                class="form-control"
                v-model="item.price"
              />
            </div>
            <div class="col-sm-2 pt-4">
              <button
                type="button"
                class="btn btn-success btn-sm"
                @click="addRow"
              >
                +</button
              >&nbsp;
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="removeRow(index)"
              >
                x
              </button>
            </div>
          </div>
        </div>

        <button type="button" class="btn btn-success mt-3" @click="saveItem">
          Save
        </button>
      </div>
    </div>
    <!-- //-----------------------------------// -->
    <p>{{ total_price }}</p>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    const form = reactive([{ name: "", price: 0 }]);
    const onPress = () => {};
    //-----------------------------------------------------------//
    const addRow = () => {
      form.push({ name: "", price: 0 });

      let total_price = 0;
      this.form.forEach((value) => {
        // total_price += Number(value.price);
      });
      this.total_price = total_price;
    };
    //-------------------------------------------------------//
    const removeRow = (index) => {
      if (form.length > 1) {
        form.splice(index, 1);
      }
    };

    const saveItem = () => {
      // axios
      axios.post("items", form).then((res) => {
        console.log(res);
      });
    };
    return {
      total_price: 0,
      onPress,
      form,
      addRow,
      saveItem,
      removeRow,
    };
  },
};
</script>

<style></style>
