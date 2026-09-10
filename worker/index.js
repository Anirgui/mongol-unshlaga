export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      return handleApi(request, env, url);
    }

    return env.ASSETS.fetch(request);
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleApi(request, env, url) {
  const { pathname } = url;
  const method = request.method;

  // /api/articles
  if (pathname === '/api/articles' && method === 'GET') {
    const { results } = await env.DB.prepare(
      'SELECT * FROM articles ORDER BY id DESC'
    ).all();
    return json(results);
  }

  if (pathname === '/api/articles' && method === 'POST') {
    const body = await request.json();
    const result = await env.DB.prepare(
      'INSERT INTO articles (title, author, category, content, date) VALUES (?, ?, ?, ?, ?)'
    ).bind(
      body.title,
      body.author || 'Тодорхойгүй',
      body.category || '',
      body.content,
      body.date || new Date().toLocaleDateString('mn-MN')
    ).run();

    return json({ success: true, id: result.meta.last_row_id });
  }

  // /api/articles/:id
  const match = pathname.match(/^\/api\/articles\/(\d+)$/);
  if (match) {
    const id = match[1];

    if (method === 'GET') {
      const article = await env.DB.prepare(
        'SELECT * FROM articles WHERE id = ?'
      ).bind(id).first();

      if (!article) return json({ error: 'Not found' }, 404);
      return json(article);
    }

    if (method === 'PUT') {
      const body = await request.json();
      await env.DB.prepare(
        'UPDATE articles SET title = ?, author = ?, category = ?, content = ? WHERE id = ?'
      ).bind(
        body.title,
        body.author || 'Тодорхойгүй',
        body.category || '',
        body.content,
        id
      ).run();

      return json({ success: true });
    }

    if (method === 'DELETE') {
      await env.DB.prepare('DELETE FROM articles WHERE id = ?').bind(id).run();
      return json({ success: true });
    }
  }

  return json({ error: 'Not found' }, 404);
}