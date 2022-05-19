import { Box, Button, ButtonGroup, Center, Flex, Input, Stack, StackItem, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import DashboardPage from '../../../../src/components/dashboard/DashboardPage'
import Products from '../../../../src/components/dashboard/forms/new/Products'
import ProductSettings from '../../../../src/components/dashboard/forms/new/ProductSettings'
import Title from '../../../../src/components/dashboard/forms/new/Title'
import { selectProducts } from '../../../../src/features/product/productsSlice'

/*
Ensure products exist for the current user.

1: title + description
2: 

*/


const Page = ({step, data, handleChange}: {step: number, data: ReviewFormData, handleChange: (key: string, val: string) => void }): JSX.Element => {
	switch (step) {
		case 1:
			return <Title data={data} handleChange={handleChange} />
		case 2:
			return <Products data={data} handleChange={handleChange} />
		case 3:
			return <ProductSettings data={data} handleChange={handleChange} />
		default:
			return <div>No page</div>
	}
}

export interface ReviewFormData {
	title: string,
	desc: string,
	products: Product[]
}

interface Product {
	id: string,
	rewardType?: RewardType,
	discountType?: DiscountType,
	discountAmount?: number,
	discountProducts?: string[]
}

export enum RewardType {
	DiscountCode = "DiscountCode",
	DiscountProduct = "DiscountProduct"
}

export enum DiscountType {
	Percentage = "Percentage",
	Amount = "Amount"
}

const FormNew = () => {
	
	const [step, setStep] = useState(1)

	const prevStep = () => {
		if (step > 1) setStep(step - 1)
	}

	const nextStep = () => {
		if (step < 5) setStep(step + 1)
	}

	const [data, setData] = useState<ReviewFormData>({
		title: '',
		desc: '',
		products: []
	})

	const handleChange = (key: string, val: string): void => {
		setData({
			...data,
			[key]: val
		})
	}


	console.log(data)

	return (
		<DashboardPage>
			<Center>
				<Stack spacing={8} pt={8}>
					<Page step={step} data={data} handleChange={handleChange} />
					<StackItem w="full">
						<ButtonGroup w="full">
							<Button w="50%" disabled={step === 1 ? true : false} onClick={prevStep}>Previous</Button>
							<Button w="50%" disabled={step === 5 ? true : false} onClick={nextStep}>Next</Button>
						</ButtonGroup>
					</StackItem>
				</Stack>
			</Center>
		</DashboardPage>
	)
}
export default FormNew