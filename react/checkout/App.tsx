import React, { useEffect, useMemo, useState } from 'react'
import { Checkout } from './src/Checkout'
import '../shared/public/global.css'
import { Header } from '../shared/components'
import { Footer } from '../shared/components/footer/Footer'

export const App = () => {
  const [emarsys, setEmarsys] = useState(false)
  const [vtex, setVtex] = useState(false)
  const isReady = useMemo(() => vtex && emarsys, [vtex, emarsys])

  useEffect(() => {
    console.log(`🤖Superior Checkout Release 3.0.0`)

    const emarsys = document.createElement('script')
    const jqueryjs = document.createElement('script')
    const vtexjs = document.createElement('script')
    const googleFrame = document.createElement('iframe')

    googleFrame.src = 'https://www.googletagmanager.com/ns.html?id=GTM-W5Q382P'
    googleFrame.height = '0'
    googleFrame.width = '0'
    googleFrame.style.display = 'none'
    googleFrame.style.visibility = 'hidden'

    emarsys.src = '/_v/services/scarab'
    emarsys.async = true
    emarsys.onload = () => {
      console.log('EMARSYS LOADED')
      setEmarsys(true)
    }

    jqueryjs.src = 'https://code.jquery.com/jquery-3.7.1.min.js'
    jqueryjs.async = true
    jqueryjs.onload = () => {
      console.log('JQUERY LOADED')

      vtexjs.src = '//io.vtex.com.br/vtex.js/2.0.0/vtex.min.js'
      vtexjs.async = true
      vtexjs.onerror = () => console.error('Error al cargar VTEX.js')
      vtexjs.onload = () => {
        console.log('VTEX LOADED')
        setVtex(true)
      }

      document.body.appendChild(vtexjs)
    }

    jqueryjs.onerror = () => console.error('Error al cargar JQUERY.js')

    document.body.appendChild(emarsys)
    document.body.appendChild(googleFrame)
    document.body.appendChild(jqueryjs)

    return () => {
      jqueryjs.remove()
      vtexjs.remove()
      emarsys.remove()
      googleFrame.remove()
    }
  }, [])

  return (
    <>
      <div>
        <div id="backdrop"></div>
        <Header />
        {isReady ? <Checkout /> : 'Cargando...'}
        <Footer />
      </div>
    </>
  )
}
