import React, { useState, useEffect, useMemo, ChangeEvent, FormEvent } from 'react';
import { 
  Briefcase, 
  PlusCircle, 
  Moon, 
  Sun, 
  Search, 
  Tags, 
  Clock, 
  Undo2, 
  Building2, 
  MapPin, 
  DollarSign, 
  Paperclip, 
  Trash2, 
  FileText, 
  UploadCloud, 
  X, 
  Save,
  Youtube
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Job, JobCategory, JobType, Resume } from './types';

const INITIAL_JOBS: Job[] = [
  { 
    id: Date.now() + 1, 
    title: "Frontend Developer", 
    company: "TechSolutions", 
    category: "Technology", 
    type: "Full-time", 
    location: "Karachi", 
    description: "Experienced React, Next.js developer. Hybrid model.", 
    salary: "$1000 - $1500", 
    date: new Date().toISOString() 
  }
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('jobPortal_theme') as 'light' | 'dark') || 'light';
  });
  const [jobs, setJobs] = useState<Job[]>(() => {
    const stored = localStorage.getItem('jobPortal_jobs');
    return stored ? JSON.parse(stored) : INITIAL_JOBS;
  });
  const [resumes, setResumes] = useState<Resume[]>(() => {
    const stored = localStorage.getItem('jobPortal_resumes');
    return stored ? JSON.parse(stored) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterCategory, setFilterCategory] = useState<JobCategory | ''>('');
  const [filterType, setFilterType] = useState<JobType | ''>('');

  const [jobForm, setJobForm] = useState({
    title: '', company: '', category: 'Technology' as JobCategory,
    type: 'Full-time' as JobType, location: '', salary: '',
    description: '', logoBase64: '', attachmentBase64: '', attachmentName: ''
  });

  const [resumeForm, setResumeForm] = useState({
    name: '', email: '', fileBase64: '', fileName: ''
  });

  useEffect(() => {
    localStorage.setItem('jobPortal_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('jobPortal_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('jobPortal_resumes', JSON.stringify(resumes));
  }, [resumes]);

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const filteredJobs = useMemo(() => {
    const keyword = searchKeyword.toLowerCase().trim();
    return jobs.filter(job => {
      const matchKeyword = !keyword || 
        job.title.toLowerCase().includes(keyword) || 
        job.company.toLowerCase().includes(keyword) || 
        job.description.toLowerCase().includes(keyword);
      const matchCat = !filterCategory || job.category === filterCategory;
      const matchType = !filterType || job.type === filterType;
      return matchKeyword && matchCat && matchType;
    });
  }, [jobs, searchKeyword, filterCategory, filterType]);

  const handlePostJob = async (e: FormEvent) => {
    e.preventDefault();
    const newJob: Job = { ...jobForm, id: Date.now(), date: new Date().toISOString() };
    setJobs([newJob, ...jobs]);
    setIsModalOpen(false);
    setJobForm({
      title: '', company: '', category: 'Technology', type: 'Full-time',
      location: '', salary: '', description: '', logoBase64: '',
      attachmentBase64: '', attachmentName: ''
    });
  };

  const handleUploadResume = async () => {
    if (!resumeForm.name || !resumeForm.email || !resumeForm.fileBase64) {
      alert("Please fill all fields."); return;
    }
    const newResume: Resume = { ...resumeForm, date: new Date().toISOString() };
    setResumes([newResume, ...resumes]);
    setResumeForm({ name: '', email: '', fileBase64: '', fileName: '' });
    alert("CV uploaded!");
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(145deg,#f0f4ff_0%,#e6ecf8_100%)] dark:bg-[linear-gradient(145deg,#0a1220_0%,#0f172a_100%)] text-[#0a2540] dark:text-[#edf2f7] font-['Inter'] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-white/85 dark:bg-[#12192d]/80 backdrop-blur-2xl rounded-[2rem] p-4 md:px-8 shadow-sm border border-black/8 dark:border-white/8 mb-8 gap-4">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#0f5e5c] to-[#2c9b8f] bg-clip-text text-transparent flex items-center gap-2">
              <Briefcase className="text-[#0f5e5c]" /> JobHub<span className="font-normal"> Elite</span>
            </h1>
            <span className="text-sm opacity-70">Premium Job Portal | Post, Search, Connect</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 items-center">
            <a 
              href="https://youtube.com/@mrbhgaming" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-[#ff4d4d] to-[#ff1a75] text-white px-5 py-2.5 rounded-full font-semibold flex items-center gap-2 shadow-lg"
            >
              <Youtube size={18} /> Mr bh gaming
            </a>
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="bg-white/50 dark:bg-white/10 border border-black/8 px-4 py-2 rounded-full font-medium flex items-center gap-2"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#0f5e5c] text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 shadow-lg"
            >
              <PlusCircle size={18} /> Post Job
            </button>
          </div>
        </header>

        {/* Filters & Jobs Grid & CV Upload (Logic remains same as previous versions) */}
        {/* ... (UI components as defined in previous App.tsx) ... */}
        
      </div>
    </div>
  );
};

export default App;
