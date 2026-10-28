import User from "../models/User.js";
import Resume from "../models/Resume.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
   return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const createDemoResumes = async (userId) => {
   const defaultResumes = [
      {
         userId,
         title: "Senior Frontend Developer",
         template: "modern",
         accent_color: "#7c3aed",
         public: false,
         professional_summary: "Frontend engineer with 5+ years of experience building scalable web applications, improving UX, and collaborating with product and design teams to ship polished digital experiences.",
         skills: ["React", "JavaScript", "TypeScript", "Node.js", "UI/UX", "REST APIs"],
         personal_info: {
            full_name: "Aarav Sharma",
            profession: "Frontend Developer",
            email: "aarav@example.com",
            phone: "+91 98765 43210",
            location: "Bengaluru, India",
            linkedin: "linkedin.com/in/aaravsharma",
            website: "aaravsharma.dev",
         },
         experience: [
            {
               company: "TechNova Labs",
               position: "Senior Frontend Developer",
               start_date: "2022-01",
               end_date: "Present",
               description: "Led UI architecture for a SaaS product used by 50k+ users and improved page performance by 38%.",
               is_current: true,
            },
         ],
         project: [
            {
               name: "Analytics Dashboard",
               type: "Web App",
               description: "Built a KPI dashboard with real-time charts and filters to help teams monitor business performance.",
            },
         ],
         education: [
            {
               institution: "BMS College of Engineering",
               degree: "B.Tech",
               field: "Computer Science",
               graduation_date: "2019",
               gpa: "8.7",
            },
         ],
      },
      {
         userId,
         title: "Product Designer Resume",
         template: "classic",
         accent_color: "#0f766e",
         public: false,
         professional_summary: "Product designer focused on research-driven design systems, user-centered product strategy, and streamlined product experiences for B2B and B2C platforms.",
         skills: ["Figma", "UX Research", "Wireframing", "Design Systems", "Prototyping"],
         personal_info: {
            full_name: "Meera Iyer",
            profession: "Product Designer",
            email: "meera@example.com",
            phone: "+91 98123 45678",
            location: "Hyderabad, India",
            linkedin: "linkedin.com/in/meera-iyer",
            website: "meera.design",
         },
         experience: [
            {
               company: "PixelForge Studio",
               position: "Senior Product Designer",
               start_date: "2021-02",
               end_date: "Present",
               description: "Designed end-to-end flows for mobile and web products, establishing reusable components and accessibility standards.",
               is_current: true,
            },
         ],
         project: [
            {
               name: "Marketplace Redesign",
               type: "UX Project",
               description: "Redesigned a multi-vendor marketplace with improved conversions and a cleaner information architecture.",
            },
         ],
         education: [
            {
               institution: "National Institute of Design",
               degree: "M.Des",
               field: "Interaction Design",
               graduation_date: "2020",
               gpa: "9.1",
            },
         ],
      },
      {
         userId,
         title: "Data Analyst Resume",
         template: "minimal",
         accent_color: "#f59e0b",
         public: false,
         professional_summary: "Analytical problem solver with a strong background in SQL, dashboarding, forecasting, and translating business questions into data-driven decisions for teams across product and operations.",
         skills: ["SQL", "Python", "Power BI", "Excel", "Statistics", "Tableau"],
         personal_info: {
            full_name: "Rohan Patel",
            profession: "Data Analyst",
            email: "rohan@example.com",
            phone: "+91 99876 54321",
            location: "Pune, India",
            linkedin: "linkedin.com/in/rohanpatel",
            website: "rohananalytics.io",
         },
         experience: [
            {
               company: "InsightGrid",
               position: "Data Analyst",
               start_date: "2020-07",
               end_date: "Present",
               description: "Created dashboard reporting and forecasting models that improved decision speed and reduced manual reporting effort by 60%.",
               is_current: true,
            },
         ],
         project: [
            {
               name: "Customer Churn Model",
               type: "Analytics",
               description: "Built a churn prediction framework using historical customer data and retention KPIs to support outreach prioritization.",
            },
         ],
         education: [
            {
               institution: "VIT University",
               degree: "B.Sc",
               field: "Statistics",
               graduation_date: "2019",
               gpa: "8.9",
            },
         ],
      },
   ];

   return Resume.insertMany(defaultResumes);
};

export const registerUser = async (req, res) => {
   try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
         return res.status(400).json({ message: "Missing required fields" });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
         return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
         name,
         email,
         password: hashedPassword,
      });

      const token = generateToken(newUser._id);
      newUser.password = undefined;

      return res.status(201).json({
         message: "User created successfully",
         token,
         user: newUser,
      });
   } catch (error) {
      return res.status(400).json({ message: error.message });
   }
};

export const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
         return res.status(400).json({ message: "Invalid email or password" });
      }

      const token = generateToken(user._id);
      user.password = undefined;

      return res.status(200).json({
         message: "Login successful",
         token,
         user,
      });
   } catch (error) {
      return res.status(400).json({ message: error.message });
   }
};

export const getUserById = async (req, res) => {
   try {
      const userId = req.userId;
      const user = await User.findById(userId);

      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      user.password = undefined;
      return res.status(200).json({ user });
   } catch (error) {
      return res.status(400).json({ message: error.message });
   }
};

export const getUserResumes = async (req, res) => {
   try {
      const userId = req.userId;
      let resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });

      if (!resumes || resumes.length === 0) {
         const seeded = await createDemoResumes(userId);
         resumes = seeded || [];
      }

      return res.status(200).json({ resumes });
   } catch (error) {
      return res.status(400).json({ message: error.message });
   }
};