import Image from "next/image";
import BlogMiniBox from "./ui/BlogMiniBox";
import { User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@prisma/client";

interface BlogT {
  id: number;
  updatedAt: Date;
  title: string;
  description: string;
  author: Partial<User>;
}

const BlogContainer = ({ blog }: any) => {
  const { id, title, updatedAt, description, author, blogImage } = blog;

  if (typeof blog == "undefined" || blog == null) {
    return <div>Blog Not Found !</div>;
  }

  const trimmed = description?.slice(0, 150) + "..."; // trims description to 150 characters

  console.log("author iamge : ", author?.image);
  console.log("blogImage : ", blog);

  return (
    <main className="w-full flex flex-wrap max-sm:flex-col-reverse justify-between items-center p-4 border-b pb-5 border-gray-300">
      {/* left side */}
      <section className="flex-1 pr-5 flex w-full h-full flex-col justify-between space-y-3">
        <h2 className="flex items-center text-gray-700">
          {author?.image ? (
            <Image
              src={author.image}
              alt="author Image"
              className="mr-1 text-white rounded-full p-1"
              width={50}
              height={50}
            />
          ) : (
            <User2 className="mr-1 bg-gray-500 text-white rounded-full p-1" />
          )}
          {author.name}
        </h2>
        <div>
          <Link
            href={`blogs/${id}`}
            className="font-bold text-xl sm:text-[1.2rem] hover:border-b border-black"
          >
            {title}
          </Link>
          <p>{trimmed}</p>
        </div>

        {/* mini blog overview features */}
        <BlogMiniBox id={id} />
      </section>
      {/* right side(blog image) */}
      <section className="my-auto max-sm:w-full hover:cursor">
        <Image
          src={`${process.env.NEXT_PUBLIC_PINATA_GATEWAYURL}/ipfs/${blog?.blogImage}`}
          className="rounded-md object-cover max-sm:w-[100%] h-[160px] overflow-hidden"
          alt="blog image"
          width={240}
          height={80}
        />
      </section>
    </main>
  );
};

export default BlogContainer;
