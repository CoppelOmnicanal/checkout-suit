import { MasterDataApi } from '../../../shared/api/masterdata.api'
import { HttpMethods } from '../../../shared/services/http.service'
import { COMERCIAL_CONDITIONS, ComercialCondition, CuotesGateway, ItemContext } from '../types/itemcontext.types'
import { AddToCartItem } from '../types/orderform.types'

export const useCuotesModifiers = () => {
  const sanitize = async (sanitizedItems: AddToCartItem[]) => {
    const http = new HttpMethods()
    const masterDataService = new MasterDataApi(http)
    const promises = sanitizedItems.map(async (item) => await masterDataService.itemContext(item.id))
    const contexts = await Promise.all(promises)

    const availableConditions: ComercialCondition[] = []
    const availableCuotes: CuotesGateway[] = []
    const promotions: Record<string, string[]> = {}
    let index = 0

    for (const itemContext of contexts) {
      const { CommercialConditionId, ProductClusterNames } = itemContext

      if (!COMERCIAL_CONDITIONS[CommercialConditionId]) {
        throw new Error('Invalid Commercial Condition')
      }

      availableCuotes.push(COMERCIAL_CONDITIONS[CommercialConditionId].id)
      availableConditions.push(COMERCIAL_CONDITIONS[CommercialConditionId])

      promotions[index] = []
      promotions[`${index}`] = Object.values(ProductClusterNames)
        .filter((value) => value.includes('--'))
        .map((element) => element.split('--')[0])

      index++
    }

    return { availableConditions, availableCuotes, promotions }
  }

  return { sanitize }
}
