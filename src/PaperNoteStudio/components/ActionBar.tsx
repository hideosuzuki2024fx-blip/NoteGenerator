import React from "react";
import { Button } from "@/components/ui/button";

export function ActionBar({ handleAIResponse, handleSave, isLoading }) {
  return (
    <div className="flex gap-3">
      <Button onClick={handleAIResponse} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
        🤖 AI生成
      </Button>
      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
        💾 保存
      </Button>
    </div>
  );
}
