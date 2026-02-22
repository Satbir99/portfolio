import React, { useMemo } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const CONTENT_STYLE = { background: "var(--timeline-content-bg)", color: "var(--brand-text)" };
const CONTENT_ARROW_STYLE = { borderRight: "7px solid var(--timeline-content-arrow)" };

const ExperienceCard = React.memo(function ExperienceCard({ experience }) {
  const iconStyle = useMemo(
    () => ({ background: "var(--timeline-icon-bg)" }),
    []
  );

  return (
    <VerticalTimelineElement
      contentStyle={CONTENT_STYLE}
      contentArrowStyle={CONTENT_ARROW_STYLE}
      date={experience.date}
      iconStyle={iconStyle}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
            loading="lazy"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-brand-text text-[24px] font-bold">{experience.title}</h3>
        <p
          className="text-brand-text-muted text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`${experience.company_name}-${index}`}
            className="text-brand-text-muted text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
});

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience) => (
            <ExperienceCard
              key={`${experience.company_name}-${experience.date}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
