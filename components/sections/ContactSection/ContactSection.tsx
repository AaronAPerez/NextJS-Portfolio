'use client';

import SectionTitle from '@/components/SectionTitle';
import { BackgroundBeams } from '@/components/ui/background-beams'
import BorderMagicButton from '@/components/ui/BorderMagicButton';

import { IconFileDownload } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { CopyIcon, MailIcon } from 'lucide-react'
import React, { useState } from 'react'

const ContactSection = () => {
  // useState to hold true false
  const [copied, setCopied] = useState(false);

  // helper functions
  const handleCopy = () => {
    navigator.clipboard.writeText("aaperez06@gmail.com");
    setCopied(true);
  };

  const handleDownload = () => {
    const resumeUrl = "A.Perez_Resume.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "A.Perez_Resume.pdf";
    link.click();
  };

  const contactContent = {
    title: "Contact Me"
  };

  return (
    <section className="relative mx-auto overflow-hidden">
      <BackgroundBeams className="absolute inset-0" />
      <div className="relative z-10 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section Title */}
          <SectionTitle
            title={contactContent.title}
            subtitle="Let's connect and discuss potential opportunities"
          />
          {/* Professional Links */}
          <div className="flex flex-row justify-evenly">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <BorderMagicButton
                title={copied ? " Email copied:" : " Copy my Email"}
                icon={<CopyIcon />}
                position="left"
                otherClasses="!bg-[#161e31]"
                handleClick={handleCopy}
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <BorderMagicButton
                title={copied ? " Resume Downloaded:" : " Download Resume"}
                icon={<IconFileDownload />}
                position="left"
                otherClasses="!bg-[#161e31]"
                handleClick={handleDownload}
              />
            </motion.a>
            {/* CTA Buttons */}
            <motion.a
              href="mailto:aaperez06@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <BorderMagicButton
                title={"Send Email"}
                icon={<MailIcon />}
                position='left'
                otherClasses="!bg-[#161e31]"
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection