import { FC, ReactNode } from 'react'

export interface SingleProvider<Props = {}> extends FC<Props & { children?: ReactNode }> {}
