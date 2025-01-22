declare module '*.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.gql' {
  import { DocumentNode } from 'graphql'
  const Document: DocumentNode
  export default Document
}
