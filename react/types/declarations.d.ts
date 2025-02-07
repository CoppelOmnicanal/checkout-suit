import { DataLayer } from '../shared'
import { CartPayload } from '../shared/types/emarsys.types'

declare module '*.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.gql' {
  import { DocumentNode } from 'graphql'
  const Document: DocumentNode
  export default Document
}

declare global {
  interface Window {
    dataLayer?: DataLayer[]
    Scarab: {
      setEmail: (email: string) => void
      cart: (cart: CartPayload[]) => void
      go: () => void
    }
  }
}
