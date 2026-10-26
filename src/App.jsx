import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import BloomOrDoom from "./pages/BloomOrDoom";
import NudgeAI from "./pages/NudgeAI";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/case-studies/bloom-or-doom" element={<BloomOrDoom />} />
      <Route path="/case-studies/nudge-ai" element={<NudgeAI />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
