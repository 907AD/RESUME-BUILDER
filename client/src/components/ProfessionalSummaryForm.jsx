// import { Sparkles } from 'lucide-react'
// import React from 'react'

// const ProfessionalSummaryForm = ({ data, onChange }) => {
//   return (
//     <div className='space-y-4 w-full overflow-hidden'>
//       <div className='flex items-center justify-between'>
//          <div>
//             <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
//             <p className='text-sm text-gray-500'>Add summary for your resume here</p>
//          </div>
//          <button type="button" className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 cursor-pointer'>
//            <Sparkles className='size-4'/>
//            AI Enhance
//          </button>
//       </div>
//       <div className='mt-6 w-full'>
//         <textarea 
//           value={data || ""} 
//           onChange={(e) => onChange(e.target.value)} 
//           rows={7} 
//           className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none box-border' 
//           placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...'
//         />
//         <p className='text-xs text-gray-500 max-w-[80%] mx-auto text-center mt-2'>Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
//       </div> 
//     </div>
//   )
// }

// export default ProfessionalSummaryForm



import { Sparkles } from 'lucide-react';
import React, { useState } from 'react';

const ProfessionalSummaryForm = ({ data, onChange }) => {
  const [loading, setLoading] = useState(false);

  const handleAiEnhance = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: {
            professional_summary: data || '',
            personal_info: {
              full_name: data?.full_name || '',
              profession: data?.profession || '',
              location: data?.location || '',
            },
            experience: [],
            skills: [],
          },
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to generate summary');
      }

      onChange(result.summary || '');
    } catch (error) {
      alert(error.message || 'Unable to generate summary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-full box-border space-y-4'>
      <div className='flex items-center justify-between flex-wrap gap-2'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
          <p className='text-sm text-gray-500'>Add summary for your resume here</p>
        </div>
        <button
          type="button"
          onClick={handleAiEnhance}
          disabled={loading}
          className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 cursor-pointer shrink-0'
        >
          <Sparkles className='size-4' />
          {loading ? 'Generating...' : 'AI Enhance'}
        </button>
      </div>

      <div className='mt-6 w-full max-w-full box-border'>
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className='w-full max-w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none box-border block'
          style={{ width: '100%', maxWidth: '100%' }}
          placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...'
        />
        <p className='text-xs text-gray-500 w-full max-w-full mx-auto text-center mt-2 box-border'>
          Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;