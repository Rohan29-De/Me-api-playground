const db = require("./database");

db.serialize(() => {
  // Clear existing data
  db.run("DELETE FROM profile");
  db.run("DELETE FROM skills");
  db.run("DELETE FROM projects");
  db.run("DELETE FROM project_skills");
  db.run("DELETE FROM work");
  db.run("DELETE FROM links");

  // Insert profile
  db.run(
    `INSERT INTO profile (name, email, education)
     VALUES (?, ?, ?)`,
    [
      "Rohan Sharma",
      "rohan9588023806@gmail.com",
      "B.E. in Computer Science and Engineering, Chandigarh University (2022–2026)"
    ]
  );

  // Insert skills
  const skills = [
    "Java",
    "JavaScript",
    "Solidity",
    "HTML",
    "SQL",
    "React",
    "Spring WebFlux",
    "Web3.js",
    "Git",
    "Linux",
    "Postman"
  ];

  skills.forEach(skill => {
    db.run("INSERT INTO skills (name) VALUES (?)", [skill]);
  });

  // Insert projects
  db.run(
    `INSERT INTO projects (title, description, link)
     VALUES (?, ?, ?)`,
    [
      "Comsub (PHP)",
      "Email verification and subscription system that sends a random XKCD comic daily using CRON jobs.",
      "https://github.com/Rohan29-De"
    ]
  );

  db.run(
    `INSERT INTO projects (title, description, link)
     VALUES (?, ?, ?)`,
    [
      "Banking Web Application",
      "Reactive banking application built with Spring WebFlux and MySQL, focused on high concurrency and functional programming.",
      "https://github.com/Rohan29-De"
    ]
  );

  db.run(
    `INSERT INTO projects (title, description, link)
     VALUES (?, ?, ?)`,
    [
      "Decentralized Fund Transfer DApp",
      "Ethereum-based DApp for secure peer-to-peer fund transfers using Solidity, Hardhat, and React.",
      "https://github.com/Rohan29-De"
    ]
  );

  // Insert work experience
  db.run(
    `INSERT INTO work (company, role, description)
     VALUES (?, ?, ?)`,
    [
      "Metacrafter (Remote)",
      "Blockchain Intern",
      "Developed decentralized fund transfer applications and optimized Avalanche subnets using HyperSDK for higher throughput and lower gas fees."
    ]
  );

  // Insert social links
  db.run(
    `INSERT INTO links (github, linkedin, portfolio)
     VALUES (?, ?, ?)`,
    [
      "https://github.com/Rohan29-De",
      "https://linkedin.com/in/rohansharma2912",
      "https://github.com/Rohan29-De"
    ]
  );

  console.log("Database seeded successfully with resume data");
});

db.close();
