'use client'

import Image from "next/image";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import schoolSVG from '@/public/icons/school.svg'
import analyticsSVG from '@/public/icons/analytics.svg'
import Link from "next/link";

type FormData = {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList;
};

export default function Home() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Append image file
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }
      
      // Append other form fields
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('city', data.city);
      formData.append('state', data.state);
      formData.append('contact', data.contact);
      formData.append('email_id', data.email_id);
      
      const res = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      
      if (res.ok) {
        alert('School added successfully!');
        reset(); // Clear the form
      } else {
        alert(result.message || 'Error adding school');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="max-w-7xl w-full mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Welcome Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                  Welcome to{' '}
                  <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                    SchoolSphere
                  </span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed max-w-lg drop-shadow-lg">
                  Streamline your educational institution management with our comprehensive platform. 
                  Add schools, manage data, and organize everything in one place.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/5">
                  <div className="w-16 h-16 bg-yellow-400/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-yellow-300/30">
                    <Image src={schoolSVG} alt="School Icon" width={40} height={40} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">School Management</h3>
                  <p className="text-sm text-white/80">Organize and manage school information efficiently</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/5">
                  <div className="w-16 h-16 bg-purple-400/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-purple-300/30">
                    <Image src={analyticsSVG} alt="Data Insights Icon" width={36} height={36} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Data Insights</h3>
                  <p className="text-sm text-white/80">Get valuable insights from your school data</p>
                </div>
              </div>
              <div className="mt-16">
                <Link href={`/schools`} >
                  <button className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white font-bold py-3 px-10 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-sm ">
                    Discover Schools
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Side - Enhanced Form */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                      <span className="text-yellow-400 text-4xl font-bold ">+</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Add New School</h2>
                    <p className="text-white/80">Fill in the details to register a school</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* School Name */}
                    <div>
                      <label className="block text-sm font-semibold text-white/90 mb-2">
                        School Name *
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: "School name is required" })}
                        
                        placeholder="Enter school name"
                      />
                      {errors.name && (
                        <p className="text-yellow-300 text-sm mt-1 font-medium">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-white/90 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register("email_id", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                        
                        placeholder="school@example.com"
                      />
                      {errors.email_id && (
                        <p className="text-yellow-300 text-sm mt-1 font-medium">{errors.email_id.message}</p>
                      )}
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-sm font-semibold text-white/90 mb-2">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        {...register("contact", { 
                          required: "Contact number is required",
                          pattern: {
                            value: /^[0-9]{10,15}$/,
                            message: "Enter a valid contact number"
                          }
                        })}
                        
                        placeholder="Enter contact number"
                      />
                      {errors.contact && (
                        <p className="text-yellow-300 text-sm mt-1 font-medium">{errors.contact.message}</p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-semibold text-white/90 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        {...register("address", { required: "Address is required" })}
                        
                        placeholder="Enter complete address"
                      />
                      {errors.address && (
                        <p className="text-yellow-300 text-sm mt-1 font-medium">{errors.address.message}</p>
                      )}
                    </div>

                    {/* City and State */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/90 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          {...register("city", { required: "City is required" })}
                          
                          placeholder="City"
                        />
                        {errors.city && (
                          <p className="text-yellow-300 text-sm mt-1 font-medium">{errors.city.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-white/90 mb-2">
                          State *
                        </label>
                        <input
                          type="text"
                          {...register("state", { required: "State is required" })}
                          
                          placeholder="State"
                        />
                        {errors.state && (
                          <p className="text-yellow-300 text-sm mt-1 font-medium">{errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-white/90 mb-2">
                        School Image *
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        {...register("image", { required: "School image is required" })}
                        className="w-full px-4 py-3 text-white border border-white/30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all bg-white/10 backdrop-blur-sm file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-yellow-400/20 file:text-yellow-100 hover:file:bg-yellow-400/30 file:backdrop-blur-sm"
                      />
                      {errors.image && (
                        <p className="text-yellow-300 text-sm mt-1 font-medium">{errors.image.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-yellow-400 font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-sm border border-yellow-300/50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-purple-800 border-t-transparent rounded-full animate-spin"></div>
                          <span>Adding School...</span>
                        </div>
                      ) : (
                        'Add School'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}