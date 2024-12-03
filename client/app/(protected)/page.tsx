import { MdAdminPanelSettings, MdOutlineFileUpload } from "react-icons/md";
import { SlScreenDesktop } from "react-icons/sl";
import { CiViewList, CiEdit } from "react-icons/ci";
import { FaUserCog } from "react-icons/fa";
import Link from "next/link";
import PostCards from "@/components/post/PostCards";

export default async function page() {


  return (
    <>
      <h1 className="text-center text-3xl font-bold my-5">Posts</h1>
      <PostCards />
    </>
  )
}
