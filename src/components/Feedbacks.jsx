import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { ProgressiveImageIcon } from "./ui";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-brand-surface dark:bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full border border-brand-border/50 dark:border-transparent shadow-premium dark:shadow-none transition-composited'
  >
    <p className='text-brand-text font-black text-[48px]'>"</p>

    <div className='mt-1'>
      <p className='text-brand-text tracking-wider text-[18px]'>{testimonial}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          <p className='text-brand-text font-medium text-[16px]'>
            <span className='blue-text-gradient'>@</span> {name}
          </p>
          <p className='mt-1 text-brand-text-muted text-[12px]'>
            {designation} of {company}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <ProgressiveImageIcon
            src={image}
            alt={`${name}`}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className="mt-12 bg-brand-surface-elevated dark:bg-black-100 rounded-[20px] border border-brand-border/50 dark:border-transparent shadow-premium dark:shadow-none transition-composited">
      <div
        className={`bg-brand-surface dark:bg-tertiary rounded-2xl rounded-b-none rounded-t-[20px] border-b border-brand-border/50 dark:border-transparent ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
