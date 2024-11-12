<template>
  <div>
    <div class="page-header">
      <h3 class="page-title">Courses</h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <button
            data-toggle="modal"
            data-target="#exampleModalCenter"
            type="button"
            class="btn btn-primary btn-icon-text"
          >
            <i class="mdi mdi-server"></i> Create Course
          </button>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Course Lists</h4>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr style="text-align: center">
                    <th style="color: white">#</th>
                    <th style="color: white">Course Code</th>
                    <th style="color: white">Course Name</th>
                    <th style="color: white">Descripts</th>
                    <th style="color: white">Teachers</th>
                    <th style="color: white">Image</th>
                    <th style="color: white">Number of Lesson</th>
                    <th style="color: white">Price</th>
                    <th style="color: white" colspan="2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in dataCourses" :key="index">
                    <td style="text-align: center; color: white">
                      {{ index + 1 }}
                    </td>

                    <td style="text-align: center; color: white">
                      {{ item.codecourse }}
                    </td>
                    <td style="color: white">
                      {{ item.namecourse }}
                    </td>
                    <td style="color: white">{{ item.description }}</td>
                    <td style="text-align: cente; color: whiter">
                      {{ item.teachers }}
                    </td>
                    <td style="text-align: center">
                      <img class="avatar" :src="item.img" alt="image" />
                    </td>
                    <td style="text-align: center; color: white">
                      {{ item.numberofless }}
                    </td>
                    <td style="text-align: right; color: white">
                      {{ formatCurrency(item.price) }}
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

    <!-- Modal add course-->
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
              Create a New Course
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
                    <label for="exampleInputUsername1">Course Code</label>
                    <input
                      type="text"
                      class="form-control"
                      @input="updateForm('codecourse', $event)"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Course Name</label>
                    <input
                      @input="updateForm('namecourse', $event)"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Description</label>
                    <textarea
                      @input="updateForm('description', $event)"
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputConfirmPassword1">Teachers</label>
                    <div class="dropdown">
                      <button
                        class="btn btn-outline-success dropdown-toggle"
                        type="button"
                        id="dropdownMenuOutlineButton1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        -- Choose Teacher --
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuOutlineButton1"
                      >
                        <h6 class="dropdown-header">Settings</h6>
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#"
                          >Something else here</a
                        >
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Separated link</a>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>File upload</label>
                    <input
                      @change="onFileChange"
                      ref="fileInput"
                      type="file"
                      name="img[]"
                      class="file-upload-default"
                    />
                    <div class="input-group col-xs-12">
                      <input
                        type="text"
                        class="form-control file-upload-info"
                        disabled
                        placeholder="Upload Image"
                      />
                      <span class="input-group-append">
                        <button
                          class="file-upload-browse btn btn-primary"
                          type="button"
                        >
                          Upload
                        </button>
                      </span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputConfirmPassword1"
                      >Nunber Of Lesson</label
                    >
                    <input
                      @input="updateForm('numberofless', $event)"
                      type="number"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputConfirmPassword1">Price</label>
                    <input
                      @input="updateForm('price', $event)"
                      type="number"
                      class="form-control"
                    />
                  </div>

                  <button
                    @click="onSaveCourse"
                    type="button"
                    class="btn btn-outline-info btn-icon-text"
                  >
                    Create Course
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

    <!-- Modal update course-->
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
                    <label for="exampleInputUsername1">Course Code</label>
                    <input
                      :value="formUpdate.codecourse"
                      type="text"
                      class="form-control"
                      @input="updateFormUpdate('codecourse', $event)"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Course Name</label>
                    <input
                      :value="formUpdate.namecourse"
                      @input="updateFormUpdate('namecourse', $event)"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Description</label>
                    <textarea
                      :value="formUpdate.description"
                      @input="updateFormUpdate('description', $event)"
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputConfirmPassword1">Teachers</label>
                    <div class="dropdown">
                      <button
                        class="btn btn-outline-success dropdown-toggle"
                        type="button"
                        id="dropdownMenuOutlineButton1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        -- Choose Teacher --
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuOutlineButton1"
                      >
                        <h6 class="dropdown-header">Settings</h6>
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#"
                          >Something else here</a
                        >
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Separated link</a>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>File upload</label>
                    <input
                      @change="onFileChange"
                      ref="fileInput"
                      type="file"
                      name="img[]"
                      class="file-upload-default"
                    />
                    <div class="input-group col-xs-12">
                      <input
                        type="text"
                        class="form-control file-upload-info"
                        disabled
                        placeholder="Upload Image"
                      />
                      <span class="input-group-append">
                        <button
                          class="file-upload-browse btn btn-primary"
                          type="button"
                        >
                          Upload
                        </button>
                      </span>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputConfirmPassword1"
                      >Nunber Of Lesson</label
                    >
                    <input
                      :value="formUpdate.numberofless"
                      @input="updateFormUpdate('numberofless', $event)"
                      type="number"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputConfirmPassword1">Price</label>
                    <input
                      :value="formUpdate.price"
                      @input="updateFormUpdate('price', $event)"
                      type="number"
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
      dataCourses: [],
      isLoading: false,
      fileName: "",
      selectedFile: null,
      url: null,
      form: {
        codecourse: "",
        namecourse: "",
        description: "",
        teachers: "",
        img: "http://localhost:1186/avatar/default-image.jpg",
        createdAt: "",
        numberofless: 0,
        price: 0,
      },
      formUpdate: {},
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    formatCurrency(value) {
      return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },

    onFileChange(e) {
      this.fileName = e.target.files[0];
      this.url = URL.createObjectURL(this.fileName);
      this.fileName = e.target.files[0].name;
      this.selectedFile = e.target.files[0];
    },

    updateForm(field, event) {
      this.form[field] = event.target.value;
    },

    updateFormUpdate(field, event) {
      this.formUpdate[field] = event.target.value;
    },

    async loadData() {
      const res = await this.$axios.get(`/api/courses/get-all-courses`);
      // console.log(res.data);
      this.dataCourses = res.data;
    },

    async showDataCourse(data) {
      this.formUpdate = data;
    },

    async onUpdateCourse() {
      // console.log(this.formUpdate);
      let data = new FormData();
      data.append("_id", this.formUpdate._id);
      data.append("codecourse", this.formUpdate.codecourse);
      data.append("namecourse", this.formUpdate.namecourse);
      data.append("description", this.formUpdate.description);
      data.append("teachers", this.formUpdate.teachers);
      if (this.selectedFile) {
        data.append("img", this.selectedFile, this.selectedFile.name);
      } else {
        data.append("img", this.formUpdate.img);
      }
      data.append("numberofless", this.formUpdate.numberofless);
      data.append("price", this.formUpdate.price);

      try {
        const response = await this.$axios.post(
          "/api/courses/course-update",
          data
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

    async onSaveCourse() {
      // Bắt đầu hiển thị biểu tượng loading
      this.isLoading = true;
      const current = new Date();
      this.form.createdAt = current;

      let data = new FormData();
      data.append("codecourse", this.form.codecourse);
      data.append("namecourse", this.form.namecourse);
      data.append("description", this.form.description);
      data.append("teachers", this.form.teachers);
      if (this.selectedFile) {
        data.append("img", this.selectedFile, this.selectedFile.name);
      } else {
        data.append("img", this.form.img);
      }
      data.append("createdAt", this.form.createdAt);
      data.append("numberofless", this.form.numberofless);
      data.append("price", this.form.price);

      try {
        const response = await this.$axios.post(
          "/api/courses/create-course",
          data
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

    async onDelete(data) {
      const isConfirmed = confirm("Are you delete this item ?");
      if (isConfirmed) {
        if (data.role === 1) {
          alert("Only Admin");
        } else {
          try {
            const res = await this.$axios.post(
              `/api/courses/delete/course`,
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

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  /* Mờ nền */
  z-index: 9999;
  /* Đặt vị trí cao hơn */
}

/* CSS của biểu tượng loading */
.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  /* Màu đường viền của spinner */
  border-top: 4px solid red;
  /* Màu của đường viền phía trên */
  border-radius: 50%;
  /* Hình dạng của spinner */
  width: 30px;
  /* Chiều rộng của spinner */
  height: 30px;
  /* Chiều cao của spinner */
  animation: spin 1s linear infinite;
  /* Animation cho spinner */
  position: absolute;
  /* Đặt vị trí tuyệt đối */
  top: 50%;
  /* Đặt vị trí ở giữa theo chiều dọc */
  left: 50%;
  /* Đặt vị trí ở giữa theo chiều ngang */
  transform: translate(-50%, -50%);
  /* Dịch chuyển spinner về trung tâm */
}

.avatar {
  height: 20px;
  width: 20px;
}
</style>
