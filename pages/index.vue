<template>
  <div class="container" v-loading="todos.length == 0 && !taskLoaded">
    <el-row :gutter="20">
      <el-row :gutter="20">
        <h1 class="title">To-Do-List</h1>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="0">
          <div class="tasks-container">
            <el-row :gutter="20">
              <el-form
                :model="taskValidateForm"
                ref="taskValidateForm"
                class="demo-ruleForm"
                @submit.native.prevent
              >
                <el-form-item
                  prop="taskName"
                  :rules="[
                    { required: true, message: 'Task name is required' },
                  ]"
                >
                  <el-input
                    type="taskName"
                    v-model="taskValidateForm.taskName"
                    autocomplete="off"
                    placeholder="Please input task name"
                    @keydown.enter.native="addTask('taskValidateForm')"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-row>
            <el-row :gutter="20" class="subtitle-page" v-show="todos.length > 0">
              <h2>My To Do's</h2>
            </el-row>
            <transition-group tag="div" name="slide-fade">
              <el-row :gutter="20" v-for="task in todos" :key="task.taskId">
                <el-card
                  shadow="hover"
                  class="task-card"
                  :class="{
                    'task-card--completed': task.status === 'complited',
                  }"
                  @click.native="
                    updateTask({
                      ...task,
                      status: task.status === 'active' ? 'complited' : 'active',
                    })
                  "
                >
                  <el-row
                    :gutter="20"
                    type="flex"
                    justify="between"
                    align="middle"
                  >
                    <el-col :offset="0" class="task-info-container">
                      <h3 class="task-name">{{ task.taskName }}</h3>

                      <sub class="task-description">
                        {{ task.description }}
                      </sub>
                    </el-col>
                    <el-col :offset="0" :span="5">
                      <el-row
                        :gutter="20"
                        type="flex"
                        justify="between"
                        align="middle"
                      >
                        <el-col :offset="0">
                          <el-button
                            type="text"
                            size="default"
                            @click="editTask(task)"
                          >
                            <i class="el-icon-edit"></i>
                          </el-button>
                        </el-col>
                        <el-col :offset="0">
                          <el-button
                            type="text"
                            size="default"
                            @click="deleteTask(task.taskId)"
                            ><i class="el-icon-delete"></i>
                          </el-button>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-card>
              </el-row>
            </transition-group>

            <el-dialog
              title="Shipping address"
              :visible.sync="dialogFormVisible"
            >
              <el-form :model="editableTask">
                <el-form-item label="Task Name" prop="taskName">
                  <el-input v-model="(editableTask || {}).taskName"></el-input>
                </el-form-item>
                <el-form-item label="Task description" prop="description">
                  <el-input
                    type="textarea"
                    v-model="(editableTask || {}).description"
                  ></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="updateTask(editableTask)"
                  >Confirm</el-button
                >
              </span>
            </el-dialog>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.task-info-container {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
}
.el-card__body {
  padding: 10px 20px;
}
.subtitle-page {
  margin-top: 50px;
  margin-bottom: 30px;
}
.task-card {
  margin-bottom: 10px;
  cursor: pointer;
}
.task-card--completed .task-name,
.task-card--completed .task-description {
  text-decoration: line-through;
}
.slide-fade-enter-active {
  transform: translateY(0);
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateY(-20px);
  opacity: 0;
}
</style>
<script>
export default {
  data() {
    return {
      taskValidateForm: {
        taskName: '',
        taskDescription: '',
      },
      editableTask: null,
      dialogFormVisible: false,
    }
  },
  computed: {
    todos() {
      return this.$store.state.tasks.currentTask
    },
    taskLoaded() {
      return this.$store.state.tasks.taskLoaded
    },
    message(){
      return this.$store.state.tasks.message
    },
    isError(){
      return !this.$store.state.tasks.errorMessage ? 'success' : 'error'
    }
  },
  beforeMount() {
    this.$store.commit('authorization/SetUserData'),
      this.$store.dispatch('tasks/GettingTasks', 'm7vfSAuMLAcP0gDunUerJ1H4xgP2')
  },
  methods: {
    deleteTask(taskId) {
      this.$store.dispatch('tasks/DeleteTask', taskId)
    },
    editTask(task) {
      this.editableTask = { ...task }
      this.dialogFormVisible = true
    },
    updateTask(task) {
      this.$store.dispatch('tasks/EditTask', task);
      this.editableTask = null;
      this.dialogFormVisible = false;
      if(this.message){
        this.$message({
          message: this.message,
          type:  this.isError
        });
      }
      },
    generatorId() {
      return Math.random().toString(36).substr(2, 9)
    },
    addTask(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const newTask = {
            taskName: this.taskValidateForm.taskName,
            description: this.taskValidateForm.taskDescription,
            taskId: this.generatorId(),
            status: 'active',
          }
          this.$store.dispatch('tasks/addTaskToBD', newTask)
            this.$message({
              message: 'Your task successfully added!',
              type: 'success'
            });
          this.resetForm(formName)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
