/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, ArrowRight, Laptop, Layout, Rocket, RefreshCw, 
  CheckCircle, MessageSquare, Phone, Mail, Github, Linkedin, 
  Twitter, Instagram, ExternalLink, ArrowUpRight, Shield, 
  Zap, Clock, Heart, Users
} from 'lucide-react';

// --- Types ---
interface Service {
  icon: typeof Laptop;
  title: string;
  description: string;
}

interface Project {
  title: string;
  category: string;
  image: string;
  link: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#home" className="text-2xl font-display font-bold tracking-tight text-brand-primary">
          FICOL<span className="text-brand-accent">MEDIA</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-600 hover:text-brand-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={() => setIsOpen(false)}
            className="bg-brand-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all text-center"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col space-y-4 md:hidden shadow-xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-800 hover:text-brand-accent"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ subtitle, title, description, dark = false }: { subtitle: string; title: string; description?: string; dark?: boolean }) => (
  <div className="max-w-3xl mb-16">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-brand-accent font-display font-semibold tracking-wider uppercase text-sm block mb-3`}
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 ${dark ? 'text-white' : 'text-brand-primary'}`}
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`text-lg leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-600'}`}
      >
        {description}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', service: 'Business Website', message: '' });
  const [showAllProjects, setShowAllProjects] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    setIsFormSubmitted(true);
    // Reset after some time or keep showing success
    setTimeout(() => {
      setIsFormSubmitted(false);
      setFormData({ name: '', email: '', service: 'Business Website', message: '' });
    }, 5000);
  };

  const services: Service[] = [
    { icon: Layout, title: "Website Design", description: "Modern, UI/UX focused designs that capture your brand's essence and engage your audience from the first second." },
    { icon: Laptop, title: "Business Websites", description: "Comprehensive web solutions for local businesses and startups looking to establish a professional digital footprint." },
    { icon: Rocket, title: "Landing Page Design", description: "Conversion-optimized landing pages designed to turn your advertising traffic into loyal, paying customers." },
    { icon: RefreshCw, title: "Website Redesign", description: "Breathe new life into your outdated website with a modern look and improved performance for better business results." },
  ];

  const allProjects: Project[] = [
    { title: "Luxe Realty", category: "Real Estate Agency", image: "https://picsum.photos/seed/realty/800/600", link: "#" },
    { title: "FitLife Studio", category: "Health & Fitness", image: "https://picsum.photos/seed/gym/800/600", link: "#" },
    { title: "TechNova", category: "SaaS Platform", image: "https://picsum.photos/seed/saas/800/600", link: "#" },
    { title: "Cafe Bloom", category: "Local Restaurant", image: "https://picsum.photos/seed/cafe/800/600", link: "#" },
    { title: "EduSpark", category: "E-Learning", image: "https://picsum.photos/seed/edu/800/600", link: "#" },
    { title: "GreenRoot", category: "Eco-Store", image: "https://picsum.photos/seed/green/800/600", link: "#" },
  ];

  const displayedProjects = showAllProjects ? allProjects : allProjects.slice(0, 4);

  const testimonials: Testimonial[] = [
    { name: "Rajesh Sharma", role: "Owner, Sharma Groceries", content: "Abhay transformed our small shop's online presence. We started getting orders from parts of Faridabad we never reached before. Highly recommended!", avatar: "RS" },
    { name: "Priya Gupta", role: "Founder, Bloom Decor", content: "The level of professionalism and the clean design Ficol Media provided was exactly what my startup needed. They really understand business goals.", avatar: "PG" },
    { name: "Amit Verma", role: "CEO, Verma Logistics", content: "Their redesign reduced our bounce rate by 40%. The website is now our #1 lead generator. Fast delivery and great support.", avatar: "AV" },
  ];

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-brand-surface">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 transform origin-top-right hidden lg:block" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-6">
              Available for New Projects
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-brand-primary leading-[1.1] mb-6">
              I Build Websites That <br />
              <span className="text-brand-accent">Turn Visitors Into Customers</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
              Helping local businesses and startups in Faridabad grow with high-performance, modern websites that actually work for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="group inline-flex items-center justify-center bg-brand-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
              >
                Get a Free Consultation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#portfolio" 
                className="inline-flex items-center justify-center bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-brand-accent hover:text-brand-accent transition-all"
              >
                View My Work
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/user${i}/100/100`} 
                      alt="User" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 font-medium font-display uppercase tracking-wider">
                Trusted by 50+ Local Businesses
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-blue-200 border-8 border-white">
              <img 
                src="https://picsum.photos/seed/webdev/1200/900" 
                alt="Web Design Mockup" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -right-6 z-20 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Project Success</p>
                <p className="text-lg font-bold text-gray-900">100%</p>
              </div>
            </motion.div>
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              className="absolute -bottom-10 -left-10 z-20 bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="flex gap-2 mb-2">
                {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-yellow-400" />)}
              </div>
              <p className="text-sm italic text-gray-600">"The best web agency in town!"</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative z-10 shadow-xl">
              <img 
                src="https://picsum.photos/seed/abhay/800/1000" 
                alt="Abhay Kumar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-brand-accent rounded-2xl -z-0" />
            
            <div className="absolute top-1/2 -left-12 -translate-y-1/2 p-6 bg-white rounded-xl shadow-xl z-20 hidden lg:block">
              <div className="text-4xl font-bold text-brand-accent mb-1 underline decoration-2 underline-offset-4">5+</div>
              <div className="text-sm font-display font-semibold uppercase tracking-widest text-gray-500">Years of Experience</div>
            </div>
          </div>
          
          <div>
            <SectionHeading 
              subtitle="The Brain Behind Ficol Media" 
              title="I'm Abhay Kumar, and I help businesses win online." 
              description="I noticed too many local businesses in Faridabad struggling with outdated websites or none at all. Ficol Media was born to bridge that gap. We don't just 'build websites'—we build growth engines."
            />
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="font-bold text-brand-primary text-xl mb-3 flex items-center gap-2">
                  <Heart className="text-red-500" size={20} /> My Vision
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">To make high-quality digital solutions accessible to every small business and startup in our community.</p>
              </div>
              <div>
                <h4 className="font-bold text-brand-primary text-xl mb-3 flex items-center gap-2">
                  <Users className="text-blue-500" size={20} /> My Focus
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">User experience, lead conversion, and blazing fast speeds. If it doesn't sell, it's not finished.</p>
              </div>
            </div>
            <a href="#contact" className="inline-flex items-center font-bold text-brand-accent hover:gap-3 gap-2 transition-all group">
              Learn more about how I work <ArrowRight size={20}/>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-brand-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center flex flex-col items-center">
            <SectionHeading 
              subtitle="What I Do" 
              title="Solutions Tailored for Growth" 
              description="From single-page landing pages to complex business portals, I provide end-to-end web services."
            />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-2xl border border-gray-100 hover:border-brand-accent transition-all hover:shadow-xl group"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-brand-accent mb-8 group-hover:bg-brand-accent group-hover:text-white transition-all">
                  <service.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            subtitle="Recent Work" 
            title="Selected Projects" 
            description="Helping businesses across industries stand out with unique, high-performance web solutions."
          />
          
          <div className="grid md:grid-cols-2 gap-10">
            {displayedProjects.map((project, idx) => (
              <motion.div 
                key={idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg border border-gray-100"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full text-brand-primary shadow-xl scale-50 group-hover:scale-100 transition-transform">
                      <ExternalLink size={24} />
                    </div>
                  </div>
                </div>
                <div className="p-8 bg-white flex justify-between items-center">
                  <div>
                    <span className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-1 block">{project.category}</span>
                    <h4 className="text-2xl font-bold text-brand-primary">{project.title}</h4>
                  </div>
                  <a href={project.link} className="w-12 h-12 rounded-full flex items-center justify-center border border-gray-200 hover:bg-brand-primary hover:text-white transition-all">
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="bg-brand-surface text-gray-800 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all border border-gray-200"
            >
              {showAllProjects ? "Show Less" : "Explore More Projects"}
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="section-padding bg-brand-primary text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 h-full gap-px bg-white/10">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="border-r border-white/5" />)}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <SectionHeading 
                dark 
                subtitle="Why Choose Ficol Media" 
                title="Your Growth is My Only Metric." 
                description="I don't just deliver a file; I deliver a business asset. Here's why 50+ local businesses choose to work with me over larger agencies."
              />
              
              <div className="space-y-6">
                {[
                  { icon: Zap, title: "Speed & Performance", text: "Every millisecond counts. Your site will load instantly." },
                  { icon: Shield, title: "1-Month Free Support", text: "Ongoing maintenance so you never worry about tech." },
                  { icon: Clock, title: "Quick Turnaround", text: "Most business websites are ready to launch in 14 days." },
                  { icon: Users, title: "Direct Communication", text: "No middleman. You talk directly with the developer." },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="mt-1 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-brand-accent" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-1 rounded-3xl backdrop-blur-sm border border-white/10">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-brand-primary text-2xl font-bold mb-8">What Clients Say</h3>
                <div className="space-y-8">
                  {testimonials.map((t, i) => (
                    <div key={i} className={`pb-8 ${i !== testimonials.length - 1 ? 'border-bottom border-gray-100' : ''}`}>
                      <div className="flex gap-4 items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center font-bold text-brand-accent shrink-0">
                          {t.avatar}
                        </div>
                        <div>
                          <h5 className="text-brand-primary font-bold">{t.name}</h5>
                          <p className="text-gray-500 text-xs">{t.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed italic">"{t.content}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center flex flex-col items-center">
            <SectionHeading 
              subtitle="The Journey" 
              title="How We Build Your Online Empire" 
              description="A transparent, step-by-step process designed to get you the best results with zero stress."
            />
          </div>

          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="absolute top-[28px] left-0 w-full h-0.5 bg-gray-100 -z-10 hidden md:block" />
            {[
              { step: "01", title: "Discussion", text: "We sit down to understand your business goals and target audience." },
              { step: "02", title: "Design", text: "I create a custom UI mockup that aligns with your brand identity." },
              { step: "03", title: "Development", text: "Building your site with clean code for speed, SEO, and responsiveness." },
              { step: "04", title: "Delivery", text: "Testing and launch! Plus, training on how to manage your content." },
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-white border-4 border-brand-surface flex items-center justify-center text-brand-accent font-display font-bold text-xl shadow-md mb-8">
                  {p.step}
                </div>
                <h4 className="text-xl font-bold text-brand-primary mb-4">{p.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-brand-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <SectionHeading 
                subtitle="Get In Touch" 
                title="Let's Start Your Project Today" 
                description="Ready to take your business to the next level? Fill out the form or reach out directly via WhatsApp for a faster response."
              />
              
              <div className="space-y-8 mt-10">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h5 className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Email Me</h5>
                    <p className="text-xl font-bold text-brand-primary">abhay@ficolmedia.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-green-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h5 className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">WhatsApp / Call</h5>
                    <p className="text-xl font-bold text-brand-primary">+91 9625X-XXXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-800">
                    <Layout size={24} />
                  </div>
                  <div>
                    <h5 className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Location</h5>
                    <p className="text-xl font-bold text-brand-primary">Faridabad, Haryana, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <a href="https://wa.me/919625XXXXXX" className="bg-[#25D366] text-white px-8 py-4 rounded-xl flex items-center gap-3 font-bold hover:scale-105 transition-transform">
                  <MessageSquare size={20} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 min-h-[500px] flex flex-col justify-center"
            >
              <AnimatePresence mode="wait">
                {isFormSubmitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-3xl font-bold text-brand-primary mb-4">Message Sent!</h3>
                    <p className="text-gray-600 mb-8">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                    <button 
                      onClick={() => setIsFormSubmitted(false)}
                      className="text-brand-accent font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6" 
                    onSubmit={handleSubmit}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe" 
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white transition-all" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com" 
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white transition-all" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Service Needed</label>
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white transition-all appearance-none"
                      >
                        <option>Business Website</option>
                        <option>Landing Page</option>
                        <option>Website Redesign</option>
                        <option>E-commerce Store</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                      <textarea 
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4} 
                        placeholder="How can I help your business?" 
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-accent focus:bg-white transition-all resize-none"
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-brand-primary text-white py-5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-gray-200">
                      Send Message <ArrowRight size={20} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <a href="#home" className="text-3xl font-display font-bold tracking-tight text-brand-primary mb-6 block">
                FICOL<span className="text-brand-accent">MEDIA</span>
              </a>
              <p className="text-gray-500 max-w-sm mb-8">
                Empowering Faridabad's small businesses and startups with premium digital solutions. We believe every business deserves a website that works.
              </p>
              <div className="flex gap-4">
                {[Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-accent hover:border-brand-accent transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-brand-primary mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-500 font-medium">
                <li><a href="#home" className="hover:text-brand-accent">Home</a></li>
                <li><a href="#about" className="hover:text-brand-accent">About</a></li>
                <li><a href="#services" className="hover:text-brand-accent">Services</a></li>
                <li><a href="#portfolio" className="hover:text-brand-accent">Portfolio</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-brand-primary mb-6">Services</h4>
              <ul className="space-y-4 text-gray-500 font-medium">
                <li><a href="#" className="hover:text-brand-accent">Web Design</a></li>
                <li><a href="#" className="hover:text-brand-accent">E-commerce</a></li>
                <li><a href="#" className="hover:text-brand-accent">SEO Optimization</a></li>
                <li><a href="#" className="hover:text-brand-accent">Lead Generation</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-sm">© 2026 Ficol Media. All rights reserved. Designed by Abhay Kumar.</p>
            <div className="flex gap-8 text-xs text-gray-400 font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-brand-accent">Privacy Policy</a>
              <a href="#" className="hover:text-brand-accent">Terms of Service</a>
            </div>
          </div>
          
          {/* SEO Bonus Section Hidden for Users but Readable for Crawlers if needed */}
          <div className="sr-only mt-10">
            <h3>SEO Keywords & Strategy</h3>
            <ul>
              <li>Web developer in Faridabad</li>
              <li>Website designer in Faridabad</li>
              <li>Ficol Media web design</li>
              <li>Local business website development India</li>
              <li>E-commerce website designer Faridabad</li>
              <li>Startup website agency Haryana</li>
              <li>Business website redesign services</li>
              <li>Professional portfolio designer</li>
              <li>Affordable web design for small businesses</li>
              <li>Landing page expert Faridabad</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

