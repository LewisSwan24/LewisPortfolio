import StatCard from '@/components/admin/StatCard';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Mock data - in production use Prisma
  const stats = { views: 1240, posts: 15, comments: 42, subscribers: 120 };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <StatCard label="Total Views" value={stats.views.toString()} />
        <StatCard label="Posts" value={stats.posts.toString()} />
        <StatCard label="Comments" value={stats.comments.toString()} />
        <StatCard label="Subscribers" value={stats.subscribers.toString()} />
      </div>
    </div>
  );
}
