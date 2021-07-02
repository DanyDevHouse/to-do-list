export const state = () => ({
    currentTask: [],
    taskLoaded: false,
    message: null,
    errorMessage: false
})
export const mutations = {
    GetTasks(state, payload) {
        state.currentTask = payload
        state.taskLoaded = true
    },
    DeleteTask(state, taskId) {
        const index = state.currentTask.findIndex(t => t.taskId === taskId)
        state.currentTask.splice(index, 1)
    },
    AddTaskToStore(state, task) {
        state.currentTask.push(task)
    },
    UpdateTask(state, task){
      const taskIndex = state.currentTask.findIndex(t => t.taskId === task.taskId)
      state.currentTask.splice(taskIndex, 1, task)
    },
    SetMessage(state, message){
        state.message = message
    }
}
export const actions = {
    async GettingTasks({ commit, state }, userId) {
        const tasks = await this.$fire.firestore.collection("currentTask").where("userId", "==", userId).get().then(res => {
            return res.docs.map(doc => doc.data())
        })
        if (!state.taskLoaded) commit('GetTasks', tasks)
    },
    DeleteTask({ commit }, taskId) {
        commit('DeleteTask', taskId)
        this.$fire.firestore.collection("currentTask").doc(taskId).delete().then(() => {
            commit('SetMessage', 'Your task successfully deleted!', false)
        }).catch((error) => {
            console.error("Error removing document: ", error);
            commit('SetMessage', 'Error removing task: ' + error.message, true)
        });
        
    },
    async addTaskToBD({ commit }, task) {
        const mutateTask = {
            ...task,
            userId: this.state.authorization.user.uid
        }
        commit('AddTaskToStore', mutateTask)
        await this.$fire.firestore.collection("currentTask").doc(mutateTask.taskId).set(mutateTask).then((res) => {
        }).catch(error => {
            commit('SetMessage', 'Error removing task: ' + error.message, true)
        });
    },
    EditTask({ commit }, task){
        commit('UpdateTask', task)
        this.$fire.firestore.collection("currentTask").doc(task.taskId).update(task)
        .then(() => {
           commit('SetMessage', 'Your task successfully updated!', false)
        })
        .catch((error) => {
            commit('SetMessage', "Error updating task: " + error, true)
        });
    }
}