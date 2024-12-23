import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Luja Shakya",
  initials: "LS",
  url: "https://lujashakya.com.np",
  location: "Bhaktapur, Nepal",
  locationLink: "https://www.google.com/maps/place/bhaktapur",
  description:
    "Software Engineer and Game Dev Enthusiast. I love building games with uniique gameplay tactics and contribute to society and culture .",
  summary:
    "I'm a self-taught programmer who has learnt to program at an intermediate level using JS, Python and PHP. My hobbies include programming and learning about how things work. I have some personal projects in the making that made me more creative explorer to learn more and more. In my free time, I like to code web pages using HTML/CSS, JS and build games with Engineering tactics and contribute to promote our culture . Currently I have passed Bachelor's in Computer Engineering from Khwopa College of Engineering.",
  avatarUrl: "/me.jpg",
  skills: [
    "React",
    "Typescript",
    "Node.js",
    "PHP",
    "MERN stack",
    "Python",
    "Postgres",
    "Docker",
    "C",
    "C++",
    "Maya",
    "Blender",
    "Unity",
    "Unreal Engine",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "erlujashakya@gmail.com",
    tel: "+977 9860685929",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/shakyaninja",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/erlujashakya/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/?mx=2",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@techsamuha1945",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "emailto:erlujashakya@gmail.com",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Ochrebyte Technologies",
      badges: [],
      href: "#",
      location: "On-site",
      title: "Game Developer",
      logoUrl: "/shopify.svg",
      start: "Sep 2024",
      end: "Current",
      description:
        "",
    },
    {
      company: "Incessant Rain Studios",
      badges: [],
      href: "https://incessantrain.com",
      location: "On-site",
      title: "Jr. Game Developer",
      logoUrl: "/incessent.jpeg",
      start: "Feb 2024",
      end: "Sep 2024",
      description:
        "Incessant Rain Studios is a state-of-the-art animation studio that develops and produces digital animated properties for theatrical, television, home entertainment and interactive distribution needs for clients worldwide. Incessant Rain's comprehensive production services include conceptual designs, story boarding, character designs, layout, modeling/texturing, animation, VFX, lighting and post production.",
    },
    {
      company: "Concerto Analytics",
      badges: [],
      href: "https://concertoanalytics.com",
      location: "Remote",
      title: "Software Engineer",
      logoUrl: "/concertoanalytics_logo.jpeg",
      start: "Aug 2022",
      end: "Feb 2024",
      description:
        "",
    },
    {
      company: "Wolfmatrix",
      href: "https://wolfmatrix.com/",
      badges: [],
      location: "Sanepa, Lalitpur, Nepal",
      title: "Associate Software Engineer",
      logoUrl: "/wolfmatrix_pvt_ltd__logo.jpeg",
      start: "Jul 2023",
      end: "Feb 2024",
      description:
        "",
    },
    {
      company: "Wolfmatrix",
      href: "https://wolfmatrix.com/",
      badges: [],
      location: "Sanepa, Lalitpur, Nepal",
      title: "Jr. Software Engineer",
      logoUrl:  "/wolfmatrix_pvt_ltd__logo.jpeg",
      start: "Jul 2022",
      end: "Jul 2023",
      description:
        "",
    },
    {
      company: "Wolfmatrix",
      href: "https://wolfmatrix.com/",
      badges: [],
      location: "Sanepa, Lalitpur, Nepal",
      title: "Software Engineer Intern",
      logoUrl:  "/wolfmatrix_pvt_ltd__logo.jpeg",
      start: "Apr 2022",
      end: "Jul 2022",
      description:
        "",
    },
    {
      company: "Neo Fusion School of Computer",
      href: "#",
      badges: [],
      location: "On-site",
      title: "Web Designing Instructor",
      logoUrl: "/atomic.png",
      start: "Jan 2021",
      end: "Jan 2023",
      description:
        "As a web design instructor, I found the experience deeply fulfilling, as it allowed me to share creative and technical insights while inspiring others to craft innovative digital solutions. Guiding students through design principles, usability, and coding helped them transform ideas into functional, aesthetically pleasing websites. The role kept me engaged with evolving technologies and trends, fostering a mindset of adaptability and continuous learning. Watching students overcome challenges, grow their skills, and create impactful projects made the journey both enriching and inspiring.",
    },
  ],
  education: [
    {
      school: "The Rising English Secondary School",
      href: "#",
      degree: "SLC",
      logoUrl: "/buildspace.jpg",
      start: "2004",
      end: "2015",
    },
    {
      school: "Khwopa Higher Secondary School",
      href: "https://khss.edu.np",
      degree: "Major in Computer Science",
      logoUrl: "/waterloo.png",
      start: "2016",
      end: "2018",
    },
    {
      school: "Khwopa College of Engineering",
      href: "https://khwopa.edu.np",
      degree: "Bachelor's Degree of Computer Engineering (BCT)",
      logoUrl: "/college.png",
      start: "2018",
      end: "2022",
    },
    {
      school: "Incessant Rain Academy",
      href: "https://incessantrainacademy.com",
      degree: " Diploma in Game Development and animation",
      logoUrl: "/incessent.jpeg",
      start: "2023",
      end: "2024",
    },
  ],
  projects: [
    {
      title: "Emergency Contacts",
      href: "#",
      dates: "Apr 2020 - Jan 2022",
      active: true,
      description:
        "In this app, we provide emergency contact lists like Ambulance, Hospitals, Fire Brigade, Police, Sab Bahan, Covid-19. And, Install calls services. So, you don’t need to copy, type and dial. Just simply dial the number and get away from the emergency.",
      technologies: [
        "Flutter",
        "PHP",
        "Dart"
      ],
      links: [
        {
          type: "Website",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "KhCE Android Application",
      href: "#",
      dates: "May 2020 - Dec 2020",
      active: true,
      description:
        "Android application for Khwopa College of Engineering",
      technologies: [
        "Flutter",
        "PHP",
        "Dart"
      ],
      links: [
        {
          type: "Website",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "FPGAN",
      href: "#",
      dates: "Apr 2021 - Jul 2022",
      active: true,
      description:
        "Floor Plan Generation using Generative Adversial Network as my Final year major project for completion of my Bachelor's Degree in Computer Engineering.",
      technologies: [
        "Python",
        "Flask",
        "MySQL",
        "Collabs",
        "Tensorflow",
        "GAN",
      ],
      links: [
        {
          type: "Website",
          href: "#",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "#",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "Kidncode",
      href: "https://kidncode.com",
      dates: "Jun 2023 - Oct 2023",
      active: true,
      description:
        "KidnCode is a learning-centered approach designed to prepare children for the digital age by teaching coding, app and game development, as well as AI/ML. This project is specifically aimed at creating a full-stack web application that supports parents, students, and instructors with interactive dashboards and management portals, ensuring a smoother learning experience. Involved in both backend and frontend application development .",
      technologies: [
        "Object-Relational Mapping (ORM)","Reactjs", "Agile Methodologies", "Nodejs", "Responsive Web Design"
      ],
      links: [
        {
          type: "Website",
          href: "https://kidncode.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
  ]
} as const;
