'use client';
import { useState } from 'react';
import { BookingFormData } from '@/types/booking';
import styles from './BookingClient.module.css';

export default function BookingClient() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    date: null,
    timeSlot: null,
    duration: 30,
    topic: '',
    name: '',
    email: '',
    message: '',
  });

  const updateForm = (data: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const submitBooking = async () => {
    if (!formData.date || !formData.timeSlot || !formData.topic || !formData.name || !formData.email) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: formData.date.toISOString(),
          timeSlot: formData.timeSlot,
          duration: formData.duration,
          topic: formData.topic,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStep(5);
      } else {
        alert(result.message || 'Failed to submit booking');
      }
    } catch (error) {
      alert('An error occurred during submission.');
    }
  };

  return (
    <div className={styles.container}>
      {step === 1 && (
        <div className={styles.step}>
          <h2>Select a Date</h2>
          <button onClick={() => { updateForm({ date: new Date() }); setStep(2); }}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div className={styles.step}>
          <h2>Select a Time</h2>
          <button onClick={() => { updateForm({ timeSlot: '10:00' }); setStep(3); }}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div className={styles.step}>
          <h2>Topic & Details</h2>
          <input type="text" placeholder="Topic" required value={formData.topic} onChange={(e) => updateForm({ topic: e.target.value })} />
          <button onClick={() => setStep(4)}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div className={styles.step}>
          <h2>Contact Info</h2>
          <input type="text" placeholder="Name" required value={formData.name} onChange={(e) => updateForm({ name: e.target.value })} />
          <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => updateForm({ email: e.target.value })} />
          <button onClick={submitBooking}>Confirm Booking</button>
        </div>
      )}
      {step === 5 && (
        <div className={styles.step}>
          <h2>Booking Confirmed!</h2>
          <p>Thank you, {formData.name}.</p>
        </div>
      )}
    </div>
  );
}
