export type UserRole = "student" | "client" | "instructor" | "support" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  title?: string;
  status: "active" | "inactive";
  createdAt: string;
  company?: string;
}

export type ServiceCategory =
  | "Startup & Planning"
  | "Strategy & Operations"
  | "Marketing & Growth"
  | "Technology & E-commerce"
  | "General Advisory";

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: ServiceCategory;
  iconName: string;
  startingPrice?: number;
  deliveryTime: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  included: string[];
  faqs: { question: string; answer: string }[];
  featured?: boolean;
}

export type ConsultationStatus =
  | "pending"
  | "under_review"
  | "confirmed"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface ConsultationRequest {
  id: string;
  referenceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  businessName?: string;
  serviceId: string;
  serviceTitle: string;
  category: string;
  preferredDate: string;
  preferredTime: string;
  consultationType: "Online" | "In Person" | "To Be Discussed";
  message: string;
  status: ConsultationStatus;
  paymentStatus: "Pending" | "Paid" | "Waived";
  assignedConsultant?: string;
  adminNotes?: string;
  createdAt: string;
}

export type CourseCategory =
  | "Entrepreneurship"
  | "Business Management"
  | "Digital Marketing"
  | "Freelancing"
  | "E-commerce"
  | "Personal Branding"
  | "Business Technology"
  | "Professional Development";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  description?: string;
  resources?: { name: string; url: string }[];
  isPreview?: boolean;
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseReview {
  id: string;
  studentName: string;
  studentAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  status: "approved" | "pending" | "hidden";
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: CourseCategory;
  instructorId: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatar: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  duration: string;
  totalLessons: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  rating: number;
  reviewCount: number;
  enrolledStudentsCount: number;
  status: "published" | "draft" | "archived";
  featured?: boolean;
  popular?: boolean;
  latest?: boolean;
  whatYouWillLearn: string[];
  requirements: string[];
  targetAudience: string[];
  modules: CourseModule[];
  reviews: CourseReview[];
  createdAt: string;
}

export type StreamingPlatform = "YouTube" | "Facebook";

export type LiveClassStatus = "Draft" | "Scheduled" | "Live" | "Completed" | "Cancelled";

export interface LiveClass {
  id: string;
  title: string;
  courseId?: string;
  courseTitle?: string;
  instructorId: string;
  instructorName: string;
  date: string;
  startTime: string;
  duration: string;
  platform: StreamingPlatform;
  streamingUrl: string;
  status: LiveClassStatus;
  description: string;
  attendeesCount?: number;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  coursesCount: number;
  studentsCount: number;
  rating: number;
  email: string;
  specialization: string;
}

export interface Order {
  id: string;
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  itemType: "course" | "service";
  itemId: string;
  itemTitle: string;
  amount: number;
  discount: number;
  finalAmount: number;
  paymentMethod: "Credit Card / Debit Card" | "Bank Transfer" | "Mobile Payment" | "Demo Checkout";
  paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
  orderStatus: "Completed" | "Processing" | "Cancelled";
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

export type TicketPriority = "Low" | "Medium" | "High" | "Urgent";
export type TicketStatus = "Open" | "In Progress" | "Waiting for Customer" | "Resolved" | "Closed";

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  name: string;
  email: string;
  category: string;
  priority: TicketPriority;
  subject: string;
  description: string;
  status: TicketStatus;
  assignedAgent?: string;
  responses: { sender: string; message: string; timestamp: string; isStaff: boolean }[];
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  targetAudience: "All Users" | "Students" | "Clients" | "Instructors";
  publishedAt: string;
  status: "Published" | "Draft";
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string;
  studentName: string;
  courseTitle: string;
  issueDate: string;
  instructorName: string;
  verificationUrl: string;
}
