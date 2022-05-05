import mongoose from 'mongoose'

const FormSchema = new mongoose.Schema(
  {
    uid: { 
			type: String, 
			required: [true, 'Please provide a user ID.']
		},
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
  },
  { collection: 'forms' }
)

export default mongoose.models.Form || mongoose.model('Form', FormSchema);
