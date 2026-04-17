/**
 * Reusable Stat Card component.
 */
export default function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
      <h3>{label}</h3>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
    </div>
  );
}
