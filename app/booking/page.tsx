import type { Metadata } from 'next';
import BookingClient from '@/components/booking/BookingClient';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Schedule a session with me',
};

export default function BookingPage() {
  return (
    <main>
      <h1>Book Appointment</h1>
      <BookingClient />
    </main>
  );
}
