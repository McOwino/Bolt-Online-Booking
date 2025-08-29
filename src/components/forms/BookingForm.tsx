import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCreateBooking } from '../../hooks/useBookings'
import { Calendar, Mail, User, MessageSquare } from 'lucide-react'

const bookingSchema = z.object({
  client_name: z.string().min(2, 'Name must be at least 2 characters'),
  client_email: z.string().email('Please enter a valid email address'),
  event_type: z.string().min(1, 'Please select an event type'),
  event_date: z.string().min(1, 'Please select an event date'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type BookingFormData = z.infer<typeof bookingSchema>

export const BookingForm: React.FC = () => {
  const createBooking = useCreateBooking()
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })
  
  const onSubmit = async (data: BookingFormData) => {
    try {
      await createBooking.mutateAsync(data)
      reset()
    } catch (error) {
      console.error('Failed to submit booking:', error)
    }
  }
  
  const eventTypes = [
    'Wedding',
    'Corporate Event',
    'Birthday Party',
    'Anniversary',
    'Conference',
    'Workshop',
    'Other',
  ]
  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Book Your Event</h2>
        <p className="text-gray-600">Fill out the form below to submit your booking inquiry</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              {...register('client_name')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your full name"
            />
            {errors.client_name && (
              <p className="mt-1 text-sm text-red-600">{errors.client_name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="client_email" className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              {...register('client_email')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
            {errors.client_email && (
              <p className="mt-1 text-sm text-red-600">{errors.client_email.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="event_type" className="block text-sm font-medium text-gray-700 mb-2">
              Event Type
            </label>
            <select
              {...register('event_type')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select event type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.event_type && (
              <p className="mt-1 text-sm text-red-600">{errors.event_type.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="h-4 w-4 inline mr-2" />
              Event Date
            </label>
            <input
              type="date"
              {...register('event_date')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.event_date && (
              <p className="mt-1 text-sm text-red-600">{errors.event_date.message}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="h-4 w-4 inline mr-2" />
            Additional Details
          </label>
          <textarea
            {...register('message')}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Tell us more about your event requirements..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Booking Inquiry'}
        </button>
      </form>
    </div>
  )
}