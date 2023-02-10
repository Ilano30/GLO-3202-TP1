<template>
  <q-page class="q-pa-md">
    <q-text v-if="!this.tasks.length" class="text-h5 absolute-center text-center">Your Todo list is empty...</q-text>
    <q-list v-if="this.tasks.length" bordered separator>
      <task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete="deleteTask"></task>
   </q-list>

   <div class="absolute-bottom text-center q-mb-lg">
    <q-btn
    @click="showAddTask = true"
    round
    color="primary"
    size="24px"
    icon="add" />
   </div>

   <q-dialog v-model="showAddTask">
    <add-task-modal
      @add="addTask"
      @close="showAddTask = false" />
    </q-dialog>

    <div class="absolute-bottom-left text-center q-mb-lg">
      <q-toggle
        v-model="isDarkMode"
        label="Dark Mode"
        @click="onToggle" />"
    </div>

  </q-page>
</template>

<script>
import { Dark } from 'quasar'
import { Cookies } from 'quasar'

export default {
  data() {
    return {
      isDarkMode: Dark.isActive,
      showAddTask: false,
      id: 3,
      completedTasks: [],
      tasks: [
        // {
        //   id: 0,
        //   name: 'Go to shop',
        //   completed: false,
        //   dueDate: '2019/05/12',
        //   dueTime: '18:30'
        // },
        // {
        //   id: 1,
        //   name: 'Get bananas',
        //   completed: false,
        //   dueDate: '2019/05/13',
        //   dueTime: '14:00'
        // },
        // {
        //   id: 2,
        //   name: 'Get apples',
        //   completed: false,
        //   dueDate: '2019/05/14',
        //   dueTime: '16:00'
        // },
      ]
    }
  },
  created() {
    localStorage.setItem('taskCount', this.tasks.length)
  },
  methods: {
    deleteTask(id) {
      this.tasks.forEach((element, index) => {
        if (id == element.id) {
          this.tasks.splice(index, 1)
        }
      })
    },
    addTask(taskToCreate) {
      this.id = this.id + 1
      this.tasks.push({
        id: this.id,
        name: taskToCreate.name,
        completed: taskToCreate.completed,
        dueDate: taskToCreate.dueDate,
        dueTime: taskToCreate.dueTime
      }),
      localStorage.setItem('taskCount', this.tasks.length)
    },
    onToggle() {
      if (this.isDarkMode) {
        Dark.set(true)
        Cookies.set('dark_mode', this.isDarkMode)
      }
      else if (!this.isDarkMode) {
        Dark.set(false)
        Cookies.set('dark_mode', this.isDarkMode)
      }
    }
  },
  components: {
    'task' : require('components/Task.vue').default,
    'add-task-modal': require('components/AddTaskModal.vue').default
  }
};
</script>

<style>
</style>
