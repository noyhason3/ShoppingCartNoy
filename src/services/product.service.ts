import axios from 'axios';

export const productService = {
  query,
  getById,
  getCategories,
};


async function query(filterBy:any=null) {
  const res = await axios.get('https://fakestoreapi.com/products');
  let products = res.data;
  if (filterBy) {
    products = products.filter((product:{id:string, title:string, description:string, price:number, image:string, category:string}) => {
      return product.category.includes(filterBy);
    });
  }
  return products;
}

async function getCategories() {
  const res = await axios.get('https://fakestoreapi.com/products/categories');
  const categories = res.data;
  return categories;
}

async function getById(productId:string) {
  const res = await axios.get(`https://fakestoreapi.com/products/${productId}`)
  const product = res.data;
  return product;
}

// function deleteProduct(id) {
  // return httpService.delete(PRODUCT_URL + id);
// }

// async function addProduct(product) {
  // await
  // return httpService.delete(PRODUCT_URL + id);
// }

// async function saveProduct(product) {
  // const board = data.board;
  // if (product._id) {
    // var savedProduct = await httpService.put(PRODUCT_URL + product._id, product);
    // return savedProduct;
  // } else {
    // return await httpService.post(PRODUCT_URL, product);
  // }
// }

//////////////////////////////

// function getNextId(currId, diff) {
  // const currIdx = products.findIndex(product=> product._id === currId);
  // return products[currIdx+diff]._id;
// }

// function getEmptyProduct() {
  // return {
    // name: '',
    // email: '',
    // phone: ''
  // };
// }

// function filter(term) {
//   term = term.toLocaleLowerCase()
//   return products.filter(product => {
//     return product.name.toLocaleLowerCase().includes(term) ||
//       product.phone.toLocaleLowerCase().includes(term) ||
//       product.email.toLocaleLowerCase().includes(term)
//   })
// }


// function sort(arr) {
//   return arr.sort((a, b) => {
//     if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
//       return -1;
//     }
//     if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
//       return 1;
//     }

//     return 0;
//   });
// }