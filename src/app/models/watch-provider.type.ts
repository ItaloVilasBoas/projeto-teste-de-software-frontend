
export interface ListaWatchProvider {
  link: string | undefined,
  buy: WatchProvider[],
  flatrate: WatchProvider[],
  rent: WatchProvider[],
}

interface WatchProvider {
  logo_path: string | undefined,
  provider_id: number | undefined,
  provider_name: string | undefined,
  display_priority: number | undefined
}
