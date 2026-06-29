'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabase.from('capacities').select('*, departments(name)');
      setData(data || []);
    }
    loadData();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Factory Capacity Overview</h1>
      <table className="mt-5 w-full border">
        <thead><tr className="bg-gray-200"><th className="border p-2">Dept</th><th className="border p-2">Limit</th></tr></thead>
        <tbody>{data.map(d => <tr key={d.dept_id}><td className="border p-2">{d.dept_id}</td><td className="border p-2">{d.daily_limit}</td></tr>)}</tbody>
      </table>
    </main>
  );
}