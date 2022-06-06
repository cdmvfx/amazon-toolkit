import { Input, StackItem, Text, Textarea } from "@chakra-ui/react"
import { ReviewFormData } from "../../../../../pages/app/forms/new"

const Title = ({data, handleChange}: {data: ReviewFormData, handleChange: (key: string, val: any) => void}) => {
	return (
		<>
			<StackItem>
				<Text fontWeight="bold">What do you want to name this form?</Text>
				<Input type="text" name="title" placeholder="Ex: Primary Review Form" value={data.title} onChange={(e) => handleChange(e.target.name, e.target.value)} />
			</StackItem>
			<StackItem>
				<Text fontWeight="bold">Provide a description for this form.</Text>
				<Textarea name="desc" value={data.desc} placeholder="Ex: Gives away one free product in exchange for a review." onChange={(e) => handleChange(e.target.name, e.target.value)} />
			</StackItem>
		</>
	)
}

export default Title