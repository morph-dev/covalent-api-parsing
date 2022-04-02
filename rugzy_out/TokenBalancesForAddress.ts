// DO NOT EDIT - THIS FILE IS AUTO GENERATED
// see README.md

/**
 * Get token balances for address
 *
 * Given `:chain_id` and wallet `:address`, return current token balances along with their spot prices. This endpoint supports a variety of token standards like ERC20, ERC721 and ERC1155. As a special case, network native tokens like ETH on Ethereum are also returned even though it's not a token contract.
 *
 * Path: `/v1/:chain_id/address/:address/balances_v2/`
 */
export type TokenBalancesForAddress = {
  /** The requested wallet address. */
  address: string
  items: WalletBalanceItem[]
  /** The next updated time. (format: date-time) */
  next_update_at: string
  /** The requested fiat currency. */
  quote_currency: string
  /** The updated time. (format: date-time) */
  updated_at: string
}

export type INFTMetadata = {
  [index: string]: unknown
}

export type WalletBalanceItem = {
  /** The asset balance. Use `contract_decimals` to scale this balance for display purposes. */
  balance: number | string
  /** The asset balance 24 hours ago. */
  balance_24h: number | string
  /** Smart contract address. */
  contract_address: string
  /** Smart contract decimals. (format: int32) */
  contract_decimals: number | string
  /** Smart contract name. */
  contract_name: string
  /** Smart contract ticker symbol. */
  contract_ticker_symbol: string
  /** Last transferred date for a wallet (format: date-time) */
  last_transferred_at: string
  /** Smart contract URL. */
  logo_url: string
  /** Array of NFTs that are held under this contract. */
  nft_data: INFTMetadata[]
  /** The current balance converted to fiat in `quote-currency`. (format: float) */
  quote: number
  /** The current balance converted to fiat in `quote-currency` as of 24 hours ago. (format: float) */
  quote_24h: number
  /** The current spot exchange rate in `quote-currency`. (format: float) */
  quote_rate: number
  /** The spot exchange rate in `quote-currency` as of 24 hours ago. (format: float) */
  quote_rate_24h: number
  /** The standard interface(s) supported for this token, eg: `ERC-20`. */
  supports_erc: string[]
  /** One of `cryptocurrency`, `stablecoin`, `nft` or `dust`. */
  type: string
}
