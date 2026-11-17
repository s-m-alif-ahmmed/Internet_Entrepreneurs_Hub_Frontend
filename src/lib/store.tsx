"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  UserRole,
  Course,
  Service,
  LiveClass,
  ConsultationRequest,
  Order,
  Coupon,
  SupportTicket,
  Announcement,
  Certificate,
  MembershipPackage,
} from "@/types";
import {
  INITIAL_USERS,
  INITIAL_SERVICES,
  INITIAL_COURSES,
  INITIAL_LIVE_CLASSES,
  INITIAL_CONSULTATIONS,
  INITIAL_ORDERS,
  INITIAL_COUPONS,
  INITIAL_TICKETS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_CERTIFICATES,
  INITIAL_MEMBERSHIP_PACKAGES,
} from "./mock-data";
import { generateRef } from "./utils";

interface AppContextType {
  currentUser: User | null;
  users: User[];
  loginAs: (role: UserRole) => void;
  logout: () => void;
  registerUser: (data: { name: string; email: string; phone?: string; role: "student" | "client"; company?: string }) => User;
  updateProfile: (updates: Partial<User>) => void;
  
  // Courses & Learning
  courses: Course[];
  enrolledCourseIds: string[];
  completedLessons: Record<string, string[]>; // courseId -> lessonId[]
  enrollInCourse: (courseId: string) => void;
  toggleLessonCompleted: (courseId: string, lessonId: string) => void;
  addCourse: (course: Partial<Course>) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  
  // Services & Consultations
  services: Service[];
  consultations: ConsultationRequest[];
  bookConsultation: (req: Omit<ConsultationRequest, "id" | "referenceNumber" | "createdAt" | "status" | "paymentStatus">) => string;
  updateConsultationStatus: (id: string, status: ConsultationRequest["status"], adminNotes?: string) => void;
  addService: (service: Partial<Service>) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Live Classes
  liveClasses: LiveClass[];
  scheduleLiveClass: (cls: Omit<LiveClass, "id">) => void;
  updateLiveClass: (id: string, updates: Partial<LiveClass>) => void;

  // Orders & Checkout
  orders: Order[];
  createOrder: (orderData: Omit<Order, "id" | "referenceNumber" | "createdAt">) => string;
  updateOrderStatus: (id: string, orderStatus: Order["orderStatus"], paymentStatus?: Order["paymentStatus"]) => void;
  coupons: Coupon[];
  applyCoupon: (code: string, amount: number) => { valid: boolean; discount: number; message: string };
  addCoupon: (coupon: Omit<Coupon, "id" | "usedCount">) => void;
  toggleCoupon: (id: string) => void;
  deleteCoupon: (id: string) => void;

