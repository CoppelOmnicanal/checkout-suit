import React, { PropsWithChildren, useEffect, useState } from 'react'
import { useOrderForm } from '../contexts/orderform'
import { useAuth } from '../../../shared/contexts/auth/AuthProvider'
import { MasterDataApi } from '../../../shared/api/masterdata.api'
import { Session, User } from '../../../shared/types/user.types'
import { Steps } from '../../../shared/types/masterdata.types'

export const EventsContainer: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { orderForm } = useOrderForm()
  const { getUserProfileByEmail, getSession } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const email = orderForm?.clientProfileData?.email
    if (!email) return

    const fetchData = async () => {
      try {
        const [fetchedUser, fetchedSession] = await Promise.all([getUserProfileByEmail(email), getSession()])
        setUser(fetchedUser)
        setSession(fetchedSession)
      } catch (error) {
        console.error('Error fetching user or session:', error)
      }
    }

    fetchData()
  }, [orderForm])

  useEffect(() => {
    if (!user || !orderForm) return
    const masterdata = new MasterDataApi()
    masterdata.gtmEntry(orderForm, user.id)

    if (!session) return

    const exitEvent = () => {
      const hash = window.location.hash.replace(/[^a-zA-Z]/g, '') as Steps
      if (!user /*|| isPurchaseClosed*/) return
      masterdata.gtmExit(hash, user?.id, session?.id, orderForm)
    }

    window.addEventListener('beforeunload', exitEvent)

    return () => {
      window.removeEventListener('beforeunload', exitEvent)
    }
  }, [user, session, orderForm])

  return <>{children}</>
}
