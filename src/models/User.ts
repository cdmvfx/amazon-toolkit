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
			general: {
				companyName: String,
				contactEmail: String,
				contactPhone: String
			},
			shops: [
				{
					status: String,
					name: String,
					shopUrl: String,
					accessToken: String,
					datetime: String,
					products: [{
						name: String,
						variantId: String,
						asin: String
					}],
					type: {type: String}
				}
			]
		}
  },
  { collection: 'users' }
)

export default mongoose.models.User || mongoose.model('User', UserSchema);
