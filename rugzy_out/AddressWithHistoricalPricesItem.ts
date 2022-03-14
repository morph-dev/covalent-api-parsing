// DO NOT EDIT - THIS FILE IS AUTO GENERATED
// see README.md

import { ContractMetadata } from './common'

/**
 * Get historical token prices
 *
 * Given `:chain_id` and `:contract_addresses`, return their historical prices. Can filter by date ranges and convert to `:quote_currency`. Only daily granularity is supported.
 *
 * Path: `/v1/pricing/historical_by_addresses_v2/:chain_id/:quote_currency/:contract_addresses/`
 */
export type AddressWithHistoricalPricesItem = {
  /** Smart contract address. */
  contract_address: string
  /** Smart contract decimals. (format: int32) */
  contract_decimals: number | string
  /** Smart contract name. */
  contract_name: string
  /** Smart contract ticker symbol. */
  contract_ticker_symbol: string
  items: unknown[]
  /** Smart contract URL. */
  logo_url: string
  prices: HistoricalPriceItem[]
  quote_currency: string
  /** The standard interface(s) supported for this token, eg: `ERC-20`. */
  supports_erc: string[]
  /** (format: date-time) */
  update_at: string
}

export type HistoricalPriceItem = {
  contract_metadata: ContractMetadata
  /** (format: date) */
  date: string
  /** (format: float) */
  price: number
}
