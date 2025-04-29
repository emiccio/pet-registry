import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

// El HOC con autenticación
export function withAuth<P>(WrappedComponent: React.ComponentType) {
  return (props: any) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return  // No hacer nada mientras se carga la sesión
      if (!session) {
        // Redirigir al login si no hay sesión activa
        router.push('/auth/login')
      }
    }, [session, status, router])

    if (status === 'loading') {
      return <div>Loading...</div>  // Puedes personalizar este mensaje
    }

    if (!session) {
      return <div>Access Denied. Please login to access this page.</div>
    }

    return <WrappedComponent {...props} />
  }
}
