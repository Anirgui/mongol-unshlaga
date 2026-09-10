export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      return handleApi(request, env, url);
    }

    return env.ASSETS.fetch(request);
  }
};

async function handleApi(request, env, url) {
  const { pathname } = url;

  if (pathname === '/api/items' && request.method === 'GET') {
    const { results } = await env.DB.prepare('SELECT * FROM items ORDER BY id DESC').all();
    return Response.json(results);
  }

  if (pathname === '/api/items' && request.method === 'POST') {
    const body = await request.json();
    await env.DB.prepare('INSERT INTO items (text) VALUES (?)').bind(body.text).run();
    return Response.json({ success: true });
  }

  if (pathname.startsWith('/api/items/') && request.method === 'DELETE') {
    const id = pathname.split('/').pop();
    await env.DB.prepare('DELETE FROM items WHERE id = ?').bind(id).run();
    return Response.json({ success: true });
  }

  return new Response('Not found', { status: 404 });
}
