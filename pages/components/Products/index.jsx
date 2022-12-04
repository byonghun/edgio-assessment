import { Box } from 'grommet'
import Product from '../Product'

const Products = ({products = []}) => {
  return (
    <Box width='65em' margin={{ top: '100px' }}>
      <Box direction='row' align='center' justify='center' wrap>
        {products.map(Product)}
      </Box>
    </Box>
  )
}

export default Products