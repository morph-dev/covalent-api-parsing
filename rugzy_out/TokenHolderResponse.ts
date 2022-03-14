// DO NOT EDIT - THIS FILE IS AUTO GENERATED
// see README.md

import { Pagination } from './common'

/**
 * Get token holders as of any block height
 *
 * Given `:chain_id` and wallet `:address`, return a paginated list of token holders. If `:block-height` is omitted, the latest block is used.
 *
 * Path: `/v1/:chain_id/tokens/:address/token_holders/`
 */
export type TokenHolderResponse = {
  items: TokenHolder[]
  pagination: Pagination
  /** The updated time. (format: date-time) */
  updated_at: string
}

export type TokenHolder = {
  /** The address of token holder. */
  address: string
  /** The balance of token holder. */
  balance: number | string
  /** The height of the block. (format: int64) */
  block_height: number | string
  /** Smart contract address. */
  contract_address: string
  /** Smart contract decimals. (format: int32) */
  contract_decimals: number | string
  /** Smart contract name. */
  contract_name: string
  /** Smart contract ticker symbol. */
  contract_ticker_symbol: string
  /** Smart contract URL. */
  logo_url: string
  /** The standard interface(s) supported for this token, eg: `ERC-20`. */
  supports_erc: string[]
  /** The total supply of the token. */
  total_supply: number | string
}
