<template>
  <div class="container">
    <h1>Миний жагсаалт</h1>

    <div class="add-form">
      <input
        v-model="newText"
        placeholder="Текст бичих..."
        @keyup.enter="addItem"
      />
      <button @click="addItem">Нэмэх</button>
    </div>

    <p v-if="loading">Уншиж байна...</p>

    <ul class="items-list">
      <li v-for="item in items" :key="item.id">
        <span>{{ item.text }}</span>
        <button @click="deleteItem(item.id)">Устгах</button>
      </li>
    </ul>

    <p v-if="!loading && items.length === 0">Одоогоор юу ч байхгүй байна.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const items = ref([]);
const newText = ref('');
const loading = ref(true);

async function loadItems() {
  loading.value = true;
  const res = await fetch('/api/items');
  items.value = await res.json();
  loading.value = false;
}

async function addItem() {
  if (!newText.value.trim()) return;
  await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: newText.value })
  });
  newText.value = '';
  await loadItems();
}

async function deleteItem(id) {
  await fetch(`/api/items/${id}`, { method: 'DELETE' });
  await loadItems();
}

onMounted(loadItems);
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  font-family: sans-serif;
}

.add-form {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.add-form input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
}

.add-form button {
  padding: 8px 16px;
}

.items-list {
  list-style: none;
  padding: 0;
}

.items-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
