import React from 'react'
import { Helmet } from 'vtex.render-runtime'

export const VtexHelmet = () => {
  return (
    <>
      <Helmet>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100;200&display=swap" rel="stylesheet" />
        <link href="/files/checkout-instore-custom.css?v=d41d8cd9" rel="stylesheet" />
        <title data-i18n="title">Finalizar la compra</title>
        <link rel="shortcut icon" href="https://coppelar.vteximg.com.br/arquivos/LOGIS.png" />
        <link rel="apple-touch-icon" href="/arquivos/coppelar-apple-touch-icon.png" />
        <meta name="msapplication-TileImage" content="/arquivos/coppelar-windows-tile.png" />
        <script>
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-W5Q382P');
      `}
        </script>
        <script type="text/javascript">
          {`
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3331726,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `}
        </script>{' '}
      </Helmet>
    </>
  )
}
