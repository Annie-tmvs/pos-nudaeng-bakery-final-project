<template>
  <div>
    <div class="setting-icon" id="tooltip-target-1">
      <div class="btn" v-b-modal="'modal'" @click="confirmLogout">
        <i class="fa-solid fa-arrow-right-from-bracket fa-md"> </i>
      </div>
      <!-- popup text  -->
    </div>
    <b-tooltip target="tooltip-target-1" triggers="hover" variant="danger">
      <div class="px-2">ອອກຈາກລະບົບ</div>
    </b-tooltip>
    <!-- Modal -->

    <!-- <b-modal
      id="modal-1"
      centered
      hide-backdrop
      hide-header
      hide-footer
      hide-header-close
      scrollable
      size="md"
    >
      <div class="modal-content">
        <h5>ທ່ານຕອ້ງການອອກຈາກລະບົບແທ້ບໍ່?</h5>
      </div>
      <div class="btn-content">
        <div class="btn btn-success" @click="Logout">ຕົກລົງ</div>
        <div class="btn btn-danger" @click="hideModal">ຍົກເລີກ</div>
      </div>
    </b-modal> -->
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      Refresh: "",
    };
  },
  methods: {
    confirmLogout() {
      Swal.fire({
        title: "ຕ້ອງການອອກຈາກລະບົບແທ້ບໍ່ ?",
        text: "Are you sure ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "ຕົກລົງ",
        cancelButtonText: "ຍົກເລີກ",
        iconColor: "#ffa334",
        width: 600,
        padding: "3em",
        position: "center",
      }).then(async (result) => {
        if (result.isConfirmed) {
          localStorage.clear();

          Swal.fire({
            position: "center",
            icon: "success",
            title: "ດຳເນີນການສຳເລັດ !",
            text: "Successful !",
            showConfirmButton: false,
            iconColor: "limegreen",
            width: 600,
            padding: "3em",
            timer: 1500,
          });
          // this.$router.push({ path: "/user" });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          setTimeout(() => {
            this.$router.push("/login");
          }, 2500);
        }
      });
    },
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
      // window.location.reload();
    },
    showModal() {
      this.$root.$emit("bv::show::modal", "modal-1", "#btnShow");
    },
    hideModal() {
      this.$root.$emit("bv::hide::modal", "modal-1", "#btnShow");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/colors";
* {
  font-family: "Noto Sans Lao", sans-serif;
}
.setting-icon {
  .btn {
    border: 0;
    width: fit-content;
    height: fit-content;
    &:hover {
      i {
        color: $yellow;
      }
    }
  }
  i {
    color: white;
  }
}
.modal-content {
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
  .btn-content {
    display: flex;
    width: fill;
    justify-content: center;
    gap: 1rem;
    .btn {
      width: 100px;
    }
  }
}
</style>
