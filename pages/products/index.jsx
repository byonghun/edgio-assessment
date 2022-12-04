import { useCallback, useEffect, useState } from 'react'
import { Box, TextInput } from 'grommet'
import Products from "../components/Products"

export const Header = ({ onChange }) => {
  return (
    <Box
      background={'#d63426'}
      justify='center'
      align='center'
      height={'70px'}
      width={'100%'}
      style={{ position: 'fixed' }}
    >
      <TextInput
        placeholder="Search by title"
        onChange={onChange}
        style={headerStyle}
      />
    </Box>
  )
}

const headerStyle = {
  width: 400,
  position: 'absolute',
  right: 10,
  bottom: -20
}

const ProductsPage = ({ products }) => {
  const [searchedProducts, setSearchedProducts] = useState(products)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const filterSearchedProducts = () => {
      const filteredProducts = searchedProducts.filter(({ title }) =>
        title.toLowerCase().includes(search.toLowerCase())
      )

      return filteredProducts
    }

    if(search.length === 0) {
      return setSearchedProducts(products)
    }

    setSearchedProducts(filterSearchedProducts())
  }, [search])

  const onChange = useCallback(({target: { value }}) => {
    setSearch(value)
  }, [])

  return (
    <Box
      width="100%"
      align='center'
    >
      <Header onChange={onChange}/>
      <Products products={searchedProducts} />
    </Box>
  )
}

export const generateUrl = ({ id, limit }) => {
  const url = 'https://fakestoreapi.com/products'
  return id && !limit ? `${url}/${id}` : limit ? `${url}?limit=${limit}` : url
}

export const getStaticProps = async () => {
  try {
    const url = generateUrl({ limit: 10 })
    const resp = await fetch(url)
    const products = await resp.json()

    return {
      props: {
        products
      }
    }
  } catch(err) {
    return { notFound: true }
  }
}

export default ProductsPage