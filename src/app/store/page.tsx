import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import axios from "axios";

type Props = {
  children: React.ReactNode;
};

const StorePage = async (props: Props) => {
  const response = await axios.get("http://localhost:4000/products");
  const products = response.data;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StorePage;