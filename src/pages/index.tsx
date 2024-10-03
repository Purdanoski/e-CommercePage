import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import CategoryPicker from "../components/CategoryPicker";
import FeaturedBlogs from "../components/FeaturedBlogs";
import FeaturedProducts from "../components/FeaturedProducts";
import { BannerData, BlogData, FeaturedData } from "../interfaces/interface";

export interface Props {
  bannerData: BannerData;
  blogData: BlogData[];
  featuredData: FeaturedData[];
}

const Home: NextPage<Props> = ({ bannerData, blogData, featuredData }) => {
  return (
    <>
      <Head>
        <title>Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner bannerData={bannerData} />

      <CategoryPicker />

      <FeaturedProducts featuredData={featuredData} />

      <FeaturedBlogs blogData={blogData} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const bannerRes = await fetch("http://localhost:5001/banner_content");
  const bannerData: BannerData = await bannerRes.json();

  const blogsRes = await fetch("http://localhost:5001/blogs/?_limit=3");
  const blogData: BlogData[] = await blogsRes.json();

  const featuredRes = await fetch("http://localhost:5001/products/?_limit=4");
  const featuredData: FeaturedData[] = await featuredRes.json();

  return {
    props: {
      bannerData,
      blogData,
      featuredData,
    },
  };
};
