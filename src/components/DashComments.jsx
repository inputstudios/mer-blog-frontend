import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { useTranslation } from "react-i18next";
import DeleteCommentModal from "./modals/DeleteCommentModal";

export default function DashComments() {
   const { t } = useTranslation();
   const { currentUser } = useSelector((state) => state.user);
   const [comments, setComments] = useState([]);
   const [showMore, setShowMore] = useState(true);
   const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
   const [commentIdToDelete, setCommentIdToDelete] = useState("");
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;

   useEffect(() => {
      const fetchComments = async () => {
         try {
            const token = localStorage.getItem('token');
   
            const res = await fetch(`${SERVER_URL}/api/comment/getcomments`, {
               method: 'GET',
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
               },
            });
            const data = await res.json();
            if (res.ok) {
               setComments(data.comments);
               if (data.comments.length < 9) {
                  setShowMore(false);
               }
            } else {
               console.log(data.message);
            }
         } catch (error) {
            console.log(error.message);
         }
      };
   
      if (currentUser.isAdmin) {
         fetchComments();
      }
   }, [SERVER_URL, currentUser._id, currentUser.isAdmin]);   

   const handleShowMore = async () => {
      const startIndex = comments.length;
      try {
         const token = localStorage.getItem('token');
   
         const res = await fetch(`${SERVER_URL}/api/comment/getcomments?startIndex=${startIndex}`, {
            method: 'GET',
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
            },
         });
         const data = await res.json();
         if (res.ok) {
            setComments((prev) => [...prev, ...data.comments]);
            if (data.comments.length < 9) {
               setShowMore(false);
            }
         } else {
            console.log(data.message);
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   const handleDeleteComment = async () => {
      setShowDeleteCommentModal(false);
      try {
         const token = localStorage.getItem('token');
   
         const res = await fetch(`${SERVER_URL}/api/comment/deleteComment/${commentIdToDelete}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
            },
         });
   
         const data = await res.json();
         if (res.ok) {
            setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
            setShowDeleteCommentModal(false);
         } else {
            console.log(data.message);
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   return (
      <div
         className={`table-auto md:mx-auto pt-3 px-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 overflow-x-auto ${
            !showMore ? 'mb-5' : ''
         }`}
      >
         {currentUser.isAdmin && comments.length > 0 ? (
            <>
               <div className="border border-gray-700 rounded-lg overflow-x-auto">
                     <Table hoverable className="shadow-md">
                     <Table.Head>
                        <Table.HeadCell>{t("comment_id")}</Table.HeadCell>
                        <Table.HeadCell>{t("date_updated")}</Table.HeadCell>
                        <Table.HeadCell>{t("comment_content")}</Table.HeadCell>
                        <Table.HeadCell>{t("number_of_likes")}</Table.HeadCell>
                        <Table.HeadCell>{t("user_id")}</Table.HeadCell>
                        <Table.HeadCell>{t("delete")}</Table.HeadCell>
                     </Table.Head>
                     {comments.map((comment) => (
                        <Table.Body className="divide-y" key={comment._id}>
                           <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700/80">
                              <Table.Cell>{comment.postId}</Table.Cell>
                              <Table.Cell>
                                 {new Date(comment.updatedAt).toLocaleDateString()}
                              </Table.Cell>
                              <Table.Cell>{comment.content}</Table.Cell>
                              <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                              <Table.Cell>{comment.userId}</Table.Cell>
                              <Table.Cell>
                                 <span
                                    onClick={() => {
                                       setShowDeleteCommentModal(true);
                                       setCommentIdToDelete(comment._id);
                                    }}
                                    className="font-medium text-red-500 hover:underline cursor-pointer"
                                 >
                                    {t("delete")}
                                 </span>
                              </Table.Cell>
                           </Table.Row>
                        </Table.Body>
                     ))}
                  </Table>
               </div>
               {showMore && (
                  <div className="flex justify-center my-6">
                     <button
                        onClick={handleShowMore}
                        className="text-teal-500 text-sm py-2 px-4 border border-teal-500 rounded hover:bg-teal-100 dark:hover:bg-teal-800"
                     >
                        {t("show_more")}
                     </button>
                  </div>
               )}
            </>
         ) : (
            <div className="flex flex-col items-center justify-center h-screen">
               <img 
                  src="/images/profile/no_data.png"
                  alt="No comments"
                  className="mb-4 w-56"
               />
               <p>{t("you_have_no_comments")}</p>
            </div>
         )}
         {showDeleteCommentModal && (
            <DeleteCommentModal 
               setShowModal={setShowDeleteCommentModal}
               handleDeleteComment={handleDeleteComment}
            />
         )}
      </div>
   );
}
