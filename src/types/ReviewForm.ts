export interface ReviewFormConfigProduct {
	id: string,
	name: string
}

export interface ReviewFormConfig {
	marketplaces: {
		amazon: boolean
	},
	products: ReviewFormConfigProduct[]
}

export interface ReviewFormPage {
	inputs: string[]
}

export interface ReviewForm {
	fid: string,
	uid: string,
	title: string,
	desc: string,
	slug: string,
	pages: ReviewFormPage[],
	config: ReviewFormConfig
}
