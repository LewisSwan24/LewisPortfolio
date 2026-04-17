import { BookingFormData } from '@/types/booking';

interface Props {
  formData: BookingFormData;
}

export default function ConfirmationPage({ formData }: Props) {
  return (
    <div>
      <h3>Booking Confirmed</h3>
      <p>Date: {formData.date?.toDateString()}</p>
      <p>Time: {formData.timeSlot}</p>
      <button>Download .ics</button>
    </div>
  );
}
