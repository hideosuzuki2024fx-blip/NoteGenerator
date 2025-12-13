import React, { useState } from "react";
import ChatToNoteStudio from "./studios/ChatToNoteStudio";
import NoteArticleStudio from "./studios/NoteArticleStudio";
import PaperNoteStudio from "./PaperNoteStudio/PaperNoteStudio";
import { motion, AnimatePresence } from "framer-motion";

export default function StudioLauncher() {
  const [active, setActive] = useState("");

  const studios = [
    { id: "chat", label: "💬 Chat → Note Studio", comp: <ChatToNoteStudio /> },
    { id: "article", label: "📰 Note Article Studio", comp: <NoteArticleStudio /> },
    { id: "paper", label: "🪶 Paper Note Studio", comp: <PaperNoteStudio /> },
  ];

  const currentStudio = studios.find((s) => s.id === active);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎛️ Note Generator Studio Launcher
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {studios.map((studio) => (
            <motion.button
              key={studio.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActive(studio.id)}
              className={`p-4 rounded-2xl shadow bg-white hover:bg-gray-50 border text-left transition-colors ${
                active === studio.id ? "border-blue-500" : "border-gray-200"
              }`}
            >
              <div className="text-lg font-semibold">{studio.label}</div>
              <div className="text-gray-500 text-sm mt-1">
                {studio.id === "chat"
                  ? "チャットベースのNote生成"
                  : studio.id === "article"
                  ? "記事本文の編集・保存"
                  : "汎用ノートエディタ"}
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {currentStudio?.comp}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 mt-20"
              >
                <p>スタジオを選択してください。</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
