import React, { useCallback } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { ProgressiveImage, TiltCard } from "./ui";
import { fadeIn, textVariant } from "../utils/motion";

const TILT_OPTIONS = { max: 45, scale: 1 };

const ExternalLinkIcon = React.memo(function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-white dark:text-white"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
});

const ProjectCard = React.memo(function ProjectCard({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_preview_link,
}) {
  const openLink = useCallback((url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <TiltCard options={TILT_OPTIONS} className="bg-brand-surface dark:bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border border-brand-border/50 dark:border-transparent shadow-premium dark:shadow-none transition-composited">
        <div className="relative w-full h-[230px]">
          <ProgressiveImage
            src={image}
            alt={`${name} project screenshot`}
            width={360}
            height={230}
            className="rounded-2xl object-cover"
            wrapperClassName="h-full rounded-2xl"
            sizes="(max-width: 640px) 100vw, 360px"
          />
          <div className="absolute inset-0 flex justify-end gap-2 m-3 card-img_hover">
            {live_preview_link && (
              <button
                type="button"
                onClick={() => openLink(live_preview_link)}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer border-0"
                title="Live Preview"
                aria-label="Open live preview"
              >
                <ExternalLinkIcon />
              </button>
            )}
            <button
              type="button"
              onClick={() => openLink(source_code_link)}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer border-0"
              title="Source Code"
              aria-label="Open source code"
            >
              <img src={github} alt="" className="w-1/2 h-1/2 object-contain" />
            </button>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-brand-text font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-brand-text-muted text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </TiltCard>
    </motion.div>
  );
});

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-brand-text-muted text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap justify-center gap-7">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            index={index}
            {...project}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
