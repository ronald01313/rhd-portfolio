import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Download, Code2, Cpu, Database, Globe } from "lucide-react";
import type { Route } from "./+types/home";
import { portfolioData } from "../data";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${portfolioData.name} | Portfolio` },
    { name: "description", content: portfolioData.description },
  ];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <motion.div 
          className="relative z-10 text-center max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          >
            <img 
              src={portfolioData.profileImage} 
              alt={portfolioData.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/160?text=RHD";
              }}
            />
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {portfolioData.name}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {portfolioData.title}
          </motion.p>
          <motion.p 
            className="text-lg max-w-2xl mx-auto mb-10 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {portfolioData.description}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <a 
              href={portfolioData.resumeUrl} 
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all transform hover:scale-105"
              target="_blank"
              rel="noreferrer"
            >
              <Download size={18} /> Download CV
            </a>
            <div className="flex items-center gap-4 ml-2">
              <a href={portfolioData.github} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-blue-600 transition-colors">
                <Github size={20} />
              </a>
              <a href={portfolioData.linkedin} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${portfolioData.email}`} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-blue-600 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Technical Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Frontend", icon: <Globe />, skills: portfolioData.skills.filter(s => s.category === "Frontend") },
                { title: "Backend", icon: <Code2 />, skills: portfolioData.skills.filter(s => s.category === "Backend") },
                { title: "Database", icon: <Database />, skills: portfolioData.skills.filter(s => s.category === "Database") },
                { title: "RPA", icon: <Cpu />, skills: portfolioData.skills.filter(s => s.category === "RPA") },
              ].map((category, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-500 transition-colors"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">{project.title}</h3>
                    <a href={project.link} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-blue-600 dark:bg-blue-700 text-white rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's build something amazing together</h2>
            <p className="text-xl text-blue-100 mb-12">
              I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a 
                href={`mailto:${portfolioData.email}`} 
                className="w-full md:w-auto px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:shadow-xl transition-shadow"
              >
                Send an Email
              </a>
              <div className="flex gap-4">
                 <a href={portfolioData.github} className="p-4 bg-blue-500/30 rounded-full hover:bg-blue-500/50 transition-colors">
                   <Github size={24} />
                 </a>
                 <a href={portfolioData.linkedin} className="p-4 bg-blue-500/30 rounded-full hover:bg-blue-500/50 transition-colors">
                   <Linkedin size={24} />
                 </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
      </footer>
    </main>
  );
}
