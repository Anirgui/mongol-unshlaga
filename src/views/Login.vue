<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const password = ref('')
const error = ref('')

function login() {
  if (password.value === 'admin123') {
    localStorage.setItem('adminLoggedIn', 'true')
    router.push('/admin')
  } else {
    error.value = 'Нууц үг буруу байна'
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-box">
      <h1>Admin</h1>

      <p>Удирдлагын хэсэгт нэвтрэх</p>

      <form @submit.prevent="login">
        <input
          v-model="password"
          type="password"
          placeholder="Нууц үг"
        />

        <button type="submit">
          Нэвтрэх
        </button>
      </form>

      <p v-if="error" class="error">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.login-box {
  width: 90%;
  max-width: 360px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
}

h1 {
  margin: 0 0 8px;
}

p {
  color: #666;
}

input {
  width: 100%;
  box-sizing: border-box;
  padding: 13px;
  margin: 15px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 6px;
  background: #222;
  color: white;
  font-size: 16px;
}

.error {
  color: red;
  margin-top: 15px;
}
</style>