const getProduct = async (req, res) => {
   res.send('get product')
}

const createProduct = async (req, res) => {
   res.send('create product')
}

const deleteProduct = async (req, res) => {
   res.send('delete product')
}

export { getProduct, createProduct, deleteProduct }