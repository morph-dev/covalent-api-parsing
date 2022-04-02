// DO NOT EDIT - THIS FILE IS AUTO GENERATED
// see README.md

import { Pagination } from './common'

/**
 * Get XY=K network exchange tokens
 *
 * Given `:chain_id` and `:dexname`, return network exchange tokens for a specific DEX.
 *
 * Path: `/v1/:chain_id/xy=k/:dexname/tokens/`
 */
export type NetworkExchangeTokenResponse = {
  items: TokenV2Volume[]
  pagination: Pagination
  /** The updated time. (format: date-time) */
  updated_at: string
}

export type TokenV2Volume = {
  chain_id: string
  chain_name: string
  contract_address: string
  /** (format: int32) */
  contract_decimals: number | string
  contract_name: string
  contract_ticker_symbol: string
  dex_name: string
  logo_url: string
  /** (format: float) */
  quote_rate: number
  /** (format: int64) */
  swap_count_24h: number | string
  total_liquidity: number | string
  /** (format: float) */
  total_liquidity_quote: number
  total_volume_24h: number | string
  /** (format: float) */
  total_volume_24h_quote: number
}
