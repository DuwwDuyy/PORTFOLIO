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
