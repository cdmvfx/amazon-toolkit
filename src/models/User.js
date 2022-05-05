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
		settings: {
			store: {
				apiKey: {
					type: String,
					default: ""
				},
				clientId: {
					type: String,
					default: ""
				},
				clientSecret: {
					type: String,
					default: ""
				}
			}
		}
  },
  { collection: 'users' }
)

export default mongoose.models.User || mongoose.model('User', UserSchema);
