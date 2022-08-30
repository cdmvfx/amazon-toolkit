export interface SettingsInput {
	label: string, 
	key: string
}

export type SettingsCategory = 'general' | 'shops' | 'account' | 'billing' | 'amazon'

export type Settings = {
	general: {
		companyName: string
		contactEmail: string
		contactPhone: string
	},
	shops: Shop[],
	account: any
	billing: any
	amazon: any
	[category: string]: any
}

export type Shop = ShopifyShop | ManualShop

export interface ShopifyShop {
	status: 'pending' | 'connected' | 'disconnected'
	type: 'shopify'
	shopUrl: string
	accessToken: string
	name: string
	products: ShopifyProduct[]
}

export interface ManualShop {
	type: 'manual'
	name: string
	shopUrl: string
	products: Product[]
}

export interface Product {
	name: string
	asin: string
}

export interface ShopifyProduct extends Product {
	id: string
	variantId?: string
}