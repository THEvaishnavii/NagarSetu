import dotenv from "dotenv";
dotenv.config();

import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

// One fixed "now" so the same call always gives the same time
// (an issue's createdAt and its first history row must match exactly)
const NOW = Date.now();

function hoursAgo(hours) {
  return new Date(NOW - hours * 60 * 60 * 1000);
}

function daysAgo(days) {
  return hoursAgo(days * 24);
}

async function main() {
    
  await prisma.upvote.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.statusHistory.deleteMany();
  await prisma.issue.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();


  
  // ============================================
  // 2. CREATE DEPARTMENTS
  // ============================================

  console.log("Creating departments...");

  const publicWorks = await prisma.department.create({
    data: {
      name: "Public Works",
      email: "publicworks@nagarsetu.test",
    },
  });

  const sanitation = await prisma.department.create({
    data: {
      name: "Sanitation",
      email: "sanitation@nagarsetu.test",
    },
  });

  const waterBoard = await prisma.department.create({
    data: {
      name: "Water Board",
      email: "water@nagarsetu.test",
    },
  });

  const electrical = await prisma.department.create({
    data: {
      name: "Electrical",
      email: "electrical@nagarsetu.test",
    },
  });

  const parks = await prisma.department.create({
    data: {
      name: "Parks & Rec",
      email: "parks@nagarsetu.test",
    },
  });

  // ============================================
  // 3. CREATE USERS
  // ============================================



  const passwordHash = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "SMC Admin",
      email: "admin@nagarsetu.test",
      passwordHash: passwordHash,
      role: "ADMIN",
      
    },
  });

  const priya = await prisma.user.create({
    data: {
      name: "Priya Patil",
      email: "priya@nagarsetu.test",
      passwordHash: passwordHash,
      role: "CITIZEN",
    },
  });

  const rohan = await prisma.user.create({
    data: {
      name: "Rohan Kulkarni",
      email: "rohan@nagarsetu.test",
      passwordHash: passwordHash,
      role: "CITIZEN",
    },
  });

  const sneha = await prisma.user.create({
    data: {
      name: "Sneha Jadhav",
      email: "sneha@nagarsetu.test",
      passwordHash: passwordHash,
      role: "CITIZEN",
    },
  });
  

  // ============================================
  // 4. CREATE ISSUES
  // ============================================


  // Issue #1
  const issue1 = await prisma.issue.create({
    data: {
      title: "Massive pothole near Rajwada Chowk",
      description:
        "A large pothole has developed near Rajwada Chowk and is dangerous for vehicles.",
      category: "POTHOLE",
      status: "REPORTED",
      reporterId: priya.id,
      departmentId: publicWorks.id,
      latitude: 16.8800,
      longitude: 74.6100,

      // Put your image URL here if you have one
      imageUrl: "https://res.cloudinary.com/ybjeh2bo/image/upload/v1791265166/accident-tupk_2025091545722.jpg",
      createdAt: hoursAgo(2),

      statusHistory: {
        create: {
          fromStatus: null,
          toStatus: "REPORTED",
          changedById: priya.id,
          createdAt: hoursAgo(2),
        },
      },
    },
  });

  // Issue #2
  const issue2 = await prisma.issue.create({
    data: {
      title: "Deep pothole outside the bank",
      description:
        "A deep pothole outside the bank is causing difficulty for vehicles and pedestrians.",
      category: "POTHOLE",
      status: "REPORTED",
      reporterId: rohan.id,
      departmentId: publicWorks.id,
      latitude: 16.7000,
      longitude: 74.4500,

      // No photo for this issue
      createdAt: hoursAgo(5),

      statusHistory: {
        create: {
          fromStatus: null,
          toStatus: "REPORTED",
          changedById: rohan.id,
          createdAt: hoursAgo(5),
        },
      },
    },
  });

  // Issue #3
  const issue3 = await prisma.issue.create({
    data: {
      title: "Overflowing garbage bin at Market Yard",
      description:
        "The garbage bin at Market Yard is overflowing and waste is spreading onto the road.",
      category: "GARBAGE",
      status: "ACKNOWLEDGED",
      reporterId: sneha.id,
      departmentId: sanitation.id,
      latitude: 16.9500,
      longitude: 74.7000,


      imageUrl: "https://res.cloudinary.com/ybjeh2bo/image/upload/v1791265354/high.jpg",
      createdAt: daysAgo(1),

      statusHistory: {
        create: [
          {
            fromStatus: null,
            toStatus: "REPORTED",
            changedById: sneha.id,
            createdAt: daysAgo(1),
          },
          {
            fromStatus: "REPORTED",
            toStatus: "ACKNOWLEDGED",
            changedById: admin.id,
            createdAt: hoursAgo(12),
          },
        ],
      },
    },
  });

  // Issue #4
  const issue4 = await prisma.issue.create({
    data: {
      title: "pipe leakage Miraj Road",
      description:
        "A burst water pipe is flooding part of Miraj Road and creating a safety hazard.",

      category: "WATER",
      status: "IN_PROGRESS",

      reporterId: priya.id,
      departmentId: waterBoard.id,
      latitude: 16.7800,
      longitude: 74.5200,

      imageUrl: "https://res.cloudinary.com/ybjeh2bo/image/upload/v1791265450/images.jpg",
      

      aiSuggestedCategory: "WATER",
      aiBrief:
        "AI detected a likely water leakage from the submitted complaint.",
      adminNotes: "Contractor visiting Friday.",
      createdAt: daysAgo(2),

      statusHistory: {
        create: [
          {
            fromStatus: null,
            toStatus: "REPORTED",
            changedById: priya.id,
            createdAt: daysAgo(2),
          },
          {
            fromStatus: "REPORTED",
            toStatus: "ACKNOWLEDGED",
            changedById: admin.id,
            createdAt: daysAgo(1.5),
          },
          {
            fromStatus: "ACKNOWLEDGED",
            toStatus: "IN_PROGRESS",
            changedById: admin.id,
            createdAt: daysAgo(1),
          },
        ],
      },
    },
  });

  // Issue #5
  const issue5 = await prisma.issue.create({
    data: {
      title: "Streetlights out near Walchand College",
      description:
        "Several streetlights near Walchand College are not working during the night.",
      category: "STREETLIGHT",
      status: "RESOLVED",
      reporterId: rohan.id,
      departmentId: electrical.id,
      latitude: 16.8524,
      longitude: 74.5815,

      createdAt: daysAgo(10),
      resolvedAt: daysAgo(5), // same moment as the RESOLVED history row

      statusHistory: {
        create: [
          {
            fromStatus: null,
            toStatus: "REPORTED",
            changedById: rohan.id,
            createdAt: daysAgo(10),
          },
          {
            fromStatus: "REPORTED",
            toStatus: "ACKNOWLEDGED",
            changedById: admin.id,
            createdAt: daysAgo(9),
          },
          {
            fromStatus: "ACKNOWLEDGED",
            toStatus: "IN_PROGRESS",
            changedById: admin.id,
            createdAt: daysAgo(7),
          },
          {
            fromStatus: "IN_PROGRESS",
            toStatus: "RESOLVED",
            changedById: admin.id,
            createdAt: daysAgo(5),
          },
        ],
      },
    },
  });

  // Issue #6
  const issue6 = await prisma.issue.create({
    data: {
      title: "Fallen tree near Ganpati Mandir",
      description:
        "A fallen tree is blocking part of the road near Ganpati Mandir.",
      category: "OTHER",
      status: "REPORTED",
      reporterId: sneha.id,
      latitude: 16.8610,
      longitude: 74.5890,

      // IMPORTANT:
      // No department yet.
      createdAt: hoursAgo(3),

      statusHistory: {
        create: {
          fromStatus: null,
          toStatus: "REPORTED",
          changedById: sneha.id,
          createdAt: hoursAgo(3),
        },
      },
    },
  });

  // Issue #7
  const issue7 = await prisma.issue.create({
    data: {
      // No title because AI hasn't processed it yet.
      title: null,

      description:
        "There is a civic issue near Krishna river ghat that needs attention.",

      // No category because AI hasn't processed it yet.
      // No department yet.

      status: "REPORTED",
      reporterId: priya.id,
      latitude: 16.8445,
      longitude: 74.5740,
      createdAt: hoursAgo(0.5), // 30 minutes ago

      statusHistory: {
        create: {
          fromStatus: null,
          toStatus: "REPORTED",
          changedById: priya.id,
          createdAt: hoursAgo(0.5),
        },
      },
    },
  });

  // Issue #8
  const issue8 = await prisma.issue.create({
    data: {
      title: "Streetlight not working",
      
      // No description intentionally.
      description: null,

      category: "STREETLIGHT",
      status: "ACKNOWLEDGED",
      reporterId: rohan.id,
      departmentId: electrical.id,
      latitude: 16.9200,
      longitude: 74.6500,
      createdAt: daysAgo(4),

      statusHistory: {
        create: [
          {
            fromStatus: null,
            toStatus: "REPORTED",
            changedById: rohan.id,
            createdAt: daysAgo(4),
          },
          {
            fromStatus: "REPORTED",
            toStatus: "ACKNOWLEDGED",
            changedById: admin.id,
            createdAt: daysAgo(3),
          },
        ],
      },
    },
  });

  // ============================================
  // 5. CREATE UPVOTES
  // ============================================



  await prisma.upvote.createMany({
    data: [
      // Issue #1
      {
        issueId: issue1.id,
        userId: rohan.id,
      },
      {
        issueId: issue1.id,
        userId: sneha.id,
      },

      // Issue #3
      {
        issueId: issue3.id,
        userId: priya.id,
      },

      // Issue #4
      {
        issueId: issue4.id,
        userId: rohan.id,
      },

      // Issue #5
      {
        issueId: issue5.id,
        userId: priya.id,
      },
      {
        issueId: issue5.id,
        userId: sneha.id,
      },
    ],
  });

  // ============================================
  // 6. CREATE COMMENTS
  // ============================================



  await prisma.comment.createMany({
    data: [
      {
        issueId: issue1.id,
        userId: rohan.id,
        text: "Hit this pothole on my bike yesterday, really dangerous.",
      },
      {
        issueId: issue1.id,
        userId: sneha.id,
        text: "It gets worse every time it rains.",
      },
      {
        issueId: issue4.id,
        userId: admin.id,
        text: "Forwarded to the Water Board team.",
      },
      {
        issueId: issue3.id,
        userId: priya.id,
        text: "The bin hasn't been emptied since Monday.",
      },
    ],
  });

  // ============================================
  // 7. FINISHED
  // ============================================

  console.log("Seed completed successfully!");
  console.log("Created:");
  console.log("- 5 departments");
  console.log("- 4 users");
  console.log("- 8 issues");
  console.log("- 15 status history records");
  console.log("- 6 upvotes");
  console.log("- 4 comments");
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });