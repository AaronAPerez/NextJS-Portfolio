'use client';

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { BackgroundBeams } from '@/components/ui/background-beams';
import SectionTitle from '@/components/SectionTitle';
import { CopyIcon, MailIcon, DownloadIcon, Github, Linkedin } from 'lucide-react';
import BorderMagicButton from '@/components/ui/BorderMagicButton';

const socialLinks = [
  {
    id: 'github',
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/AaronAPerez'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/aaronaperezdev/'
  }
];

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("aaperez06@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy email");
    }
  };

  const handleDownload = () => {
    try {
      const resumeUrl = "/A.Perez_Resume.pdf";
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "A.Perez_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download resume");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-20">
      {/* Background Effects */}
      <BackgroundBeams className="absolute inset-0" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section Title */}
          <SectionTitle
            title="Contact Me"
            subtitle="Let's connect and discuss potential opportunities"
          />

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Actions */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-8">Get In Touch</h3>
              
              <button 
                onClick={handleCopy}
                className="w-full group"
              >
                <BorderMagicButton
                  title={copied ? "Email Copied!" : "Copy Email"}
                  icon={<CopyIcon className="w-5 h-5" />}
                  position="left"
                  otherClasses="w-full !bg-[#161e31] py-3"
                />
              </button>

              <motion.a
                href="mailto:aaperez06@gmail.com"
                className="block w-full"
              >
                <BorderMagicButton
                  title="Send Email"
                  icon={<MailIcon className="w-5 h-5" />}
                  position="left"
                  otherClasses="w-full !bg-[#161e31] py-3"
                />
              </motion.a>

              <button
                onClick={handleDownload}
                className="w-full"
              >
                <BorderMagicButton
                  title="Download Resume"
                  icon={<DownloadIcon className="w-5 h-5" />}
                  position="left"
                  otherClasses="w-full !bg-[#161e31] py-3"
                />
              </button>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-8">Social Links</h3>
              
              {socialLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <BorderMagicButton
                    title={link.name}
                    icon={<link.icon className="w-5 h-5" />}
                    position="left"
                    otherClasses="w-full !bg-[#161e31] py-3"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Additional Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-400 mt-12 max-w-2xl mx-auto"
          >
            Feel free to reach out for collaborations or just to say hello! 
            I'm always open to discussing new projects and opportunities.
          </motion.p>
        </motion.div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />
    </section>
  );
};

export default ContactSection;