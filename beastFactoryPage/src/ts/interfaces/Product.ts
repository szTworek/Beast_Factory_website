
export default interface Product {
  id: number;
  title: String;
  description: String;
  category: String;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: String;
  image: Blob;
}