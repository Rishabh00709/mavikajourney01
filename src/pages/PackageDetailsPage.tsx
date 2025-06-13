import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Star,
  ChevronLeft,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Shield,
  Users,
  Phone,
  Mail,
  User,
  Calendar,
  IndianRupee,
} from 'lucide-react';
import { travelPackages } from '../data/packages';

const PackageDetailsPage = () => {
  const { id } = useParams();
  const packageDetails = travelPackages.find((pkg) => pkg.id === id);
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    destination: packageDetails?.location || '',
    startDate: '',
    endDate: '',
    travelers: '2',
    budget: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  if (!packageDetails) {
    return (
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-2xl font-bold text-gray-800">Package not found</h1>
        <Link
          to="/"
          className="text-teal-600 hover:text-teal-700 mt-4 inline-block"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(Rs
            {packageDetails.image})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white max-w-3xl"
          >
            <Link
              to="/"
              className="inline-flex items-center text-white hover:text-teal-400 mb-6 transition-colors"
            >
              <ChevronLeft size={20} className="mr-1" />
              Back to Packages
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {packageDetails.title}
            </h1>
            <div className="flex items-center space-x-4 text-lg">
              <div className="flex items-center">
                <MapPin size={20} className="mr-2" />
                {packageDetails.location}
              </div>
              <div className="flex items-center">
                <Clock size={20} className="mr-2" />
                {packageDetails.duration}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Package Overview</h2>
              <p className="text-gray-600 mb-6">{packageDetails.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { icon: Plane, text: 'Round-trip flights' },
                  { icon: Hotel, text: 'Luxury accommodation' },
                  { icon: Utensils, text: 'All meals included' },
                  { icon: Camera, text: 'Guided tours' },
                  { icon: Shield, text: 'Travel insurance' },
                  { icon: Users, text: 'Expert guide' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <item.icon size={20} className="text-teal-600 mr-2" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="border-l-2 border-teal-600 pl-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Day {index + 1}
                    </h3>
                    <p className="text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Reviews</h2>
              <div className="flex items-center mb-6">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < packageDetails.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {packageDetails.rating} ({packageDetails.reviews} reviews)
                </span>
              </div>
              {/* Sample Reviews */}
              <div className="space-y-6">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-6 last:border-0"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                      <div>
                        <h4 className="font-semibold">John Doe</h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="text-amber-400 fill-amber-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Amazing experience! The package exceeded our expectations.
                      The guides were knowledgeable and friendly.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Request Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="inline-block w-4 h-4 mr-2" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="inline-block w-4 h-4 mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="inline-block w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Calendar className="inline-block w-4 h-4 mr-2" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Calendar className="inline-block w-4 h-4 mr-2" />
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      min={
                        formData.startDate ||
                        new Date().toISOString().split('T')[0]
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Users className="inline-block w-4 h-4 mr-2" />
                    Number of Travelers
                  </label>
                  <select
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="1">1 Traveler</option>
                    <option value="2">2 Travelers</option>
                    <option value="3">3 Travelers</option>
                    <option value="4">4 Travelers</option>
                    <option value="5+">5+ Travelers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <IndianRupee className="inline-block w-4 h-4 mr-2" />
                    Budget Range (INR)
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select Budget Range</option>
                    <option value="10000-25000">₹10,000 - ₹25,000</option>
                    <option value="25000-50000">₹25,000 - ₹50,000</option>
                    <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                    <option value="100000+">Above ₹1,00,000</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center"
                >
                  <Phone size={20} className="mr-2" />
                  Request Callback
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsPage;
