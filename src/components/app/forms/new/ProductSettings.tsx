import { Box, CheckboxGroup, FormControl, FormHelperText, FormLabel, Heading, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, StackItem, Text } from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { DiscountType, ReviewFormData, RewardType } from "../../../../../pages/app/forms/new"


const ProductSettings = ({data, handleChange}: {data: ReviewFormData, handleChange: (key: string, val: array) => void}) => {


	const handleSelect = (e: ChangeEvent<HTMLSelectElement>, index: number) => {

		let newProducts = [...data.products]

		switch (e.target.name) {
			case "RewardType":
				newProducts[index].rewardType = (e.target.value === "DiscountCode") ? RewardType.DiscountCode : RewardType.DiscountProduct
				break
			case "DiscountType":
				newProducts[index].discountType = (e.target.value === "Amount") ? DiscountType.Amount : DiscountType.Percentage
				break
			case "DiscountAmount":
				newProducts[index].discountAmount = parseInt(e.target.value)
				break;
		}

		handleChange('products', newProducts)

		console.log(newProducts)
	}

	const handleInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {

		let newProducts = [...data.products]

		newProducts[index].discountAmount = parseFloat(e.target.value)

		handleChange('products', newProducts)

		console.log(newProducts)
	}

	return (
		<>
			<StackItem>
				<Text mb={8}>Configure the products you selected.</Text>
				<Stack spacing={16} mb={4} maxW="2xl">
					{
						data.products.map(({id, name}, index) => (
							<Box key={id}>
								<Heading size="md" mb={8}>{name}</Heading>
								<Stack spacing={8}>
									<FormControl variant="floating" isRequired>
										<Select placeholder="Select the reward type." value={data.products[index].rewardType} name="RewardType" onChange={(e) => handleSelect(e, index)}>
											<option value={RewardType.DiscountCode}>Discount Code</option>
											<option value={RewardType.DiscountProduct}>Discount Product</option>
										</Select>
										<FormLabel>Reward Type</FormLabel>
										<FormHelperText>Discount Code: After submission, customer will be sent a discount code for the specified amount for use at a later time.</FormHelperText>
										<FormHelperText>Discount Product: At the end of submission, customer will be prompted to enter billing details (unless free) and complete their order of the selected product.</FormHelperText>
									</FormControl>
									<FormControl variant="floating" isRequired>
										<Select placeholder="Select the discount type." value={data.products[index].discountType} name="DiscountType" onChange={(e) => handleSelect(e, index)}>
											<option value={DiscountType.Percentage}>Percentage</option>
											<option value={DiscountType.Amount}>Amount</option>
										</Select>
										<FormLabel>Discount Type</FormLabel>
									</FormControl>
									<FormControl variant="floating" isRequired>
										<FormLabel style={ data.products[index].discountType === DiscountType.Amount ? {marginLeft: "50px"} : {}}>Discount Amount</FormLabel>
										<InputGroup>
											{data.products[index].discountType === DiscountType.Amount &&
												<InputLeftAddon children="$" />
											}
											<Input type="number" value={data.products[index].discountAmount?.toString()} name="DiscountAmount" onChange={(e) => handleInput(e, index)} />
											{data.products[index].discountType === DiscountType.Percentage &&
												<InputRightAddon children="%" />
											}
										</InputGroup>
									</FormControl>
								</Stack>
							</Box>
						))
					}
				</Stack>
			</StackItem>
		</>
	)
}

export default ProductSettings