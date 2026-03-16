import { useEffect, useCallback, useState } from 'react'

export function useRecaptcha(siteKey) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.log('useRecaptcha hook inicializando con siteKey:', siteKey)
    
    if (!siteKey) {
      console.warn('Site Key de reCAPTCHA no proporcionada')
      return
    }

    // Verificar si reCAPTCHA ya está cargado
    if (window.grecaptcha) {
      console.log('reCAPTCHA ya está cargado')
      setIsLoaded(true)
      return
    }

    // Verificar si el script ya existe
    const existingScript = document.querySelector('script[src*="recaptcha"]')
    if (existingScript) {
      console.log('Script de reCAPTCHA ya existe, esperando carga...')
      // Esperar a que se cargue
      const checkLoaded = () => {
        if (window.grecaptcha) {
          console.log('reCAPTCHA cargado desde script existente')
          setIsLoaded(true)
        } else {
          setTimeout(checkLoaded, 100)
        }
      }
      checkLoaded()
      return
    }

    // Cargar el script de reCAPTCHA
    console.log('Cargando script de reCAPTCHA...')
    setIsLoading(true)
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    
    script.onload = () => {
      console.log('Script de reCAPTCHA cargado, esperando inicialización...')
      // Esperar a que grecaptcha esté disponible
      const checkReady = () => {
        if (window.grecaptcha && window.grecaptcha.ready) {
          console.log('reCAPTCHA ready disponible, inicializando...')
          window.grecaptcha.ready(() => {
            console.log('reCAPTCHA inicializado correctamente')
            setIsLoaded(true)
            setIsLoading(false)
          })
        } else {
          setTimeout(checkReady, 100)
        }
      }
      checkReady()
    }

    script.onerror = () => {
      console.error('Error cargando Google reCAPTCHA')
      setIsLoading(false)
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup si el componente se desmonta
      const scriptToRemove = document.querySelector('script[src*="recaptcha"]')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [siteKey])

  const executeRecaptcha = useCallback(async (action) => {
    if (!siteKey) {
      console.error('reCAPTCHA Site Key no configurada')
      throw new Error('reCAPTCHA no está configurado correctamente')
    }

    if (!isLoaded || !window.grecaptcha) {
      console.error('reCAPTCHA no está cargado')
      throw new Error('reCAPTCHA no está cargado')
    }

    try {
      return new Promise((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {
            console.log('Ejecutando reCAPTCHA para acción:', action)
            const token = await window.grecaptcha.execute(siteKey, { action })
            console.log('Token reCAPTCHA obtenido exitosamente')
            resolve(token)
          } catch (error) {
            console.error('Error obteniendo token reCAPTCHA:', error)
            reject(error)
          }
        })
      })
    } catch (error) {
      console.error('Error ejecutando reCAPTCHA:', error)
      throw error
    }
  }, [siteKey, isLoaded])

  return {
    isLoaded,
    isLoading,
    executeRecaptcha
  }
}