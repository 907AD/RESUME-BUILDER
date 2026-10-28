import { Briefcase, Plus, Sparkles, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

const ExperienceForm = ({ data = [], onChange }) => {
  const [loadingIndex, setLoadingIndex] = useState(null)

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience])
  }

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated)
  }

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const handleAiEnhance = async (index, experience) => {
    try {
      setLoadingIndex(index)

      const response = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: {
            professional_summary: experience.description || '',
            personal_info: {
              full_name: '',
              profession: experience.position || '',
              location: '',
            },
            experience: [experience],
            skills: [],
          },
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'AI generation failed')
      }

      const generatedText = result.summary || ''
      updateExperience(index, 'description', generatedText)
    } catch (error) {
      alert(error.message || 'Unable to generate description')
    } finally {
      setLoadingIndex(null)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Experience</h3>
          <p className='text-sm text-gray-500'>Add your job Experience</p>
        </div>
        <button type="button" onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-300 transition-colors cursor-pointer'>
          <Plus className='size-4' />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className='text-center py-8 text-gray-500'>
          <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
          <p>No work experience added yet.</p>
          <p className='text-sm'>Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {data.map((experience, index) => (
            <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3 bg-white shadow-sm'>
              <div className='flex justify-between items-start'>
                <h4 className='font-medium text-gray-800'>Experience #{index + 1}</h4>
                <button type="button" onClick={() => removeExperience(index)} className='text-red-500 hover:text-red-700 cursor-pointer'>
                  <Trash2 className='size-4' />
                </button>
              </div>

              <div className='grid md:grid-cols-2 gap-3'>
                <input
                  value={experience.company || ""}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  type="text"
                  placeholder='Company Name'
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                />

                <input
                  value={experience.position || ""}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  type="text"
                  placeholder='Job Title'
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                />

                <input
                  value={experience.start_date || ""}
                  onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                  type="month"
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                />

                <input
                  value={experience.end_date || ""}
                  onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                  type="month"
                  disabled={experience.is_current}
                  className='w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-100'
                />
              </div>

              <label className='flex items-center gap-2 cursor-pointer pt-1'>
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 size-4"
                />
                <span className='text-sm text-gray-700'>Currently Working here</span>
              </label>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium text-gray-700'>Job Description</label>
                  <button
                    type="button"
                    onClick={() => handleAiEnhance(index, experience)}
                    disabled={loadingIndex === index}
                    className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 cursor-pointer'
                  >
                    <Sparkles className="w-3 h-3" />
                    {loadingIndex === index ? 'Generating...' : 'Enhance with AI'}
                  </button>
                </div>

                <textarea
                  value={experience.description || ""}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  rows={4}
                  className='w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none'
                  placeholder='Describe your key responsibilities and achievements....'
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceForm