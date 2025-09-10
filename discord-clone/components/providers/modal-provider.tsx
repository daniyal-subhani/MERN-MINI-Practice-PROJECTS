"use client"

import { useEffect, useState } from "react"
import { useModal } from "@/hooks/use-modal-store"
import ServerModal from "../modals/create-server-modal"

// later you can add: EditServerModal, DeleteServerModal

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { type } = useModal()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      {type === "createServer" && <ServerModal />}
      {/* later */}
      {/* {type === "editServer" && <EditServerModal />} */}
      {/* {type === "deleteServer" && <DeleteServerModal />} */}
    </>
  )
}
