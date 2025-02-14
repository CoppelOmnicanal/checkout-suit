import { AddToCartItem, OrderForm } from '../../checkout/src/types/orderform.types'
import { useAuth } from '../contexts/auth/AuthProvider'
import { CheckoutIdPayload, Events, GtmDimensionProduct, GtmOrderFormProduct, GtmProduct, GtmSections, Hashes } from '../types'

const category = (item: AddToCartItem) => {
  const categories = Object.values(item.productCategories)
    .map((category) => category.trim())
    .join('/')

  const categoryIdTree = item.productCategoryIds.split('/')
  const categoryTree = categories.split('/')

  return {
    categories,
    categoryIdTree,
    categoryTree,
  }
}

export const useGtm = () => {
  const { authApi } = useAuth()

  const checkoutId = (section: GtmSections, orderFormId: string) => {
    const payload: CheckoutIdPayload = {
      nd1: 'Checkout',
      nd2: section,
      nd3: orderFormId,
      nd4: '-',
      event: Events.CheckoutId,
    }

    if (window?.dataLayer && Array.isArray(window.dataLayer)) window.dataLayer.push(payload)
  }

  const cartLoaded = async (event: Events, step: Hashes, orderForm: OrderForm) => {
    const { items, orderFormId, salesChannel, marketingData, shippingData, clientProfileData } = orderForm
    const { utmCampaign = null, utmSource = null, campaignMedium = null, utmiCampaign = null, utmipage = null, utmiPart = null } = marketingData || {}
    const stepNumber: Record<Hashes, number> = {
      [Hashes.CART]: 0,
      [Hashes.PROFILE]: 1,
      [Hashes.SHIPPING]: 2,
    }

    const products: GtmProduct[] = items.map((item) => {
      const { categories } = category(item)

      return {
        id: item.id,
        name: item.name,
        category: categories,
        brand: item.additionalInfo.brandName,
        variant: item.skuName,
        price: item.price,
        quantity: item.quantity,
      }
    })

    const productDimensions: GtmDimensionProduct[] = items.map((item) => {
      const { categories } = category(item)

      return {
        id: item.productId,
        variant: item.id,
        name: item.name,
        category: categories,
        brand: item.additionalInfo.brandName,
        price: item.price / 100,
        quantity: item.quantity,
        dimension1: item.productRefId,
        dimension2: item.refId,
        dimension3: item.skuName,
      }
    })

    const orderFormProducts: GtmOrderFormProduct[] = items.map((item) => {
      const { categoryIdTree, categoryTree } = category(item)

      return {
        id: item.productId,
        name: item.name,
        sku: item.id,
        skuRefId: null,
        skuName: item.name,
        seller: 'Coppel S.A.',
        sellerId: '1',
        brand: item.additionalInfo.brandName,
        brandId: item.additionalInfo.brandId,
        isGift: false,
        category: categoryTree[categoryIdTree.length - 1],
        categoryId: categoryIdTree[categoryIdTree.length - 1],
        categoryTree,
        categoryIdTree,
        originalPrice: item.listPrice / 100,
        price: item.price / 100,
        sellingPrice: item.sellingPrice / 100,
        tax: 0,
        quantity: item.quantity,
        components: [],
        measurementUnit: 'un',
        unitMultiplier: 1,
      }
    })

    const { email = null, firstName = null, lastName = null } = clientProfileData || {}
    const [user] = await authApi.getByEmail(email ?? '')
    const hasRegistered = !!user

    const { address, logisticsInfo = null } = shippingData || {}
    const selectedSla = logisticsInfo ? logisticsInfo[0].selectedSla : null
    const slas = logisticsInfo ? logisticsInfo[0].slas : null
    const { postalCode = null, street = null, number = null, city = null, state = null } = address || {}
    const { price: shippingPrice = null, name = null } = slas?.find(({ id }) => selectedSla === id) || {}
    const total = orderForm.totalizers.reduce((acc, { value }) => acc + value, 0) + /*interest??*/ 0
    const payload = {
      orderFormId,
      salesChannel,
      campaignName: utmCampaign,
      campaignSource: utmSource,
      campaignMedium,
      internalCampaignName: utmiCampaign,
      internalCampaignPage: utmipage,
      internalCampaignPart: utmiPart,
      ecommerce: {
        checkout: {
          actionField: { step: stepNumber[step] },
          products,
        },
      },
      ecommerceV2: {
        ecommerce: {
          checkout: {
            actionField: { step: stepNumber[step] },
            products: productDimensions,
          },
        },
      },
      visitorType: hasRegistered ? 'existing customer' : 'new customer',
      visitorLoginState: hasRegistered ? 'authenticated customer' : undefined,
      visitorContactInfo: [email, firstName, lastName],
      visitorDemographicInfo: [postalCode, `${street}, ${number} - undefined - undefined - ${city} - ${state}`],
      visitorOptinNewsLetter: false,
      orderFormTax: null,
      orderFormShipping: shippingPrice,
      orderFormShippingMethod: [name],
      orderFormPromoCode: undefined,
      orderFormPaymentType: undefined,
      orderFormTotal: total + (shippingPrice ?? 0) + /* interest ?? */ 0,
      orderFormProducts,
      event,
    }

    if (window?.dataLayer && Array.isArray(window.dataLayer)) window.dataLayer.push(payload)
  }

  /*  const history = () => {
    if (!oldHash || oldHash === window.location.hash) return

    const payload = {
      event: 'gtm.historyChange',
      'gtm.historyChangeSource': 'popstate',
      'gtm.oldUrlFragment': `/${oldHash.replace(/[#/]/g, '')}`,
      'gtm.newUrlFragment': `/${window.location.hash.replace(/[#/]/g, '')}`,
      'gtm.oldHistoryState': null,
      'gtm.newHistoryState': null,
      'gtm.oldUrl': 'https://www.coppel.com.ar/checkout/',
      'gtm.newUrl': 'https://www.coppel.com.ar/checkout/',
      'gtm.uniqueEventId': 1022,
    }

    if (window?.dataLayer && Array.isArray(window.dataLayer)) window.dataLayer.push(payload)
  }*/

  return { checkoutId, cartLoaded }
}
