import { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const departments = [
  { id: 'marketing', name: 'Marketing & Sponsorship' },
  { id: 'events', name: 'Events & Planning' },
  { id: 'registration', name: 'Registration' },
  { id: 'media', name: 'Media & PR' },
  { id: 'tv', name: 'TV Team' },
  { id: 'sports', name: 'Sports' },
  { id: 'creative', name: 'Creative & Design' },
  { id: 'development', name: 'Web & App Development' },
];

const LOCAL_KEY = 'teamMembersOverrides';

export default function TeamEditor() {
  const [members, setMembers] = useState([]);
  const [bulkText, setBulkText] = useState('');
  const [perPage, setPerPage] = useState(() => {
    try { return JSON.parse(localStorage.getItem('teamMembersPerPage') || '{}'); } catch { return {}; }
  });
  const [form, setForm] = useState({
    id: '',
    name: '',
    role: '',
    departmentId: 'marketing',
    department: 'Marketing & Sponsorship',
    image: '',
    linkedin: '',
    instagram: '',
    email: '',
    phone: '',
    skills: '',
    status: 'active',
  });

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]');
      setMembers(stored);
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('teamMembersPerPage', JSON.stringify(perPage)); } catch {}
  }, [perPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleDeptChange = (e) => {
    const id = e.target.value;
    const dep = departments.find(d => d.id === id);
    setForm((f) => ({ ...f, departmentId: id, department: dep?.name || '' }));
  };

  const addMember = () => {
    if (!form.name.trim()) return alert('Name required');
    const id = form.id?.trim() || String(Date.now());
    const skills = form.skills
      ? form.skills.split(',').map(s => s.trim()).filter(Boolean)
      : [];
    const newMember = { ...form, id, skills };
    setMembers((prev) => {
      const next = [...prev.filter(m => m.id !== id), newMember];
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
      return next;
    });
    setForm({
      id: '', name: '', role: '', departmentId: 'marketing', department: 'Marketing & Sponsorship',
      image: '', linkedin: '', instagram: '', email: '', phone: '', skills: '', status: 'active'
    });
  };

  const removeMember = (id) => {
    setMembers((prev) => {
      const next = prev.filter(m => m.id !== id);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
      return next;
    });
  };

  const parseBulk = () => {
    if (!bulkText.trim()) return;
    const lines = bulkText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const next = [...members];
    for (const line of lines) {
      // Expected CSV: id, name, departmentId, department, image
      const parts = line.split(',').map(p => p.trim());
      if (parts.length < 5) continue;
      const [id, name, departmentId, department, image] = parts;
      const existingIdx = next.findIndex(m => m.id === id);
      const newMember = { id, name, departmentId, department, image, role: '', skills: [], status: 'active' };
      if (existingIdx >= 0) next[existingIdx] = newMember; else next.push(newMember);
    }
    setMembers(next);
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(next)); } catch {}
    setBulkText('');
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(members, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'team-members.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 px-4 md:px-8 pb-20 max-w-6xl w-full mx-auto">
        <h1 className="text-3xl font-imperial font-bold mb-6">Team Editor</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-neutral-900 border border-neutral-700 rounded-lg p-4 space-y-3">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1">Role</label>
              <input name="role" value={form.role} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1">Department</label>
              <select value={form.departmentId} onChange={handleDeptChange} className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2">
                {departments.map(d => (<option key={d.id} value={d.id}>{d.name}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">LinkedIn URL</label>
                <input name="linkedin" value={form.linkedin} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">Instagram URL</label>
                <input name="instagram" value={form.instagram} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Skills (comma separated)</label>
              <input name="skills" value={form.skills} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2" />
            </div>
            <button onClick={addMember} className="mt-2 px-4 py-2 rounded bg-yellow-500 text-black font-semibold">Add / Update Member</button>
            <button onClick={downloadJson} className="mt-2 ml-2 px-4 py-2 rounded bg-neutral-800 border border-neutral-600">Download JSON</button>

            <div className="mt-4">
              <div className="text-sm font-semibold mb-2">Quick Add (CSV per line)</div>
              <div className="text-xs opacity-70 mb-1">Format: id, name, departmentId, department, imageURL</div>
              <textarea value={bulkText} onChange={e => setBulkText(e.target.value)} rows={6} className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2"></textarea>
              <button onClick={parseBulk} className="mt-2 px-3 py-2 rounded bg-neutral-700">Add Lines</button>
            </div>
          </div>

          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-700 rounded-lg p-4">
            <h2 className="text-xl font-imperial font-semibold mb-3">Preview ({members.length})</h2>
            <div className="space-y-2 max-h-[50vh] overflow-auto pr-2">
              {members.map((m) => (
                <div key={m.id} className="flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-sm">
                  <div className="truncate">
                    <span className="font-semibold">{m.name}</span> — {m.role} — <span className="opacity-80">{m.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setForm({ ...m, skills: (m.skills||[]).join(', ') })} className="px-2 py-1 rounded bg-neutral-700">Edit</button>
                    <button onClick={() => removeMember(m.id)} className="px-2 py-1 rounded bg-red-600">Remove</button>
                  </div>
                </div>
              ))}
              {members.length === 0 && (
                <div className="opacity-70">No members yet. Add one from the form.</div>
              )}
            </div>

            <div className="mt-6 border-t border-neutral-800 pt-4">
              <h3 className="text-lg font-semibold mb-3">Items per page (max 6)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {departments.map(d => (
                  <div key={d.id} className="flex items-center justify-between bg-neutral-800 border border-neutral-700 rounded px-3 py-2">
                    <div className="text-sm">{d.name}</div>
                    <input type="number" min={1} max={6} value={perPage[d.id] ?? ''} onChange={e => {
                      const val = Math.max(1, Math.min(6, Number(e.target.value || 0)));
                      setPerPage(prev => ({ ...prev, [d.id]: val }));
                    }} className="w-16 bg-neutral-900 border border-neutral-700 rounded px-2 py-1 text-right" />
                  </div>
                ))}
              </div>
              <div className="text-xs opacity-70 mt-2">If empty, defaults to 6 on desktop (2x3) and 4 on mobile.</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


