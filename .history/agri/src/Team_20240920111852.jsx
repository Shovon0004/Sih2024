import React from 'react';
import { Linkedin, Facebook, Twitter } from 'lucide-react';

const TeamMember = ({ name, role, image, description }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs">
    <div className="p-4 text-center">
      <img src={image} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4" />
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-sm text-gray-600 mb-2">{role}</p>
      <p className="text-sm text-gray-700 mb-4">{description}</p>
      <div className="flex justify-center space-x-2">
        <a href="#" className="text-green-500 hover:text-green-600">
          <Linkedin size={20} />
        </a>
        <a href="#" className="text-green-500 hover:text-green-600">
          <Facebook size={20} />
        </a>
        <a href="#" className="text-green-500 hover:text-green-600">
          <Twitter size={20} />
        </a>
        <a href="#" className="text-green-500 hover:text-green-600">
          <span className="font-bold">Be</span>
        </a>
      </div>
    </div>
  </div>
);

const TeamMembersGrid = () => {
  const teamMembers = [
    {
      name: "ALI GENTH",
      role: "PRESIDENT & CO-FOUNDER",
      image: "/api/placeholder/150/150",
      description: "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat.",
    },
    {
      name: "JOHN SMITH",
      role: "CO-FOUNDER",
      image: "/api/placeholder/150/150",
      description: "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat.",
    },
    {
      name: "MARISSA LOWE",
      role: "OPERATIONS MANAGER",
      image: "/api/placeholder/150/150",
      description: "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat.",
    },
    {
      name: "JIM WATSON",
      role: "SALES MANAGER",
      image: "/api/placeholder/150/150",
      description: "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat.",
    },
    {
      name: "GARY DOE",
      role: "WEB DEVELOPER",
      image: "/api/placeholder/150/150",
      description: "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat.",
    },
    {
      name: "STEVE BURNS",
      role: "GRAPHIC DESIGNER",
      image: "/api/placeholder/150/150",
      description: "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat.",
    },
  ];

  return (
    <div className="bg-gray-100 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
};

export default TeamMembersGrid;