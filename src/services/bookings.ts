import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, hasFirebaseConfig } from '../lib/firebase'
import type { BookingSubmissionPayload } from '../types/site'

export async function submitBookingRequest(payload: BookingSubmissionPayload) {
  if (!hasFirebaseConfig || !db) {
    throw new Error(
      'Firebase is not configured yet. Please add your environment variables before using the booking form.',
    )
  }

  return addDoc(collection(db, 'bookings'), {
    name: payload.name.trim(),
    phone: payload.phone.trim(),
    pickup: payload.pickup.trim(),
    destination: payload.destination.trim(),
    tripDateTime: payload.dateTime,
    notes: payload.notes.trim(),
    locale: payload.locale,
    status: payload.status,
    source: payload.source,
    vehicle: payload.vehicle,
    createdAt: serverTimestamp(),
  })
}
