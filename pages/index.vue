<template>
  <div class="container" v-loading="todos.length == 0 && !taskLoaded">
    <el-row :gutter="20">
      <el-row :gutter="20">
        <h1 class="title">to-do-list</h1>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="0">
          <div class="tasks-container">
            <el-row :gutter="20">
              <el-form
                :model="taskValidateForm"
                ref="taskValidateForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item
                  label="Task name"
                  prop="taskName"
                  :rules="[
                    { required: true, message: 'Task name is required' },
                  ]"
                >
                  <el-input
                    type="taskName"
                    v-model="taskValidateForm.taskName"
                    autocomplete="off"
                    placeholder="Please input"
                    @keyup.enter="addTask('taskValidateForm')"
                  ></el-input>
                </el-form-item>
                <el-form-item label="Task name" prop="taskDescription">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="Please input"
                    v-model="taskValidateForm.taskDescription"
                    @keyup.enter="addTask('taskValidateForm')"
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="addTask('taskValidateForm')"
                    >Submit</el-button
                  >
                </el-form-item>
              </el-form>
            </el-row>

            <el-row :gutter="20" v-for="task in todos" :key="task.taskName">
              <el-card shadow="hover" class="task-card">
                <el-row :gutter="20">
                  <el-col :offset="0">
                    <h3 class="task-name">{{ task.taskName }}</h3>
                    <sub class="task-description">
                      {{ task.description }}
                    </sub>
                  </el-col>
                  <el-col :offset="0">
                    <el-button
                      type="primary"
                      size="default"
                      @click="deleteTask(task.taskId)"
                      ><i class="el-icon-delete"></i
                    ></el-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-row>
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
</style>
<script>
export default {
  data() {
    return {
      taskValidateForm: {
        taskName: '',
        taskDescription: '',
      },
    }
  },
  computed: {
    todos() {
      return this.$store.state.tasks.currentTask
    },
    taskLoaded() {
      return this.$store.state.tasks.taskLoaded
    },
  },
  beforeMount() {
    this.$store.commit('authorization/SetUserData'),
      this.$store.dispatch('tasks/GettingTasks', 'm7vfSAuMLAcP0gDunUerJ1H4xgP2')
  },
  methods: {
    deleteTask(taskName) {
      this.$store.dispatch('tasks/DeleteTask', taskName)
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
          this.resetForm(formName)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>