import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import BlogItem from "../components/BlogItem";
import PageTitle from "../components/PageTitle";
import ProductItem from "../components/ProductItem";
import { BlogData, FeaturedData } from "../interfaces/interface";

interface Props {
  blogData: BlogData[];
  productData: FeaturedData[];
}

const Search: NextPage<Props> = ({ blogData, productData }) => {
  return (
    <>
      <Head>
        <title>Store - Search</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle itemTitle="Search Results" />

      <div className="bg0 m-t-23 p-b-140 mt-5">
        <div className="container">
          {/* Blogs Section */}
          <>
            <h2 className="mb-5">Blogs</h2>
            <div className="row isotope-grid">
              {blogData.length > 0 ? (
                blogData.map((blog) => (
                  <div className="col-4" key={blog.id}>
                    <BlogItem blogItem={blog} />
                  </div>
                ))
              ) : (
                <p>Blog item not available</p>
              )}
            </div>
          </>

          {/* Products Section */}
          <>
            <h2 className="mb-5">Products</h2>
            <div className="row isotope-grid">
              {productData.length > 0 ? (
                productData.map((product) => (
                  <div className="col-4" key={product.id}>
                    <ProductItem item={product} />
                  </div>
                ))
              ) : (
                <p>Product item not available</p>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchTerm = query.query as string;

  const blogRes = await fetch(`http://localhost:5001/blogs?q=${encodeURIComponent(searchTerm)}`);
  const blogData: BlogData[] = await blogRes.json();

  const productRes = await fetch(`http://localhost:5001/products?q=${encodeURIComponent(searchTerm)}`);
  const productData: FeaturedData[] = await productRes.json();

  return {
    props: {
      blogData,
      productData,
    },
  };
};
