import React from "react";
import ProductItem from "./ProductItem";
import { FeaturedData } from "../interfaces/interface";

interface Props {
  randomData: FeaturedData[];
}

const RelatedProducts: React.FC<Props> = ({ randomData }) => {
  return (
    <section className="sec-relate-product bg0 p-t-45 p-b-105">
      <div className="container">
        <div className="p-b-45">
          <h3 className="ltext-106 cl5 txt-center">Related Products</h3>
        </div>

        <div className="wrap-slick2">
          <div className="d-flex">
            {randomData?.map((item: FeaturedData) => (
              <ProductItem item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
