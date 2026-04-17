export interface BookingFormData {
  date: Date | null;
  timeSlot: string | null;
  duration: 30 | 60;
  topic: string;
  name: string;
  email: string;
  message: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message?: string;
}
