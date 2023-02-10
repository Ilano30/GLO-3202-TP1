<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add Task</div>
      <q-space />
      <q-btn flat round dense icon="close" v-close-popup/>
    </q-card-section>

    <form @submit.prevent="onPressSave">
      <q-card-section>
        <div class="row q-mb-sm">
          <q-input
            outlined
            :rules="[val => !!val || 'Field is required']"
            autofocus
            ref="name"
            v-model="taskToCreate.name"
            label="Task name"
            class="col">
              <template v-slot:append>
                <q-icon
                  v-if="taskToCreate.name"
                  name="close"
                  @click="taskToCreate.name = ''"
                  class="cursor-pointer" />
              </template>
          </q-input>
        </div>

        <div class="row q-mb-sm">
          <q-input
          outlined
          label="Due date"
          v-model="taskToCreate.dueDate">
            <template v-slot:append>
              <q-icon
                  v-if="taskToCreate.dueDate"
                  name="close"
                  @click="clearDueDate"
                  class="cursor-pointer" />
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy>
                  <q-date v-model="taskToCreate.dueDate" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div
          v-if="taskToCreate.dueDate"
          class="row q-mb-sm">
          <q-input
          outlined
          label="Due time"
          v-model="taskToCreate.dueTime" >
            <template v-slot:append>
              <q-icon
                  v-if="taskToCreate.dueTime"
                  name="close"
                  @click="taskToCreate.dueTime = ''"
                  class="cursor-pointer" />
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy>
                  <q-time v-model="taskToCreate.dueTime" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Save"
          color="primary"
          type="submit" />
      </q-card-actions>

    </form>
  </q-card>
</template>

<script>
  export default {
    data() {
      return {
        taskToCreate: {
          name: '',
          dueDate: '',
          dueTime: '',
          completed: false
        }
      }
    },
    methods: {
      onPressSave() {
        this.$refs.name.validate()
        if (!this.$refs.name.hasError) {
          this.onSaveTask()
        }
      },
      downloadFile() {
      },
      onSaveTask() {
        this.$emit('add', this.taskToCreate)
        this.$emit('close')
        this.downloadFile()
      },
      clearDueDate() {
        this.taskToCreate.dueDate = ''
        this.taskToCreate.dueTime = ''
      }
    }
  }

</script>
