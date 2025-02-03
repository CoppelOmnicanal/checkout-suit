import checkout from '../../public/checkout.module.css'
import footer from './footer.module.css'
import React from 'react'

export const Footer = () => {
  return (
    <div className={`${checkout['sc-section']} ${footer.footer}`}>
      <div className={`${checkout['sc-responsive-container']}`}>
        <div className={`${checkout['body-small']} ${footer['sc-footer-contact']}`}>
          Al comprar se aceptan los&nbsp;
          <a href="/terminos-y-condiciones" aria-label="Ir a términos y condiciones">
            Términos y Condiciones
          </a>
        </div>
        <div className={`${checkout['caption']} ${footer['sc-warning']}`}>
          En nuestra página web, las fotografías tienen un propósito ilustrativo y la disponibilidad de los productos publicados está sujeta a la verificación de stock.
          Los precios en línea y los planes de financiamiento para los productos presentados en www.coppel.com.ar solo son válidos para compras realizadas a través de la
          página web mencionada. Además, tenga en cuenta que las especificaciones técnicas y las descripciones de los productos están sujetas a cambios sin previo aviso.
        </div>
      </div>
    </div>
  )
}
