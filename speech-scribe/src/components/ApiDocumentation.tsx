
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Globe, Database } from "lucide-react";

const ApiDocumentation = () => {
  const curlExample = `curl -X POST https://cmarnell.app.n8n.cloud/webhook-test/testai \\
  -H "Content-Type: multipart/form-data" \\
  -F "video=@your-video-file.webm" \\
  -F "session_id=550e8400-e29b-41d4-a716-446655440000"`;

  const responseExample = `{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "success",
  "message": "Video received and analysis initiated"
}`;

  const resultsApiExample = `curl -X POST https://your-supabase-url.supabase.co/rest/v1/speech_analyses \\
  -H "Content-Type: application/json" \\
  -H "apikey: your-supabase-anon-key" \\
  -d '{
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "filler_words": "Analysis of filler words usage...",
    "rhythm": "Speech rhythm and pacing analysis...",
    "body_language": "Body language and gestures analysis...",
    "status": "completed"
  }'`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            API Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            The Speech Analysis API allows you to submit video files for analysis of speech patterns, 
            including filler words, rhythm, and body language. The API uses a webhook-based approach 
            for processing videos asynchronously.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Base URL</h4>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                https://cmarnell.app.n8n.cloud/webhook-test/testai
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Method</h4>
              <Badge variant="outline">POST</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Video Submission Endpoint
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Request Parameters</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Parameter</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Required</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><code>video</code></td>
                    <td className="border border-gray-300 px-4 py-2">File</td>
                    <td className="border border-gray-300 px-4 py-2">Yes</td>
                    <td className="border border-gray-300 px-4 py-2">Video file (WebM, MP4, etc.)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><code>session_id</code></td>
                    <td className="border border-gray-300 px-4 py-2">String</td>
                    <td className="border border-gray-300 px-4 py-2">Yes</td>
                    <td className="border border-gray-300 px-4 py-2">Unique UUID for tracking analysis</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example cURL Request</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm whitespace-pre-wrap">{curlExample}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Response</h4>
            <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">{responseExample}</pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Results Submission (For External Services)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            After processing, external services can submit analysis results to our database using this endpoint:
          </p>
          
          <div>
            <h4 className="font-semibold mb-2">Database Schema</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Field</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><code>session_id</code></td>
                    <td className="border border-gray-300 px-4 py-2">UUID</td>
                    <td className="border border-gray-300 px-4 py-2">Unique identifier for the analysis session</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><code>filler_words</code></td>
                    <td className="border border-gray-300 px-4 py-2">Text</td>
                    <td className="border border-gray-300 px-4 py-2">Analysis of filler words usage</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><code>rhythm</code></td>
                    <td className="border border-gray-300 px-4 py-2">Text</td>
                    <td className="border border-gray-300 px-4 py-2">Speech rhythm and pacing analysis</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><code>body_language</code></td>
                    <td className="border border-gray-300 px-4 py-2">Text</td>
                    <td className="border border-gray-300 px-4 py-2">Body language and gestures analysis</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2"><code>status</code></td>
                    <td className="border border-gray-300 px-4 py-2">String</td>
                    <td className="border border-gray-300 px-4 py-2">Analysis status (pending, completed, failed)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Example Results Submission</h4>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm whitespace-pre-wrap">{resultsApiExample}</pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integration Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>User records video on the website</li>
            <li>Video is sent to the webhook endpoint with a unique session_id</li>
            <li>External service processes the video and analyzes speech patterns</li>
            <li>Results are submitted back to our database using the session_id</li>
            <li>User is redirected to results page showing the analysis</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiDocumentation;
