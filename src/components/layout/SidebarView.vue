<template>
  <div>
    <nav>
      <div class="sidebar">
        <div class="logo-content">
          <div class="logo-icon">
            <img
              src="https://media.discordapp.net/attachments/905843816697835591/1117780590830305350/IMG_1432.png?width=625&height=625"
              class="d-inline-block"
              alt="logo"
              width="100px"
            />
          </div>
          <div class="logo-name">Nudaeng Bakery</div>
        </div>
        <div class="px-3">
          <hr />
        </div>
        <ul class="nav-list">
          <li>
            <router-link tag="a" to="/" exact
              ><i id="btn" class="fa-solid fa-utensils fa-md p-2"></i>
              <span>ເມນູ</span></router-link
            >
          </li>
          <li>
            <router-link tag="a" to="/order">
              <i id="btn" class="fa-solid fa-bell fa-md p-2"></i
              ><span>ສັ່ງຊື້</span>
              <div class="report d-flex">
                <div>
                  2
                  <!-- {{ items.filter((item) => item.id === 1).length }} -->
                </div>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/history">
              <i id="btn" class="fa-solid fa-clipboard-list fa-md p-2"></i
              ><span>ປະວັດການຂາຍ</span></router-link
            >
          </li>

          <!-- <li>
            <router-link tag="a" to="/type-product"
              ><i id="btn" class="fa-solid fa-cubes-stacked fa-md p-2"></i>
              <span>ປະເພດສິນຄ້າ</span></router-link
            >
          </li>
          <li>
            <router-link tag="a" to="/product-manage"
              ><i id="btn" class="fa-solid fa-cookie-bite fa-md p-2"></i
              ><span>ສິນຄ້າ</span></router-link
            >
          </li>
          <li>
            <router-link tag="a" to="/ingredient-manage"
              ><i id="btn" class="fa-solid fa-wheat-awn fa-md p-2"></i>
              <span>ວັດຖຸດິບ</span></router-link
            >
          </li>  -->
        </ul>
        <div class="profile-content">
          <div class="profile">
            <div class="profile-image">
              <img
                src="https://media.discordapp.net/attachments/899150665358655518/1100442977744207943/166582e5408b6e5b6b0021e854f3901d.png?width=662&height=662"
                class="d-inline-block"
                alt="logo"
              />
            </div>
            <div class="detail-content">
              <div class="profile-detail" v-for="u in user" :key="u">
                <h6>{{ u.id }}</h6>
                <p>Position</p>
              </div>
              <log-out-form />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import LogOutForm from "../auth/LogOutForm.vue";
export default {
  components: { LogOutForm },

  data() {
    return {
      items: "",
      user: "",
    };
  },
  mounted() {
    // axios.get("/users").then((res) => (this.user = res.data));
  },

  methods: {
    Logout() {
      localStorage.clear();
      window.location.reload();
      this.$router.push("/");
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
.report {
  display: flex;
  padding: 5px;
  margin-left: 2rem;
  justify-content: end;
  color: red;
  // background-color: red;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
}
nav {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  background-color: $yellow;
  height: 100%;
  width: 240px;
  justify-content: center;
  text-align: center;

  .logo-content {
    margin-bottom: 1.5rem;

    .logo-name {
      font-size: 20px;
      font-weight: 800;
      padding-right: 1rem;
    }
  }
  .nav-list {
    margin: 1rem;
    #btn {
      font-size: 20px;
    }
    li {
      height: 50px;
      width: fill;
      margin: 5px 0;
      a {
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        font-size: 18px;
        color: black;
        border-radius: 10px;
        transition: all 0.4s ease;
        i {
          margin: 0 5px;
          width: 50px;
        }
        &:hover {
          background-color: rgb(0, 0, 0);
          color: white;
        }
        &:focus {
          background-color: rgb(0, 0, 0);
          color: white;
        }
      }
    }
    a.router-link-active {
      background-color: rgb(0, 0, 0);
      color: white;
    }
  }
}

.profile-content {
  .profile {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    padding: 1rem;
    height: 60;
    width: fill;
    background-color: #1a1a1a;
    .profile-image {
      img {
        object-fit: cover;
        height: 45px;
        width: 45px;
        border-radius: 12px;
      }
    }
    .detail-content {
      display: flex;
      width: fill;
      justify-content: space-between;
    }
    .profile-detail {
      font-size: 12px;
      margin-left: 10px;
      font-weight: 600;
      color: white;

      p {
        font-weight: normal;
        font-size: 10px;

        text-align: left;
      }
    }
  }
}
</style>
