import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../components/switcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function FooterCom() {
   const { t } = useTranslation();

   return (
      <Footer container className="border border-t-8 border-teal-500" id="footer">
         <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
               <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-4 sm:gap-6">
                  <div className="min-w-[350px]">
                     <Footer.Title title={t("footer_whats_new")} />
                     <Footer.LinkGroup col>
                        <Footer.Link
                           href="/wave"
                           rel="noopener noreferrer"
                        >
                           Input Studios Wave
                        </Footer.Link>
                        <Footer.Link
                           href="/chat-sam"
                           rel="noopener noreferrer"
                        >
                           AI Chat Sam
                        </Footer.Link>
                        <Footer.Link
                           href="/workspace"
                           rel="noopener noreferrer"
                        >
                           Input Studios Workspace
                        </Footer.Link>
                        <Footer.Link
                           href="/download-apps"
                           rel="noopener noreferrer"
                        >
                           Input Studios apps
                        </Footer.Link>
                     </Footer.LinkGroup>
                  </div>
                  <div>
                     <Footer.Title title={t("footer_projects")} />
                     <Footer.LinkGroup col>
                        <Footer.Link
                           href="/cloud"
                           rel="noopener noreferrer"
                        >
                           Input Studios Cloud
                        </Footer.Link>
                        <Footer.Link
                           href="/weather-api"
                           rel="noopener noreferrer"
                        >
                           Weather API
                        </Footer.Link>
                        <Footer.Link
                           href="/e-commerce-apps"
                           rel="noopener noreferrer"
                        >
                           E-commerce apps
                        </Footer.Link>
                        <Footer.Link
                           href="/quantum-engine"
                           rel="noopener noreferrer"
                        >
                           Quantum Engine
                        </Footer.Link>
                     </Footer.LinkGroup>
                  </div>
                  <div>
                     <Footer.Title title={t("footer_business")} />
                     <Footer.LinkGroup col>
                        <Footer.Link
                           href="/business"
                           rel="noopener noreferrer"
                        >
                           {t("footer_business_company")}
                        </Footer.Link>
                        <Footer.Link
                           href="/dialog-chat"
                           rel="noopener noreferrer"
                        >
                           {t("footer_dialog_chat")}
                        </Footer.Link>
                        <Footer.Link
                           href="/small-business"
                           rel="noopener noreferrer"
                        >
                           {t("footer_small_business")}
                        </Footer.Link>
                     </Footer.LinkGroup>
                  </div>
                  <div>
                     <Footer.Title title={t("footer_company")}/>
                     <Footer.LinkGroup col>
                        <Footer.Link href="/privacy" >
                           {t("footer_company_news")}
                        </Footer.Link>
                        <Footer.Link href="/terms-of-use">
                           {t("footer_privacy")}
                        </Footer.Link>
                        <Footer.Link href="/terms-of-use">
                           {t("footer_investors")}
                        </Footer.Link>
                     </Footer.LinkGroup>
                  </div>
               </div>
            </div>
            <Footer.Divider />
            <div className="w-full flex flex-wrap items-center justify-between xl:flex-nowrap">
               <div className="flex items-center mb-4 xl:mb-0">
                  <LanguageSwitcher />
               </div>
               <div className="w-full">
                  <Link to="/dashboard?tab=privacy" className="dark:text-gray-400 hover:underline">
                     <div className="flex items-center xl:ml-10">
                        <img src="/images/ic_privacy.webp" alt="Privacy icon" className="w-10" />
                        <span className="text-xs ml-3">{t("custom_footer_privacy_choice")}</span>
                     </div>
                  </Link>
               </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-6 sm:mt-4 sm:justify-end text-xs">
               <Link to="/contacts" className="dark:text-gray-400 hover:underline">{t("custom_footer_contacts")}</Link>
               <Link to="/privacy" className="dark:text-gray-400 hover:underline">{t("custom_footer_privacy")}</Link>
               <Link to="/terms-of-use" className="dark:text-gray-400 hover:underline">{t("custom_footer_terms")}</Link>
               <Link to="/contact" className="dark:text-gray-400 hover:underline">{t("custom_footer_trademarks")}</Link>
               <Link to="/contact" className="dark:text-gray-400 hover:underline">{t("custom_footer_about_ads")}</Link>
               <Footer.Copyright
                  className="text-xs text-black"
                  href="#"
                  by="Input Studios"
                  year={new Date().getFullYear()}
               />
            </div>
         </div>
      </Footer>
   );
}
