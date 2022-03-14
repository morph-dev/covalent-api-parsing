// DO NOT EDIT - THIS FILE IS AUTO GENERATED
// see README.md

import { Pagination } from './common'

/**
 * Get NFT market global view
 *
 * Given `:chain_id`, return all collection addresses and their market data.
 *
 * Path: `/v1/:chain_id/nft_market/`
 */
export type NftMarketCapResponse = {
  items: NftMarketGlobalItem[]
  pagination: Pagination
  /** The updated time. (format: date-time) */
  updated_at: string
}

export type NftMarketGlobalItem = {
  /** Average volume of sales within last 24H in quote currency. (format: float) */
  avg_volume_quote_24h: number
  /** Average volume of sales within last 24H in WEI. */
  avg_volume_wei_24h: number | string
  /** Chain ID of the Blockchain being queried. Currently supports `1` for Ethereum Mainnet, `137` for Polygon/Matic Mainnet, `80001` for Polygon/Matic Mumbai Testnet, `56` for Binance Smart Chain, `43114` for Avalanche C-Chain Mainnet, `43113` for Fuji C-Chain Testnet, and `250` for Fantom Opera Mainnet. (format: int64) */
  chain_id: number | string
  /** Smart contract address. */
  collection_address: string
  /** Smart contract name. */
  collection_name: string
  /** Contract deployment date. (format: date-time) */
  contract_deployment_at: string
  /** The Image URL of the First NFT in this collection. */
  first_nft_image: string
  /** The Image URL of the First NFT in this collection (resized to 1024x1024). */
  first_nft_image_1024: string
  /** The Image URL of the First NFT in this collection (resized to 256x256). */
  first_nft_image_256: string
  /** The Image URL of the First NFT in this collection (resized to 512x512). */
  first_nft_image_512: string
  /** The minimum average sale within the last 7 days defined as floor price in quote currency. (format: float) */
  floor_price_quote_7d: number
  /** The minimum average sale within the last 7 days defined as floor price in WEI. */
  floor_price_wei_7d: number | string
  /** The current spot exchange rate in `quote-currency`. (format: float) */
  gas_quote_rate: number
  /** Market Cap in quote currency. (format: float) */
  market_cap_quote: number
  /** Market Cap in WEI. */
  market_cap_wei: number | string
  /** The max price recorded as a sale in quote currency. (format: float) */
  max_price_quote: number
  /** The max price recorded as a sale in WEI. */
  max_price_wei: number | string
  /** Date recorded for Market Cap. (format: date) */
  opening_date: string
  /** The requested fiat currency. */
  quote_currency: string
  /** Number of transactions for this collection. (format: int32) */
  transaction_count_alltime: number | string
  /** Amount of distinct token ids sold. (format: int32) */
  unique_token_ids_sold_count_alltime: number | string
  /** Number of wallets for this collection. (format: int32) */
  unique_wallet_purchase_count_alltime: number | string
  /** Volume of sales within the last 24H in quote currency. (format: float) */
  volume_quote_24h: number
  /** Volume of sales within the last 24H in WEI. */
  volume_wei_24h: number | string
}
