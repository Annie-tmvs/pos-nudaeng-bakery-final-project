<template>
  <v-app class="content">
    <v-main class="d-flex align-center justify-center">
      <v-col cols="8" sm="10" md="10" lg="6" class="mx-auto">
        <v-card class="card-cont elevation-6">
          <div class="card-img">
            <img
              src="https://media.discordapp.net/attachments/905843816697835591/1117780590830305350/IMG_1432.png?width=625&height=625"
            />
          </div>
          <div class="card-title">
            <h2>ເຂົ້າສູ່ລະບົບ</h2>
          </div>
          <h5 class="text-center">POS Nudaeng Bakery</h5>
          <div v-if="error">
            {{ error }}
          </div>

          <v-form ref="form" v-model="valid" lazy-validation class="mt-5">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8">
                <v-text-field
                  v-model="login.phone_number"
                  placeholder="ເບີໂທລະສັບ"
                  prepend-inner-icon="mdi-phone-outline"
                  density="compact"
                  required
                  variant="outlined"
                  dense
                ></v-text-field>
                <v-text-field
                  v-model="login.password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  density="compact"
                  placeholder=" ລະຫັດຜ່ານ"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  dense
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-btn color="light" dark block class="btn" @click="logIn"
                  >ເຂົ້າສູ່ລະບົບ</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-main>
  </v-app>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      show1: false,
      password: "Password",
      valid: false,
      error: null,
      login: { phone_number: "", password: "" },
    };
  },

  methods: {
    //login
    // login() {
    //   axios
    //     .post("/api/login", {
    //       phone_number: this.phone_number,
    //       password: this.password,
    //     })
    //     .then((response) => {
    //       const token = response.data.token;
    //       localStorage.setItem("token", token);
    //       // Redirect to dashboard or other page
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //       this.errors.push(error.response.data.message);
    //     });
    // },

    async logIn() {
      if (this.$refs.form.validate() == true) {
        await axios
          .post("api/login", this.login)
          .then((res) => {
            if (res.data.user.roles == "Customer") {
              // alert("ທ່ານບໍ່ມີສິດເຂົ້າເຖິງ !");
              Swal.fire({
                position: "center",
                icon: "error",
                title: "ທ່ານບໍ່ມີສິດເຂົ້າເຖິງ !!",
                text: "something was wrong !!",
                showConfirmButton: true,
                width: 600,
                padding: "3em",
                iconColor: "crimson",
                confirmButtonText: "ຕົກລົງ",
                confirmButtonColor: "#1d2186",
              });
              return;
            }
            Swal.fire({
              position: "center",
              icon: "success",
              title: "ເຂົ້າສູ່ລະບົບສຳເລັດ !",
              text: "Successful !",
              showConfirmButton: false,
              iconColor: "limegreen",
              width: 600,
              padding: "3em",
              timer: 1500,
            });
            console.log(res.data);
            let token = res.data.token;
            localStorage.setItem("id", res.data.user.id);

            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("token", token);
            this.$router.replace("/");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            // window.location.reload();
          })
          .catch((error) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "ກະລຸນາກວດສອບຂໍ້ມູນຂອງທ່ານອີກຄັ້ງ !",
              text: "something was wrong !!",
              showConfirmButton: true,
              width: 600,
              padding: "3em",
              iconColor: "crimson",
              confirmButtonText: "ຕົກລົງ",
              confirmButtonColor: "#1d2186",
            });
            console.log(error);
            // alert("ກະລຸນາກວດສອບຂໍ້ມູນຂອງທ່ານອີກຄັ້ງ !");
          });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "ກະລຸນາກວດສອບສິດຂອງທ່ານອີກຄັ້ງ !",
          text: "something was wrong !!",
          showConfirmButton: true,
          width: 600,
          padding: "3em",
          iconColor: "crimson",
          confirmButtonText: "ຕົກລົງ",
          confirmButtonColor: "#1d2186",
        });
        // alert("ກະລຸນາກວດສອບສິດຂອງທ່ານອີກຄັ້ງ !");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/colors";
* {
  font-family: "Noto Sans Lao", sans-serif;
}
.content {
  display: flex;
  height: 100vh;
  width: calc(100% - 240px);
  justify-content: center;
  align-items: center;
  .card-cont {
    height: 480px;
    width: 550px;
    display: flex;
    flex-direction: column;
    background-color: $yellow;
    .card-img {
      display: flex;
      justify-content: center;
      img {
        height: 150px;
        width: 150px;
      }
    }
    .card-title {
      display: flex;
      justify-content: center;
      font-weight: 600;
    }
    .btn {
      margin-top: 1rem;
    }
  }
}
</style>
