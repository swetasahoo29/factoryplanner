'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function FactoryPlanner() {
  const [data, setData] = useState<any[]>([]);
  const [formData, setFormData] = useState({ style_name: '', category: '', units: 0, week: 1, dept: 'cut' });

  async function loadData() {
    const { data: caps } = await supabase.from("capacities").select("*, departments(name)");
    const { data: ords } = await supabase.from("orders").select("*");
    
    const matrix = caps?.map((cap) => {
      const row: any = { dept: cap.departments.name, dept_id: cap.dept_id, limit: cap.daily_limit * 5 };
      [1, 2, 3, 4].forEach(w => {
        row[`week${w}`] = ords?.filter(o => o.dept_id === cap.dept_id && o.week_number === w)
                               .reduce((sum, o) => sum + (Number(o.units) || 0), 0);
      });
      return row;
    });
    setData(matrix || []);
  }

  async function addOrder() {
    await supabase.from('orders').insert({
      style_name: formData.style_name,
      apparel_category: formData.category,
      units: formData.units,
      week_number: formData.week,
      dept_id: formData.dept
    });
    loadData(); // Refresh grid
  }

  useEffect(() => { loadData(); }, []);

  return (
    <div className="p-8 space-y-8">
      {/* 1. & 2. Order Input Form */}
      <div className="bg-gray-100 p-6 rounded border">
        <h2 className="text-xl font-bold mb-4">Add Production Order</h2>
        <div className="grid grid-cols-5 gap-4">
          <input placeholder="Style Name" className="border p-2" onChange={e => setFormData({...formData, style_name: e.target.value})} />
          <input placeholder="Apparel Category" className="border p-2" onChange={e => setFormData({...formData, category: e.target.value})} />
          <input type="number" placeholder="Units" className="border p-2" onChange={e => setFormData({...formData, units: parseInt(e.target.value)})} />
          <select className="border p-2" onChange={e => setFormData({...formData, dept: e.target.value})}>
            <option value="cut">Cut</option><option value="sew">Sew</option>
            <option value="finish">Finish</option><option value="pack">Pack</option>
          </select>
          <button onClick={addOrder} className="bg-blue-600 text-white p-2 rounded">Assign to Line</button>
        </div>
      </div>

      {/* 3. Visualization Heatmap */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200"><th className="border p-3">Dept</th>{[1,2,3,4].map(w => <th key={w} className="border p-3">Week {w}</th>)}</tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.dept_id}>
              <td className="border p-3 font-semibold">{d.dept}</td>
              {[1,2,3,4].map(w => {
                const isFull = d[`week${w}`] >= d.limit;
                return (
                  <td key={w} className={`border p-3 ${isFull ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                    {isFull ? "FULL" : "AVAILABLE"} ({d[`week${w}`] || 0} / {d.limit})
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}