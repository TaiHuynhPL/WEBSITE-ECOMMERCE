import Shop from "../Components/Shop/Shop";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

function ShopPage() {
  return <Shop />;
}

export default ShopPage;

export async function loader() {
  const { data } = await axios.get("/product");

  return data;
}
