<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import axios from 'axios'

const successMessage = ref('')
const errorMessage = ref('')

const intervalMilliseconds = 2000000
const timeoutMilliseconds = 1500
let connecting = false
let intervalId = null

onMounted(async () => {
  await checkConnection()
  intervalId = setInterval(checkConnection, intervalMilliseconds)
})

onBeforeUnmount(() => clearInterval(intervalId))

async function checkConnection() {
  if (connecting) {
    return
  }

  try {
    connecting = true

    await axios.get('/health', { timeout: timeoutMilliseconds })

    successMessage.value = 'Successfully connected to API.'
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = 'Failed to connect to API.'
    successMessage.value = ''
  } finally {
    connecting = false
  }
}
</script>

<template>
  <div v-if="successMessage" class="health success">
    <p>
      {{ successMessage }}
    </p>
  </div>
  <div v-else-if="errorMessage" class="health danger">
    <p>
      {{ errorMessage }}
    </p>
  </div>
  <div v-else class="health">
    <p>Connecting...</p>
  </div>
</template>

<style scoped>
.health {
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
}

.health.success {
  border: 1px solid green;
}

.health.danger {
  border: 1px solid red;
}
</style>
