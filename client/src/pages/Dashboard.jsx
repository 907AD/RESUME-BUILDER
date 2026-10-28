import {
  FilePenLineIcon,
  PencilIcon,
  PlugIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const navigate = useNavigate()

  const userName = JSON.parse(localStorage.getItem('user') || '{}')?.name || 'User'

  const loadAllResumes = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    try {
      const response = await fetch('/api/users/resumes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to load resumes')
      }

      setAllResumes(result.resumes || [])
    } catch (error) {
      alert(error.message || 'Unable to load resumes')
    }
  }

  const createResume = async (event) => {
    event.preventDefault()

    const token = localStorage.getItem('token')

    try {
      const response = await fetch('/api/resumes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: title || 'Untitled Resume' }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to create resume')
      }

      setShowCreateResume(false)
      setTitle('')
      navigate(`/app/builder/${result.resume._id}`)
    } catch (error) {
      alert(error.message || 'Unable to create resume')
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault()

    if (!resume) {
      alert('Please choose a file')
      return
    }

    const token = localStorage.getItem('token')
    const uploadedTitle = resume.name ? resume.name.replace(/\.[^/.]+$/, '') : 'Uploaded Resume'

    try {
      const response = await fetch('/api/resumes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title || uploadedTitle,
          template: 'classic',
          accent_color: '#2563eb',
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to create resume from upload')
      }

      setShowUploadResume(false)
      setTitle('')
      setResume(null)
      navigate(`/app/builder/${result.resume._id}`)
    } catch (error) {
      alert(error.message || 'Unable to create resume from upload')
    }
  }

  const editTitle = async (event) => {
    event.preventDefault()

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/resumes/update/${editResumeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update title')
      }

      setAllResumes((prev) =>
        prev.map((item) =>
          item._id === editResumeId ? { ...item, title, updatedAt: new Date().toISOString() } : item
        )
      )
      setEditResumeId('')
      setTitle('')
    } catch (error) {
      alert(error.message || 'Unable to update title')
    }
  }

  const handleDelete = async (e, resumeId) => {
    e.stopPropagation()

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/resumes/delete/${resumeId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete resume')
      }

      setAllResumes((prev) => prev.filter((item) => item._id !== resumeId))
    } catch (error) {
      alert(error.message || 'Unable to delete resume')
    }
  }

  const handleEdit = (e, resumeItem) => {
    e.stopPropagation()
    setEditResumeId(resumeItem._id)
    setTitle(resumeItem.title)
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, {userName}
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlugIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />

            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-purple-500 text-white rounded-full" />

            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        {/* Resume cards */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4">
          {allResumes.map((resumeItem, index) => {
            const baseColor = colors[index % colors.length]

            return (
              <div
                key={resumeItem._id || index}
                onClick={() => navigate(`/app/builder/${resumeItem._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}40)`,
                  borderColor: `${baseColor}40`,
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />

                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resumeItem.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: `${baseColor}90` }}
                >
                  Updated on{' '}
                  {new Date(resumeItem.updatedAt || Date.now()).toLocaleDateString()}
                </p>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden"
                >
                  <TrashIcon
                    onClick={(e) => handleDelete(e, resumeItem._id)}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors cursor-pointer"
                  />

                  <PencilIcon
                    onClick={(e) => handleEdit(e, resumeItem)}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors cursor-pointer"
                  />
                </div>
              </div>
            )
          })}
        </div>

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create Resume</h2>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border border-slate-300 rounded focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors cursor-pointer"
              >
                Create Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false)
                  setTitle('')
                }}
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border border-slate-300 rounded focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                required
              />
              <div>
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700"
                >
                  Select Resume File
                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                    {resume ? (
                      <p className="text-green-700 font-medium">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p>Upload Resume</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  id="resume-input"
                  type="file"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors cursor-pointer"
              >
                Upload Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false)
                  setTitle('')
                  setResume(null)
                }}
              />
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => {
              setEditResumeId('')
              setTitle('')
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border border-slate-300 rounded focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors cursor-pointer"
              >
                Update
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId('')
                  setTitle('')
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Dashboard