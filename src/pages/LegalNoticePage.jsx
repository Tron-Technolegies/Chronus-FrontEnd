import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-lg sm:text-xl font-semibold text-[#FFEDD0] mb-4 tracking-wide border-b border-white/10 pb-3">
      {title}
    </h2>
    <div className="text-[#d4bca9]/80 text-sm sm:text-[15px] leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

const LegalNoticePage = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = t('policies.legal_notice.sections', { returnObjects: true }) || [];

  return (
    <div className="min-h-screen bg-[#1a0806] text-[#FFEDD0] inter pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#d4bca9]/60 hover:text-[#FFEDD0] transition-colors text-sm mb-10 group"
        >
          <IoArrowBack size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t('policies.back_to_home')}
        </Link>

        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4bca9]/50 mb-3">{t('policies.legal')}</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#FFEDD0] mb-4">{t('policies.legal_notice_title')}</h1>
          <p className="text-[#d4bca9]/60 text-sm">{t('policies.effective_date')}</p>
        </div>

        <div className="bg-[#2a0e0c] border border-[#78241e3a] rounded-2xl p-6 sm:p-10 shadow-2xl shadow-[#541a1640]">
          {Array.isArray(sections) && sections.map((section, idx) => (
            <Section key={idx} title={section.title}>
              {section.content?.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
              {section.list && (
                <ul className="list-none space-y-2 mt-3">
                  {section.list.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4bca9]/40 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.post_content?.map((p, pIdx) => (
                <p key={`post-${pIdx}`} className="mt-3">{p}</p>
              ))}
            </Section>
          ))}
        </div>

        <div className="mt-10 flex gap-6 text-[10px] uppercase tracking-[0.2em] text-[#d4bca9]/40">
          <Link to="/privacy" className="hover:text-[#d4bca9] transition-colors">{t('policies.privacy_title')}</Link>
          <Link to="/terms" className="hover:text-[#d4bca9] transition-colors">{t('policies.terms_title')}</Link>
        </div>
      </div>
    </div>
  );
};

export default LegalNoticePage;
