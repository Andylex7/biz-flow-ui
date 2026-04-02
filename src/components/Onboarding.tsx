import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, UserPlus, CheckCircle2, ArrowRight, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    adminName: '',
    email: '',
    password: '',
  });

  const nextStep = () => {
    if (step === 3) {
      toast.success('Account created successfully!');
      onComplete();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-indigo-600 p-12 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <Building2 size={32} />
            <span className="text-2xl font-bold">BizFlow</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            The all-in-one platform to scale your business operations.
          </h1>
          <p className="mt-6 text-indigo-100 text-lg max-w-md">
            Manage employees, inventory, payroll, and branches from a single, intuitive dashboard.
          </p>
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-500 rounded-lg"><CheckCircle2 size={20} /></div>
            <p className="font-medium">Free for up to 3 branches</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-500 rounded-lg"><CheckCircle2 size={20} /></div>
            <p className="font-medium">Real-time inventory tracking</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-500 rounded-lg"><CheckCircle2 size={20} /></div>
            <p className="font-medium">Automated payroll reports</p>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-800 rounded-full -ml-48 -mb-48" />
      </div>

      <div className="md:w-1/2 p-8 md:p-24 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="space-y-2">
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-indigo-600' : 'bg-slate-100'}`} />
              ))}
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mt-6">
              {step === 1 && "Create your account"}
              {step === 2 && "Tell us about your business"}
              {step === 3 && "Setup your branch"}
            </h2>
            <p className="text-slate-500">
              {step === 1 && "Start your 14-day free trial today."}
              {step === 2 && "We'll customize your experience."}
              {step === 3 && "You can add more branches later."}
            </p>
          </div>

          <div className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your name"
                      value={formData.adminName}
                      onChange={(e) => setFormData({...formData, adminName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input 
                    type="email"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Business Name</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Acme Corp"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Industry</label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  >
                    <option value="">Select industry</option>
                    <option value="retail">Retail</option>
                    <option value="tech">Technology</option>
                    <option value="service">Services</option>
                  </select>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm">
                  <Building2 size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Main Headquarters</h4>
                  <p className="text-sm text-slate-500">Your first branch is ready for setup.</p>
                </div>
              </div>
            )}

            <button 
              onClick={nextStep}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 mt-8"
            >
              {step === 3 ? "Complete Setup" : "Continue"}
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;