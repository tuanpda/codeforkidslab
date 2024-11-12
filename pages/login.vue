<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="row w-100 m-0">
        <div
          class="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg"
        >
          <div class="card col-lg-4 mx-auto">
            <div class="card-body px-5 py-5">
              <h3 class="card-title text-left mb-3">Login</h3>

              <div class="form-group">
                <label>Username *</label>
                <input
                  @input="updateForm('username', $event)"
                  type="text"
                  class="form-control p_input"
                />
              </div>
              <div class="form-group">
                <label>Password *</label>
                <input
                  @input="updateForm('password', $event)"
                  type="password"
                  class="form-control p_input"
                />
              </div>
              <div
                class="form-group d-flex align-items-center justify-content-between"
              >
                <div class="form-check">
                  <label class="form-check-label">
                    <input type="checkbox" class="form-check-input" />
                    Remember me
                  </label>
                </div>
                <a href="#" class="forgot-pass">Forgot password</a>
              </div>
              <div class="text-center">
                <button
                  @click="signIn"
                  class="btn btn-primary btn-block enter-btn"
                >
                  Login
                </button>
              </div>
              <div class="d-flex">
                <button class="btn btn-facebook mr-2 col">
                  <i class="mdi mdi-facebook"></i> Facebook
                </button>
                <button class="btn btn-google col">
                  <i class="mdi mdi-google-plus"></i> Google plus
                </button>
              </div>
              <p class="sign-up">
                Don't have an Account?<a href="#"> Sign Up</a>
              </p>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- row ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "LoginPage",
  layout: "none",
  auth: "guest",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    updateForm(field, event) {
      this.form[field] = event.target.value;
    },

    async signIn() {
      try {
        await this.$auth.loginWith("custom", {
          data: {
            username: this.form.username,
            password: this.form.password,
          },
        });
        this.$router.push("/dashboard");
      } catch (error) {
        // Xử lý lỗi khi đăng nhập không thành công
        const errorResponse = error.response;
        const successCode = errorResponse ? errorResponse.data.success : null;

        let errorMessage = "Đăng nhập thất bại";
        if (successCode) {
          switch (successCode) {
            case 9:
              errorMessage = "Đăng nhập thất bại";
              break;
            case 4:
              errorMessage =
                "Tài khoản chưa được kích hoạt. Liên hệ quản trị hệ thống !!!";
              break;
            case 7:
              errorMessage = "Đăng nhập thất bại";
              break;
            default:
              errorMessage = "Lỗi xác thực";
              break;
          }
        }

        Swal.fire({
          title: errorMessage,
          icon: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
}

.image-side {
  flex: 1;
  /* Đường dẫn đến ảnh nền */
  background-size: cover;
  background-position: center;
}

.form-side {
  /* background-image: url("../assets/images/loginbgr.jpg"); */
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero.is-success {
  background: transparent; /* Để giữ cho màu nền của form-side */
}

.box {
  margin-top: 5rem;
  background-color: transparent;
  border: 2px solid white;
}

/* Các quy tắc CSS khác không thay đổi */
</style>
