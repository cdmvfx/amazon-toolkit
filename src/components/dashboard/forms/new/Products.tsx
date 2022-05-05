import { Checkbox, CheckboxGroup, Stack, StackItem, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ReviewFormData } from "../../../../../pages/dashboard/review-forms/new"
import { fetchProducts, selectProducts } from "../../../../features/product/productsSlice"
import { selectSettings } from "../../../../features/settings/settingsSlice"

const Products = ({data, handleChange}: {data: ReviewFormData, handleChange: (key: string, val: any) => void}) => {

	const dispatch = useDispatch()

	const products = useSelector(selectProducts)
	const productsStatus = useSelector((state: AppState) => state.products.status)

	console.log('Products')
	console.log(products)

	const [fetchProductsStatus, setFetchProductsStatus] = useState('idle')

	useEffect(() => {
    if (fetchProductsStatus === 'idle') {
      dispatch(fetchProducts())
    }
  }, [fetchProductsStatus, dispatch])

	const handleCheck = (id: string) => {

		let newSelectedProducts = [...data.products]

		if (isChecked(id)) {
			newSelectedProducts = newSelectedProducts.filter((selectedProduct) => selectedProduct.id !== id )
		}
		else {
			newSelectedProducts.push({
				id: id
			})
		}

		handleChange('products', newSelectedProducts)
		
	}

	const isChecked = (id: string): boolean => {
		if (data.products.find((product) => product.id === id)) return true
		return false
	}

	return (
		<>
			<StackItem>
				<Text mb={4}>Please select the products you wish to accept reviews for.</Text>
				<CheckboxGroup>
					<Stack spacing={4}>
						{
							products.map(({name, _id}) => (
								<Checkbox key={_id} isChecked={isChecked(_id)} onChange={(e) => handleCheck(_id)}>{name}</Checkbox>
							))
						}
					</Stack>
				</CheckboxGroup>
			</StackItem>
		</>
	)
}

export default Products