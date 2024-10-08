import React from "react";
import { BlogData } from "../interfaces/interface";

interface Props {
  blogData: BlogData[];
}

const FeaturedBlogs: React.FC<Props> = ({ blogData }) => {
  return (
    <section className="sec-blog bg0 p-t-60 p-b-90">
      <div className="container">
        <div className="p-b-66">
          <h3 className="ltext-105 cl5 txt-center respon1">Our Blogs</h3>
        </div>
        <div className="row">
          {/* blog skeleton */}
          {blogData?.map((item: BlogData) => (
            <div className="col-sm-6 col-md-4 p-b-40">
              <a className="blog-item">
                <div className="hov-img0">
                  <img src={item.img} alt="IMG-BLOG" className="img-fluid" />
                </div>
                <div className="p-t-15">
                  <div className="stext-107 flex-w p-b-14">
                    <span className="m-r-3">
                      <span className="cl4">By</span>
                      <span className="cl5">{item.author}</span>
                    </span>
                    <span>
                      <span className="cl4">on</span>
                      <span className="cl5 ml-1">{item.date}</span>
                    </span>
                  </div>
                  <h4 className="p-b-12">
                    <div className="mtext-101 cl2 hov-cl1 trans-04">{item.title}</div>
                  </h4>
                  <p className="stext-108 cl6">{item.excerpt}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
