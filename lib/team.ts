/**
 * Team Dataset
 * Leadership and specialist team at Ali Estate & Marketing Agency
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Leadership' | 'Real Estate Advisory' | 'Creative & Marketing';
  bio: string;
  image: string;
  email: string;
  phone: string;
  linkedin: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "Muhammad Ali Raza",
    role: "Founder & Managing Director",
    department: "Leadership",
    bio: "Over a decade of leadership in prime property transactions, portfolio acquisitions, and real estate marketing innovation.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    email: "ali.raza@ali-estate.agency",
    phone: "+92 300 123 4567",
    linkedin: "https://linkedin.com/in/sample-profile"
  },
  {
    id: "team-2",
    name: "Tariq Mansoor",
    role: "Senior Luxury Property Consultant",
    department: "Real Estate Advisory",
    bio: "Specialist in DHA Phase 8 and Clifton waterfront estates with extensive experience advising high-net-worth families.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    email: "tariq.mansoor@ali-estate.agency",
    phone: "+92 301 987 6543",
    linkedin: "https://linkedin.com/in/sample-profile"
  },
  {
    id: "team-3",
    name: "Sarah Qureshi",
    role: "Head of Property Marketing & Digital Strategy",
    department: "Creative & Marketing",
    bio: "Directs performance media, architectural cinematography, and diaspora marketing campaigns for marquee developments.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    email: "sarah.qureshi@ali-estate.agency",
    phone: "+92 322 876 5432",
    linkedin: "https://linkedin.com/in/sample-profile"
  },
  {
    id: "team-4",
    name: "Hamza Farooqi",
    role: "Commercial & Corporate Broker",
    department: "Real Estate Advisory",
    bio: "Focuses on Grade-A corporate towers, high-street retail spaces, and institutional property acquisitions.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    email: "hamza.farooqi@ali-estate.agency",
    phone: "+92 321 456 7890",
    linkedin: "https://linkedin.com/in/sample-profile"
  },
  {
    id: "team-5",
    name: "Zainab Shah",
    role: "Client Relations & Closing Executive",
    department: "Real Estate Advisory",
    bio: "Ensures transparent conveyancing, title documentation verification, and smooth client handover experiences.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    email: "zainab.shah@ali-estate.agency",
    phone: "+92 333 555 1234",
    linkedin: "https://linkedin.com/in/sample-profile"
  }
];
