import { useDispatch, useSelector } from "react-redux"
import { PopularPosts } from "../components/PopularPosts"
import { PostItem } from "../components/PostItem"
import { useEffect } from "react";
import { getAllPost } from "../redux/features/post/postSlice";


export const MainPage = () => {
  const dispatch = useDispatch();
  const {posts, popularPosts} = useSelector(state => state.post);

  useEffect(() => {
    dispatch(getAllPost())
  }, [dispatch])

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">Постов не существует.</div>
    )
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {
            posts?.map((post, i) => (<PostItem post={post} key={i} />))
          }
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">Популярное</div>
          {
            popularPosts?.map((post, i) => (<PopularPosts key={i} post={post} />))
          }
        </div>
      </div>
    </div>
  )
}
