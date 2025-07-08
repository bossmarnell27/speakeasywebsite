
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoRecorder from "@/components/VideoRecorder";
import ApiDocumentation from "@/components/ApiDocumentation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Speech Analysis Tool
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Record your speech and get instant analysis of filler words, rhythm, and body language
          </p>
        </div>

        <Tabs defaultValue="recorder" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="recorder">Record & Analyze</TabsTrigger>
            <TabsTrigger value="documentation">API Documentation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recorder" className="space-y-6">
            <VideoRecorder />
          </TabsContent>
          
          <TabsContent value="documentation">
            <ApiDocumentation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
