import React from 'react'
import { useBookings } from '../hooks/useBookings'
import { useUserProfiles } from '../hooks/useUserProfiles'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react'

export const AnalyticsPage: React.FC = () => {
  const { data: bookings = [] } = useBookings()
  const { data: profiles = [] } = useUserProfiles()
  
  // Calculate analytics data
  const statusData = [
    { name: 'Inquiries', value: bookings.filter(b => b.status === 'inquiry').length, color: '#F59E0B' },
    { name: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: '#059669' },
    { name: 'Cleared', value: bookings.filter(b => b.status === 'cleared').length, color: '#7C3AED' },
  ]
  
  const eventTypeData = bookings.reduce((acc, booking) => {
    acc[booking.event_type] = (acc[booking.event_type] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const eventTypeChartData = Object.entries(eventTypeData).map(([type, count]) => ({
    type,
    count,
  }))
  
  const totalBookings = bookings.length
  const conversionRate = totalBookings > 0 
    ? Math.round((bookings.filter(b => b.status !== 'inquiry').length / totalBookings) * 100)
    : 0
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Track booking performance and conversion metrics</p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{conversionRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Admins</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.filter(p => p.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center">
            <div className="bg-amber-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cleared Events</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => b.status === 'cleared').length}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Event Types */}
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Event Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventTypeChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}