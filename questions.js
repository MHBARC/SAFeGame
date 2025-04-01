// SAFe Showdown Game Questions
const questions = [
    // EASY QUESTIONS (5)
    {
        text: "What does SAFe stand for?",
        visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><div style='font-size:40px;'>🏗️</div><div style='display:inline-block;background:#f5f5f5;border-radius:10px;padding:15px;margin-top:15px;'><div style='font-size:24px;font-weight:bold;'>S A F e</div><div style='margin-top:10px;font-size:16px;'>stands for...</div></div></div>",
        answer: "<strong>S</strong>caled <strong>A</strong>gile <strong>F</strong>ramework<br>Learn more: <a href='https://www.scaledagile.com/what-is-safe/' target='_blank'>What is SAFe?</a>",
        difficulty: "Easy",
        type: "standard"
    },
    {
        text: "What are the four Core Values of SAFe?",
        visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><div style='background:#f9f9f9;padding:20px;border-radius:10px;'><h2 style='color:#e21836;'>Core Values</h2><div style='display:flex;flex-wrap:wrap;justify-content:center;gap:10px;'><div style='width:80px;height:80px;background:#f8e9eb;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;'>?</div><div style='width:80px;height:80px;background:#f8e9eb;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;'>?</div><div style='width:80px;height:80px;background:#f8e9eb;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;'>?</div><div style='width:80px;height:80px;background:#f8e9eb;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:24px;'>?</div></div></div></div>",
        answer: "<div style='display:flex;flex-wrap:wrap;justify-content:center;gap:15px;'><div style='background:#f8e9eb;padding:10px;border-radius:5px;'><strong>Alignment</strong></div><div style='background:#f8e9eb;padding:10px;border-radius:5px;'><strong>Built-in Quality</strong></div><div style='background:#f8e9eb;padding:10px;border-radius:5px;'><strong>Transparency</strong></div><div style='background:#f8e9eb;padding:10px;border-radius:5px;'><strong>Program Execution</strong></div></div><br>Learn more: <a href='https://www.scaledagileframework.com/safe-core-values/' target='_blank'>SAFe Core Values</a>",
        difficulty: "Easy",
        type: "standard"
    },
    {
        text: "In SAFe, what does ART stand for?",
        visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><img src='ART.png' alt='Agile Train' style='max-width:90%;max-height:240px;'></div>",
        answer: "<strong>Agile Release Train</strong><br>A long-lived team of Agile teams that develops and delivers solutions incrementally.<br>Learn more: <a href='https://www.scaledagileframework.com/agile-release-train/' target='_blank'>Agile Release Train</a>",
        difficulty: "Easy",
        type: "standard"
    },
    {
        text: "Which of these statements is NOT aligned with SAFe Lean-Agile Principles?",
        visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><img src='safe-prinicples-pyramid-1.png' alt='SAFe Principles' style='max-width:80%;max-height:200px;'></div>",
        options: [
            "Decentralize decision-making",
            "Apply systems thinking",
            "Create detailed plans and follow them precisely",
            "Take an economic view"
        ],
        correctOption: 2,
        answer: "<strong>Option C: 'Create detailed plans and follow them precisely'</strong><br>This contradicts the Agile principle of responding to change over following a plan.<br>Learn more: <a href='https://www.scaledagileframework.com/safe-lean-agile-principles/' target='_blank'>SAFe Lean-Agile Principles</a>",
        difficulty: "Easy",
        type: "multiple-choice"
    },
    {
        text: "What is the primary purpose of Program Increment (PI) Planning in SAFe?",
        visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><img src='pi_planning.png' alt='PI Planning' style='max-width:80%;max-height:200px;'></div>",
        options: [
            "Creating detailed project plans for the next year",
            "Aligning all teams on the ART to a shared mission and vision",
            "Assigning tasks to individual team members",
            "Eliminating the need for sprint planning"
        ],
        correctOption: 1,
        answer: "<strong>Option B: 'Aligning all teams on the ART to a shared mission and vision'</strong><br>PI Planning aligns teams and stakeholders to a common mission for the upcoming Program Increment.<br>Learn more: <a href='https://www.scaledagileframework.com/pi-planning/' target='_blank'>PI Planning</a>",
        difficulty: "Easy",
        type: "multiple-choice"
    },
    
    // MEDIUM QUESTIONS (5)
    {
    text: "What is a Value Stream in SAFe?",
    visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><img src='valuestream.png' alt='Value Stream' style='max-width:90%;max-height:240px;'></div>",
    options: [
        "A specific sequence of steps that converts ideas into valuable solutions",
        "A financial model for calculating the value delivered by each team",
        "A method for creating user story maps across multiple ARTs",
        "A governance structure for funding projects"
    ],
    correctOption: 0,
    answer: "<strong>Option A: 'A specific sequence of steps that converts ideas into valuable solutions'</strong><br>Value Streams represent the series of steps used to deliver value to the customer, from concept to cash. They are the primary organizational construct in SAFe.<br>Learn more: <a href='https://www.scaledagileframework.com/value-streams/' target='_blank'>Value Streams</a>",
    difficulty: "Medium",
    type: "multiple-choice"
    },
    {
        text: "What does a Release Train Engineer (RTE) primarily do in SAFe?",
        visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><img src='RTE.png' alt='Release Train Engineer' style='max-width:80%;max-height:200px;'></div>",
        options: [
            "Develops code and completes user stories with the team",
            "Facilitates program execution and serves as a servant leader for the ART",
            "Prioritizes the portfolio backlog and manages the budget",
            "Creates detailed project plans and assigns tasks to team members"
        ],
        correctOption: 1,
        answer: "<strong>Option B: 'Facilitates program execution and serves as a servant leader for the ART'</strong><br>The RTE facilitates processes, removes impediments, manages risks, and drives continuous improvement.<br>Learn more: <a href='https://www.scaledagileframework.com/release-train-engineer-and-solution-train-engineer/' target='_blank'>Release Train Engineer Role</a>",
        difficulty: "Medium",
        type: "multiple-choice"
    },
    {
    text: "Which of the following correctly lists the five dimensions of Business Agility in SAFe?",
    visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><img src='agility.png' alt='Business Agility' style='max-width:90%;max-height:240px;'></div>",
    options: [
        "Leadership, Team, Process, Structure, Culture",
        "Mindset, Principles, Practices, Results, Transformation",
        "Strategy, Team, Ecosystem, Operations, Learning",
        "Governance, Innovation, Technical Excellence, Customer Value, Portfolio"
    ],
    correctOption: 0,
    answer: "<strong>Option A: 'Leadership, Team, Process, Structure, Culture'</strong><br>These are the five dimensions needed for true Business Agility in SAFe: Leaders who inspire, cross-functional teams, Lean-Agile processes, organizational structure aligned to the business, and a culture of innovation.<br>Learn more: <a href='https://www.scaledagileframework.com/business-agility/' target='_blank'>Business Agility</a>",
    difficulty: "Medium",
    type: "multiple-choice"
    },
   // Replacement for Question #9 (System Team)
    {
    text: "What is the role of a Scrum Master in SAFe?",
    visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><img src='scrummaster.png' alt='Scrum Master' style='max-width:90%;max-height:240px;'></div>",
    options: [
        "Developing and testing products with their Agile team",
        "Managing team resources, budgets, and schedules",
        "Coaching teams in Agile practices and removing impediments",
        "Defining the features that will be built by the team"
    ],
    correctOption: 2,
    answer: "<strong>Option C: 'Coaching teams in Agile practices and removing impediments'</strong><br>Scrum Masters coach teams in self-organization and cross-functionality, facilitate team events, remove impediments, and foster an environment for high-performing teams.<br>Learn more: <a href='https://www.scaledagileframework.com/scrum-master/' target='_blank'>Scrum Master</a>",
    difficulty: "Medium",
    type: "multiple-choice"
    },
    {
        text: "How does the WSJF (Weighted Shortest Job First) prioritization model work in SAFe?",
        visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><img src='WSJF.png' alt='WSJF Prioritization' style='max-width:80%;max-height:200px;'></div>",
        options: [
            "Dividing Business Value by Time Criticality",
            "Multiplying Risk Reduction by Job Size",
            "Dividing Cost of Delay by Job Size",
            "Adding User Value, Time Criticality, and Risk Reduction"
        ],
        correctOption: 2,
        answer: "<strong>Option C: 'Dividing Cost of Delay by Job Size'</strong><br>WSJF prioritizes work based on economic benefit per unit of job size. Cost of Delay combines user-business value, time criticality, and risk reduction-opportunity enablement.<br>Learn more: <a href='https://www.scaledagileframework.com/wsjf/' target='_blank'>WSJF (Weighted Shortest Job First)</a>",
        difficulty: "Medium",
        type: "multiple-choice"
    },
    
    // HARD QUESTIONS (5)
    {
        text: "What are PI Objectives in SAFe?",
        visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><img src='PIO.png' alt='PI Objectives' style='max-width:80%;max-height:200px;'></div>",
        answer: "<strong>PI Objectives</strong> are team-created, business-value-oriented goals for the Program Increment.<br>They are co-created during PI Planning, define what teams plan to deliver, and provide a basis for measuring progress. Success is measured by business value achievement.<br>Learn more: <a href='https://www.scaledagileframework.com/pi-objectives/' target='_blank'>PI Objectives</a>",
        difficulty: "Hard",
        type: "standard"
    },
    {
    text: "What is the purpose of the SAFe Implementation Roadmap?",
    visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><img src='implementation-roadmap.png' alt='Implementation Roadmap' style='max-width:90%;max-height:240px;'></div>",
    options: [
        "To document the detailed project plan with fixed deadlines for SAFe adoption",
        "To provide a step-by-step plan for implementing SAFe in an organization",
        "To establish the rules for which SAFe practices can be customized",
        "To compare the business performance before and after SAFe implementation"
    ],
    correctOption: 1,
    answer: "<strong>Option B: 'To provide a step-by-step plan for implementing SAFe in an organization'</strong><br>The Implementation Roadmap offers guidance through the critical moves, including training, launching ARTs, and extending to the portfolio. It helps organizations navigate the challenging transformation to SAFe.<br>Learn more: <a href='https://www.scaledagileframework.com/implementation-roadmap/' target='_blank'>Implementation Roadmap</a>",
    difficulty: "Hard",
    type: "multiple-choice"
    },
    {
        text: "What is the role of the Product Owner in SAFe?",
        visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><img src='PO.png' alt='Product Owner Role' style='max-width:80%;max-height:200px;'></div>",
        answer: "<strong>The Product Owner</strong> is responsible for maximizing the value of the product by articulating customer needs and working with the team to define and prioritize the Team Backlog.<br>They define Stories, accept completed Stories, and collaborate with Product Management.<br>Learn more: <a href='https://www.scaledagileframework.com/product-owner/' target='_blank'>Product Owner</a>",
        difficulty: "Hard",
        type: "standard"
    },
    {
        text: "What are Feature Acceptance Criteria in SAFe?",
        visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><img src='AC.png' alt='Acceptance Criteria' style='max-width:80%;max-height:200px;'></div>",
        answer: "<strong>Feature Acceptance Criteria</strong> define the requirements and behaviors that a Feature must exhibit to be accepted by stakeholders.<br>They are brief, testable statements that focus on confirming when a Feature is 'done' and are verified through demonstrated working software.<br>Learn more: <a href='https://www.scaledagileframework.com/features-and-capabilities/' target='_blank'>Features and Capabilities</a>",
        difficulty: "Hard",
        type: "standard"
    },
    {
        text: "What are Enablers in SAFe and what purpose do they serve?",
        visual: "<div style='text-align:center;min-height:220px;display:flex;flex-direction:column;justify-content:center;align-items:center;'><img src='enablers.png' alt='Enablers' style='max-width:80%;max-height:200px;'></div>",
        answer: "<strong>Enablers</strong> are activities that support the development and delivery of future business functionality.<br>They include exploration, architecture, infrastructure, and compliance. Enablers help extend the Architectural Runway, supporting faster delivery of future business features.<br>Learn more: <a href='https://www.scaledagileframework.com/enablers/' target='_blank'>Enablers</a>",
        difficulty: "Hard",
        type: "standard"
    }
];

// Export the questions so they can be used in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { questions };
} else {
    // Make questions available globally for browser environment
    window.gameQuestions = questions;
}