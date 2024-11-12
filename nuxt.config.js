export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Code for Kids Lab",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/assets/images/favicon.png" },
      // {
      //   rel: "stylesheet",
      //   href: "/fontawesome-free-6.5.1-web/css/all.css",
      // },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css",
        integrity:
          "sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
      },
    ],

    script: [
      { src: "/assets/vendors/js/vendor.bundle.base.js", body: true },
      { src: "/assets/vendors/chart.js/Chart.min.js", body: true },
      { src: "/assets/vendors/progressbar.js/progressbar.min.js", body: true },
      {
        src: "/assets/vendors/jvectormap/jquery-jvectormap.min.js",
        body: true,
      },
      {
        src: "/assets/vendors/jvectormap/jquery-jvectormap-world-mill-en.js",
        body: true,
      },
      { src: "/assets/vendors/owl-carousel-2/owl.carousel.min.js", body: true },
      { src: "/assets/js/off-canvas.js", body: true },
      { src: "/assets/js/hoverable-collapse.js", body: true },
      { src: "/assets/js/misc.js", body: true },
      { src: "/assets/js/settings.js", body: true },
      { src: "/assets/js/todolist.js", body: true },
      { src: "/assets/js/dashboard.js", body: true },
      { src: "/assets/vendors/select2/select2.min.js", body: true },
      {
        src: "/assets/vendors/typeahead.js/typeahead.bundle.min.js",
        body: true,
      },
      { src: "/assets/js/file-upload.js", body: true },
      { src: "/assets/js/typeahead.js", body: true },
      { src: "/assets/js/select2.js", body: true },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // "@/assets/bulma/css/bulma.css",
    "@/assets/vendors/mdi/css/materialdesignicons.min.css",
    "@/assets/vendors/css/vendor.bundle.base.css",
    "@/assets/vendors/jvectormap/jquery-jvectormap.css",
    "@/assets/vendors/flag-icon-css/css/flag-icon.min.css",
    "@/assets/vendors/owl-carousel-2/owl.carousel.min.css",
    "@/assets/vendors/owl-carousel-2/owl.theme.default.min.css",
    "@/assets/css/style.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: "~/plugins/sweetalert2", ssr: false },
    { src: "~/plugins/toasted", ssr: false },
    { src: "~/plugins/filters" },
    { src: "~/plugins/vue-alert", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: "/",
    // baseURL: "http://192.168.160.7:2612", // máy chủ nhân hoà
    baseURL: "http://14.224.129.177:1552", // máy chủ tuanpda
    baseURL: "http://localhost:8668",
    timeout: 20000,
  },

  server: {
    port: 1186,
    // host: "192.168.160.7", // server nhân hòa\
    host: "14.224.129.177", // server tuanpda
    // host: "localhost",
    // host: "192.168.1.97",
    // host: "14.224.129.177", // server tuanpda
    // host: "localhost",
    host: "192.168.1.97",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: ["auth"],

    // Thêm route catch-all
    extendRoutes(routes, resolve) {
      routes.push({
        name: "catch-all",
        path: "*",
        component: resolve(__dirname, "pages/404.vue"), // Đường dẫn đến trang "This page could not be found"
      });
    },
  },

  auth: {
    strategies: {
      custom: {
        scheme: "~/nuxtAuthSchema/CustomScheme.js",
        endpoints: {
          login: {
            url: "/api/auth/access/login",
            method: "post",
            propertyName: false,
          },
          // refresh: { url: '/api/auth/refresh', method: 'post' },
          user: { url: "/api/users/auth/user", method: "get" },
        },
        user: {
          property: "user",
          autoFetch: true,
        },
      },
    },

    redirect: {
      login: "/login", // Trang sẽ chuyển tới nếu chưa đăng nhập
      logout: "/login", // Trang sẽ chuyển tới sau khi đăng xuất
      callback: "/login", // Trang callback sau khi xác thực (OAuth)
      home: "/", // Trang sẽ chuyển tới sau khi đăng nhập thành công
    },
  },
};
