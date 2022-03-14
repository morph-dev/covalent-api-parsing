// DO NOT EDIT - THIS FILE IS AUTO GENERATED
// see README.md

import { ContractMetadata, Pagination } from './common'

/**
 * Get XY=K transactions for account address
 *
 * Given `:chain_id`, `:dexname` and `:address`, return transactions for account address for a specific DEX.
 *
 * Path: `/v1/:chain_id/xy=k/:dexname/address/:address/transactions/`
 */
export type AccountAddressTransactionsResponse = {
  items: ExchangeTransaction[]
  pagination: Pagination
  /** The updated time. (format: date-time) */
  updated_at: string
}

export type ExchangeTransaction = {
  act: string
  address: string
  amount_0: number | string
  amount_0_in: number | string
  amount_0_out: number | string
  amount_1: number | string
  amount_1_in: number | string
  amount_1_out: number | string
  /** (format: date-time) */
  block_signed_at: string
  from_address: string
  quote_currency: string
  sender_address: string
  to_address: string
  token_0: ContractMetadata
  /** (format: float) */
  token_0_quote_rate: number
  token_1: ContractMetadata
  /** (format: float) */
  token_1_quote_rate: number
  /** (format: float) */
  total_quote: number
  tx_hash: string
}
