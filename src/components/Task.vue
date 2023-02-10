<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
      <q-item
        @click="task.completed = !task.completed"
        :class="(!task.completed) ? '' : 'bg-green-5'"
        clickable
        v-ripple>
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{ 'text-strikethrough' : task.completed }">{{ task.name }}</q-item-label>
        </q-item-section>

        <q-item-section
          v-if="task.dueDate"
          side>
          <div class="row">
            <div class="column justify-center">
              <q-icon name="event" size="18px" class="q-mr-xs"/>
            </div>
            <div class="column">
              <q-item-label caption class="row justify-end">{{ task.dueDate }}</q-item-label>
              <q-item-label caption class="row justify-end"><small>{{ task.dueTime }}</small></q-item-label>
            </div>
          </div>
        </q-item-section>

        <q-item-section side>
          <q-btn
            @click.stop="promptToDelete(task.id)"
            flat
            round
            dense
            color="red"
            icon="delete" />
        </q-item-section>

      </q-item>
</template>

<script>
  export default {
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    created() {
    },
    methods: {
      promptToDelete(id) {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Really delete?',
          ok: {
            push: true
          },
          cancel: {
            color: 'negative'
          },
          persistent: true
        }).onOk(() => {
          this.$emit('delete', id);
        })
      },
    }
  }
</script>

<style>

</style>
