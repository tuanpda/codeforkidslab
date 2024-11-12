<template>
  <div>
    <div class="page-header">
      <h3 class="page-title">Classes</h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <ol class="breadcrumb">
            <button
              data-toggle="modal"
              data-target="#exampleModalCenter"
              type="button"
              class="btn btn-primary btn-icon-text"
            >
              <i class="mdi mdi-server"></i> Create Class
            </button>
          </ol>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Class Lists</h4>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr style="text-align: center">
                    <th style="color: white">#</th>
                    <th style="color: white">Class Code</th>
                    <th style="color: white">Class Name</th>
                    <th style="color: white">Course Code</th>
                    <th style="color: white">Course Name</th>
                    <th style="color: white">Opened At</th>
                    <th style="color: white">Count Student</th>
                    <th colspan="2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in dataClasses" :key="index">
                    <td style="text-align: center; color: white">
                      {{ index + 1 }}
                    </td>

                    <td style="text-align: center; color: white">
                      {{ item.codecls }}
                    </td>
                    <td style="color: white">
                      {{ item.namecls }}
                    </td>
                    <td style="text-align: cente; color: white">
                      {{ item.namecourse }}
                    </td>
                    <td style="text-align: center; color: white">
                      {{ item.codecourse }}
                    </td>
                    <td style="color: white">{{ item.createdAt }}</td>
                    <td style="color: white; text-align: center">
                      {{ item.countclss }}
                    </td>
                    <td>
                      <button
                        @click="showDataCourse(item)"
                        data-toggle="modal"
                        data-target="#exampleModalCenterUpdate"
                        type="button"
                        class="btn btn-inverse-info btn-icon"
                      >
                        <i class="mdi mdi-brush"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        @click="onDelete(item)"
                        type="button"
                        class="btn btn-inverse-danger btn-icon"
                      >
                        <i class="mdi mdi-delete"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Biểu tượng loading -->
    <div v-if="isLoading" class="loading-overlay">
      <!-- Biểu tượng loading -->
      <div class="loading-spinner"></div>
      <span>waitting some minute ...</span>
    </div>

    <!-- Modal add class -->
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Create a New Class
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <form class="forms-sample">
                  <div class="form-group">
                    <label for="exampleInputUsername1">Class Code</label>
                    <input
                      type="text"
                      class="form-control"
                      @input="updateForm('codecls', $event)"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Class Name</label>
                    <input
                      @input="updateForm('namecls', $event)"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputConfirmPassword1">Courses</label>
                    <div class="dropdown">
                      <button
                        class="btn btn-outline-success dropdown-toggle"
                        type="button"
                        id="dropdownMenuOutlineButton1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        -- Choose Course --
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuOutlineButton1"
                      >
                        <a
                          v-for="(item, index) in dataCourses"
                          :key="index"
                          class="dropdown-item"
                          @click="
                            selectCourse(item.codecourse, item.namecourse)
                          "
                          >{{ item.namecourse }}</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputConfirmPassword1"
                      >Nunber Of Students</label
                    >
                    <input
                      @input="updateForm('countclss', $event)"
                      type="number"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputConfirmPassword1">Opened At</label>
                    <input
                      @input="updateForm('createdAt', $event)"
                      type="date"
                      class="form-control"
                    />
                  </div>

                  <button
                    @click="onSaveClass"
                    type="button"
                    class="btn btn-outline-info btn-icon-text"
                  >
                    Create Class
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-icon-text"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal update class -->
    <div
      class="modal fade"
      id="exampleModalCenterUpdate"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Update Course
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="card">
              <div class="card-body">
                <form class="forms-sample">
                  <div class="form-group">
                    <label for="exampleInputUsername1">Class Code</label>
                    <input
                      :value="formUpdate.codecls"
                      type="text"
                      class="form-control"
                      @input="updateFormUpdate('codecls', $event)"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Class Name</label>
                    <input
                      :value="formUpdate.namecls"
                      @input="updateFormUpdate('namecls', $event)"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputConfirmPassword1">Courses</label>
                    <div class="dropdown">
                      <button
                        class="btn btn-outline-success dropdown-toggle"
                        type="button"
                        id="dropdownMenuOutlineButton1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {{ selectedCourse || "-- Choose Course --" }}
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuOutlineButton1"
                      >
                        <a
                          v-for="(item, index) in dataCourses"
                          :key="index"
                          class="dropdown-item"
                          @click="
                            selectCourse(item.codecourse, item.namecourse)
                          "
                          >{{ item.namecourse }}</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputConfirmPassword1"
                      >Nunber Of Studens</label
                    >
                    <input
                      :value="formUpdate.countclss"
                      @input="updateFormUpdate('countclss', $event)"
                      type="number"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputConfirmPassword1">Opend At</label>
                    <input
                      :value="formUpdate.createdAt"
                      @input="updateFormUpdate('createdAt', $event)"
                      type="text"
                      class="form-control"
                    />
                  </div>

                  <button
                    @click="onUpdateCourse"
                    type="button"
                    class="btn btn-outline-info btn-icon-text"
                  >
                    Update Course
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-icon-text"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  middleware: "auth",
  data() {
    return {
      dataClasses: [],
      dataCourses: [],
      isLoading: false,
      fileName: "",
      selectedFile: null,
      url: null,
      form: {
        codecls: "",
        namecls: "",
        codecourse: "",
        namecourse: "",
        createdAt: "",
        countclss: 0,
      },
      formUpdate: {},
      selectedCourse: "",
    };
  },

  mounted() {
    this.loadData();
    this.loadDataCourse();
  },

  methods: {
    async loadData() {
      const res = await this.$axios.get(`/api/classes/get-all-classes`);
      // console.log(res);
      this.dataClasses = res.data;
    },

    async loadDataCourse() {
      const res = await this.$axios.get(`/api/courses/get-all-courses`);
      // console.log(res.data);
      this.dataCourses = res.data;
    },

    selectCourse(codecourse, namecourse) {
      this.form.codecourse = "";
      this.form.namecourse = "";
      this.form.codecourse = codecourse;
      this.form.namecourse = namecourse;
    },

    updateForm(field, event) {
      this.form[field] = event.target.value;
    },

    updateFormUpdate(field, event) {
      this.formUpdate[field] = event.target.value;
    },

    async showDataCourse(data) {
      this.formUpdate = data;
      this.selectedCourse = data.namecourse;
      // console.log(this.formUpdate);
    },

    async onSaveClass() {
      // Bắt đầu hiển thị biểu tượng loading
      this.isLoading = true;
      // console.log(this.form);
      try {
        const response = await this.$axios.post(
          "/api/classes/create-class",
          this.form
        );
        // console.log(response);
        if (response.status == 200) {
          this.isLoading = false;
          this.$toasted.success("Created this Course !", {
            duration: 3000,
          });
          this.loadData();
        } else {
          this.$toasted.success("Couldn't create Course !", {
            duration: 3000,
            themes: "buble",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async onUpdateCourse() {
      this.isLoading = true;
      try {
        const response = await this.$axios.post(
          "/api/classes/class-update",
          this.formUpdate
        );

        if (response.status == 200) {
          this.isLoading = false;
          this.$toasted.success("Updated this Course !", {
            duration: 3000,
          });
          this.loadData();
        } else {
          this.$toasted.success("Couldn't update this Course !", {
            duration: 3000,
            themes: "buble",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async onDelete(data) {
      const isConfirmed = confirm("Are you delete this item ?");
      if (isConfirmed) {
        if (data.role === 1) {
          alert("Only Admin");
        } else {
          try {
            const res = await this.$axios.post(
              `/api/classes/delete/class`,
              data
            );
            // console.log(res.data.success);
            if (res.data.success == true) {
              this.$toasted.success("Deleted !", {
                duration: 3000,
              });
              this.loadData();
            }
          } catch (error) {
            this.$toasted.success("Couldn't delete item !", {
              duration: 3000,
              themes: "buble",
            });
          }
        }
      }
    },
  },
};
</script>
