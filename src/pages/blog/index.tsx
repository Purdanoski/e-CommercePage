import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import BlogItem from "../../components/BlogItem";
import PageTitle from "../../components/PageTitle";
import { BlogData } from "../../interfaces/interface";
import { useRouter } from "next/router";

interface Props {
  blog: BlogData[];
}

const Blog: NextPage<Props> = ({ blog }) => {
  const router = useRouter();

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search")?.toString().trim().toLowerCase();
    const category = formData.get("category")?.toString().trim().toLowerCase();

    const query: any = {};
    if (searchQuery) query.search = searchQuery;
    if (category) query.category = category;

    router.push({
      pathname: "/blog",
      query: query,
    });
  };

  const handleCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const category = e.currentTarget.getAttribute("data-category");
    router.push({
      pathname: "/blog",
      query: { ...router.query, category },
    });
  };

  return (
    <>
      <Head>
        <title>Store - Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle itemTitle="Blog page" />

      <section className="bg0 p-t-62 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
                {blog.length > 0 ? (
                  blog.map((item) => <BlogItem key={item.id} blogItem={item} />)
                ) : (
                  <p>There are no results with your search.</p>
                )}
              </div>
            </div>

            <div className="col-md-4 col-lg-3 p-b-80">
              <div className="side-menu">
                <form className="bor17 of-hidden pos-relative" onSubmit={handleFilterSubmit}>
                  <input
                    className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55"
                    type="text"
                    name="search"
                    placeholder="Search"
                  />

                  <button className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04">
                    <i className="zmdi zmdi-search"></i>
                  </button>
                </form>

                <div className="p-t-55">
                  <h4 className="mtext-112 cl2 p-b-33">Categories</h4>

                  <ul>
                    <li className="bor18">
                      <button
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                        data-category="fashion"
                        onClick={handleCategoryClick}>
                        Fashion
                      </button>
                    </li>

                    <li className="bor18">
                      <button
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                        data-category="beauty"
                        onClick={handleCategoryClick}>
                        Beauty
                      </button>
                    </li>

                    <li className="bor18">
                      <button
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                        data-category="streetstyle"
                        onClick={handleCategoryClick}>
                        Street Style
                      </button>
                    </li>

                    <li className="bor18">
                      <button
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                        data-category="lifestyle"
                        onClick={handleCategoryClick}>
                        Life Style
                      </button>
                    </li>

                    <li className="bor18">
                      <button
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                        data-category="diy"
                        onClick={handleCategoryClick}>
                        DIY & Crafts
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let res;
  const { category, search } = query;

  if (category && search) {
    res = await fetch(`http://localhost:5001/blogs?category_like=${category}&q=${search}`);
  } else if (category) {
    res = await fetch(`http://localhost:5001/blogs?category_like=${category}`);
  } else if (search) {
    res = await fetch(`http://localhost:5001/blogs?q=${search}`);
  } else {
    res = await fetch("http://localhost:5001/blogs");
  }

  const blog = await res.json();

  return {
    props: {
      blog,
    },
  };
};
