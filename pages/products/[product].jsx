import { Box } from 'grommet'
import Link from "next/link"
import { generateUrl } from "."
import Product from '../components/Product'

const ProductPage = ({product}) => {
  return (
    <>
      <Box
        background={'#d63426'}
        height={'70px'}
        width={'100%'}
        style={{ position: 'fixed' }}
        justify="center"
        align="center"
      >
        {`Category: ${product.category}`}
      </Box>
      <Box align="center" justify="center" pad={{top: '100px'}}>
        <Product {...product} />
      </Box>
      <Box justify="center" align="center" margin={{top: '40px'}}>
        <Link href={'/products'}><button>Return to Products</button></Link>
      </Box>
    </>
  )
}

export const getStaticPaths = async () => {
  try {
    const url = generateUrl({ limit: 10 })
    const resp = await fetch(url)
    const products = await resp.json()
    const paths = (products || []).map(product => {
      return ({
        params: { product: product.id.toString() }
      })
    })

    return { paths, fallback: false }
  } catch(err) {
    return { notFound: true }
  }
}

export const getStaticProps = async (context) => {
  const { product } = context.params

  try {
    const url = generateUrl({ id: product })
    const resp = await fetch(url)
    const selectedProduct = await resp.json()

    return {
      props: {
        product: selectedProduct
      }
    }
  } catch(err) {
    return { notFound: true }
  }
}

export default ProductPage