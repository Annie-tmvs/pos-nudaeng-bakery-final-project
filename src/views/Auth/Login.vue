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
            <h1>{{ items }}</h1>
          </div>

          <div v-if="error">
            {{ error }}
          </div>

          <v-form ref="form" v-model="valid" lazy-validation class="pa-10">
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
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      show1: false,
      password: "Password",
      valid: false,
      error: null,
      login: {
        phone_number: "",
        password: "",
      },
    };
  },

  methods: {
    //login
    async logIn() {
      if (this.$refs.form.validate() == true) {
        await axios
          .post("api/login", this.login)
          .then((res) => {
            let token = res.data.token;

            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            // localStorage.setItem("token", token);
            this.$router.replace("/");
            setTimeout(() => {
              window.location.reload();
            }, 10);
            //window.location.reload();
          })
          .catch((error) => {
            console.log(error);
            alert("ກະລຸນາກວດສອບຂໍ້ມູນຂອງທ່ານອີກຄັ້ງ !");
          });
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
