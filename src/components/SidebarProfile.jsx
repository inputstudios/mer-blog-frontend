import { Avatar } from "flowbite-react";
import { useEffect, useState } from "react";
import { 
   HiUser, 
   HiDocumentText, 
   HiOutlineUserGroup, 
   HiAnnotation, 
   HiChartPie, 
   HiShieldCheck, 
   HiMenu,
   HiX,
   HiHome,
   HiOutlineLockClosed,
   HiOutlineShieldCheck,
   HiLockClosed,
   HiOutlineDocumentText,
   HiUserGroup,
   HiOutlineAnnotation,
   HiOutlineUser,
   HiOutlineChartPie,
   HiOutlineHome,
} from 'react-icons/hi';
import { IoExit, IoExitOutline, IoLocationOutline, IoLocationSharp } from "react-icons/io5";
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signoutSuccess } from "../redux/user/userSlice";
import { useTranslation } from "react-i18next";

export default function SidebarProfile() {
   const { t } = useTranslation();
   const location = useLocation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { currentUser } = useSelector(state => state.user);
   const [tab, setTab] = useState('');
   const SERVER_URL = import.meta.env.VITE_PROD_BASE_URL;
   const { theme } = useSelector((state) => state.theme);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isClicked, setIsClicked] = useState(false);
   const [isDialogOpen, setDialogOpen] = useState(false);
   const currentLanguage = useSelector((state) => state.language.currentLanguage);
   const languagePrefix = currentLanguage === 'en' ? '/en-us' : '/ru-ru';
   
   const toggleSidebar = () => {
      setIsMenuOpen(!isMenuOpen);
      setIsClicked(true);
      setTimeout(() => {
         setIsClicked(false);
      }, 200);
   };

   useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
         setTab(tabFromUrl);
      }
   }, [location.search]);

   const handleSignout = async () => {
      try {
         const res = await fetch(`${SERVER_URL}/api/user/signout`, {
            method: "POST",
         });
         const data = await res.json();
         if (!res.ok) {
            console.log(data.message);
         } else {
            dispatch(signoutSuccess());
            setDialogOpen(false);
            navigate("/");
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   const handleSignoutClick = () => {
      setDialogOpen(true);
   };

   return ( 
      <div className="flex flex-col h-full md:w-64">
      <div 
         className={`flex items-center justify-between pl-6 p-2 xl:hidden ${isClicked ? 'bg-gray-300 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-900'}`}
         onClick={toggleSidebar}
      >
         <button>
            {isMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
         </button>
      </div>
      <div className={`h-full overflow-y-auto overflow-x-hidden pl-3 py-4 rounded bg-gray-100 dark:bg-[rgb(16,23,42)] flex flex-col justify-between transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${!isMenuOpen ? 'w-full md:w-auto' : 'md:w-56'}`}>
         <div className="flex items-center mb-5 ml-2">
            <Avatar alt='user' img={currentUser.profilePicture} rounded />
            <div className="ml-4 hidden xl:block">
               <span className="block text-sm">{currentUser.username}</span>
               <span className="block text-sm font-medium truncate">{currentUser.email}</span>
            </div>
         </div>
            <div className="flex-grow">
               <Link to={`${languagePrefix}/dashboard?tab=account`}>
                  <div className="py-1">
                     <div className={`py-2 px-3 ${tab === "account" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center justify-between rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'} ${tab === "account" ? 'shadow-md' : ''}`}>                        
                        <div className="flex items-center">
                           {tab === "account" ? (
                              <HiHome
                                 size={28}
                                 className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                              />
                           ) : (
                              <HiOutlineHome
                                 size={28}
                                 className={`text-${tab === "account" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                              />
                           )}
                           <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("sidebar_account")}</span>
                        </div>
                        {currentUser.isAdmin && (
                           <div className={`ml-9 bg-gray-700 px-2 py-0.2 rounded ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>
                              <span className="text-xs text-white xl:inline">{t("admin")}</span>
                           </div>
                        )}
                     </div>
                  </div>
               </Link>
               {currentUser && currentUser.isAdmin && (
                  <Link to={`${languagePrefix}/dashboard?tab=dash`}>
                     <div className="py-1">
                        <div className={`py-2 px-3 ${tab === "dash" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'} ${tab === "dash" ? 'shadow-md' : ''}`}>
                           {tab === "dash" ? (
                              <HiChartPie
                                 size={28}
                                 className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                              />
                           ) : (
                              <HiOutlineChartPie 
                                 size={28}
                                 className={`text-${tab === "dash" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                              />
                           )}
                        <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("dashboard")}</span> 
                        </div>
                     </div>
                  </Link>
               )}
               <Link to={`${languagePrefix}/dashboard?tab=profile`}>
                  <div className="py-1">
                     <div className={`py-2 px-3 ${tab === "profile" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'} ${tab === "profile" ? 'shadow-md' : ''}`}>
                        {tab === "profile" ? (
                           <HiUser
                              size={28}
                              className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                           />
                        ) : (
                           <HiOutlineUser
                              size={28}
                              className={`text-${tab === "profile" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                           />
                        )}
                           <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("profile")}</span>
                     </div>
                  </div>
               </Link>
               <Link to={`${languagePrefix}/dashboard?tab=privacy`}>
                  <div className="py-1">
                     <div className={`py-2 px-3 ${tab === "privacy" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'} ${tab === "privacy" ? 'shadow-md' : ''}`}>
                        {tab === "privacy" ? (
                           <HiShieldCheck
                              size={28}
                              className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                           />
                        ) : (
                           <HiOutlineShieldCheck
                              size={28}
                              className={`text-${tab === "privacy" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                           />
                        )}
                        <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("privacy")}</span>
                     </div>
                  </div>
               </Link>
               <Link to={`${languagePrefix}/dashboard?tab=security`}>
                  <div className="py-1">
                     <div className={`py-2 px-3 ${tab === "security" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'} ${tab === "security" ? 'shadow-md' : ''}`}>
                        {tab === "security" ? (
                           <HiLockClosed
                              size={28}
                              className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                           />
                        ) : (
                           <HiOutlineLockClosed
                              size={28}
                              className={`text-${theme === 'dark' ? 'gray-400' : 'gray-500'}`}
                           />
                        )}
                        <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("security")}</span>
                     </div>
                  </div>
               </Link>
               {currentUser.isAdmin && (
                  <Link to={`${languagePrefix}/dashboard?tab=posts`}>
                     <div className="py-1">
                        <div className={`py-2 px-3 ${tab === "posts" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'} ${tab === "posts" ? 'shadow-md' : ''}`}>
                           {tab === "posts" ? (
                              <HiDocumentText
                                 size={28}
                                 className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                              />
                           ) : (
                              <HiOutlineDocumentText 
                                 size={28}
                                 className={`text-${tab === "posts" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                              />
                           )}
                           <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("posts")}</span>
                        </div>
                     </div>
                  </Link>
               )}
               {currentUser.isAdmin && (
                  <>
                     <Link to={`${languagePrefix}/dashboard?tab=users`}>
                        <div className="py-1">
                           <div className={`py-2 px-3 ${tab === "users" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'} ${tab === "users" ? 'shadow-md' : ''}`}>
                              {tab === "users" ? (
                                 <HiUserGroup
                                    size={28}
                                    className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                                 />
                              ) : (
                                 <HiOutlineUserGroup 
                                    size={28}
                                    className={`text-${tab === "users" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                                 />
                              )}
                              <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("users")}</span>
                           </div>
                        </div>
                     </Link>
                     <Link to={`${languagePrefix}/dashboard?tab=comments`}>
                        <div className="py-1">
                           <div className={`py-2 px-3 ${tab === "comments" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'} ${tab === "comments" ? 'shadow-md' : ''}`}>
                              {tab === "comments" ? (
                                 <HiAnnotation
                                    size={28}
                                    className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                                 />
                              ) : (
                                 <HiOutlineAnnotation 
                                    size={28}
                                    className={`text-${tab === "comments" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                                 />
                              )}
                              <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("comments")}</span>
                           </div>
                        </div>
                     </Link>
                  </>
               )}
               <Link to={`${languagePrefix}/dashboard?tab=addresses`}>
                  <div className="py-1">
                     <div className={`py-2 px-3 ${tab === "addresses" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'} ${tab === "addresses" ? 'shadow-md' : ''}`}>
                        {tab === "addresses" ? (
                           <IoLocationSharp
                              size={28}
                              className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                           />
                        ) : (
                           <IoLocationOutline 
                              size={28}
                              className={`text-${tab === "addresses" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                           />
                        )}
                        <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("address_book")}</span>
                     </div>
                  </div>
               </Link>
               <Link to={`${languagePrefix}/dashboard?tab=signout`}>
                  <div 
                     className={`py-2 px-3 ${tab === "signout" || !tab ? (theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200') : ''} flex items-center rounded-xl ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} ${isMenuOpen ? 'w-14' : 'w-full'} xl:w-full ${!isMenuOpen && 'xl:w-28'} ${tab === "signout" ? 'shadow-md' : ''}`} 
                     onClick={handleSignoutClick}
                  >
                     {tab === "signout" ? (
                        <IoExit
                        size={28}
                        className={`text-${theme === 'dark' ? 'white' : 'gray-700'}`}
                        />
                     ) : (
                        <IoExitOutline 
                        size={28}
                        className={`text-${tab === "signout" || !tab ? (theme === 'dark' ? 'white' : 'gray-700') : (theme === 'dark' ? 'gray-400' : 'gray-500')}`}
                        />
                     )}
                     <span className={`ml-4 ${!isMenuOpen ? 'inline' : 'hidden'} xl:inline`}>{t("sign_out")}</span>
                  </div>
               </Link>
            </div>
         </div>
         {isDialogOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
               <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-1/4 h-1/4 relative flex flex-col">
                  <button
                     onClick={() => setDialogOpen(false)}
                     className="absolute top-4 right-4 text-gray-600 dark:text-white hover:translate-y-[-2px] transition-transform duration-200"
                  >
                     <AiOutlineClose size={20} />
                  </button>
                  <p className="text-xl mb-4">{t("profile:are_you_sure_signout")}</p>
                  <p className="text-md text-gray-500 mb-4">
                  {t("profile:all_unsaved_data")}
                  </p>
                  <div className="mt-auto flex justify-between w-full">
                  <button
                     onClick={() => setDialogOpen(false)}
                     className="px-4 py-2 bg-gray-600 hover:bg-gray-700 shadow-md rounded-lg flex-grow mr-2"
                  >
                     {t("profile:cancel")}
                  </button>
                  <button
                     onClick={handleSignout}
                     className="px-4 py-2 bg-red-600 hover:bg-red-800 shadow-md text-white rounded-lg flex-grow ml-2"
                  >
                     {t("profile:sign_out")}
                  </button>
                  </div>
               </div>
            </div>
         )}
         <span className="px-6 py-2 text-xs">{t("version_app")}</span>
      </div>
   );
}
