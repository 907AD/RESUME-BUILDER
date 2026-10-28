// import React from 'react'
// import { LinkIcon, User} from 'lucide-react'

// const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {

//   const handleChange = (field, value) => {
//       onChange({ ...data, [field]: value })
//   }

//   const fields = [
//     { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
//     { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
//     { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
//     { key: "location", label: "Location", icon: MapPin, type: "text" },
//     { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
//     { key: "linkedin", label: "LinkedIn Profile", icon: LinkIcon, type: "url" },
//     { key: "website", label: "Personal Website", icon: Globe, type: "url" },
//   ]

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     handleChange(name, value)
//   }

//   // Safe image preview helper
//   const getImageSrc = (image) => {
//     if (!image) return null
//     if (typeof image === 'string') return image
//     if (image instanceof File || image instanceof Blob) {
//       try {
//         return URL.createObjectURL(image)
//       } catch (err) {
//         console.error("Failed to create object URL:", err)
//         return null
//       }
//     }
//     return null
//   }

//   const imagePreview = getImageSrc(data?.image)

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
//         <p className="text-sm text-gray-600">Get started with your personal details.</p>
//       </div>

//       {/* Profile Image Section */}
//       <div className="flex items-center gap-2">
//         <label htmlFor="profile-upload" className="relative cursor-pointer group">
//           {data.image ? (
//             <img 
//             src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} 
//             alt="user-image" 
//             className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
//           />
//           ) : (
//             <div className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-700 cursor-pointer">
//               <User className="size-10 p-2.5 border rounded-full" />
//               Upload user image
//             </div>
//           )}
//           <input
//             id="profile-upload"
//             type="file"
//             accept="image/jpeg, image/png"
//             className="hidden"
//             onChange={(e) => handleChange("image", e.target.files[0])}
//           />
//         </label>

//         {typeof data?.image === 'object' && (
//           <div className="flex flex-col gap-1 p1-4 text-sm">
//             <p className="text-xs text-gray-600">Remove Background</p>
//             <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
//               <input 
//                 type="checkbox" 
//                 className="sr-only peer" 
//                 onChange={() => setRemoveBackground (prev => !prev)} 
//                 checked={removeBackground}
//               />
//               <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600transition-colors duration-200"></div>
//               <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4">
//               </span>
//             </label>
//           </div>
//         )}
//       </div>

//       {field.map((field)=>{
//         const Icon = field.icon;
//         return (
//           <div key={field.key} className='space-y-1 mt-5'>
//              <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
//               <Icon className="size-4"></Icon>
//               {field.label}
//               {field.required && <span className='text-red-500'></span>}
//              </label>
//              <input type={field.type} value={data[field.key] || ""} onChange={(e) => handleChange(field.key, e.target.value)} className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm' placeholder={`Enter your ${field.lebel.toLowerCase()}`} required={field.required}></input>
//           </div>
//         )
//       })}

//     </div>
//   )
// }

// export default PersonalInfoForm;



import React, { useState } from "react";
import {
  LinkIcon,
  User,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  Globe,
} from "lucide-react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const [isRemovingBackground, setIsRemovingBackground] = useState(false);

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    {
      key: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel",
    },
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
    },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      icon: LinkIcon,
      type: "url",
    },
    {
      key: "website",
      label: "Personal Website",
      icon: Globe,
      type: "url",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const getImageSrc = (image) => {
    if (!image) return null;

    if (typeof image === "string") {
      return image;
    }

    if (image instanceof File || image instanceof Blob) {
      try {
        return URL.createObjectURL(image);
      } catch (err) {
        console.error("Failed to create object URL:", err);
        return null;
      }
    }

    return null;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    handleChange("image", file);
  };

  const handleRemoveBackground = async () => {
    if (!data?.image || !(data.image instanceof File)) {
      setRemoveBackground(false);
      return;
    }

    try {
      setIsRemovingBackground(true);
      const formData = new FormData();
      formData.append("image", data.image);

      const response = await fetch('/api/ai/remove-background', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Background removal failed');
      }

      const removedImageUrl = result.imageUrl || result.result?.url || result.result?.output_url;
      if (removedImageUrl) {
        handleChange('image', removedImageUrl);
      }
    } catch (error) {
      alert(error.message || 'Background removal failed');
    } finally {
      setIsRemovingBackground(false);
      setRemoveBackground(false);
    }
  };

  const imagePreview = getImageSrc(data?.image);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Personal Information
        </h3>

        <p className="text-sm text-gray-600">
          Get started with your personal details.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="profile-upload"
          className="relative cursor-pointer group"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="user-image"
              className="w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-700 cursor-pointer">
              <User className="size-10 p-2.5 border rounded-full" />
              Upload user image
            </div>
          )}

          <input
            id="profile-upload"
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {data?.image && (
          <div className="flex flex-col gap-1 pl-4 text-sm">
            <p className="text-xs text-gray-600">
              Remove Background
            </p>

            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => {
                  if (removeBackground) {
                    setRemoveBackground(false);
                    return;
                  }
                  handleRemoveBackground();
                }}
                checked={removeBackground}
                disabled={isRemovingBackground}
              />

              <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>

              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
            </label>
          </div>
        )}
      </div>

      {fields.map((field) => {
        const Icon = field.icon;

        return (
          <div
            key={field.key}
            className="space-y-1 mt-5"
          >
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4" />
              {field.label}
              {field.required && (
                <span className="text-red-500">*</span>
              )}
            </label>

            <input
              type={field.type}
              name={field.key}
              value={data?.[field.key] || ""}
              onChange={handleInputChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;

