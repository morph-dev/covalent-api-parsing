// DO NOT EDIT - THIS FILE IS AUTO GENERATED
// see README.md

/**
 * Get all contract metadata
 *
 * Given `:chain_id` and `:id`, return a list of all contracts on a blockchain along with their metadata.
 *
 * Path: `/v1/:chain_id/tokens/tokenlists/:id/`
 */
export type ContractMetadata = {
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
}

export type Pagination = {
  /** `true` if we can  paginate to get more data. */
  has_more: boolean
  /** The specific page being returned. (format: int32) */
  page_number: number | string
  /** The number of results per page. (format: int32) */
  page_size: number | string
  /** Total number of entries. (format: int32) */
  total_count: number | string
}
