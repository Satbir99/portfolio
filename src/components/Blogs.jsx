import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { blogs, BLOGS_READ_MORE_LINK } from "../constants";

const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-[#56ccf2]"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const BlogCard = ({ index, title, tag, description, link }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    variants={fadeIn("up", "spring", index * 0.5, 0.75)}
    className="block xs:w-[320px] w-full"
  >
    <div className="bg-brand-surface dark:bg-black-200 p-8 rounded-2xl h-full border border-dashed border-brand-border dark:border-secondary/30 hover:border-[#56ccf2]/50 shadow-premium dark:shadow-none transition-all duration-300">
      <p className="text-brand-text font-black text-[40px] leading-none">"</p>
      <p className="mt-4 text-brand-text text-[15px] leading-relaxed tracking-wide">
        {description}
      </p>
      <div className="mt-6 flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[#56ccf2] text-[14px] font-medium">@{tag}</p>
          <p className="mt-1 text-brand-text font-semibold text-[16px]">{title}</p>
        </div>
        <span className="flex-shrink-0 p-2 rounded-lg bg-brand-surface-elevated dark:bg-tertiary">
          <LinkIcon />
        </span>
      </div>
    </div>
  </motion.a>
);

const Blogs = () => {
  return (
    <div className="mt-12 bg-brand-surface-elevated dark:bg-black-100 rounded-[20px] border border-brand-border/50 dark:border-transparent shadow-premium dark:shadow-none transition-all duration-300">
      <div
        className={`bg-brand-surface dark:bg-tertiary rounded-2xl border-b border-brand-border/50 dark:border-transparent rounded-b-none rounded-t-[20px] ${styles.padding} min-h-[140px] flex flex-col justify-center`}
      >
        <motion.div variants={textVariant()} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
          <p className={styles.sectionSubText}>What I write</p>
          <h2 className={styles.sectionHeadText}>Blogs.</h2>
        </motion.div>
      </div>
      <div className={`-mt-12 pb-10 ${styles.paddingX} flex flex-wrap gap-7 justify-center`}>
        {blogs.map((blog, index) => (
          <BlogCard key={blog.title} index={index} {...blog} />
        ))}
      </div>
      <div className="flex justify-center pb-14">
        <a
          href={BLOGS_READ_MORE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[#56ccf2] uppercase tracking-wider hover:underline focus:outline-none focus:underline"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default SectionWrapper(Blogs, "blogs");
