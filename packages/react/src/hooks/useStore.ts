import { useContext, useMemo } from 'react'
import type { StoreApi } from 'zustand'
import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import { useStoreWithEqualityFn as useZustandStore } from 'zustand/traditional'
import StoreContext from '../contexts/StoreContext'
import type { Node } from '../types/nodes'
import type { ReactFabricState } from '../types/store'

function useStore<StateSlice = unknown>(
  selector: (state: ReactFabricState) => StateSlice,
  equalityFn?: (a: StateSlice, b: StateSlice) => boolean,
) {
  const store = useContext(StoreContext)

  if (store === null) {
    throw new Error('缺失zustandProvider')
  }

  return useZustandStore(store, selector, equalityFn)
}

function useStoreApi<NodeType extends Node = Node>() {
  const store = useContext(StoreContext) as UseBoundStoreWithEqualityFn<StoreApi<ReactFabricState<NodeType>>> | null

  if (store === null) {
    throw new Error('缺失zustandProvider')
  }

  return useMemo(
    () => ({
      getState: store.getState,
      setState: store.setState,
      subscribe: store.subscribe,
    }),
    [store],
  )
}

export { useStore, useStoreApi }
