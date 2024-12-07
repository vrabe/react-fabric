export type Dimensions = {
  width: number
  height: number
}

export type MyCapitalize<S extends string> = S extends `${infer A}:${infer B}:${infer C}`
  ? `on${Capitalize<A>}${Capitalize<B>}${Capitalize<C>}`
  : S extends `${infer A}:${infer B}`
    ? `on${Capitalize<A>}${Capitalize<B>}`
    : `on${Capitalize<S>}`
