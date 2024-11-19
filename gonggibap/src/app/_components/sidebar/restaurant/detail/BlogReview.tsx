import { useGetBlogs } from '@/apis/restaurant';

type BlogReviewProps = {
  restaurantId: number;
};

export const BlogReview = ({ restaurantId }: BlogReviewProps) => {
  const { data: blogs } = useGetBlogs(restaurantId);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-black text-[#FF7058]">블로그 리뷰</h2>
      {!blogs?.length ? (
        <div className="py-10 text-center text-gray-500">
          아직 블로그 리뷰가 없습니다.
        </div>
      ) : (
        <ul className="space-y-4">
          {blogs.map((blog, index) => (
            <li key={index} className="border-b border-gray-200 pb-4">
              <article className="w-full">
                <a
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full">
                  <div className="flex gap-4">
                    <div className="min-w-0 flex-1">
                      <h3
                        className="text-md mb-2 line-clamp-2 font-semibold"
                        dangerouslySetInnerHTML={{ __html: blog.title }}
                      />
                      <p
                        className="line-clamp-2 text-sm text-gray-500"
                        dangerouslySetInnerHTML={{ __html: blog.contents }}
                      />
                    </div>
                    {blog.thumbnail && (
                      <figure className="size-20 shrink-0">
                        <img
                          src={blog.thumbnail}
                          alt={`${blog.title} 썸네일 이미지`}
                          className="size-full rounded-md object-cover"
                        />
                      </figure>
                    )}
                  </div>
                </a>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
