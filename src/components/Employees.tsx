import React, { useState } from 'react';
import { Search, UserPlus, Filter, MoreVertical, Mail, Phone } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { toast } from 'sonner';

const Employees = () => {
  const { employees } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddEmployee = () => {
    toast.success('Opening employee registration form');
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employees</h1>
          <p className="text-slate-500">Manage your workforce across all branches.</p>
        </div>
        <button 
          onClick={handleAddEmployee}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
        >
          <UserPlus size={18} />
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-2">
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Position & Dept</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{emp.name}</p>
                        <p className="text-xs text-slate-500">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-800">{emp.position}</p>
                    <p className="text-xs text-slate-500">{emp.department}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      emp.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-600">{emp.role}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    <div className="flex gap-2">
                      <button className="p-1 hover:text-indigo-600 transition-colors"><Mail size={16} /></button>
                      <button className="p-1 hover:text-indigo-600 transition-colors"><Phone size={16} /></button>
                      <button className="p-1 hover:text-indigo-600 transition-colors"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;