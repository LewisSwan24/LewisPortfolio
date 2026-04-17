import { NextResponse } from 'next/server';
import { z } from 'zod';
import { randomUUID } from 'crypto';

// WIP: validates input and returns a stub id.
// Does not yet persist to DB or send a confirmation email.
// Blocked on: Booking model in schema.prisma and RESEND_API_KEY setup.

const bookingSchema = z.object({
  date: z.string().datetime(),
  timeSlot: z.string().min(1, "Time slot is required"),
  duration: z.union([z.literal(30), z.literal(60)]),
  topic: z.string().min(1, "Topic is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    bookingSchema.parse(body);

    return NextResponse.json(
      { message: 'Booking received', id: randomUUID(), status: 'pending' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
