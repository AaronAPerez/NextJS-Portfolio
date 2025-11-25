import { ContactForm } from "@/components/sections/ContactSection/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}