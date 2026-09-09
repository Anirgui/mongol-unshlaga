export default {
  async fetch(request, env) {
    const { results } = await env.DB
      .prepare("SELECT * FROM articles")
      .all();

    return Response.json(results);
  }
};
