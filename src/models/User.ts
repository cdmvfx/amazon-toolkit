import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    fname: { 
			type: String, 
			required: [true, 'Please provide your first name.']
		},
    lname: { 
			type: String, 
			required: [true, 'Please provide your last name.']
		},
    email: { 
			type: String, 
			required: [true, 'Please provide your email.'],
			unique: true 
		},
    password: { 
			type: String, 
			required: [true, 'Please provide a password.']
		},
		forms: [{
			title: { 
				type: String, 
				required: [true, 'Please provide a title.'],
				unique: true 
			},
			desc: { 
				type: String, 
				required: [true, 'Please provide a description.']
			},
			pages: [
				{
					inputs: [
						{
							type: String,
							options: {
								type: Object
							}
						}
					]
				}
			],
			config: {
				type: Object
			}
		}],
		settings: {
			shop: {
				hostname: {
					type: String,
					required: [true, 'Please provide a hostname.']
				},
				access_token: {
					type: String,
					required: [true, 'Please provide an access token.']
				},
				products: [{
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
					}
				}]
			}
		}
  },
  { collection: 'users' }
)

export default mongoose.models.User || mongoose.model('User', UserSchema);
