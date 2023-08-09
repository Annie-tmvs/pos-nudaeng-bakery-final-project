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
              <div>
                <i id="btn" class="fa-solid fa-bell fa-md p-2"></i
                ><span>ສັ່ງຊື້</span>
              </div>
              <v-spacer></v-spacer>
              <div class="report">
                {{ items.filter((item) => item.status == 0).length }}
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
                v-if="user.img != null"
                :src="'http://127.0.0.1:8000/storage/' + user.img"
                class="d-inline-block"
                alt=""
              />
              <img
                v-else
                src="https://media.istockphoto.com/id/530838781/vector/businesswoman-profile-icon-female-portrait-flat.jpg?s=612x612&w=0&k=20&c=0DXhfFseSQGQzHLbxbn93XEnGvu-aXabGnvJiA6Ulx8="
                class="d-inline-block"
                alt=""
              />
            </div>
            <div class="detail-content">
              <div class="profile-detail">
                <p>Id: {{ user.id }} | {{ user.roles }}</p>
                <h6 class="text-start">
                  <small>{{ user.firstname }}</small>
                </h6>
              </div>
              <log-out-form />
            </div>
          </div>
          <!-- toollip---------------------------------------------------------------------------- -->
          <!-- <b-tooltip target="tooltip-target" triggers="hover" variant="light">
            <div class="px-2 text-start">
              <p>ID: {{ user.id }}</p>
              <p>Role: {{ user.roles }}</p>
              <p>Name: {{ user.firstname }} {{ user.lastname }}</p>

              <h6></h6>
            </div>
          </b-tooltip> -->
          <!-- toollip---------------------------------------------------------------------------- -->
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
      order: "",
    };
  },
  mounted() {
    // axios
    //   .get("api/users/")
    //   .then((response) => {
    //     this.user = response.data;
    //     console.log(response);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    console.log("hiiiii user" + id);
    axios
      .get("api/users/selOne/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios
      .get("api/order", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        this.items = response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  methods: {
    // Logout() {
    //   localStorage.clear();
    //   window.location.reload();
    //   this.$router.push("/");
    // },
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
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  width: 30px;
  height: 30px;
  color: white;
  background-color: rgb(219, 20, 20);
  border-radius: 10px;
  font-size: 14px;
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
    height: 100px;

    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    padding: 0.8rem;
    width: fill;
    background-color: #1a1a1a;
    .profile-image {
      img {
        object-fit: cover;
        height: 50px;
        width: 50px;
        border-radius: 12px;
      }
    }
    .detail-content {
      display: flex;
      width: fill;
      justify-content: space-between;
    }
    .profile-detail {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* number of lines to show */
      line-clamp: 1;
      -webkit-box-orient: vertical;
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
