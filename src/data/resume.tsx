import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Sanjita Shakya",
  initials: "SS",
  url: "https://sanjitashakya.com.np",
  location: "Bhaktapur, Nepal",
  locationLink: "https://www.google.com/maps/place/bhaktapur",
  description:
    " Motivated to be a Full Stack Web Developer with skills in HTML, CSS, JavaScript, React, Node.js, and database",
  summary:
    " I am highly motivated to learn and grow. I have developed a strong foundation in HTML, CSS and JS during my studies, which I believe will help me contribute meaningfully to your team.",
  avatarUrl: "/me2.jpg",
  skills: [
    "HTML",
    "CSS",
    "JS",
    "Java",
    "Android",
    "React",
    "PHP",
    "Python",
    "C",
    "C#",
    "Photoshop",
    "Indesign"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "sanjitashakya@gmail.com",
    tel: "+977 9863687370",
    social: { 
      GitHub: {
        name: "GitHub",
        url: "https://github.com/sanjitashakya",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sanjita-shakya-b999a12ab/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "#",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "#",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "emailto:sanjitashakya1@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Ratnayan Jyasa",
      badges: [],
      href: "#",
      location: "On-site",
      title: "Sales Executive",
      logoUrl: "/ratnayan.jpg",
      start: "Sep 2023",
      end: "Current",
      description:
        "",
    },
  
  ],
  education: [
    {
      school: "Shree Padma Secondary School",
      href: "#",
      degree: "SLC",
      logoUrl: "/buildspace.jpg",
      start: "2006",
      end: "2017",
    },
    {
      school: "Shree Padma Secondary School",
      href: "#",
      degree: "Humanities",
      logoUrl: "/waterloo.png",
      start: "2018",
      end: "2020",
    },
    {
      school: "Bhaktapur Multiple Campus",
      href: "https://bkmc.tu.edu.np",
      degree: "Bachelor's Degree of Computer Application (BCA)",
      logoUrl: "/colz.jpg",
      start: "2021",
      end: "Current",
    },
    {
      school: "Neo Fusion School of Computer",
      href: "#",
      degree: " Graphics Designing",
      logoUrl: "#",
      start: "2018",
      end: "2019",
    },
  ],
  projects: [
    {
      title: "Neptours",
      href: "#",
      dates: "Apr 2023",
      active: true,
      description:
        " This is the website where you can book your desire tours and adventures. ",
      technologies: [
        "Html",
        "CSS",
        "PHP",
        "JS"
      ],
      links: [
        // {
        //   type: "Website",
        //   href: "#",
        //   icon: <Icons.globe className="size-3" />,
        // },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
     },
  
  ]
} as const;
