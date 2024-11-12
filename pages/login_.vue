<template>
  <div class="login-container">
    <div class="image-side"></div>
    <div class="form-side">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-8 is-offset-2">
            <div class="centered-image">
              <img
                src="@/assets/logos/logo.png"
                alt="Your Image"
                width="250"
                height="150"
              />
            </div>
            <div class="box">
              <form>
                <div class="field">
                  <div class="control has-icons-left has-icons-right">
                    <input
                      class="input is-small"
                      type="text"
                      placeholder="Tên đăng nhập"
                      v-model="username"
                      autofocus=""
                    />
                    <span class="icon is-small is-left">
                      <i style="color: #37e7ac" class="fas fa-user"></i>
                    </span>
                    <span class="icon is-medium is-right">
                      <i class="fas fa-check"></i>
                    </span>
                  </div>
                </div>
                <div class="field" style="padding-top: 10px">
                  <div class="control has-icons-left">
                    <input
                      v-model="password"
                      class="input is-small"
                      type="password"
                      placeholder="Mật khẩu"
                      autocomplete="current-password"
                    />
                    <span class="icon is-small is-left">
                      <i style="color: #37e7ac" class="fas fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div class="field" style="padding-top: 10px">
                  <button
                    @click.prevent="signIn"
                    class="button is-small is-block is-danger is-fullwidth"
                  >
                    Đăng nhập
                  </button>
                </div>
                <div class="field" style="padding-top: 10px; font-size: small">
                  <a href="/forgotpassword"
                    ><span class="forgotpas">Quên mật khẩu?</span></a
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      username: "",
      password: "",
    };
  },

  methods: {
    async signIn() {
      try {
        await this.$auth.loginWith("custom", {
          data: {
            username: this.username,
            password: this.password,
          },
        });
        this.$router.push("/");
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
  background-image: url("../assets/images/login4.png"); /* Đường dẫn đến ảnh nền */
  background-size: cover;
  background-position: center;
}

.form-side {
  /* background-image: url("../assets/images/loginbgr.jpg"); */
  background-color: #fef7e0ff;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero.is-success {
  background: transparent; /* Để giữ cho màu nền của form-side */
}

/* .box {
  margin-top: 5rem;
  background-color: transparent;
  border: 2px solid white;
} */

/* Media query cho thiết bị di động và tablet */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column; /* Đặt chiều dọc cho container */
  }

  .image-side {
    display: none; /* Ẩn phần bên trái (hình ảnh) */
  }

  .form-side {
    flex: 1; /* Đảm bảo form chiếm toàn bộ chiều rộng */
  }
}
</style>
