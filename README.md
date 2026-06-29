This README is designed to provide a professional overview of your project, the design thinking behind it, and the technical architecture you implemented. You can copy and paste this directly into a README.md file in your GitHub repository.

Apparel Production Capacity Planner
1. Overview
This project is a prototype Capacity Planning tool designed to help apparel factories manage their 4-week production horizon. The application identifies "bottlenecks" by comparing scheduled order volume against production line capacity across four key departments: Cut, Sew, Finish, and Pack.

2. Design Thinking Case Study
The Problem
Apparel factories frequently rely on manual spreadsheets to track production loads. This leads to "Blind Spot Bottlenecks," where orders are accepted without realizing a specific department (like Finishing) is already at maximum capacity, resulting in missed shipment deadlines.

The Solution: 3-Step Production Flow
Define Capacity: Establishing baseline daily output limits per production line.

Order Input: Capturing style-specific data, including total units and categories.

Dynamic Visualization: A 4-week "Heatmap" that automatically calculates current load vs. capacity, flagging lines as "FULL" or "AVAILABLE" in real-time.

3. Architecture & Tech Stack
Frontend
Next.js (App Router): Chosen for its speed and developer experience.

React State: Manages the interactive "Order Input" form and the real-time calculation of capacity load.

Tailwind CSS: Used for rapid UI prototyping to create an intuitive "Heatmap" visual indicator.

Backend & Database
Supabase (PostgreSQL): A relational database used to store persistent data.

Row Level Security (RLS): Implemented to ensure secure, controlled data access.

Constraint-Based Scheduling: The application logic aggregates orders by dept_id and week_number to dynamically compare against pre-defined daily limits.

4. Implementation Steps
Schema Design: Created relational tables (departments, capacities, orders) to link output limits to production lines.

Data Integration: Integrated the Supabase client into the Next.js app to enable live read/write operations.

Bottleneck Logic: Developed a calculation engine that aggregates units scheduled per week and applies color-coded conditional formatting (Red = Over Capacity, Green = Available).

Deployment: Deployed the application to Vercel for live access.

5. Live Prototype
Live URL: factoryplanner-seven.vercel.app

Repository: https://github.com/swetasahoo29/factoryplanner

How to use this file:
Go to your GitHub repository.

Click "Add file" > "Create new file".

Name it README.md.

Paste the content above into the text box.

Replace the bracketed items (e.g., [Insert your Vercel URL here]) with your actual links.

Scroll down and click "Commit changes".