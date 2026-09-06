<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const title = ref('')
const author = ref('')
const category = ref('')
const content = ref('')

const editor = ref(null)

const categories = ['Өгүүллэг', 'Шүлэг', 'Үлгэр']

onMounted(async () => {
  const articles = JSON.parse(
    localStorage.getItem('articles') || '[]'
  )

  const id = Number(route.params.id)

  const article = articles.find(item => item.id === id)

  if (!article) {
    alert('Нийтлэл олдсонгүй')
    router.push('/admin')
    return
  }

  title.value = article.title
  author.value = article.author
  category.value = article.category
  content.value = article.content

  await nextTick()

  if (editor.value) {
    editor.value.innerText = article.content
  }
})

function updateContent() {
  if (editor.value) {
    content.value = editor.value.innerText
  }
}

function saveArticle() {
  updateContent()

  if (!title.value.trim()) {
    alert('Гарчиг оруулна уу')
    return
  }

  if (!content.value.trim()) {
    alert('Монгол бичгийн текст оруулна уу')
    return
  }

  const articles = JSON.parse(
    localStorage.getItem('articles') || '[]'
  )

  const id = Number(route.params.id)

  const index = articles.findIndex(
    article => article.id === id
  )

  if (index === -1) {
    alert('Нийтлэл олдсонгүй')
    return
  }

  articles[index] = {
    ...articles[index],
    title: title.value.trim(),
    author: author.value.trim() || 'Тодорхойгүй',
    category: category.value,
    content: content.value
  }

  localStorage.setItem(
    'articles',
    JSON.stringify(articles)
  )

  alert('Нийтлэл амжилттай шинэчлэгдлээ')

  router.push('/admin')
}
</script>

<template>
  <div class="admin-layout">

    <aside class="sidebar">
      <h2>Admin</h2>

      <nav>
        <router-link to="/admin">
          Нийтлэлүүд
        </router-link>

        <router-link to="/admin/new">
          + Шинэ нийтлэл
        </router-link>

        <router-link to="/">
          Сайт харах
        </router-link>
      </nav>
    </aside>

    <main class="content">

      <div class="topbar">
        <h1>Нийтлэл засах</h1>

        <button
          class="publish"
          @click="saveArticle"
        >
          Хадгалах
        </button>
      </div>

      <div class="form">

        <input
          v-model="title"
          class="title-input"
          placeholder="Нийтлэлийн гарчиг"
        />

        <div class="settings">

          <input
            v-model="author"
            placeholder="Зохиогч"
          />

          <select v-model="category">
            <option
              v-for="item in categories"
              :key="item"
              :value="item"
            >
              {{ item }}
            </option>
          </select>

        </div>

        <div
          ref="editor"
          class="mongol-editor"
          contenteditable="true"
          data-placeholder="Монгол бичгийн текстээ энд оруулна уу..."
          @input="updateContent"
        ></div>

      </div>

    </main>

  </div>
</template>

<style>
@font-face {
  font-family: MongolianScript;
  src: url('/fonts/MongolianScript.ttf');
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
}

.sidebar {
  width: 230px;
  background: #1d2327;
  color: white;
  padding: 25px 15px;
}

.sidebar h2 {
  margin: 0 0 30px;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar a {
  color: #ddd;
  text-decoration: none;
  padding: 12px;
  border-radius: 5px;
}

.sidebar a:hover {
  background: #2c3338;
}

.content {
  flex: 1;
}

.topbar {
  height: 70px;
  background: white;
  border-bottom: 1px solid #ddd;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 30px;
}

.topbar h1 {
  margin: 0;
}

.publish {
  background: #2271b1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.form {
  padding: 30px;
}

.title-input {
  width: 100%;
  font-size: 28px;
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
}

.settings {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.settings input,
.settings select {
  padding: 10px;
  border: 1px solid #ddd;
}

.mongol-editor {
  writing-mode: vertical-lr;
  text-orientation: mixed;

  font-family: MongolianScript, serif;
  font-size: 30px;
  line-height: 1.7;

  height: 500px;

  overflow-x: auto;
  overflow-y: hidden;

  white-space: pre-wrap;

  outline: none;

  padding: 20px;

  background: white;
  border: 1px solid #ddd;
}

.mongol-editor:empty::before {
  content: attr(data-placeholder);
  opacity: .4;
}
</style>