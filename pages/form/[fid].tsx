import { useRouter } from 'next/router'

const Form = () => {

	const router = useRouter()
  const { fid } = router.query

	return (
		<div>Form {fid}</div>
	)
}
export default Form