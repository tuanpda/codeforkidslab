<template>
  <div class="container-scroller">
    <!-- partial:partials/_sidebar.html -->
    <!-- navbar -->
    <navbar />
    <!-- end navbar -->
    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <!-- partial:partials/_navbar.html -->
      <!-- top menu -->
      <topmenu />
      <!-- end top menu -->
      <!-- partial -->
      <div class="main-panel">
        <div class="content-wrapper">
          <!-- content page -->
          <nuxt />
        </div>
        <!-- content-wrapper ends -->
        <!-- partial:partials/_footer.html -->
        <footer class="footer">
          <div
            class="d-sm-flex justify-content-center justify-content-sm-between"
          >
            <span
              class="text-muted d-block text-center text-sm-left d-sm-inline-block"
              >Copyright © tuanpda</span
            >
          </div>
        </footer>
        <!-- partial -->
      </div>
      <!-- main-panel ends -->
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script>
import navbar from "~/components/dashboard/navbar.vue";
import topmenu from "~/components/dashboard/topmenu.vue";

export default {
  layout: "none",
  auth: "guest",
  components: {
    navbar,
    topmenu,
  },
};
</script>
