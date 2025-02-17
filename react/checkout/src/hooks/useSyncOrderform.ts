import { User } from '../../../shared'
import { useOrderForm } from '../contexts/orderform'
import { ProfileForm } from '../pages/checkout/profile'
import { SalesChannel } from '../types/orderform.types'

export const useSyncOrderform = () => {
  const { updateProfile, orderForm, refreshSaleChannel, updateShipping } = useOrderForm()

  const syncProfile = async (user: User) => {
    if (!orderForm) throw new Error('No orderForm')

    const payload: ProfileForm = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      document: user.document,
      phone: user?.phone ?? '',
      corporateName: user.corporateName,
      corporateDocument: user.corporateDocument,
      isCorporate: user.isCorporate,
    }

    await updateProfile(payload)
  }

  const syncCart = async (user: User, onCharge: (percentage: number) => void) => {
    if (!orderForm) throw new Error('No orderForm')

    const { empleadocoppel } = user
    const { salesChannel } = orderForm
    const { COPPEL, CLIENT } = SalesChannel

    if ((empleadocoppel && salesChannel === CLIENT) || (!empleadocoppel && salesChannel === COPPEL)) refreshSaleChannel(empleadocoppel ?? false, onCharge)
  }

  const syncShipping = async () => {
    if (!orderForm) throw new Error('No orderForm')

    const emptyShipping = {
      addressId: null,
      address: null,
      logisticsInfo: [],
      clearAddressIfPostalCodeNotFound: false,
      selectedAddresses: [],
    }

    await updateShipping(emptyShipping)
  }

  return { syncProfile, syncCart, syncShipping }
}
