import React from 'react'
import { BookingForm } from '../components/forms/BookingForm'
import { InterestCalendar } from '../components/calendar/InterestCalendar'
import { Calendar, Star, Users, Award } from 'lucide-react'

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Professional Event
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Booking</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Transform your special moments into unforgettable experiences with our comprehensive event management services
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Scheduling</h3>
                <p className="text-gray-600">Simple booking process with real-time calendar availability</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Team</h3>
                <p className="text-gray-600">Dedicated event coordinators for seamless execution</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Service</h3>
                <p className="text-gray-600">Award-winning service with attention to every detail</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Booking Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Start Your Booking</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about your event and we'll get back to you with a customized proposal
            </p>
          </div>
          <BookingForm />
        </div>
      </section>
      
      {/* Calendar Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Check Availability</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              View our current bookings and find the perfect date for your event
            </p>
          </div>
          <InterestCalendar />
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                event: "Wedding Reception",
                quote: "The team made our wedding day absolutely perfect. Every detail was handled with care and professionalism."
              },
              {
                name: "Michael Chen",
                event: "Corporate Conference",
                quote: "Outstanding service for our annual conference. The booking process was smooth and the execution flawless."
              },
              {
                name: "Emily Rodriguez",
                event: "Birthday Celebration",
                quote: "They transformed our vision into reality. The attention to detail and customer service exceeded all expectations."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}