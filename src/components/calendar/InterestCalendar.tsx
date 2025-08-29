import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useBookings } from '../../hooks/useBookings'
import { CalendarEvent } from '../../types'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export const InterestCalendar: React.FC = () => {
  const { data: bookings = [] } = useBookings()
  
  const events: CalendarEvent[] = bookings.map((booking) => ({
    id: booking.id,
    title: `${booking.event_type} - ${booking.client_name}`,
    start: new Date(booking.event_date),
    end: new Date(booking.event_date),
    resource: {
      status: booking.status,
      assigned_admin: booking.assigned_admin_id,
    },
  }))
  
  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '#3B82F6' // Default blue
    
    switch (event.resource?.status) {
      case 'inquiry':
        backgroundColor = '#F59E0B' // Amber
        break
      case 'confirmed':
        backgroundColor = '#059669' // Green
        break
      case 'cleared':
        backgroundColor = '#7C3AED' // Purple
        break
    }
    
    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    }
  }
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Calendar</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-amber-500 rounded"></div>
            <span>Inquiry</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-600 rounded"></div>
            <span>Confirmed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-600 rounded"></div>
            <span>Cleared</span>
          </div>
        </div>
      </div>
      
      <div className="h-96 md:h-[500px]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          views={['month', 'week', 'day']}
          defaultView="month"
          className="text-sm"
        />
      </div>
    </div>
  )
}