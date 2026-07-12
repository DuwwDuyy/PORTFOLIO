export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  role: string;
  image: string;
  techStack: string[];
  challenge: string;
  solution: string;
  result: string;
  links: {
    live?: string;
    github?: string;
  };
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "news-pay-winform",
    title: "NewsPay - Royalty Management System",
    shortDesc: "A comprehensive royalty management application built on .NET Windows Forms, featuring an integrated offline AI for plagiarism detection and a smart accounting assistant.",
    role: "Fullstack & AI Integration",
    image: "/news_pay_winform.png",
    techStack: [".NET Framework", "SQL Server", "Ollama", "Qwen2.5", "Windows Forms"],
    challenge: "Integrating an offline LLM to provide secure, internet-free analysis of articles for plagiarism and accounting data extraction without compromising on performance.",
    solution: "Used Ollama to run the Qwen2.5 model locally, bridging it with the .NET application to process large text and query the SQL Server database dynamically.",
    result: "Provided journalists and accountants with an intelligent tool that automates royalty calculations and strictly protects internal data through 100% offline AI processing.",
    links: {
      github: "https://github.com/BuirT/DATN-nhuanbutwinform",
    }
  },
  {
    id: "editorial-desk-web",
    title: "Editorial Desk Web Platform",
    shortDesc: "A modern web-based solution for editorial offices to manage articles, calculate royalties, and deduct personal income taxes, synchronized with the Winform system.",
    role: "Fullstack Developer",
    image: "/editorial_desk_web.png",
    techStack: ["React.js", "Vite", "Node.js", "Express.js", "SQL Server", "Chart.js"],
    challenge: "Ensuring 100% data consistency and business logic alignment with the legacy Winform application while providing a fast, modern responsive web interface.",
    solution: "Built a robust Node.js backend to connect to the shared SQL Server and developed a responsive React frontend utilizing Chart.js for real-time multidimensional data visualization.",
    result: "Streamlined the 5-step editorial approval process and enabled real-time dashboard analytics for quick financial insights across the organization.",
    links: {
      github: "https://github.com/BuirT/DATN-nhuanbutweb",
    }
  },
  {
    id: "flower-shop-mvc",
    title: "FlowerShop E-Commerce",
    shortDesc: "A fully functional e-commerce platform for selling flowers, built from scratch using pure PHP and the MVC architecture.",
    role: "Fullstack Developer",
    image: "/flower_shop_mvc.png",
    techStack: ["PHP", "MVC", "MySQL", "PDO", "HTML/CSS"],
    challenge: "Implementing a secure and scalable shopping cart, checkout system, and admin dashboard without relying on modern heavy frameworks.",
    solution: "Architected a custom MVC pattern with strict PDO bindings to prevent SQL injection, and utilized .htaccess for clean, SEO-friendly routing.",
    result: "Delivered a lightweight, highly performant online store with complete CRUD capabilities for product and order management.",
    links: {
      github: "https://github.com/DuwwDuyy/FLOWERSHOP",
    }
  }
];
