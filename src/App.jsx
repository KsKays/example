import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Building2, 
  HardHat, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

// --- Utility Components ---

// Button Component for consistency (Heuristic #4)
const Button = ({ children, variant = 'primary', className = '', isLoading = false, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-500 shadow-lg shadow-blue-700/30 hover:shadow-blue-700/40",
    secondary: "bg-white text-blue-900 hover:bg-blue-50 focus:ring-white border border-transparent shadow-md",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white/10 focus:ring-white"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          กำลังประมวลผล...
        </>
      ) : children}
    </button>
  );
};

// Section Header Component (Heuristic #4)
const SectionHeader = ({ title, subtitle, align = 'center' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'} max-w-3xl mx-auto`}>
    <h2 className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-3">
      {subtitle}
    </h2>
    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
      {title}
    </h3>
    {align === 'center' && <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full opacity-80"></div>}
  </div>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll Logic for Navbar & BackToTop (Heuristic #1 & #7)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Navigation Component ---
  const Navigation = () => (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" aria-label="S.V. CONCRETE Home">
            <div className={`p-2 rounded-lg transition-colors ${scrolled ? 'bg-blue-50' : 'bg-white/10'}`}>
              <Building2 className={`h-6 w-6 ${scrolled ? 'text-blue-700' : 'text-white'}`} />
            </div>
            <span className={`font-bold text-xl tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              S.V. CONCRETE
            </span>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {['หน้าแรก', 'บริการ', 'มาตรฐาน', 'ผลงาน'].map((item, index) => {
              const anchors = ['#home', '#services', '#standards', '#contact']; // simplified anchor mapping
              return (
                <a 
                  key={item}
                  href={anchors[index]} 
                  className={`text-sm font-medium transition-colors hover:underline underline-offset-4 ${
                    scrolled ? 'text-slate-600 hover:text-blue-700' : 'text-blue-100 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              );
            })}
            <Button 
              variant={scrolled ? "primary" : "secondary"} 
              className="py-2 px-4 text-sm"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              ขอใบเสนอราคา
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${
                scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              aria-expanded={isMenuOpen}
              aria-label="Open main menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay (Heuristic #3: User Control) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 md:hidden animate-fade-in-down">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {['หน้าแรก', 'บริการ', 'มาตรฐาน', 'ผลงาน', 'ติดต่อเรา'].map((item, idx) => (
              <a
                key={item}
                href={`#${idx === 4 ? 'contact' : 'home'}`} // Simplified logic
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  // --- Hero Component ---
  const Hero = () => (
    <header id="home" className="relative h-screen min-h-[650px] flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Image with Overlay for Text Contrast (Heuristic #8) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1590083941058-b1cb87951f6e?q=80&w=2070&auto=format&fit=crop" 
          alt="Concrete mixing plant background" 
          className="w-full h-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-blue-900/40 to-slate-900/90"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm text-blue-100 text-sm font-medium mb-6 animate-fade-in-up">
          <CheckCircle2 className="w-4 h-4 mr-2" /> ได้รับการรับรองมาตรฐาน ISO 9001:2015
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight animate-fade-in-up delay-100">
          รากฐานที่มั่นคง <br className="hidden md:block"/>
          <span className="text-blue-400">เริ่มต้นที่คอนกรีตคุณภาพ</span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-200 mb-10 leading-relaxed animate-fade-in-up delay-200">
          ผู้เชี่ยวชาญด้านการผลิตและจัดส่งคอนกรีตผสมเสร็จ พร้อมบริการที่รวดเร็ว ตรงเวลา 
          รองรับทุกขนาดโครงการก่อสร้างทั่วประเทศ
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
          <Button variant="primary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            ปรึกษาโครงการฟรี <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>
            ดูบริการของเรา
          </Button>
        </div>
      </div>
    </header>
  );

  // --- Features Component ---
  const Features = () => (
    <section id="standards" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          subtitle="Why Choose Us" 
          title="มาตรฐานที่คุณวางใจ" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Truck,
              title: "จัดส่งตรงเวลา",
              desc: "ระบบ GPS Tracking ติดตามสถานะรถโม่ปูนแบบ Real-time บริหารเวลาหน้างานได้แม่นยำ"
            },
            {
              icon: CheckCircle2,
              title: "คุณภาพมาตรฐานสากล",
              desc: "QC ทุกขั้นตอนการผลิต ทดสอบ Slump และเก็บตัวอย่างทดสอบกำลังอัดสม่ำเสมอ"
            },
            {
              icon: HardHat,
              title: "วิศวกรดูแลใกล้ชิด",
              desc: "บริการให้คำปรึกษาด้านเทคนิคและแก้ปัญหาหน้างานโดยทีมวิศวกรประสบการณ์สูง"
            }
          ].map((feature, idx) => (
            <div key={idx} className="group p-8 rounded-2xl border border-slate-100 hover:border-blue-100 bg-white hover:bg-blue-50/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // --- Services Component ---
  const Services = () => (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          subtitle="Our Services" 
          title="บริการและผลิตภัณฑ์" 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "คอนกรีตผสมเสร็จทั่วไป",
              desc: "สำหรับงานเทพื้น เสา คาน บ้านพักอาศัย (180-240 ksc)",
              img: "https://images.unsplash.com/photo-1621146027714-e8921770f8d0?q=80&w=1000&auto=format&fit=crop"
            },
            {
              title: "คอนกรีตกำลังอัดสูง",
              desc: "สำหรับอาคารสูง สะพาน งานโครงสร้างพิเศษ (300+ ksc)",
              img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop"
            },
            {
              title: "บริการรถปั๊มคอนกรีต",
              desc: "ปั๊มบูมและปั๊มลาก เพื่อการทำงานในที่สูงหรือเข้าถึงยาก",
              img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop"
            }
          ].map((service, idx) => (
            <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 mb-4 flex-1">{service.desc}</p>
                <a href="#contact" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                  สอบถามราคา <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // --- Contact Form Component (Heuristic #5: Error Prevention & #9: Help users recover) ---
  const ContactForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    // Validation Logic
    const validate = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = "กรุณาระบุชื่อผู้ติดต่อ";
      if (!formData.email.trim()) {
        newErrors.email = "กรุณาระบุอีเมล";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
      }
      // Thai Phone Regex (10 digits starting with 0)
      if (!formData.phone.trim()) {
        newErrors.phone = "กรุณาระบุเบอร์โทรศัพท์";
      } else if (!/^0\d{9}$/.test(formData.phone.replace(/-/g, ''))) {
        newErrors.phone = "กรุณาระบุเบอร์มือถือให้ถูกต้อง (10 หลัก)";
      }
      
      return newErrors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validate();
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        // Shake effect or focus logic could go here
        return;
      }

      setErrors({});
      setStatus('loading');

      try {
        // Simulate API Call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } catch (error) {
        setStatus('error');
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      // Clear error when user starts typing (Heuristic #1: Immediate feedback)
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    };

    return (
      <section id="contact" className="py-24 bg-blue-900 relative overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Contact Info */}
            <div className="text-white space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">พร้อมเริ่มโครงการของคุณ?</h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  ทีมงานของเราพร้อมให้คำปรึกษาและประเมินราคาฟรี กรอกข้อมูลด้านขวาหรือติดต่อเราผ่านช่องทางด้านล่าง
                </p>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: Phone, label: "โทรศัพท์", value: "02-123-4567", sub: "ฝ่ายขาย (จ-ส 8:00-17:00)" },
                  { icon: Mail, label: "อีเมล", value: "sales@thaiconcrete.co.th", sub: "ตอบกลับภายใน 24 ชม." },
                  { icon: MapPin, label: "ที่ตั้งโรงงาน", value: "123 ถ.บางนา-ตราด กม.15", sub: "จ.สมุทรปราการ 10540" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                    <item.icon className="h-6 w-6 text-blue-300 mt-1" />
                    <div>
                      <p className="text-sm text-blue-200 mb-1">{item.label}</p>
                      <p className="text-lg font-semibold">{item.value}</p>
                      <p className="text-sm text-white/60">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">ขอใบเสนอราคา</h3>
              
              {status === 'success' ? (
                <div className="bg-green-50 border border-green-100 rounded-xl p-8 text-center animate-fade-in">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">ส่งข้อมูลเรียบร้อย</h4>
                  <p className="text-green-600 mb-6">เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชั่วโมงครับ</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-sm font-medium text-green-700 hover:text-green-800 underline"
                  >
                    ส่งข้อมูลเพิ่มเติม
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">
                      ชื่อ-นามสกุล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-50 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                        errors.name 
                          ? 'border-red-300 focus:ring-red-200 bg-red-50' 
                          : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'
                      }`}
                      placeholder="คุณสมชาย ใจดี"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1">
                        เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                          errors.phone 
                            ? 'border-red-300 focus:ring-red-200 bg-red-50' 
                            : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'
                        }`}
                        placeholder="08x-xxx-xxxx"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
                        อีเมล <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-slate-50 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                          errors.email 
                            ? 'border-red-300 focus:ring-red-200 bg-red-50' 
                            : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'
                        }`}
                        placeholder="example@email.com"
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1">
                      รายละเอียดเพิ่มเติม
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 focus:outline-none transition-all resize-none"
                      placeholder="ระบุสถานที่จัดส่ง, ปริมาณคอนกรีต, หรือข้อสงสัยอื่นๆ..."
                    ></textarea>
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full"
                    isLoading={status === 'loading'}
                  >
                    ขอใบเสนอราคาฟรี
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // --- Footer Component ---
  const Footer = () => (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 text-white mb-6">
              <Building2 className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-2xl tracking-tight">S.V. CONCRETE</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              มุ่งมั่นยกระดับมาตรฐานงานก่อสร้างไทย ด้วยคอนกรีตคุณภาพสูง และบริการที่ใส่ใจในทุกรายละเอียด เพื่อความสำเร็จที่ยั่งยืน
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300" aria-label="Social Media Link">
                  <Icon className="h-5 w-5"/>
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">เมนูลัด</h4>
            <ul className="space-y-3 text-sm">
              {['หน้าแรก', 'บริการทั้งหมด', 'มาตรฐานการผลิต', 'ติดต่อเรา'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">ติดต่อเรา</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>123 ถ.บางนา-ตราด กม.15<br/>จ.สมุทรปราการ 10540</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>02-123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span>sales@thaiconcrete.co.th</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">กฎหมาย & ความเป็นส่วนตัว</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ข้อกำหนดการใช้งาน</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} S.V. CONCRETE Factory Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      <Navigation />
      
      <main>
        <Hero />
        <Features />
        <Services />
        <ContactForm />
      </main>

      <Footer />

      {/* Back to Top Button (Heuristic #7: Flexibility) */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 z-40 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default App;