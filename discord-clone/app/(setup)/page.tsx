import InitialModal from '@/components/modals/initial-modal';
import { db } from '@/lib/db-hot-reloading';
import { getOrCreateProfile } from '@/lib/get-or-create-profile'
import { redirect } from 'next/navigation';
import React from 'react'

const SetupPage = async() => {
  const profile = await getOrCreateProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })
  if(server) {
    return (
      redirect(`/servers${server.id}`)
    )
  }
  return <InitialModal />
}

export default SetupPage
