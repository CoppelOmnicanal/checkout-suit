import { MasterDataApi } from '../../../shared/api/masterdata.api'
import { HttpMethods } from '../../../shared/services/http.service'
import { COMERCIAL_CONDITIONS, COMERCIAL_CONDITIONS_SKU, ComercialCondition, CuotesGateway, Gateways, ItemContext } from '../types/itemcontext.types'
import { AddToCartItem } from '../types/orderform.types'

export const useCuotesModifiers = () => {
  const sanitize = async (sanitizedItems: AddToCartItem[]) => {
    const http = new HttpMethods()
    const masterDataService = new MasterDataApi(http)
    const promises = sanitizedItems.map(async (item) => await masterDataService.itemContext(item.id))
    const contexts = await Promise.all(promises)

    const availableConditions: ComercialCondition[] = []
    const availableCuotes: CuotesGateway[] = []
    const availablePromotions: Record<string, string[]> = {}
    let index = 0

    for (const itemContext of contexts) {
      const { CommercialConditionId, ProductClusterNames } = itemContext

      if (!COMERCIAL_CONDITIONS[CommercialConditionId]) {
        throw new Error('Invalid Commercial Condition')
      }

      availableCuotes.push(COMERCIAL_CONDITIONS[CommercialConditionId].id)
      availableConditions.push(COMERCIAL_CONDITIONS[CommercialConditionId])

      availablePromotions[index] = []
      availablePromotions[`${index}`] = Object.values(ProductClusterNames)
        .filter((value) => value.includes('--'))
        .map((element) => element.split('--')[0])

      index++
    }

    return { availableConditions, availableCuotes, availablePromotions }
  }

  const calcMinorCuote = (availableConditions: ComercialCondition[], availableCuotes: CuotesGateway[]) => {
    const applicableCuotes = availableCuotes.map((cuote) => {
      const element = availableConditions.find((gateway) => gateway.id === cuote)
      if (!element) {
        throw new Error('Invalid Cuote Gateway')
      }

      return Number(cuote.replace(element.gateway, ''))
    })

    const minorCuote = Math.min(...applicableCuotes)
    const isSameGatewayForAll = availableConditions.every((comercialConditon) => comercialConditon.gateway === availableConditions[0].gateway)
    const modifierCuotesGateway = isSameGatewayForAll ? minorCuote + availableConditions[0].gateway : minorCuote + Gateways.S
    const cuotesModifier = COMERCIAL_CONDITIONS_SKU[modifierCuotesGateway as CuotesGateway]

    return cuotesModifier
  }

  const calcPromotions = (promotions: Record<string, string[]>) => promotions['0'].filter((promotion) => Object.values(promotions).every((value) => value.includes(promotion)))

  return { sanitize, calcMinorCuote, calcPromotions }
}
