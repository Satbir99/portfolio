import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const SERVICE_ID = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

const INITIAL_FORM = { name: "", email: "", message: "" };

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (PUBLIC_KEY) emailjs.init(PUBLIC_KEY);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      alert(
        "Email is not configured. Add VITE_APP_EMAILJS_SERVICE_ID, VITE_APP_EMAILJS_TEMPLATE_ID, and VITE_APP_EMAILJS_PUBLIC_KEY to your .env file, then restart the dev server (npm run dev)."
      );
      return;
    }

    setLoading(true);

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name,
        to_name: "Satbir Singh",
        from_email: form.email,
        to_email: "ribtas007@outlook.com",
        message: form.message,
      }, PUBLIC_KEY)
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm(INITIAL_FORM);
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS error:", error);
          const message = error?.text || error?.message || String(error);
          alert(`Something went wrong: ${message}. Check the browser console and your EmailJS template variable names (from_name, from_email, message).`);
        }
      );
  }, [form]);

  return (
    <div
      className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-0 overflow-hidden"
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] glass p-8 rounded-2xl border xl:mr-0 shrink-0 shadow-premium-lg dark:shadow-none"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-brand-text font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-brand-surface dark:bg-tertiary py-4 px-6 placeholder:text-brand-text-muted text-brand-text rounded-lg outline-none border border-brand-border font-medium transition-colors duration-200'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-brand-text font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-brand-surface dark:bg-tertiary py-4 px-6 placeholder:text-brand-text-muted text-brand-text rounded-lg outline-none border border-brand-border font-medium transition-colors duration-200'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-brand-text font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-brand-surface dark:bg-tertiary py-4 px-6 placeholder:text-brand-text-muted text-brand-text rounded-lg outline-none border border-brand-border font-medium transition-colors duration-200 resize-none'
            />
          </label>

          <button
            type='submit'
            className='bg-brand-text dark:bg-tertiary text-brand-bg dark:text-white py-3 px-8 rounded-xl outline-none w-fit font-bold shadow-lg hover:opacity-90 transition-opacity duration-200'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      {/* Solid strip to mask canvas bleed */}
      <div
        className="hidden xl:block w-4 flex-shrink-0 bg-brand-bg min-h-[400px]"
        aria-hidden="true"
      />

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] overflow-hidden rounded-2xl bg-brand-surface dark:bg-primary border border-brand-border dark:border-transparent shadow-premium dark:shadow-none shrink-0"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
