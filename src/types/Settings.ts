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
}

type Shop = ShopifyShop | ManualShop

export interface ShopifyShop {
	type: 'shopify'
	shopUrl: string
	accessToken: string
	name: string
}

export interface ManualShop {
	type: 'manual'
	name: string
}