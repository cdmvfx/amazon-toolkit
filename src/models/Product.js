import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    uid: { 
			type: String, 
			required: [true, 'Please provide a user ID.']
		},
    name: { 
			type: String, 
			required: [true, 'Please provide a name for the product.'],
			unique: true 
		},
    asin: { 
			type: String, 
			required: [true, 'Please provide the Amazon ASIN.']
		},
		shopify_variant_id: { 
			type: String, 
			required: [true, 'Please provide the Shopify Variant ID.']
		},
  },
  { collection: 'products' }
)

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
