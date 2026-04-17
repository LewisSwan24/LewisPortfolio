/**
 * Blog Posts management page.
 */
export default function PostsPage() {
  const posts = [
    { id: '1', title: 'Getting started with Next.js 15', status: 'Published', date: '2023-10-01', views: 200 }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Posts</h1>
        <button>Create New Post</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
            <th>Views</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.status}</td>
              <td>{post.date}</td>
              <td>{post.views}</td>
              <td><a href={`/posts/${post.id}/edit`}>Edit</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