  // Support
  tickets: SupportTicket[];
  submitTicket: (ticket: Omit<SupportTicket, "id" | "ticketNumber" | "createdAt" | "status" | "responses">) => string;
  replyTicket: (ticketId: string, message: string, isStaff: boolean) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket["status"]) => void;

  // Announcements & Certificates
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, "id" | "publishedAt">) => void;
  certificates: Certificate[];

  // Membership Packages
  membershipPackages: MembershipPackage[];
  activeMembershipId: string | null;
  checkoutMembership: MembershipPackage | null;
  openMembershipCheckout: (pkg: MembershipPackage) => void;
  closeMembershipCheckout: () => void;
  purchaseMembership: (
    pkg: MembershipPackage,
    paymentMethod: Order["paymentMethod"],
    discount: number,
    finalAmount: number
  ) => string;

  // Checkout modal state
  checkoutCourse: Course | null;
  openCheckout: (course: Course) => void;
  closeCheckout: () => void;

  // Notifications
  notification: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Safe localStorage helper
  const loadState = <T,>(key: string, fallback: T): T => {
    if (typeof window === "undefined") return fallback;
    try {
      const item = localStorage.getItem(`ieh_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_USERS[2]); // Default as student (Sarah Jenkins) for demo convenience
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(["crs-1"]);
  const [completedLessons, setCompletedLessons] = useState<Record<string, string[]>>({
    "crs-1": ["les-1", "les-2"],
  });
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>(INITIAL_CONSULTATIONS);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(INITIAL_LIVE_CLASSES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [certificates] = useState<Certificate[]>(INITIAL_CERTIFICATES);
  const [membershipPackages] = useState<MembershipPackage[]>(INITIAL_MEMBERSHIP_PACKAGES);
  const [activeMembershipId, setActiveMembershipId] = useState<string | null>(null);
  const [checkoutMembership, setCheckoutMembership] = useState<MembershipPackage | null>(null);
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Initialize from localStorage client-side
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(loadState("users", INITIAL_USERS));
      const savedUserId = loadState<string | null>("current_user_id", "usr-student");
      const found = INITIAL_USERS.find(
        (u) => u.id === savedUserId && (u.role === "student" || u.role === "admin")
      );
      const active = found || INITIAL_USERS[2];
      setCurrentUser(active);
      setCourses(loadState("courses", INITIAL_COURSES));
      setEnrolledCourseIds(loadState("enrolled_ids", ["crs-1"]));
      setCompletedLessons(loadState("completed_lessons", { "crs-1": ["les-1", "les-2"] }));
      setServices(loadState("services", INITIAL_SERVICES));
      setConsultations(loadState("consultations", INITIAL_CONSULTATIONS));
      setLiveClasses(loadState("live_classes", INITIAL_LIVE_CLASSES));
      setOrders(loadState("orders", INITIAL_ORDERS));
      setCoupons(loadState("coupons", INITIAL_COUPONS));
      setTickets(loadState("tickets", INITIAL_TICKETS));
      setAnnouncements(loadState("announcements", INITIAL_ANNOUNCEMENTS));
      setActiveMembershipId(loadState<string | null>("active_membership_id", null));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const saveItem = (key: string, data: unknown) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(`ieh_${key}`, JSON.stringify(data));
      } catch (e) {
        console.error("Storage save error", e);
      }
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((current) => (current === msg ? null : current));
    }, 4500);
  };

  const loginAs = (role: UserRole) => {
    const target = users.find((u) => u.role === role) || users[0];
    setCurrentUser(target);
    saveItem("current_user_id", target.id);
    showNotification(`Logged in as ${target.name} (${target.role.toUpperCase()})`);
  };

  const logout = () => {
    setCurrentUser(null);
    saveItem("current_user_id", null);
    showNotification("You have been logged out.");
  };

  const registerUser = (data: {
    name: string;
    email: string;
    phone?: string;
    role: "student" | "client";
    company?: string;
  }): User => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      company: data.company,
      title: data.role === "client" ? "Business Executive" : "Student Member",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updated = [newUser, ...users];
    setUsers(updated);
    setCurrentUser(newUser);
    saveItem("users", updated);
    saveItem("current_user_id", newUser.id);
    showNotification(`Welcome to IEH, ${newUser.name}!`);
    return newUser;
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));
    setUsers(updatedUsers);
    saveItem("users", updatedUsers);
    showNotification("Profile updated successfully!");
  };

  // Learning actions
  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourseIds.includes(courseId)) {
      const updated = [...enrolledCourseIds, courseId];
      setEnrolledCourseIds(updated);
      saveItem("enrolled_ids", updated);
    }
  };

  const toggleLessonCompleted = (courseId: string, lessonId: string) => {
    const currentList = completedLessons[courseId] || [];
    const isCompleted = currentList.includes(lessonId);
    const updatedList = isCompleted
      ? currentList.filter((id) => id !== lessonId)
      : [...currentList, lessonId];

    const updatedMap = { ...completedLessons, [courseId]: updatedList };
    setCompletedLessons(updatedMap);
    saveItem("completed_lessons", updatedMap);
    showNotification(isCompleted ? "Lesson marked as uncompleted" : "Lesson marked as completed! 🎉");
  };

  const addCourse = (data: Partial<Course>) => {
    const newCourse: Course = {
      id: `crs-${Date.now()}`,
      slug: data.slug || `course-${Date.now()}`,
      title: data.title || "Untitled Course",
      shortDescription: data.shortDescription || "",
      fullDescription: data.fullDescription || "",
      category: data.category || "Entrepreneurship",
      instructorId: currentUser?.id || "inst-1",
      instructorName: currentUser?.name || "Dr. Marcus Vance",
      instructorTitle: currentUser?.title || "Senior Strategist",
      instructorAvatar: currentUser?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      thumbnail: data.thumbnail || "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
      price: data.price || 149,
      discountPrice: data.discountPrice,
      duration: data.duration || "10.0 hours",
      totalLessons: data.totalLessons || 12,
      level: data.level || "All Levels",
      rating: 5.0,
      reviewCount: 0,
      enrolledStudentsCount: 0,
      status: data.status || "published",
      whatYouWillLearn: data.whatYouWillLearn || ["Practical business implementation frameworks"],
      requirements: data.requirements || ["No prior requirements"],
      targetAudience: data.targetAudience || ["Entrepreneurs and professionals"],
      modules: data.modules || [],
      reviews: [],
      createdAt: new Date().toISOString().split("T")[0],
      ...data,
    };
    const updated = [newCourse, ...courses];
    setCourses(updated);
    saveItem("courses", updated);
    showNotification("Course created successfully!");
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    const updated = courses.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setCourses(updated);
    saveItem("courses", updated);
    showNotification("Course updated successfully!");
  };

  const deleteCourse = (id: string) => {
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    saveItem("courses", updated);
    showNotification("Course deleted.");
  };

  // Consultation actions
  const bookConsultation = (
    req: Omit<ConsultationRequest, "id" | "referenceNumber" | "createdAt" | "status" | "paymentStatus">
  ): string => {
    const referenceNumber = generateRef("IEH-CON");
    const newRequest: ConsultationRequest = {
      ...req,
      id: `con-${Date.now()}`,
      referenceNumber,
      status: "pending",
      paymentStatus: "Pending",
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updated = [newRequest, ...consultations];
    setConsultations(updated);
    saveItem("consultations", updated);
    showNotification(`Consultation booked! Reference: ${referenceNumber}`);
    return referenceNumber;
  };

  const updateConsultationStatus = (
    id: string,
    status: ConsultationRequest["status"],
    adminNotes?: string
  ) => {
    const updated = consultations.map((c) =>
      c.id === id ? { ...c, status, ...(adminNotes ? { adminNotes } : {}) } : c
    );
    setConsultations(updated);
    saveItem("consultations", updated);
    showNotification(`Consultation status updated to ${status}.`);
  };

  const addService = (data: Partial<Service>) => {
    const newService: Service = {
      id: `srv-${Date.now()}`,
      slug: data.slug || `service-${Date.now()}`,
      title: data.title || "Consulting Service",
      shortDescription: data.shortDescription || "",
      fullDescription: data.fullDescription || "",
      category: data.category || "Startup & Planning",
      iconName: data.iconName || "Briefcase",
      startingPrice: data.startingPrice || 250,
      deliveryTime: data.deliveryTime || "3 to 5 business days",
      benefits: data.benefits || ["Professional strategic recommendations"],
      process: data.process || [
        { step: 1, title: "Discovery", description: "Initial assessment" },
        { step: 2, title: "Execution", description: "Deliver strategy" },
      ],
      included: data.included || ["Direct consultation call"],
      faqs: data.faqs || [],
      ...data,
    };
    const updated = [newService, ...services];
    setServices(updated);
    saveItem("services", updated);
    showNotification("Service added successfully!");
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    const updated = services.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setServices(updated);
    saveItem("services", updated);
    showNotification("Service updated successfully!");
  };

  const deleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    saveItem("services", updated);
    showNotification("Service deleted.");
  };

  // Live Class actions
  const scheduleLiveClass = (data: Omit<LiveClass, "id">) => {
    const newClass: LiveClass = {
      ...data,
      id: `live-${Date.now()}`,
      attendeesCount: 0,
    };
    const updated = [newClass, ...liveClasses];
    setLiveClasses(updated);
    saveItem("live_classes", updated);
    showNotification("Live class scheduled successfully!");
  };

  const updateLiveClass = (id: string, updates: Partial<LiveClass>) => {
    const updated = liveClasses.map((l) => (l.id === id ? { ...l, ...updates } : l));
    setLiveClasses(updated);
    saveItem("live_classes", updated);
    showNotification("Live class updated.");
  };

  // Orders
  const createOrder = (orderData: Omit<Order, "id" | "referenceNumber" | "createdAt">): string => {
    const referenceNumber = generateRef("IEH-ORD");
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      referenceNumber,
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveItem("orders", updated);

    // Auto-enroll if course
    if (orderData.itemType === "course") {
      enrollInCourse(orderData.itemId);
    }

    showNotification(`Order confirmed! Reference: ${referenceNumber}`);
    return referenceNumber;
  };

  const updateOrderStatus = (
    id: string,
    orderStatus: Order["orderStatus"],
    paymentStatus?: Order["paymentStatus"]
  ) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, orderStatus, ...(paymentStatus ? { paymentStatus } : {}) } : o
    );
    setOrders(updated);
    saveItem("orders", updated);
    showNotification(`Order status updated to ${orderStatus}.`);
  };

  const addCoupon = (data: Omit<Coupon, "id" | "usedCount">) => {
    const newCoupon: Coupon = {
      ...data,
      id: `cpn-${Date.now()}`,
      code: data.code.toUpperCase().trim(),
      usedCount: 0,
    };
    const updated = [newCoupon, ...coupons];
    setCoupons(updated);
    saveItem("coupons", updated);
    showNotification(`Coupon ${newCoupon.code} created!`);
  };

  const toggleCoupon = (id: string) => {
    const updated = coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c));
    setCoupons(updated);
    saveItem("coupons", updated);
    showNotification("Coupon status updated.");
  };

  const deleteCoupon = (id: string) => {
    const updated = coupons.filter((c) => c.id !== id);
    setCoupons(updated);
    saveItem("coupons", updated);
    showNotification("Coupon removed.");
  };

  const applyCoupon = (code: string, amount: number) => {
    const coupon = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);
    if (!coupon) {
      return { valid: false, discount: 0, message: "Invalid or inactive coupon code." };
    }
    const discount =
      coupon.discountType === "percentage"
        ? Math.round((amount * coupon.discountValue) / 100)
        : Math.min(coupon.discountValue, amount);

    return {
      valid: true,
      discount,
      message: `Coupon ${coupon.code} applied! Saved $${discount}.`,
    };
  };

  // Tickets
  const submitTicket = (
    data: Omit<SupportTicket, "id" | "ticketNumber" | "createdAt" | "status" | "responses">
  ): string => {
    const ticketNumber = generateRef("IEH-TKT");
    const newTicket: SupportTicket = {
      ...data,
      id: `tkt-${Date.now()}`,
      ticketNumber,
      status: "Open",
      responses: [
        {
          sender: data.name,
          message: data.description,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          isStaff: false,
        },
      ],
      createdAt: new Date().toISOString().split("T")[0],
    };
    const updated = [newTicket, ...tickets];
    setTickets(updated);
    saveItem("tickets", updated);
    showNotification(`Ticket submitted! Reference: ${ticketNumber}`);
    return ticketNumber;
  };

  const replyTicket = (ticketId: string, message: string, isStaff: boolean) => {
    const updated = tickets.map((t) => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: isStaff ? ("Waiting for Customer" as const) : ("In Progress" as const),
          responses: [
            ...t.responses,
            {
              sender: isStaff ? "IEH Staff" : currentUser?.name || "Client",
              message,
              timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
              isStaff,
            },
          ],
        };
      }
      return t;
    });
    setTickets(updated);
    saveItem("tickets", updated);
    showNotification("Reply posted.");
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket["status"]) => {
    const updated = tickets.map((t) => (t.id === ticketId ? { ...t, status } : t));
    setTickets(updated);
    saveItem("tickets", updated);
    showNotification(`Ticket status changed to ${status}`);
  };

  const addAnnouncement = (data: Omit<Announcement, "id" | "publishedAt">) => {
    const newAnn: Announcement = {
      ...data,
      id: `anc-${Date.now()}`,
      publishedAt: new Date().toISOString().split("T")[0],
    };
    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    saveItem("announcements", updated);
    showNotification("Announcement published!");
  };

  const openCheckout = (course: Course) => {
    setCheckoutMembership(null);
    setCheckoutCourse(course);
  };
  const closeCheckout = () => setCheckoutCourse(null);

  const openMembershipCheckout = (pkg: MembershipPackage) => {
    setCheckoutCourse(null);
    setCheckoutMembership(pkg);
  };
  const closeMembershipCheckout = () => setCheckoutMembership(null);

  const purchaseMembership = (
    pkg: MembershipPackage,
    paymentMethod: Order["paymentMethod"],
    discount: number,
    finalAmount: number
  ): string => {
    const referenceNumber = generateRef("IEH-MEM");
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      referenceNumber,
      customerName: currentUser?.name || "Demo Student",
      customerEmail: currentUser?.email || "student@ieh.com",
      itemType: "membership",
      itemId: pkg.id,
      itemTitle: `${pkg.name} Membership Package`,
      amount: pkg.price,
      discount,
      finalAmount,
      paymentMethod,
      paymentStatus: "Paid",
      orderStatus: "Completed",
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    saveItem("orders", updatedOrders);

    // Activate membership and unlock all courses included in this package
    setActiveMembershipId(pkg.id);
    saveItem("active_membership_id", pkg.id);

    const unlockedIds = Array.from(new Set([...enrolledCourseIds, ...pkg.unlockedCourseIds]));
    setEnrolledCourseIds(unlockedIds);
    saveItem("enrolled_ids", unlockedIds);

    showNotification(
      `${pkg.name} Membership activated! ${pkg.unlockedCourseIds.length} courses unlocked in your dashboard.`
    );
    return referenceNumber;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        loginAs,
        logout,
        registerUser,
        updateProfile,
        courses,
        enrolledCourseIds,
        completedLessons,
        enrollInCourse,
        toggleLessonCompleted,
        addCourse,
        updateCourse,
        deleteCourse,
        services,
        consultations,
        bookConsultation,
        updateConsultationStatus,
        addService,
        updateService,
        deleteService,
        liveClasses,
        scheduleLiveClass,
        updateLiveClass,
        orders,
        createOrder,
        updateOrderStatus,
        coupons,
        applyCoupon,
        addCoupon,
        toggleCoupon,
        deleteCoupon,
        tickets,
        submitTicket,
        replyTicket,
        updateTicketStatus,
        announcements,
        addAnnouncement,
        certificates,
        membershipPackages,
        activeMembershipId,
        checkoutMembership,
        openMembershipCheckout,
        closeMembershipCheckout,
        purchaseMembership,
        checkoutCourse,
        openCheckout,
        closeCheckout,
        notification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
