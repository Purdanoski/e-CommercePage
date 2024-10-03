import React from "react";
import { BlogData } from "../interfaces/interface";
import Link from "next/link";

interface Props {
  randomItem: BlogData[];
}

const RelatedBlogs: React.FC<Props> = ({ randomItem }) => {
  return (
    <div>
      <h4 className="mtext-112 cl2 mb-3">Related Blogs</h4>

      <ul>
        {randomItem?.map((item) => (
          <Link href={`${item.id}`}>
            <li className="mb-4">
              <a className="wrao-pic-w">
                <img src={item.img} alt="PRODUCT" className="img-fluid" />

                <div className="p-t-8 mt-1">
                  <div className="stext-116 cl8 hov-cl1 trans-04 mb-3">{item.title}</div>
                </div>
              </a>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default RelatedBlogs;
