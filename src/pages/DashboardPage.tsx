import React from 'react'
import { useSession } from '../lib/auth-client'
import { AdminDashboard } from '../components/dashboard/AdminDashboard'
import { SuperAdminDashboard } from '../components/dashboard/SuperAdminDashboard'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { UserProfile } from '../types'

export const DashboardPage: React.FC = () => {
  const { data: session } = useSession()
  
  const { data: userProfile } = useQuery({
    queryKey: ['user-profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()
      
      if (error) throw error
      return data as UserProfile
    },
    enabled: !!session?.user?.id,
  })
  
  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to access the dashboard</p>
        </div>
      </div>
    )
  }
  
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  if (userProfile.status === 'pending_admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-lg p-8">
          <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Account Pending Approval</h1>
          <p className="text-gray-600 mb-6">
            Your admin account is awaiting approval from a Super Admin. You'll receive notification once your account is activated.
          </p>
          <p className="text-sm text-gray-500">
            Registered with: {userProfile.email}
          </p>
        </div>
      </div>
    )
  }
  
  if (userProfile.status === 'revoked') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white rounded-xl shadow-lg p-8">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Account Suspended</h1>
          <p className="text-gray-600">
            Your admin privileges have been revoked. Please contact the Super Admin for more information.
          </p>
        </div>
      </div>
    )
  }
  
  return userProfile.role === 'super_admin' ? <SuperAdminDashboard /> : <AdminDashboard />
}