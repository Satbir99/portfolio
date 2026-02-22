import React, { useCallback } from "react";
import { motion, useTransform } from "framer-motion";
import Tilt from "react-tilt";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { useMagnetic, useLenisVelocitySkew } from "../hooks";
import { HorizontalSection, SplitText, ParallaxImage } from "./ui";

const TILT_OPTIONS = { max: 12, scale: 1, speed: 400 };
const PARALLAX_OFFSET = ["start end", "end start"];
const DESCRIPTION_LINE_CLAMP = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
};

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
  name,
  description,
  tags,
  image,
  source_code_link,
  live_preview_link,
}) {
  const { ref: magneticRef, x, y } = useMagnetic(0.25);
  const { skewY, rotateX } = useLenisVelocitySkew({ maxSkew: 5, maxRotateX: 3 });
  const skewYStyle = useTransform(skewY, (v) => `${v}deg`);
  const rotateXStyle = useTransform(rotateX, (v) => `${v}deg`);

  const openLink = useCallback((url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  return (
    <motion.div
      ref={magneticRef}
      style={{
        x,
        y,
        skewY: skewYStyle,
        rotateX: rotateXStyle,
        willChange: "transform",
      }}
      className="flex-shrink-0 w-[340px] sm:w-[360px]"
    >
      <Tilt options={TILT_OPTIONS} className="glass-frosted p-5 rounded-2xl h-full">
        <div className="relative w-full h-[220px] rounded-xl overflow-hidden">
          <ParallaxImage
            src={image}
            alt={name}
            className="rounded-xl"
            scaleStart={1}
            scaleEnd={1.12}
            yEnd="-10%"
            offset={PARALLAX_OFFSET}
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
          <h3 className="text-brand-text font-bold text-[22px]">{name}</h3>
          <p
            className="mt-2 text-brand-text-muted text-[14px] overflow-hidden text-ellipsis"
            style={DESCRIPTION_LINE_CLAMP}
          >
            {description}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
});

const WorksHorizontal = () => {
  return (
    <>
      <p className={styles.sectionSubText}>My work</p>
      <SplitText
        text="Projects."
        splitBy="word"
        as="h2"
        className={styles.sectionHeadText}
      />
      <p className="mt-3 text-brand-text-muted text-[17px] max-w-3xl leading-[30px]">
        Following projects showcase my skills through real-world examples. Scroll to explore.
      </p>

      <HorizontalSection
        scrollHeight="300vh"
        stickyTop="20vh"
        stickyHeight="60vh"
        paddingStart="50vw"
        progressRange={[0, 1]}
        xRange={["0%", "-100%"]}
        className="mt-16"
      >
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </HorizontalSection>
    </>
  );
};

export default SectionWrapper(WorksHorizontal, "projects");
