<template>
  <div>
    <div class="page-header">
      <h3 class="page-title">Students</h3>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <button
            data-toggle="modal"
            data-target="#exampleModalCenter"
            type="button"
            class="btn btn-primary btn-icon-text"
          >
            <i class="mdi mdi-server"></i> Create Students
          </button>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Student Lists</h4>
            <div class="table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr style="text-align: center">
                    <th style="color: white">#</th>
                    <th style="color: white">Username</th>
                    <th style="color: white">Name</th>
                    <th style="color: white">Age</th>
                    <th style="color: white">Image</th>
                    <th style="color: white">School</th>
                    <th style="color: white">Parent</th>
                    <th style="color: white">Parent Contact</th>
                    <th style="color: white">Address</th>
                    <th style="color: white">Descripts</th>
                    <th style="color: white; text-align: center" colspan="2">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in dataStudents" :key="index">
                    <td style="text-align: center; color: white">
                      {{ index + 1 }}
                    </td>
                    <td style="text-align: center; color: white">
                      {{ item.username }}
                    </td>
                    <td style="color: white">
                      {{ item.name }}
                    </td>
                    <td style="color: white">{{ item.age }}</td>
                    <td style="text-align: center">
                      <img class="avatar" :src="item.image" alt="image" />
                    </td>
                    <td style="text-align: cente; color: white">
                      {{ item.school }}
                    </td>
                    <td style="text-align: cente; color: white">
                      {{ item.parent }}
                    </td>
                    <td style="text-align: cente; color: white">
                      {{ item.parent_contact }}
                    </td>
                    <td style="text-align: cente; color: white">
                      {{ item.address }}
                    </td>
                    <td style="text-align: cente; color: white">
                      {{ item.description }}
                    </td>
                    <td>
                      <button
                        @click="showDataStudent(item)"
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

    <!-- Modal add students-->
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
              Create a New Student
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
                    <label for="exampleInputUsername1">Username</label>
                    <input
                      type="text"
                      class="form-control"
                      @input="updateForm('username', $event)"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input
                      @input="updateForm('name', $event)"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Age</label>
                    <input
                      @input="updateForm('age', $event)"
                      type="number"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label>Avatar</label>
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
                    <label for="exampleInputEmail1">School</label>
                    <input
                      @input="updateForm('school', $event)"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Parent</label>
                    <input
                      @input="updateForm('parent', $event)"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Parent Contact</label>
                    <input
                      @input="updateForm('parent_contact', $event)"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Address</label>
                    <input
                      @input="updateForm('address', $event)"
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

                  <button
                    @click="onSaveStudents"
                    type="button"
                    class="btn btn-outline-info btn-icon-text"
                  >
                    Create Student
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

    <!-- Modal update student-->
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
              Update Student
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
                    <label for="exampleInputUsername1">Username</label>
                    <input
                      :value="formUpdate.username"
                      type="text"
                      class="form-control"
                      @input="updateFormUpdate('username', $event)"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input
                      :value="formUpdate.name"
                      @input="updateFormUpdate('name', $event)"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Age</label>
                    <input
                      :value="formUpdate.age"
                      @input="updateFormUpdate('age', $event)"
                      type="number"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label>Avatar</label>
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
                    <label for="exampleInputEmail1">School</label>
                    <input
                      :value="formUpdate.school"
                      @input="updateFormUpdate('school', $event)"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Parent</label>
                    <input
                      :value="formUpdate.parent"
                      @input="updateFormUpdate('parent', $event)"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Parent Contact</label>
                    <input
                      :value="formUpdate.parent_contact"
                      @input="updateFormUpdate('parent_contact', $event)"
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Address</label>
                    <input
                      :value="formUpdate.address"
                      @input="updateFormUpdate('address', $event)"
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

                  <button
                    @click="onUpdateStudent"
                    type="button"
                    class="btn btn-outline-info btn-icon-text"
                  >
                    Update Student
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
      dataStudents: [],
      dataClasses: [],
      dataCourses: [],
      isLoading: false,
      fileName: "",
      selectedFile: null,
      url: null,
      form: {
        username: "",
        name: "",
        age: "",
        image: "",
        school: "",
        parent: "",
        parent_contact: "",
        address: "",
        createdAt: "",
        description: "",
      },
      formUpdate: {},
      selectedCourse: "",
    };
  },

  mounted() {
    this.loadData();
    this.loadDataCourse();
    this.loadDataStudents();
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

    async loadDataStudents() {
      const res = await this.$axios.get(`/api/students/get-all-students`);
      // console.log(res.data);
      this.dataStudents = res.data;
    },

    onFileChange(e) {
      this.fileName = e.target.files[0];
      this.fileName = e.target.files[0].name;
      this.selectedFile = e.target.files[0];
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

    async showDataStudent(data) {
      this.formUpdate = data;
      // this.selectedCourse = data.namecourse;
      // console.log(this.formUpdate);
    },

    async onSaveStudents() {
      // Bắt đầu hiển thị biểu tượng loading
      // this.isLoading = true;
      // console.log(this.form);

      try {
        const current = new Date();
        this.form.createdAt = current;

        let data = new FormData();
        data.append("username", this.form.username);
        data.append("name", this.form.name);
        data.append("age", this.form.age);
        if (this.selectedFile) {
          console.log(this.selectedFile);
          console.log(this.selectedFile.name);

          data.append("image", this.selectedFile, this.selectedFile.name);
        } else {
          data.append("image", this.form.image);
        }
        data.append("school", this.form.school);
        data.append("parent", this.form.parent);
        data.append("parent_contact", this.form.parent_contact);
        data.append("address", this.form.address);
        data.append("createdAt", this.form.createdAt);
        data.append("description", this.form.description);
        const response = await this.$axios.post(
          "/api/students/create-student",
          data
        );
        // console.log(response);
        if (response.status == 200) {
          this.isLoading = false;
          this.$toasted.success("Created this Student !", {
            duration: 3000,
          });
          this.loadDataStudents();
        } else {
          this.$toasted.success("Couldn't create Student !", {
            duration: 3000,
            themes: "buble",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async onUpdateStudent() {
      // console.log(this.formUpdate);
      this.isLoading = true;

      let data = new FormData();
      data.append("_id", this.formUpdate._id);
      data.append("username", this.formUpdate.username);
      data.append("name", this.formUpdate.name);
      data.append("age", this.formUpdate.age);
      if (this.selectedFile) {
        data.append("image", this.selectedFile, this.selectedFile.name);
      } else {
        data.append("image", this.formUpdate.image);
      }
      data.append("school", this.formUpdate.school);
      data.append("parent", this.formUpdate.parent);
      data.append("parent_contact", this.formUpdate.parent_contact);
      data.append("address", this.formUpdate.address);
      data.append("description", this.formUpdate.description);

      try {
        const response = await this.$axios.post(
          "/api/students/student-update",
          data
        );

        if (response.status == 200) {
          this.isLoading = false;
          this.$toasted.success("Updated this Student !", {
            duration: 3000,
          });
          this.loadDataStudents();
        } else {
          this.$toasted.success("Couldn't update this Student !", {
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
              `/api/students/delete/student`,
              data
            );
            // console.log(res.data.success);
            if (res.data.success == true) {
              this.$toasted.success("Deleted !", {
                duration: 3000,
              });
              this.loadDataStudents();
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
