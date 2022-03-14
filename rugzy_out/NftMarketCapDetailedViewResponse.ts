// DO NOT EDIT - THIS FILE IS AUTO GENERATED
// see README.md

import { Pagination } from './common'

/**
 * Get historical data for NFT collection
 *
 * Given `:chain_id` and `:collection_address`, return a detailed view of the specified collection address and their time series data in day granularity.
 *
 * Path: `/v1/:chain_id/nft_market/collection/:collection_address/`
 */
export type NftMarketCapDetailedViewResponse = {
  items: NftMarketCapDetailedViewItem[]
  pagination: Pagination
  /** The updated time. (format: date-time) */
  updated_at: string
}

export type NftMarketCapDetailedViewItem = {
  /** Average volume of sale within that day in quote currency. (format: float) */
  average_volume_quote_day: number
  /** Average volume of sale within that day in WEI. */
  average_volume_wei_day: number | string
  /** Chain ID of the Blockchain being queried. Currently supports `1` for Ethereum Mainnet, `137` for Polygon/Matic Mainnet, `80001` for Polygon/Matic Mumbai Testnet, `56` for Binance Smart Chain, `43114` for Avalanche C-Chain Mainnet, `43113` for Fuji C-Chain Testnet, and `250` for Fantom Opera Mainnet. (format: int64) */
  chain_id: number | string
  /** Smart contract address. */
  collection_address: string
  /** Smart contract name. */
  collection_name: string
  /** Smart contract ticker symbol. */
  collection_ticker_symbol: string
  /** The minimum average sale within the last 7 days defined as floor price in quote currency. (format: float) */
  floor_price_quote_7d: number
  /** The minimum average sale within the last 7 days defined as floor price in WEI. */
  floor_price_wei_7d: number | string
  /** The current spot exchange rate in `quote-currency`. (format: float) */
  gas_quote_rate_day: number
  /** Date recorded for Market Cap. (format: date) */
  opening_date: string
  /** The requested fiat currency. */
  quote_currency: string
  /** Amount of distinct token ids sold. (format: int64) */
  unique_token_ids_sold_count_day: number | string
  /** Volume of sale within that day in quote currency. (format: float) */
  volume_quote_day: number
  /** Volume of sale within that day in WEI. */
  volume_wei_day: number | string
}
