export interface Booking {
  id: string
  client_name: string
  client_email: string
  event_type: string
  event_date: string
  message: string
  status: 'inquiry' | 'confirmed' | 'cleared'
  assigned_admin_id: string | null
  created_at: string
  updated_at: string
}

export interface Receipt {
  id: string
  booking_id: string
  file_url: string
  amount: number
  description: string
  uploaded_by: string
  created_at: string
}

export interface UserProfile {
  id: string
  email: string
  role: 'admin' | 'super_admin'
  status: 'pending_admin' | 'active' | 'revoked'
  created_at: string
  updated_at: string
}

export interface BookingFormData {
  client_name: string
  client_email: string
  event_type: string
  event_date: string
  message: string
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resource?: {
    status: 'inquiry' | 'confirmed' | 'cleared'
    assigned_admin?: string
  }
}