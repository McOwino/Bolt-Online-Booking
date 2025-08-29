import React from 'react'
import { InterestCalendar } from '../components/calendar/InterestCalendar'

export const CalendarPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Event Calendar</h1>
        <p className="text-gray-600 mt-2">View all bookings and their current status</p>
      </div>
      
      <InterestCalendar />
    </div>
  )
}