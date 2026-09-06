<script setup>
    import {
        ref,
        onMounted
    } from 'vue'

    const articles = ref([])

    function loadArticles() {
        articles.value = JSON.parse(
            localStorage.getItem('articles') || '[]'
        )
    }

    function deleteArticle(id) {
        if (!confirm('Энэ нийтлэлийг устгах уу?')) {
            return
        }

        articles.value = articles.value.filter(
            article => article.id !== id
        )

        localStorage.setItem(
            'articles',
            JSON.stringify(articles.value)
        )
    }

    onMounted(() => {
        loadArticles()
    })
</script>
<template>  <div class="admin-page">
    <!-- SIDEBAR -->

    <aside class="sidebar">

        <h2>Уншлагын танхим</h2>

        <router-link to="/admin">
            📚 Нийтлэлүүд
        </router-link>

        <router-link to="/admin/new">
            ✏️ Шинэ нийтлэл
        </router-link>

        <a href="/">
            🌐 Сайт харах
        </a>

    </aside>


    <!-- MAIN -->

    <main class="main">

        <div class="topbar">

            <h1>Нийтлэлүүд</h1>

            <router-link
                to="/admin/new"
                class="new-button"
                >
                + Шинэ нийтлэл
            </router-link>

        </div>


        <!-- НИЙТЛЭЛ БАЙХГҮЙ -->

        <div
            v-if="articles.length === 0"
            class="empty"
            >

            <h2>Одоогоор нийтлэл алга</h2>

            <p>
                Шинэ нийтлэл үүсгээд Publish дарна уу.
            </p>

            <router-link to="/admin/new">
                + Шинэ нийтлэл
            </router-link>

        </div>


        <!-- НИЙТЛЭЛҮҮД -->

        <div
            v-else
            class="post-list"
            >

            <div
                v-for="article in articles"
                :key="article.id"
                class="post"
                >

                <div class="post-info">

                    <h2>
                        {{ article.title }}
                    </h2>

                    <div class="meta">

                        <span>
                            {{ article.category }}
                        </span>

                        <span>
                            {{ article.author }}
                        </span>

                        <span>
                            {{ article.date }}
                        </span>

                        <span class="published">
                            Published
                        </span>

                    </div>

                </div>


                <!-- ҮЙЛДЛҮҮД -->

                <div class="actions">

                    <!-- ЗАСАХ -->

                    <router-link
                        :to="`/admin/edit/${article.id}`"
                        class="edit"
                        >
                        Засах
                    </router-link>


                    <!-- УСТГАХ -->

                    <button
                        class="delete"
                        @click="deleteArticle(article.id)"
                        >
                        Устгах
                    </button>

                </div>

            </div>

        </div>

    </main>

</div>
</template><style scoped>
    * {
        box-sizing: border-box;
    }

    .admin-page {
        min-height: 100vh;
        display: flex;
        background: #f5f5f5;
    }


    /* SIDEBAR */

    .sidebar {
        width: 220px;
        flex-shrink: 0;

        background: #202124;
        color: white;

        padding: 20px 12px;
    }

    .sidebar h2 {
        font-size: 17px;
        margin: 0 0 25px;
    }

    .sidebar a {
        display: block;

        color: white;
        text-decoration: none;

        padding: 11px 10px;
        border-radius: 6px;

        margin-bottom: 4px;
    }

    .sidebar a:hover {
        background: #333;
    }


    /* MAIN */

    .main {
        flex: 1;
        min-width: 0;

        padding: 25px;

        max-width: 1200px;
        margin: auto;
    }


    /* TOPBAR */

    .topbar {
        display: flex;

        justify-content: space-between;
        align-items: center;

        gap: 15px;

        margin-bottom: 20px;
    }

    .topbar h1 {
        margin: 0;
        font-size: 25px;
    }

    .new-button {
        flex-shrink: 0;

        background: #2271b1;
        color: white;

        text-decoration: none;

        padding: 10px 15px;
        border-radius: 5px;

        white-space: nowrap;
    }


    /* POSTS */

    .post-list {
        width: 100%;

        background: white;

        border: 1px solid #ddd;
        border-radius: 6px;

        overflow: hidden;
    }

    .post {
        display: flex;

        justify-content: space-between;
        align-items: center;

        gap: 15px;

        padding: 18px;

        border-bottom: 1px solid #eee;
    }

    .post:last-child {
        border-bottom: 0;
    }

    .post-info {
        min-width: 0;
        flex: 1;
    }

    .post-info h2 {
        margin: 0 0 9px;

        font-size: 18px;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }


    /* META */

    .meta {
        display: flex;

        gap: 12px;

        flex-wrap: wrap;

        font-size: 13px;

        color: #666;
    }

    .published {
        color: #16833b;
    }


    /* BUTTONS */

    .actions {
        display: flex;

        gap: 7px;

        flex-shrink: 0;
    }

    .edit {
        border: 1px solid #2271b1;

        background: white;
        color: #2271b1;

        text-decoration: none;

        padding: 7px 12px;

        border-radius: 4px;

        white-space: nowrap;
    }

    .edit:hover {
        background: #2271b1;
        color: white;
    }

    .delete {
        border: 1px solid #d63638;

        background: white;
        color: #d63638;

        padding: 7px 12px;

        border-radius: 4px;

        cursor: pointer;

        white-space: nowrap;
    }

    .delete:hover {
        background: #d63638;
        color: white;
    }


    /* EMPTY */

    .empty {
        background: white;

        border: 1px solid #ddd;
        border-radius: 6px;

        padding: 50px 20px;

        text-align: center;
    }

    .empty h2 {
        margin-top: 0;
    }

    .empty a {
        display: inline-block;

        margin-top: 15px;

        background: #2271b1;
        color: white;

        text-decoration: none;

        padding: 10px 16px;

        border-radius: 5px;
    }


    /* TABLET */

    @media (max-width: 800px) {

        .sidebar {
            width: 190px;
        }

        .main {
            padding: 20px;
        }

        .post {
            align-items: flex-start;
        }

    }


    /* PHONE */

    @media (max-width: 600px) {

        .admin-page {
            display: block;
        }

        .sidebar {
            width: 100%;

            padding: 12px;

            display: flex;
            align-items: center;

            gap: 5px;

            overflow-x: auto;
        }

        .sidebar h2 {
            display: none;
        }

        .sidebar a {
            margin: 0;

            padding: 9px 10px;

            white-space: nowrap;

            font-size: 13px;
        }

        .main {
            width: 100%;

            padding: 15px;
        }

        .topbar {
            align-items: center;
        }

        .topbar h1 {
            font-size: 21px;
        }

        .new-button {
            padding: 8px 11px;

            font-size: 13px;
        }

        .post {
            padding: 15px;

            align-items: flex-start;
        }

        .post-info h2 {
            font-size: 16px;
        }

        .meta {
            gap: 5px 10px;

            font-size: 12px;
        }

        .actions {
            flex-direction: column;
        }

        .edit,
        .delete {
            padding: 6px 10px;

            font-size: 12px;
        }

    }
</style>