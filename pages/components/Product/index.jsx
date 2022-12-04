import Image from 'next/image'
import { Box, Text } from 'grommet'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Product = ({ id, image, title, description, price }) => {
  const router = useRouter()
  const href = `/products/${id}`
  const { query: { product } } = router

  const onClick = (e) => {
    e.preventDefault()

    if(product) return

    router.push(href)
  }

  return (
    <Box
      key={id}
      atl={description}
      width={'270px'}
      height={'400px'}
      align='center'
      onClick={onClick}
      margin={'small'}
      border={{
        color: '#e1e1e1',
        size: '1px'
      }}
      style={{
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      <Image src={image} alt={`${id}-product-image`} width={268} height={225} />
      <Text
        alt={`${id}-product-title`}
        style={styles.title}
      >
        {title}
      </Text>
      <Text
        alt={`${id}-product-price`}
        color={'#D63426'}
        style={styles.price}
      >
        {`Starting at $${price}`}
      </Text>
      {
        product
          ? <Text style={styles.description}>
            {description}
          </Text>
          : <Link
            alt={`${id}-product-link`}
            href={href}
            style={styles.link}
          >
            <button>
              Click to check out product!
            </button>
          </Link>
      }
    </Box>
  )
}

const WIDTH = '240px'

const styles = {
  title: {
    width: WIDTH,
    margin: '10px 0px',
    fontWeight: 500,
    fontSize: 18
  },
  price: {
    width: WIDTH,
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    position: 'absolute',
    bottom: 10
  },
  description: {
    overflowY: 'auto',
    marginBottom: 10,
    width: WIDTH
  }
}

export default Product