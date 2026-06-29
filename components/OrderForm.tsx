'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function OrderForm() {
  const [units, setUnits] = useState('');
  const [dept, setDept] = useState('cut');

  const addOrder = async () => {
    await supabase.from('orders').insert({ 
      style_name: 'New Style', 
      dept_id: dept, 
      units: parseInt(units), 
      week_number: 1 
    });
    window.location.reload(); // Simple refresh to update table
  };

  return (
    <div className="p-5 bg-gray-50 mb-5 border rounded">
      <h2 className="font-bold">Add Order</h2>
      <input type="number" placeholder="Units" onChange={(e) => setUnits(e.target.value)} className="border p-1 mr-2" />
      <select onChange={(e) => setDept(e.target.value)} className="border p-1">
        <option value="cut">Cut</option>
        <option value="sew">Sew</option>
        <option value="finish">Finish</option>
        <option value="pack">Pack</option>
      </select>
      <button onClick={addOrder} className="ml-2 bg-blue-500 text-white p-1 rounded">Assign</button>
    </div>
  );
}