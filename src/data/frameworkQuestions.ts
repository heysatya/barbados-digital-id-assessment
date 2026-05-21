export type FrameworkQuestion = {
    q_code: string;
    pillar_code: string;
    pillar_name: string;
    subpillar_code: string;
    subpillar_name: string;
    survey_type: "expert" | "stakeholder";
    question_text: string;
    options: {
        score: 1 | 2 | 3 | 4 | 5 | 9;
        label: string;
        description: string;
    }[];
    allow_unknown: boolean;
};

export const frameworkQuestions: FrameworkQuestion[] = [
    {
        "q_code": "P1.1.EX.Q1",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.1",
        "subpillar_name": "Coverage & Inclusion",
        "survey_type": "expert",
        "question_text": "How inclusive is digital ID enrollment across all population groups and regions in Barbados, and what measures ensure reach to marginalized or hard-to-reach populations?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Coverage below 20%; foundational data collection on demographic breakdowns is being established, with inclusion goals under development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Coverage 20-40%; basic outreach occurs in underserved areas and alternative verification methods are available, though uptake remains limited."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Coverage 40-70%; a formal inclusion plan with measurable targets for vulnerable groups is active, and implementation is independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Coverage 70-90%; live dashboards track enrollment gaps by group, community agents are deployed in hard-to-reach areas, and multiple enrollment methods reduce barriers."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Coverage exceeds 90%; no one is excluded due to system design; Barbados's inclusion approach is recognized and shared as a model across CARICOM."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.1.EX.Q2",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.1",
        "subpillar_name": "Coverage & Inclusion",
        "survey_type": "expert",
        "question_text": "How strong are accessibility and non-discrimination protections in the enrollment process?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Accessibility requirements for enrollment design have not yet been implemented; current interfaces cater to baseline physical and digital capabilities."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic accessibility accommodations are available informally; accessibility compliance has not been assessed, and non-discrimination is not enforced."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Accessibility compliance has been assessed and is implemented for all digital channels; legally mandated non-discrimination provisions apply, and compliance is independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Accessibility proactively monitored through user testing with persons with disabilities; compliance audits published."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Accessibility standards exceed legal minimums; system independently recognized as a global model for inclusive design."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.2.EX.Q1",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.2",
        "subpillar_name": "User Experience",
        "survey_type": "expert",
        "question_text": "How easy is the digital ID system to use across different channels and devices?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Current interface designs primarily cater to users with baseline digital literacy; formal usability testing is pending"
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic usability testing done with limited user groups; some channel options available."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Comprehensive usability research with diverse user representation informs design; multiple channels (online, mobile, in-person) available, and implementation is independently confirmed."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Continuous usability feedback loops drive iterative improvements; satisfaction scores benchmarked and reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "System recognized as exemplary in user-centered design; usability innovations contributed to global digital ID/ DPI best practices."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.2.EX.Q2",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.2",
        "subpillar_name": "User Experience",
        "survey_type": "expert",
        "question_text": "How effectively does Trident support users across varying levels of digital literacy, ability, and connectivity including offline or low-connectivity scenarios?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Dedicated accessibility features and offline capabilities are in early development; assisted enrollment procedures are being mapped out."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Partial accessibility guideline compliance; assisted enrollment available informally in some locations; offline enrollment possible but verification requires connectivity."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Full accessibility compliance across all channels; assisted enrollment available as a standard service; seamless offline/online synchronization operational and independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Accessibility proactively monitored through user testing with persons with disabilities; digital literacy support delivered via simplified interfaces and guided tutorials; offline capability supports full range of ID use cases."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident is an internationally recognized model for accessible, connectivity-resilient public digital services; offline-first innovations contributed to global DPI standards."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.3.EX.Q1",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.3",
        "subpillar_name": "Service Integration",
        "survey_type": "expert",
        "question_text": "How widely is digital ID integrated into government services?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Integration into core government services is pending; physical documents currently remain the primary method for access."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Digital ID is accepted in some government services, but there is no mandate for broader integration."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Digital ID accepted across three or more core government services via standardized API-based authentication, and implementation is independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Digital ID accepted across the full public sector with a single sign-on experience; adoption monitored and publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Digital ID universally accepted across all public services; cross-border government service access enabled."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.3.EX.Q2",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.3",
        "subpillar_name": "Service Integration",
        "survey_type": "expert",
        "question_text": "How broadly is digital ID accepted by the private sector and statutory institutions?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Private sector acceptance of the digital ID is currently in the initial exploration and scoping phase"
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "A small number of private companies accept digital ID voluntarily; statutory bodies and agencies operate independent identity systems."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Private sector acceptance mandated for regulated industries (banking, telecoms); statutory adoption under a standard process, and compliance is independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Widespread voluntary private sector adoption beyond mandated industries; thriving digital identity ecosystem."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Universal private and statutory acceptance achieved; cross-border private sector services enabled."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.3.EX.Q3",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.3",
        "subpillar_name": "Service Integration",
        "survey_type": "expert",
        "question_text": "How consistently can users rely on digital ID across priority service journeys?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Consistent user experience across service journeys is currently under development; authentication processes may occasionally require manual intervention"
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Users can rely on digital ID for limited service journeys, but experience inconsistency in other areas."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Users can consistently use digital ID across defined priority service journeys; reliability is enhanced due to user redress mechanisms, and performance is independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "User trust demonstrated through survey data with redress mechanisms; performance metrics are publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Reliability exceeds 99.9% for all service journeys; user trust data publicly reported."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.4.EX.Q1",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.4",
        "subpillar_name": "Value",
        "survey_type": "expert",
        "question_text": "To what extent has digital ID reduced transaction time and cost for users and service providers?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Mechanisms for formally measuring transaction time reduction are currently being formulated."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Time tracking conducted for limited services with preliminary evidence of transaction time reduction."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Transaction time reduction systematically measured for key services; baseline established and improvements documented, with results independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Ongoing efficiency gains tracked across all services, with real-time data and cost-benefit analyses."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Regular benchmarking confirms significant improvements in transaction efficiency; time savings independently verified."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.4.EX.Q2",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.4",
        "subpillar_name": "Value",
        "survey_type": "expert",
        "question_text": "How much economic and social value has digital ID generated through cost savings or convenience gains?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Frameworks for formally assessing the economic and social value of the digital ID, alongside baseline service delivery costs, are currently in the planning phase."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Initial analyses of potential cost savings in a limited number of services are underway, but no formal cost-benefit analysis has been completed."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A formal cost-benefit analysis or economic impact assessment has been conducted and published, with findings independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Economic impact has been independently verified, and value is tracked systematically across different service categories and user groups."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Digital ID's economic contribution recognized in national accounts or by international development organizations."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.4.EX.Q3",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.4",
        "subpillar_name": "Value",
        "survey_type": "expert",
        "question_text": "How well are efficiency improvements measured and used to drive service delivery improvements?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Efficiency metrics not defined for digital ID-enabled services; no feedback loop links performance data to improvement decisions."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Some performance metrics tracked informally; efficiency data reviewed periodically but does not systematically drive improvement."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Performance measurement framework with defined KPIs operational for digital ID-enabled services, and implementation is independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Real-time performance analytics integrated into service management dashboards; improvements tracked publicly."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Performance data informs agile service redesign in real time; methodology contributed to global DPI standards."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.5.EX.Q1",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.5",
        "subpillar_name": "Improvement",
        "survey_type": "expert",
        "question_text": "How systematically is user feedback collected and acted upon for digital ID-enabled services?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formalized, multi-channel user feedback mechanisms are currently being developed."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic feedback channels exist; feedback is reviewed on an ad hoc basis, and there is no systematic tracking or analysis."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Multi-channel feedback system with automated routing and tracking operational; feedback categorized and reviewed in structured cycles, and implementation is independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Advanced analytics on feedback data identify systemic issues proactively; feedback informs co-design of service enhancements."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Real-time feedback drives adaptive service optimization; feedback methodology contributed to global DPI service design standards."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.5.EX.Q2",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.5",
        "subpillar_name": "Improvement",
        "survey_type": "expert",
        "question_text": "How systematically is service performance monitored, and how effectively are these metrics used to drive continuous improvement and resolve systemic issues?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formal service performance monitoring and structured continuous improvement processes for resolving systemic issues are yet to be formalized."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic performance metrics are tracked internally; issues are addressed informally on an ad-hoc basis, with retrospective reviews occurring primarily after major incidents."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A systematic performance monitoring framework with defined KPIs is operational; structured, data-driven continuous improvement processes are institutionalized and independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Advanced analytics proactively detect performance degradation; time-bound improvement actions are tracked in a public register, frequently involving co-design with users."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Real-time performance monitoring drives agile, adaptive service optimization; the improvement methodology contributes to global DPI service management standards."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.1.NE.Q1",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.1",
        "subpillar_name": "Coverage & Inclusion",
        "survey_type": "stakeholder",
        "question_text": "How inclusive is Trident enrollment across all population groups and regions?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Initial enrollment covers specific early-adopter segments; structured inclusion tracking and targeted outreach plans are currently being conceptualized."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Enrollment is expanding steadily; basic demographic data is collected, and initial outreach efforts are being tested in specific communities."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A formal inclusion plan is actively driving enrollment across demographic groups; measurable goals are in place, and progress is tracked in public reports."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Broad enrollment is achieved; real-time dashboards allow anyone to check online to see which groups still need more support, driving proactive inclusion."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Near-universal enrollment is achieved; no one is excluded due to Trident's design, and the inclusive approach is shared as a model with other CARICOM countries."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.1.NE.Q2",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.1",
        "subpillar_name": "Coverage & Inclusion",
        "survey_type": "stakeholder",
        "question_text": "What specific measures exist to reach marginalized or hard-to-reach populations?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Foundational work is underway to develop specific outreach programs or alternative enrollment methods for hard-to-reach populations."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Outreach activities are conducted in rural areas, and some alternative identification methods have been proposed, but they are not yet fully implemented."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A formal inclusion program targets specific groups such as people with disabilities, the elderly, and remote communities, and implementation is confirmed through public reports."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Each year, a public report shows who is still excluded; community agents operate in hard-to-reach areas with results anyone can verify."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Outside reviewers have confirmed publicly that no one is excluded because of how Trident is designed; the model is recognized across CARICOM."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.2.NE.Q1",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.2",
        "subpillar_name": "User Experience",
        "survey_type": "stakeholder",
        "question_text": "How easy is Trident to use across different channels and devices?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formal user testing is not currently conducted; navigating the system may require a baseline of digital literacy that creates barriers."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Some basic usability testing has been done but with a limited group of people."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Trident was designed based on research with a wide range of users; multiple ways to access it are available, and user satisfaction is tracked in public reports."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "User feedback is collected continuously and drives improvements; satisfaction scores are published where anyone can see them."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident is recognized across the Caribbean for excellent user-centered design; innovations are shared openly for others to learn from."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.2.NE.Q2",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.2",
        "subpillar_name": "User Experience",
        "survey_type": "stakeholder",
        "question_text": "How well does Trident support users with disabilities, low digital literacy, or limited connectivity?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Digital channels currently lack dedicated accessibility features for persons with disabilities; formal support for low digital literacy is unavailable."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic accessibility measures are in place, but support for low digital literacy or connectivity challenges is inconsistent."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Formal accessibility standards are met for all digital interfaces; assisted enrollment processes are documented and consistently applied."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Accessibility goes beyond legal minimums; dedicated support is available for all users who need it, and outcomes are reported publicly."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident is recognized internationally for accessible public digital design; the approach is shared as a model for the region."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.3.NE.Q1",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.3",
        "subpillar_name": "Service Integration",
        "survey_type": "stakeholder",
        "question_text": "How widely is Trident integrated into government services?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Trident is not yet integrated into core government services; physical documents remain the primary method for access."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Initial integration efforts have begun, with Trident currently accepted in select pilot government services."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Trident is accepted across several core government services through a standard connection process (e.g., NIS, BRA, or passport services in Barbados), and this is confirmed through public reporting."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "A single Trident login works across all government services; adoption is tracked and anyone can check the results online."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident is accepted by all public services and some cross-border services within CARICOM; the integration approach is shared as a regional reference."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.3.NE.Q2",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.3",
        "subpillar_name": "Service Integration",
        "survey_type": "stakeholder",
        "question_text": "How broadly is Trident accepted by the private sector and statutory institutions?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Private sector and parish-level integration with Trident is currently in the planning or early exploration stages."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Early adoption is underway, with select private companies integrating Trident, while parish-level services currently utilize separate systems."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Banks and telecoms are required to accept Trident; parish-level services have adopted it, and compliance is verified through public reports."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Most private companies accept Trident and build value-added services on top of it; anyone can see which businesses participate."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Private and statutory acceptance is universal across Barbados; cross-border private sector services with CARICOM partners are enabled."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.4.NE.Q1",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.4",
        "subpillar_name": "Value",
        "survey_type": "stakeholder",
        "question_text": "To what extent has Trident reduced transaction time and cost for users and service providers?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Time and cost savings generated by Trident are not yet formally tracked or measured."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Time to complete key transactions has been measured in a few specific cases, but no overall or comparative analysis exists."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Time savings from using Trident are measured for the main services, and results are published where anyone can see them."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Transaction times are tracked in real time across all Trident services and converted into economic savings that are publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Barbados ranks among the best in the Caribbean for transaction efficiency using Trident; savings are independently confirmed."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.4.NE.Q2",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.4",
        "subpillar_name": "Value",
        "survey_type": "stakeholder",
        "question_text": "How much economic and social value has Trident generated through cost savings or convenience gains?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "No formal studies assessing the economic and social convenience benefits of Trident have been done."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Some anecdotal evidence of savings exists but no formal study has been done."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A formal study has been done showing the economic and social benefits of Trident, and findings are published publicly."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Independent studies show the economic impact of Trident; results are broken down by service and user group and anyone can access them."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident's contribution to the economy is officially recognized nationally and by CARICOM institutions."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.5.NE.Q1",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.5",
        "subpillar_name": "Improvement",
        "survey_type": "stakeholder",
        "question_text": "How systematically is user feedback collected and acted upon for Trident-enabled services?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "There is no formal way for people to give feedback about their Trident experience."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Formalized, accessible channels for the public to provide feedback on their Trident experience are currently being developed."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A multi-channel feedback system is in place; feedback is tracked and used to improve services, and progress is reported publicly."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Analytics on feedback data identify problems before they escalate; feedback informs service redesign and anyone can see what changes were made."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Feedback drives real-time service adaptation; the feedback approach is shared across CARICOM as a best practice."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P1.5.NE.Q2",
        "pillar_code": "P1",
        "pillar_name": "Service Delivery & User Value",
        "subpillar_code": "P1.5",
        "subpillar_name": "Improvement",
        "survey_type": "stakeholder",
        "question_text": "How well is service performance monitored and acted upon?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formal mechanisms for publicly monitoring and reporting on Trident's service performance are not currently in place"
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic performance data (like whether the system is online) is tracked internally but not shared publicly."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A performance monitoring system with clear targets and public dashboards is in place; anyone can check online to see how Trident is doing."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Advanced tools detect problems before they affect users; improvement actions are publicly tracked and results are visible to everyone."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Performance monitoring is real time and drives continuous improvement; the approach is recognized across the Caribbean as a model."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.1.EX.Q1",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.1",
        "subpillar_name": "Consent & Data Minimization",
        "survey_type": "expert",
        "question_text": "How well does the system implement informed consent for data collection and sharing?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formal consent mechanisms and transparent data-sharing protocols are currently in development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic consent notices provided at enrollment but not informed (complex language, pre-ticked boxes); no withdrawal mechanism."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Informed consent obtained in plain language at point of data collection; user portal enables consent management and withdrawal, and compliance is independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Granular, dynamic consent allows users to control data sharing per service; consent logs available to users in real time."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Consent architecture is a global reference for privacy-respecting digital identity; advanced consent technologies deployed."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.1.EX.Q2",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.1",
        "subpillar_name": "Consent & Data Minimization",
        "survey_type": "expert",
        "question_text": "To what extent are data minimization and purpose limitation applied in practice?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Data minimization and strict purpose limitation protocols are currently being standardized for future implementation."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Data minimization and purpose limitation stated in policy but technical enforcement mechanisms are absent or inconsistently applied."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Data minimization implemented in system design; only data required for each specific service collected and exchanged, and this is confirmed through independent audit."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Automated data minimization routines purge data exceeding retention limits; purpose limitation verified through independent audits."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Privacy-preserving credential technologies (e.g., selective disclosure, zero-knowledge proofs) eliminate unnecessary data sharing."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.1.EX.Q3",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.1",
        "subpillar_name": "Consent & Data Minimization",
        "survey_type": "expert",
        "question_text": "How strong are user rights and controls over their personal data (access, correction, portability, deletion)?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Digital self-service mechanisms for users to access, correct, or port their personal data are not yet in place."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "User rights are stated in policy but exercising them requires a complex manual process with long response times."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Users can access, correct, and (where legally applicable) delete or port their data through a self-service portal, and implementation is independently confirmed."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "User rights exercisable in real time via a digital dashboard; rights exercise logged and independently verified."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "User rights mechanisms technically advanced (e.g., machine-readable personal data export); recognized globally."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.2.EX.Q1",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.2",
        "subpillar_name": "Transparency & Explainability",
        "survey_type": "expert",
        "question_text": "How proactively and transparently are system rules, operational processes, and privacy documentation disclosed to the public?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Frameworks for the proactive public disclosure of system documentation, decision logic, and privacy notices are currently being established."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "High-level descriptions and basic privacy notices are published, but detailed operational rules are internal, and system changes are not proactively communicated."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Comprehensive public reporting covers system rules and operational performance; privacy notices and system change notifications are proactively published and independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Real-time transparency dashboards enable public monitoring; users are proactively notified of all data changes, with documentation available in multiple formats."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Proactive disclosure is embedded as a core design principle; transparency tools contribute to global DPI repositories and serve as a regional standard."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.2.EX.Q2",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.2",
        "subpillar_name": "Transparency & Explainability",
        "survey_type": "expert",
        "question_text": "How clearly are manual administrative decisions about Trident (such as rejections, corrections, or appeals) explained to the people they affect?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Standardized processes for providing detailed explanations regarding administrative decisions are not yet in place."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "A generic reason is provided for administrative decisions but it does not explain the specific basis or how to challenge it."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Individuals receive a written explanation of the specific reasons for decisions affecting their ID status, with information on how to appeal; decisions are logged and audit trails are maintained."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Explanations are provided in plain language within a defined timeframe; a summary of all administrative decisions and their outcomes is published annually."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Decision explanations are accessible in multiple formats (written, audio, in-person); explanations are independently assessed for clarity and completeness; the model is a regional reference."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.3.EX.Q1",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.3",
        "subpillar_name": "Accountability & Redress",
        "survey_type": "expert",
        "question_text": "How accessible, timely, and effective are the multi-channel mechanisms for lodging and resolving digital ID complaints?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Dedicated complaint tracking mechanisms and standardized timeframes for dispute resolution are currently being formalized."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic complaint channels exist but are not widely advertised; resolutions are generally effective but lack structured, consistent timeframes."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A multi-channel complaint system is operational; formal resolution processes with defined timelines are consistently applied, and performance is independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Complaint mechanisms are highly accessible via digital self-service; resolution timeline compliance is publicly reported, and repeat complaints trigger systemic reviews."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Resolution timelines and remedy rates are published in real-time; systemic issues identified through complaints drive proactive improvements to global DPI accountability frameworks."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.3.EX.Q2",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.3",
        "subpillar_name": "Accountability & Redress",
        "survey_type": "expert",
        "question_text": "How functional are administrative or judicial review channels for challenging digital ID decisions?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Specialized administrative or judicial review channels dedicated to digital ID decisions are not yet in place."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Administrative appeal process exists in theory but is difficult to navigate; judicial review costly and complex."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Accessible administrative review channel with defined timelines and standards operational; judicial review available and affordable, and usage data is independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Administrative and judicial review channels actively used and effective; success rates, timelines, and remedies publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Review channels continuously improved based on outcomes data; model contributed to global DPI accountability frameworks."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.4.EX.Q1",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.4",
        "subpillar_name": "Inclusion & Non-Discrimination",
        "survey_type": "expert",
        "question_text": "How systematically are inclusion risks assessed, and what legal or operational protections are enforced to safeguard vulnerable groups against discrimination?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Specific legislative provisions and formalized inclusion risk assessment protocols for system design are currently being formulated."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Non-discrimination provisions exist in policy but lack consistent operational monitoring; inclusion risk assessments are conducted informally on an ad-hoc basis."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Anti-discrimination measures are integrated into procedures; systematic inclusion risk assessments are integrated into major deployments, with documented mitigation measures independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "An independent body enforces anti-discrimination measures; inclusion risk assessments are conducted by external experts, with results publicly shared and algorithmic bias detection applied."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Inclusion safeguards are technically embedded at the system architecture level; continuous inclusion risk assessment is a mandatory process that contributes to global DPI standards."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.4.EX.Q2",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.4",
        "subpillar_name": "Inclusion & Non-Discrimination",
        "survey_type": "expert",
        "question_text": "How effectively do safeguards ensure responsible data use and equitable outcomes for all population groups, including marginalized communities?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Legal and technical safeguards governing the potential misuse of personal data are not yet in place or are under development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Informal guidelines and protocols addressing the potential misuse of personal data are in place but are not legally binding; there is limited awareness of these provisions among operational staff and no independent review of data access requests."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Legally binding limits on surveillance use of ID infrastructure are in place; independent review of law enforcement access requests is operational, and compliance is independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Independent oversight of all surveillance access to ID data is operational and publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Surveillance safeguards technically enforced at system architecture level; model contributed to global DPI standards."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.5.EX.Q1",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.5",
        "subpillar_name": "Independent Oversight",
        "survey_type": "expert",
        "question_text": "How independent and well-resourced are oversight bodies for digital ID?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Oversight is presently conducted via internal departmental mechanisms, with frameworks for an independent oversight body under development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "An independent oversight body exists, but it lacks a clear statutory mandate, adequate resourcing, or the necessary powers to effectively oversee the digital ID system."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Independent oversight body with clear statutory mandate for digital ID, investigative powers, and adequate resourcing is operational, and effectiveness is independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Oversight body has guaranteed budget independence, expert technical capacity, and authority to impose sanctions."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Oversight body internationally recognized for independence and effectiveness; governance model contributed to global standards."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.5.EX.Q2",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.5",
        "subpillar_name": "Independent Oversight",
        "survey_type": "expert",
        "question_text": "How regularly are independent audits conducted, and how transparent are the resulting oversight findings and parliamentary reviews?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Frameworks for regular independent audits and protocols for the public release of oversight findings are currently being established."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Ad-hoc third-party audits occur; findings are summarized informally, and parliamentary review of the digital ID system happens occasionally but without structured integration into improvements."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Regular independent audits are conducted; findings are published in full and addressed through structured improvement processes; a parliamentary committee conducts annual reviews."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Independent audits comprehensively cover security, privacy, and inclusion; all oversight findings, parliamentary reports, and management action plans are publicly tracked online."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Independent oversight mechanisms are fully institutionalized; oversight transparency is automated with real-time public access to all non-sensitive audit findings and response protocols."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.1.NE.Q1",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.1",
        "subpillar_name": "Consent & Data Minimization",
        "survey_type": "stakeholder",
        "question_text": "How well does Trident implement informed consent for data collection and sharing?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Standardized consent mechanisms and public awareness campaigns regarding specific data usage are currently in development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "A consent mechanism has been developed and is shown during enrollment but it needs to be fully operationalized so that people can manage and withdraw their consent."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Consent is obtained in plain language; a user portal allows people to manage and withdraw consent, and progress is reported publicly."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "People can control exactly which services see which data; consent records are available in real time and anyone can check online."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The consent system is recognized across CARICOM as a best practice for privacy-respecting digital identity."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.1.NE.Q2",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.1",
        "subpillar_name": "Consent & Data Minimization",
        "survey_type": "stakeholder",
        "question_text": "To what extent does Trident collect only the data needed for each service?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Data collection parameters are currently broadly defined; operational protocols for strict data minimization and purpose limitation are in the design phase."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Policies ensuring data is strictly limited to necessary service requirements are being standardized for future technical enforcement."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Data collection practices are regularly audited to ensure only the minimum data necessary for each service is collected; public reports verify these practices."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Independent audits confirm strict adherence to data minimization; findings are publicly accessible and immediately inform corrective actions."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Advanced privacy-enhancing technologies technically prevent the sharing of unnecessary data; the architectural design is recognized across CARICOM."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.2.NE.Q1",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.2",
        "subpillar_name": "Transparency & Explainability",
        "survey_type": "stakeholder",
        "question_text": "How transparent are Trident's rules, operations, and decision processes to the public?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Public documentation regarding Trident's operational rules and decision-making processes is currently in development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "High-level system descriptions are available to the public, with detailed operational rules currently being prepared for wider release."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Comprehensive public reports cover how Trident works, what rules it follows, and how it performs."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Anyone can check online at any time to see system performance and compliance."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Transparency tools are shared with other CARICOM countries; the model is recognized as a regional standard."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.2.NE.Q2",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.2",
        "subpillar_name": "Transparency & Explainability",
        "survey_type": "stakeholder",
        "question_text": "How clearly are manual decisions about Trident (such as rejections, corrections, or appeals) explained to the people they affect?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Standardized explanations for administrative decisions (like enrollment delays or corrections) are not yet systematically provided to applicants."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "General reasons for administrative decisions are provided, with efforts ongoing to include more specific details and clear guidance on appeal processes."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Applicants for Trident receive clear, written explanations for decisions affecting their ID, including specific reasons and straightforward instructions on how to appeal."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Trident decisions are explained in plain language within standard timeframes, and a public summary of all decisions and outcomes is released annually."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Decision explanations are accessible in multiple formats (written, audio, in-person); the approach is recognized across CARICOM as a model."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.3.NE.Q1",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.3",
        "subpillar_name": "Accountability & Redress",
        "survey_type": "stakeholder",
        "question_text": "How clear and accessible are mechanisms for lodging complaints about Trident issues?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formal, dedicated mechanisms for submitting and tracking grievances regarding Trident are not yet in place."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Informal channels for grievances exist, but there is no structured process for tracking, escalation, or public reporting."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A formal multi-channel complaint system is in place; complaints are acknowledged within set timeframes and progress is reported publicly."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The complaint system is accessible in all relevant languages; people can submit and track complaints digitally and see outcomes online."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The complaint system is a regional model for accessible redress; the approach is shared across CARICOM."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.3.NE.Q2",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.3",
        "subpillar_name": "Accountability & Redress",
        "survey_type": "stakeholder",
        "question_text": "How timely and effective is resolution of Trident complaints and disputes?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Service charter and timeframes for resolving user inquiries or grievances are yet to be standardized."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Trident service charter and target timeframes for resolving complaints have been established, and the system is working towards meeting these consistently."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Resolution timeframes are set by the Trident Service Charter and mostly met; where complaints are upheld, remedies are provided and results are published."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Trident complaint resolution performance is publicly reported; patterns in complaints trigger fixes to systemic problems that anyone can see."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident complaint resolution rates and times are published in real time; complaint patterns proactively improve the system and the approach is shared regionally."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.4.NE.Q1",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.4",
        "subpillar_name": "Inclusion & Non-Discrimination",
        "survey_type": "stakeholder",
        "question_text": "How strong are protections against exclusion and discrimination in Trident?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Specific operational frameworks dedicated to monitoring and preventing exclusion within the Trident ecosystem are yet to be formalized."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Non-discrimination principles are established in policy, with operational mechanisms to monitor and ensure equitable access currently being developed."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A comprehensive framework prevents discrimination in Trident."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "An independent body enforces anti-discrimination rules."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Protections against bias are built into the technical system."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.4.NE.Q2",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.4",
        "subpillar_name": "Inclusion & Non-Discrimination",
        "survey_type": "stakeholder",
        "question_text": "How systematically are inclusion risks assessed and mitigated for vulnerable groups?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formal assessments to identify and mitigate inclusion risks or unfair outcomes for vulnerable groups are not currently conducted."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Inclusion risks are considered informally during design but there is no structured process."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A formal inclusion risk assessment is done for all major system changes; mitigation measures are documented and published."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Independent experts conduct inclusion risk assessments; findings are publicly shared and anyone can see the results."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Inclusion risk assessment is a mandatory, continuous process built into how Trident is governed; the approach is recognized across CARICOM."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.5.NE.Q1",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.5",
        "subpillar_name": "Independent Oversight",
        "survey_type": "stakeholder",
        "question_text": "How independent and well-resourced are oversight bodies for Trident?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Oversight for Trident currently relies on internal departmental reviews rather than a formalized, independent external body."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "A governance oversight framework for Trident has been established but is currently in the process of building the necessary resourcing and operational independence."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "An independent oversight body with legal powers and adequate resources is actively monitoring Trident and reports are published."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The oversight body has guaranteed funding, technical expertise, and the power to impose penalties; findings are publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The oversight body is internationally recognized for its independence and effectiveness; the model is shared across CARICOM."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P2.5.NE.Q2",
        "pillar_code": "P2",
        "pillar_name": "Safeguards, Trust & Accountability",
        "subpillar_code": "P2.5",
        "subpillar_name": "Independent Oversight",
        "survey_type": "stakeholder",
        "question_text": "How regularly are independent audits of Trident conducted and acted upon?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formal independent audits of Trident's systems and operations are not yet part of the regular review cycle."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Initial independent audits have been conducted to establish baselines, with processes for implementing audit recommendations currently being strengthened."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Independent audits of Trident cover technical and operational aspects on a regular schedule; findings and responses are documented and published."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "External auditors conduct comprehensive security, privacy, and inclusion assessments; findings and responses are published and the process is subject to public scrutiny."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Independent oversight combines real-time dashboards, continuous audits, and external validation; the model is recognized across CARICOM for its rigor and transparency."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.1.EX.Q1",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.1",
        "subpillar_name": "Private Sector Participation",
        "survey_type": "expert",
        "question_text": "How clear are the frameworks for private sector reliance on the digital ID, and how are compliance and accountability enforced?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "A formal relying party framework and structured enforcement mechanisms for private sector access are currently in development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Informal access arrangements exist; compliance obligations are stated in contracts, but active monitoring and enforcement are limited to basic log reviews."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A comprehensive relying party framework enables automated onboarding; compliance is monitored via API usage analytics, and contractual breaches trigger defined penalties recorded in official logs."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The trust framework incorporates dynamic risk-based accreditation; real-time compliance dashboards trigger automated alerts and enforcement actions within set timeframes."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The framework operates as an open ecosystem model; enforcement is proactive and technology-assisted, with independent audits of private sector compliance published to maintain trust."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.1.EX.Q2",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.1",
        "subpillar_name": "Private Sector Participation",
        "survey_type": "expert",
        "question_text": "How mature are the certification or approval mechanisms for private sector participation in the ecosystem?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formal certification and approval frameworks for private sector participants are in the planning stage."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Certification and approval processes are defined but not yet implemented, or they exist in ad-hoc, non-transparent formats."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Formal certification and approval processes are operational, with clear criteria, independent assessment, and publicly accessible information on approved entities."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Certification and approval processes are tiered and risk-based, incorporating recognized international trust frameworks and assurance standards."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Certification and approval processes are interoperable with regional and international trust frameworks, enabling seamless cross-border access without redundant approvals."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.2.EX.Q1",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.2",
        "subpillar_name": "Digital ID Use Cases",
        "survey_type": "expert",
        "question_text": "How many meaningful use cases across sectors are enabled by digital ID today?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Broader cross-sector use cases beyond foundational government authentication are currently being scoped."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "One or two pilot use cases in regulated sectors (banking KYC, welfare enrollment); use cases not yet scaled."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Multiple use cases are operational and scaled across diverse sectors, with measurable impact documented in public sector performance reports."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Advanced multi-sector use case ecosystem operational with measurable economic impact; cross-sector data publicly available through open data portals."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Digital ID-enabled innovations contribute to documented GDP growth; use case ecosystem supports new market entrants and drives sector competition."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.2.EX.Q2",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.2",
        "subpillar_name": "Digital ID Use Cases",
        "survey_type": "expert",
        "question_text": "How effectively does digital ID support innovation in sectors such as finance, health, or tourism?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Innovation support mechanisms leveraging the digital ID system for sectors like finance and tourism are currently in the planning stages."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Pilot innovation initiatives in tourism and banking; early outcomes documented but ecosystem-wide support not yet formalized."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Digital ID enables demonstrable innovation in at least two sectors; innovation support mechanisms (sandbox, grants) operational, including tourism applications like contactless visitor verification and e-visa integration; program outcomes are published."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Digital ID serves as a platform for significant cross-sector innovation; advanced innovation ecosystem with measurable economic impact documented through independent studies."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Digital ID-enabled innovation drives measurable productivity gains in tourism and financial services; innovation pipelines are integrated into national digital economic strategy."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.2.EX.Q3",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.2",
        "subpillar_name": "Digital ID Use Cases",
        "survey_type": "expert",
        "question_text": "How mature are mechanisms such as pilots or sandboxes to test new digital ID use cases?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Dedicated sandbox environments for testing new digital id use cases are currently in the planning phase."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic test environment available with restricted access; no structured pilot program or mentorship exists."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Production-like sandbox with realistic synthetic data available; structured pilot program with defined success criteria operational; pilot completion reports are publicly accessible."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Advanced sandbox ecosystem supports complex multi-system integration testing; pilot outcomes tracked and published in an open registry."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Sandbox enables rapid iteration and scaling of commercial applications; successful pilot participants receive fast-tracked market access approval."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.3.EX.Q1",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.3",
        "subpillar_name": "Standards & Certification",
        "survey_type": "expert",
        "question_text": "To what extent does the digital ID ecosystem adopt recognized international technical and trust standards?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The adoption of recognized international technical and trust standards is yet to be mapped out"
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "The adoption of selected international standards have been partially adopted for specific use cases; adoption not systematic; conformance not independently tested."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Comprehensive adoption of recognized international standards is mandatory for ecosystem participants; conformance testing results are documented and reviewed."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Standards adoption comprehensive, current, and proactively tracked against international developments; automated compliance checking integrated into procurement."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Ecosystem maintains continuous alignment with evolving international standards; technical implementations are validated against multiple concurrent standards frameworks."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.3.EX.Q2",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.3",
        "subpillar_name": "Standards & Certification",
        "survey_type": "expert",
        "question_text": "How mature are certification, conformance testing, and compliance assurance arrangements?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Comprehensive certification programs and independent conformance testing procedures are under development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Certification and conformance testing processes are defined but not yet implemented, or they exist in ad-hoc, non-transparent formats."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Formal certification and conformance testing processes are operational, with clear criteria, independent assessment, and publicly accessible information on approved entities."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Certification and conformance testing processes are tiered and risk-based, incorporating recognized international assurance standards."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Conformance testing integrated into continuous integration pipelines; certification scheme supports real-time compliance monitoring across the ecosystem."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.3.EX.Q3",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.3",
        "subpillar_name": "Standards & Certification",
        "survey_type": "expert",
        "question_text": "How effectively does Barbados monitor and adopt international digital identity standards to keep Trident current and interoperable?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formalized roles and processes for continuously tracking and adopting international standards are currently being established."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Informal mechanisms exist for tracking international standards, but there is no systematic process for incorporating updates into Trident."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A designated unit monitors international digital identity standards (ISO/IEC, NIST, W3C); updates are reviewed on a defined cycle and adoption decisions documented; implementation progress is tracked and reported to technical leadership."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Trident maintains continuous alignment with evolving international standards; technical implementations are validated against multiple concurrent standards frameworks."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Barbados actively participates in international standards bodies; technical contributions influence adopted standards; Trident is validated as a standards-compliant reference implementation across CARICOM."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.4.EX.Q1",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.4",
        "subpillar_name": "Developer Ecosystem",
        "survey_type": "expert",
        "question_text": "How available and functional are technical resources, documentation, and production-like sandbox environments for innovators and developers building on Trident?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Publicly accessible developer portals, API documentation, and dedicated testing sandboxes are currently in the development pipeline."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic API documentation is available for select endpoints; a restricted test environment exists but relies on manual approval processes and non-realistic data."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A comprehensive developer portal provides full API documentation and self-service access to a production-like sandbox utilizing realistic synthetic data; usage metrics are regularly tracked."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Resources include real-time API status dashboards and cross-platform SDKs; the sandbox mirrors production performance and security controls, with publicly available SLAs."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Developer resources are open-sourced and maintained by a multi-stakeholder community; the sandbox supports automated CI/CD testing, issuing immediate integration certification upon success."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.4.EX.Q2",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.4",
        "subpillar_name": "Developer Ecosystem",
        "survey_type": "expert",
        "question_text": "How strong is support for the developer ecosystem through outreach, events, or financial incentives?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Structured developer engagement programs and financial incentive mechanisms are in the planning stage."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Developer outreach is limited to occasional events, and no financial incentives or support programs exist."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A structured developer engagement program includes regular hackathons with prize funding, startup support programs, and a dedicated developer relations team; participation and funding disbursement are publicly reported."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Innovation grants and accelerator programs specifically for digital ID use cases operational; grant recipients are tracked and their market entry progress published."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Developer support ecosystem sustained through public-private partnership funding; startup success metrics independently evaluated and integrated into national innovation policy."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.5.EX.Q1",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.5",
        "subpillar_name": "Cross-Border Interoperability",
        "survey_type": "expert",
        "question_text": "How developed are cross-border digital ID recognition and interoperability arrangements?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Cross-border interoperability frameworks and mutual recognition agreements are currently in the exploratory phase."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "One or more CARICOM member states have expressed interest in establishing cross-border digital ID recognition, but no formal agreements have been concluded."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Formal mutual recognition agreements with at least one CARICOM member state enable cross-border digital ID use for defined services; agreement implementation is documented and reviewed annually."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Established leadership in a regional interoperability initiative; multilateral mutual recognition with automated verification operational across multiple CARICOM corridors."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Country operates as a regional hub for interoperable digital public infrastructure; governance model enables seamless cross-border identity verification for trade and tourism flows."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.5.EX.Q2",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.5",
        "subpillar_name": "Cross-Border Interoperability",
        "survey_type": "expert",
        "question_text": "How well do laws and technical systems support trusted cross-border data exchange?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Legal and technical frameworks to support trusted, privacy-preserving cross-border data exchange are currently being drafted."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Ad-hoc data sharing arrangements exist for limited cross-border use cases, but no formal privacy-protective frameworks are in place."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Cross-border data governance frameworks covering legal basis, consent, security, and data sovereignty operational under formal agreements; compliance with data sovereignty requirements is audited."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Cross-border data exchange is automated and privacy-preserving; legal frameworks are harmonized with CARICOM member states to enable secure data portability."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Cross-border data exchange framework enables real-time, encrypted verification across jurisdictions; data flows are continuously monitored for compliance with sovereignty and privacy standards."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.5.EX.Q3",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.5",
        "subpillar_name": "Cross-Border Interoperability",
        "survey_type": "expert",
        "question_text": "How resilient and vendor-independent is the cross-border interoperability approach?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Strategies to enhance vendor independence and establish government-controlled protocols for cross-border exchange are being considered."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Ad-hoc technical agreements are used for cross-border data exchange, with limited emphasis on vendor independence or open standards."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Cross-border interoperability frameworks are based on open standards, with regular testing for resilience and documented remediation plans."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Cross-border architecture is vendor-independent, based on open standards, and tested for resilience under failure scenarios; failover mechanisms are validated through live simulation exercises."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Cross-border interoperability architecture maintains continuous operation during regional network disruptions; government-controlled protocols serve as the fallback standard for all CARICOM partners."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.1.NE.Q1",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.1",
        "subpillar_name": "Private Sector Participation",
        "survey_type": "stakeholder",
        "question_text": "How clear and effective are the rules for private companies to use or rely on Trident?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "A formal framework enabling private sector integration with Trident has not yet been introduced"
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Draft rules are in place, with efforts ongoing to transition early informal access arrangements into a structured, accountable framework."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A formal framework governs how private companies can join the Trident ecosystem."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "An advanced accreditation system governs access at different trust levels."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The framework operates as an open ecosystem model."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.1.NE.Q2",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.1",
        "subpillar_name": "Private Sector Participation",
        "survey_type": "stakeholder",
        "question_text": "How well are rules for private companies using Trident enforced when they break them?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Mechanisms for monitoring and enforcing compliance among private sector partners are currently being established."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Compliance requirements are included in partner contracts, and active monitoring capabilities are being progressively expanded beyond basic logging"
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Compliance is monitored automatically; breaches trigger defined penalties; enforcement actions are recorded in official compliance logs."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Real-time monitoring tracks all private sector usage; automated alerts trigger enforcement, and summary reports of actions taken are published online."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Enforcement is proactive and technology-assisted; compliance is independently audited with findings published to maintain ecosystem trust."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.2.NE.Q1",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.2",
        "subpillar_name": "Digital ID Use Cases",
        "survey_type": "stakeholder",
        "question_text": "How many meaningful use cases across sectors are enabled by Trident today?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Trident currently focuses on foundational government access; broader cross-sector use cases are yet to be developed."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Foundational pilot use cases have been launched in specific sectors (such as banking) and are currently being evaluated for broader scaling."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Several validated use cases operate across multiple sectors; their economic and social impact is documented in public reports."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "A rich multi-sector use case ecosystem operates with measurable economic impact; data on active use cases is available on an open data portal."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident-enabled use cases contribute to documented economic growth; the ecosystem supports new market entrants and drives competition across sectors."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.2.NE.Q2",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.2",
        "subpillar_name": "Digital ID Use Cases",
        "survey_type": "stakeholder",
        "question_text": "How effectively does Trident support innovation in sectors such as finance, health, or tourism?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Ecosystem support initiatives for businesses looking to build innovative services using Trident are in the early stages of consideration."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Trident is facilitating basic verifications in select areas, while structured innovation support programs are being designed."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Trident powers innovation in at least two sectors with support programs like sandboxes or grants active and program outcomes are publicly reported."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Trident serves as a platform for cross-sector innovation; measurable economic impact is documented and independent studies on sector growth are available to the public."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident-enabled innovation drives measurable productivity gains in tourism and financial services; innovation pipelines are integrated into the national digital economic strategy."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.3.NE.Q1",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.3",
        "subpillar_name": "Standards & Certification",
        "survey_type": "stakeholder",
        "question_text": "To what extent does the Trident ecosystem adopt recognized international technical and trust standards?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The ecosystem currently relies on localized specifications; alignment with recognized international trust standards is pending."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "The ecosystem is in the process of aligning with selected international trust standards, though this is not yet applied universally."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Alignment with selected international trust standards is underway; conformance testing has been initiated, though formal certification processes are still evolving."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "International standards adoption is comprehensive and proactively tracked; compliance with adopted standards is independently verified and publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The ecosystem maintains continuous alignment with evolving international standards; technical implementations are validated against multiple concurrent frameworks."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.3.NE.Q2",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.3",
        "subpillar_name": "Standards & Certification",
        "survey_type": "stakeholder",
        "question_text": "How mature are certification, testing, and compliance assurance arrangements for the Trident ecosystem?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "A formal certification and compliance testing program for ecosystem participants is not yet operational."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "An initial voluntary certification program is in place, providing a foundation for a future comprehensive, independently tested compliance framework."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A mandatory certification program with independent testing and a public registry of certified entities is operational; testing methodologies are published."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Certification includes tiered assurance levels; automated testing tools are publicly available for self-assessment and results are published online."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Conformance testing is integrated into continuous development pipelines; certification supports real-time compliance monitoring across the ecosystem."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.4.NE.Q1",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.4",
        "subpillar_name": "Developer Ecosystem",
        "survey_type": "stakeholder",
        "question_text": "How available are APIs, documentation, and technical resources for developers wanting to build on Trident?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Publicly accessible technical resources and developer tools for Trident integration are currently unavailable."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic documentation is available on request; access to a test environment requires manual approval."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A comprehensive developer portal with full documentation, code samples, and community forums is publicly accessible; portal usage metrics are tracked and reported."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The developer portal includes real-time status dashboards, SDKs for all major platforms, and a production-like sandbox; developer satisfaction is measured and published."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Developer resources are open-sourced and maintained by a multi-stakeholder community; technical documentation serves as a regional training reference for startup incubators."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.4.NE.Q2",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.4",
        "subpillar_name": "Developer Ecosystem",
        "survey_type": "stakeholder",
        "question_text": "How useful and accessible are testing environments (sandboxes) for developers integrating with Trident?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "A dedicated sandbox or testing environment is unavailable; integration testing currently relies on the live production environment"
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "A sandbox or test environment is available but access is restricted and the data is not realistic."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A sandbox and testing environment is available with self-service access; documentation matches the live system; access logs and usage statistics are publicly available."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The testing environment mirrors the live system including security controls; performance metrics and availability targets are published for developers to track."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The sandbox supports automated testing and continuous integration for third-party developers; integration certification is issued upon successful validation."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.5.NE.Q1",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.5",
        "subpillar_name": "Cross-Border Interoperability",
        "survey_type": "stakeholder",
        "question_text": "How developed are cross-border digital ID recognition and interoperability arrangements with CARICOM partners?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Trident is currently focused on domestic operations; cross-border recognition within CARICOM is a future objective"
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Exploratory discussions with CARICOM member states regarding cross-border recognition are actively underway to establish future agreements."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "At least one cross-border agreement is operational; Trident can be used for defined services across borders; agreement implementation is documented and reviewed annually."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Barbados leads a regional interoperability initiative; multilateral recognition with automated verification is operational and progress reports are published online."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Barbados operates as a regional hub for interoperable digital infrastructure; governance models enable seamless cross-border identity verification for trade and tourism flows."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P3.5.NE.Q2",
        "pillar_code": "P3",
        "pillar_name": "Ecosystem & Innovation",
        "subpillar_code": "P3.5",
        "subpillar_name": "Cross-Border Interoperability",
        "survey_type": "stakeholder",
        "question_text": "How well do laws and technical systems support trustworthy exchange of Trident data across borders?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Initial protocols and legal frameworks for the secure, cross-border exchange of digital ID data are currently in the early scoping phase."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Legal and technical frameworks designed to support the trustworthy, privacy-preserving exchange of data across borders are actively being drafted."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Legal and technical frameworks governing cross-border data sharing are being implemented; compliance with data sovereignty requirements is being established."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Cross-border data exchange is automated and privacy-preserving; legal frameworks are harmonized with CARICOM member states and harmonization progress is publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Cross-border data exchange enables real-time, encrypted verification across jurisdictions; data flows are continuously monitored for compliance and monitoring results are shared publicly."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.1.EX.Q1",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.1",
        "subpillar_name": "ID System Architecture",
        "survey_type": "expert",
        "question_text": "How well does the foundational ID architecture follow modular, scalable, and API-first design principles?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The current architecture utilizes centralized components; transition plans toward modular, API-first microservices are being evaluated."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Modular design principles are documented but implementation is inconsistent; basic API endpoints exist for core enrollment and authentication functions."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "API-first architecture is fully implemented with comprehensive documentation; microservices enable independent scaling of components, and compliance is independently verified through technical audit."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Event-driven architecture with real-time data synchronization is operational; infrastructure-as-code enables automated environment replication across development and production."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Self-healing systems with automated failover and zero-downtime deployments are operational; architectural blueprints are published openly for peer review and adaptation."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.1.EX.Q2",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.1",
        "subpillar_name": "ID System Architecture",
        "survey_type": "expert",
        "question_text": "How appropriate is the architectural model (centralized or federated) for national needs and DPI alignment?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formal requirements analysis aligning the architectural model with comprehensive DPI principles is currently being documented."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Architectural model is chosen and documented, but with partial alignment to DPI principles and national context; analysis is undergoing review."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Architectural model is documented with formal rationale aligned to national data sovereignty, inclusion requirements, and DPI integration needs; design decisions are reviewed by an independent technical panel."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Architecture is regularly reviewed against evolving national needs and DPI standards; review findings and adaptation plans are publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Architecture optimally balances centralization and federation based on continuous performance evidence; the governance model for architectural decisions is formally adopted as a reference by regional technical bodies."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.1.EX.Q3",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.1",
        "subpillar_name": "ID System Architecture",
        "survey_type": "expert",
        "question_text": "How well is the architecture documented, governed, and adaptable to future growth?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Comprehensive, version-controlled architectural documentation and formal change governance processes are currently being established."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "High-level architecture diagrams exist but may be outdated; change control is managed through ad-hoc procedures rather than a formal governance process."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Comprehensive, version-controlled architectural documentation is maintained; an architecture review board approves structural changes, and change logs are maintained for audit purposes."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Architecture documentation is publicly available; change governance includes mandatory security and privacy impact assessments before implementation."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Architecture documentation functions as a living artifact that is updated in near-real-time through automated pipelines; governance processes enable rapid adaptation to emerging national technology requirements."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.2.EX.Q1",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.2",
        "subpillar_name": "Data Exchange",
        "survey_type": "expert",
        "question_text": "How available and well-documented are APIs and data exchange interfaces specifically for government-to-government and regulated-sector use?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Standardized API documentation is pending; current data exchange utilizes customized or localized transfer protocols."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic API endpoints for core functions available with minimal documentation; API versioning not managed."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Comprehensive API catalog with OpenAPI specifications and version management publicly available; integration testing environment operational for government and regulated entities, and conformance is verified through formal certification."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "API documentation includes interactive testing tools; usage analytics inform API roadmap decisions and are shared with participating government agencies."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "APIs support automated, real-time data exchange across the full government ecosystem; reference implementations are published to accelerate adoption by new public sector entities."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.2.EX.Q2",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.2",
        "subpillar_name": "Data Exchange",
        "survey_type": "expert",
        "question_text": "To what extent does the system use recognized technical standards for interoperability?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "System uses proprietary data formats and protocols; transition from localized data formats to recognized international interoperability standards is currently being planned."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Partial adoption of ISO/IEC biometric standards; data exchange uses generic formats with custom schemas."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Full compliance with relevant ISO/IEC identity standards; OpenID Connect and OAuth 2.0 implemented for authentication, and conformance testing results are maintained in official system records."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Standards adoption comprehensive and proactively tracked against emerging international developments; conformance testing automated and integrated into deployment pipelines."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "System actively contributes to international standards development through technical working group participation; recognized as a compliant reference implementation by peer technical communities."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.2.EX.Q3",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.2",
        "subpillar_name": "Data Exchange",
        "survey_type": "expert",
        "question_text": "How effectively does digital ID exchange data with other government systems in practice?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Data exchange with other government systems does not occur in practice; manual re-entry or periodic batch transfers only."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Semi-automated data exchange occurs with 1–2 government systems via point-to-point interfaces; errors require manual reconciliation."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Real-time API-based data exchange operational with 3 or more government systems; data exchange gateway manages security and logging, and integration performance is tracked in shared government reports."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Event-driven data exchange operational across the wider government ecosystem; data lineage and consent tracking fully implemented and visible to participating agencies."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Cross-government data exchange fully frictionless and privacy-preserving; exchange architecture enables automated service orchestration across all major public sector systems."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.3.EX.Q1",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.3",
        "subpillar_name": "DPI Integration",
        "survey_type": "expert",
        "question_text": "How deeply is digital ID integrated with other DPI components such as payments and civil registries?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Integration frameworks connecting the digital ID with other core DPI components (like payments and sector registries) are being designed."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Point-to-point integration exists with one or two systems; integration is one-directional and batch-based; duplicate enrollment is common."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "API-based integration with three or more DPI components uses standardized protocols; data synchronization is automated where required, and integration milestones are formally reported to the DPI steering committee."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "An event-driven integration ecosystem connects all major DPI components; automated consent management tracks data sharing across payment, registry, and social systems."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Integration frameworks enable seamless, bidirectional data flow across the complete national DPI stack; technical architecture is documented and shared to support regional DPI harmonization."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.3.EX.Q2",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.3",
        "subpillar_name": "DPI Integration",
        "survey_type": "expert",
        "question_text": "How effectively does digital ID support seamless service delivery across priority sectors?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The expansion of digital ID to support seamless service delivery across various priority sectors is currently in the planning stage."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Digital ID is used for authentication in one or two pilot services; however, user journeys typically require switching between multiple systems."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Digital ID supports seamless authentication and pre-population of user data across three or more priority service journeys, and user journey completion rates are tracked and reported."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Single digital ID login enables access to the full range of priority public services; cross-sector data sharing reduces redundant form submissions and is monitored for system performance impact."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Digital ID-enabled service delivery operates as a unified platform across all priority sectors; technical integration enables real-time eligibility checks and automated benefit delivery without manual intervention."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.3.EX.Q3",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.3",
        "subpillar_name": "DPI Integration",
        "survey_type": "expert",
        "question_text": "How mature is integration with social protection, health, and other high-impact public services?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Integration roadmaps connecting digital ID with high-impact sectors like health and social protection are under development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Digital ID is piloted in one social protection or health program; however, the integration remains shallow and beneficiary data is not synchronized."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Digital ID is integrated with core social protection and health systems enabling automated eligibility verification and service delivery; integration performance is independently reviewed by the relevant ministry."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Integration with social protection, health, and at least one other high-impact sector is mature; real-time eligibility and entitlement data exchange operational and tracked."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Integration with all high-impact public services complete and fully automated; technical architecture enables predictive service delivery and proactive citizen notifications based on verified ID data."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.4.EX.Q1",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.4",
        "subpillar_name": "Cybersecurity & Resilience",
        "survey_type": "expert",
        "question_text": "How strongly is cybersecurity built into the architectural design, and how regularly are the system's security controls monitored, tested, and improved?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Comprehensive cybersecurity policies, pervasive encryption protocols, and structured programs for continuous vulnerability monitoring are currently being formalized."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic security controls and encryption are implemented, while formal penetration testing and continuous automated vulnerability scans are transitioning into regular practice."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A comprehensive security architecture (e.g., NIST/ISO 27001) is implemented; regular third-party penetration testing and automated vulnerability scanning drive remediation tracking in an official register."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "A zero-trust architecture is operational; continuous security monitoring with AI-assisted threat detection and semi-annual red team exercises drive immediate architectural updates."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "International cybersecurity certification is maintained; automated monitoring and shared regional threat intelligence feeds trigger containment within minutes, serving as a regional security model."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.4.EX.Q2",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.4",
        "subpillar_name": "Cybersecurity & Resilience",
        "survey_type": "expert",
        "question_text": "How mature are resilience measures such as backup, recovery, and business continuity?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "No formal disaster recovery or business continuity plan exists; disaster recovery capabilities are currently being developed to address infrastructural redundancies."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Recovery and business continuity measures are informally implemented; ad hoc backup procedures are in place, but formal recovery time objectives (RTO) and recovery point objectives (RPO) have not been established."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Tested disaster recovery plan with defined RTO and RPO operational; data backed up in multiple geographically separate locations, and recovery drill results are formally documented and approved by system leadership."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Automated failover to geo-redundant infrastructure operational; recovery procedures tested quarterly with documented improvement actions."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Self-healing systems with automated failover achieve near-zero downtime during simulated and actual outages; resilience architecture enables continuous service availability during regional infrastructure disruptions."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.5.EX.Q1",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.5",
        "subpillar_name": "Digital Public Goods",
        "survey_type": "expert",
        "question_text": "To what extent does the system architecture utilize open standards, interoperable components, and digital public goods (DPGs) to prevent vendor lock-in?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Strategies to integrate open standards, reduce reliance on proprietary vendor components, and evaluate DPGs are currently being formulated."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "There is partial adoption of open standards and undocumented use of open-source libraries, but the majority of the system relies on proprietary protocols."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Core system functionality is built on recognized open standards and evaluated DPGs; interoperability testing is confirmed, and open-source license compliance is formally tracked."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Open standards and DPGs form the basis of major components; adoption is verifiable through public conformance testing, and the government actively contributes upstream improvements."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The architecture is fully decoupled from vendor lock-in; the majority of system code is open-sourced under recognized licenses, serving as a reference model for regional DPI initiatives."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.5.EX.Q2",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.5",
        "subpillar_name": "Digital Public Goods",
        "survey_type": "expert",
        "question_text": "How available is technical documentation, and how actively does the system contribute to shared public resources?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Technical documentation exists, architecture diagrams, and data models are classified. Frameworks for publishing open technical documentation while maintaining security are currently being developed."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic technical documentation is available to approved partners under NDA; public documentation is limited to high-level system descriptions. Limited use of open standards and public contributions to DPI."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Comprehensive technical documentation including API specifications, architecture diagrams, data models, and security guidelines publicly available under open license, and documentation updates are version-controlled and publicly logged."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Technical documentation actively maintained and version-controlled; contributed to international DPI repositories with structured peer review processes."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Technical documentation functions as a living knowledge base updated automatically from system configurations; actively used by international technical communities to accelerate new DPI deployments."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.1.NE.Q1",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.1",
        "subpillar_name": "ID System Architecture",
        "survey_type": "stakeholder",
        "question_text": "How flexible and modern is the underlying technology of Trident to support future growth and adapt to new national needs?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Trident's current technology relies on legacy structures; plans to upgrade to a more flexible, modern system are being evaluated."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "The system has some modern features, but expanding it to handle new services requires significant manual effort and workarounds."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Trident is built on a modern, modular design, allowing new services and features to be added efficiently without disrupting existing ones."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The system is highly adaptable and resilient; it scales automatically during high-demand periods (like tax season or national elections) with no loss in performance."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident's underlying technology is recognized as state-of-the-art across CARICOM; it seamlessly integrates new innovations and serves as a blueprint for regional digital infrastructure."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.1.NE.Q2",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.1",
        "subpillar_name": "ID System Architecture",
        "survey_type": "stakeholder",
        "question_text": "How appropriate is the design of Trident for Barbados's needs and for connecting with other digital systems?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The design of Trident reflects initial priorities and is being adapted as Barbados's needs and service connections become clearer."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "The design has been chosen with consideration for national priorities, and connections to a few key services are being established."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "The design of Trident was chosen based on a documented analysis of Barbados's needs, including inclusion goals and connections to core services like NIS, BRA, and passport systems."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The system design is reviewed on a regular schedule to ensure it continues to meet national needs; review findings and connection progress are published where anyone can see them."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The system design is continuously refined based on evidence and user feedback; Trident connects seamlessly across public services and the approach is shared with CARICOM partners as a reference for small island states."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.2.NE.Q1",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.2",
        "subpillar_name": "Data Exchange",
        "survey_type": "stakeholder",
        "question_text": "How available and well-documented are APIs and data exchange interfaces for digital ID?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Standardized digital interfaces/APIs for external systems are currently unavailable; data sharing relies on custom arrangements."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Initial system interfaces/APIs have been established, and comprehensive developer documentation is currently being drafted."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A comprehensive catalog of system interfaces/APIs is publicly documented with a dedicated developer portal and testing sandbox."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Documentation includes interactive testing tools; developers receive clear public notices when system connections are updated."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Connection standards are published openly and contributed to international bodies; Barbados is recognized for its approach."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.2.NE.Q2",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.2",
        "subpillar_name": "Data Exchange",
        "survey_type": "stakeholder",
        "question_text": "To what extent does the system use recognized technical standards for interoperability?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The ID system uses its own formats that do not follow international standards."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Trident currently utilizes localized data formats, with a roadmap in place to transition toward international technical standards."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Key data exchange processes follow recognized international standards; conformance testing is regularly performed and results are documented."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Trident is kept up to date with evolving international standards through continuous review cycles; independent conformance testing results are made publicly available."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident actively contributes to the development of international standards; Barbados is recognized across CARICOM for its standards-based approach."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.3.NE.Q1",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.3",
        "subpillar_name": "DPI Integration",
        "survey_type": "stakeholder",
        "question_text": "How deeply is digital ID integrated with other DPI components such as payments and registries?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Trident currently operates as a standalone foundational system without automated links to sectoral systems like health or payments."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Trident has established initial connections to select government systems, laying the groundwork for future real-time, bidirectional integration."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Trident connects in real time to multiple government systems using standardized, documented APIs."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "All major government digital systems share data through the digital ID."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Cross-sector integration is seamless and dynamic, with Trident serving as the backbone for a unified digital government ecosystem that supports complex, multi-agency services."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.3.NE.Q2",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.3",
        "subpillar_name": "DPI Integration",
        "survey_type": "stakeholder",
        "question_text": "How effectively does digital ID support seamless service delivery across priority sectors?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The expansion of digital ID to streamline user journeys and support seamless service delivery is currently in the planning stage."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Digital ID is used to log in to one or two pilot services but the overall experience is not yet seamless."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Digital ID gives seamless access to several important services; users do not have to re-enter their data each time."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "One digital ID login works for the full range of major public services."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The service delivery model using digital ID is recognized as a global best practice."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.4.NE.Q1",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.4",
        "subpillar_name": "Cybersecurity & Resilience",
        "survey_type": "stakeholder",
        "question_text": "How strongly is cybersecurity built into the design and operation of the ID system?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "A formalized, comprehensive cybersecurity policy specifically tailored for the Trident system is currently in development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Foundational security controls are active, and efforts are ongoing to implement comprehensive measures like universal encryption for data in transit."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "The system meets a recognized security standard with full encryption; independent security assessments have been published."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Security checks happen continuously during use; any unauthorized access attempts are logged and publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident is positioned as a regional leader in secure digital identity, with transparent security practices and active collaboration on cybersecurity knowledge sharing."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.4.NE.Q2",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.4",
        "subpillar_name": "Cybersecurity & Resilience",
        "survey_type": "stakeholder",
        "question_text": "How mature are resilience measures such as backup, recovery, and business continuity?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formal disaster recovery and business continuity plans for the Trident digital ID system are not yet documented or operationalized"
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "A recovery plan is documented and backups are routinely taken, with active testing and restoration protocols currently being formalized."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A tested recovery plan is in place with clear time targets; data is backed up in more than one location."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "When the main system has a problem, services continue without interruption; recovery tests are conducted regularly and results are published."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The system recovers automatically from failures with near-zero downtime; the approach is shared with other CARICOM countries."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.5.NE.Q1",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.5",
        "subpillar_name": "Digital Public Goods",
        "survey_type": "stakeholder",
        "question_text": "To what extent does the digital ID system use open standards and interoperable components?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The system relies primarily on specific vendor technologies, limiting the use of universally adaptable open components."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "The architecture incorporates open international standards for select components, with plans to systematically expand their use across the system."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "The core components of the digital ID system are built on well-established open international standards."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The digital ID architecture features deep integration of open standards, with clear mechanisms for system evolution and public accountability."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident is recognized as a leading example of open, interoperable digital identity, with active contributions to regional standards and innovation."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P4.5.NE.Q2",
        "pillar_code": "P4",
        "pillar_name": "Technology & DPI Integration",
        "subpillar_code": "P4.5",
        "subpillar_name": "Digital Public Goods",
        "survey_type": "stakeholder",
        "question_text": "How much does the system rely on open-source components or digital public goods where appropriate?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The system currently relies on established commercial software suites, with the potential integration of open-source tools identified as an area for future exploration."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "The evaluation and planned adoption of verified open-source components are currently underway to complement existing infrastructure."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Key components of the digital ID system are built on recognized open-source tools; a public inventory of these components is maintained."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Open-source tools are central to the system; the government actively contributes improvements back to those tools."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Most of the system code is shared freely online for anyone to use; Barbados is recognized for its open approach."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.1.EX.Q1",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.1",
        "subpillar_name": "Legal Identity & Civil Registration",
        "survey_type": "expert",
        "question_text": "Does the legal framework clearly define legal identity, enrollment status, and eligibility?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Primary legal identity legislation exists however digital identity is not clearly defined."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Draft digital ID bill defines legal identity in broad terms but enrollment status categories and eligibility thresholds remain undefined."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Primary legislation enacted with statutory definitions of legal identity, enrollment status categories, and eligibility criteria; implementation is independently verified through official gazette publication."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Legislation and subsidiary regulations fully operational; eligibility determinations automated against civil registration data with audit trails maintained."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Independent statutory review confirms legislative completeness; legal framework cited as a CARICOM model for comprehensive identity law."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.1.EX.Q2",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.1",
        "subpillar_name": "Legal Identity & Civil Registration",
        "survey_type": "expert",
        "question_text": "How well is civil registration linked to the digital ID system to prevent statelessness?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Civil registration currently operates as an independent registry; blueprints for automated data exchange protocols connecting it to the digital ID system are being explored."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Civil registration records are utilized for ID verification, but the linkage is primarily event-driven and reliant on manual synchronization."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Formal linkage protocols are operational; vital events trigger automated updates to the digital ID registry, with compliance confirmed through ministry reporting."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Civil registration and digital ID databases are fully integrated via real-time APIs; de-duplication and reconciliation are automated with publicly reported outcomes."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Independent audits confirm structural safeguards against statelessness; birth registration coverage approaches universality, with results published in national statistics."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.1.EX.Q3",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.1",
        "subpillar_name": "Legal Identity & Civil Registration",
        "survey_type": "expert",
        "question_text": "How comprehensively does the legal framework address the full lifecycle of legal identity in Barbados, including birth, corrections, stateless persons, and death?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The legal framework only addresses initial ID registration; it does not cover corrections, changes after major life events, stateless persons, or death registration linkage."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Some lifecycle provisions exist (e.g., birth and death registration) but are not consistently linked to digital ID; no provision for stateless persons or complex cases."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "The legal framework covers the main identity lifecycle events (birth, death, name change, corrections) and links them to digital ID issuance; a process exists for stateless persons and those without documentation; implementation is independently verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The framework covers all lifecycle events including diaspora returns, gender marker changes, and disputed identity; processes are automated where appropriate; outcomes are monitored and publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "An independent review confirms no lifecycle gaps; the framework covers all known categories of person in Barbados; it is cited as a CARICOM model for comprehensive identity lifecycle law."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.2.EX.Q1",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.2",
        "subpillar_name": "Data Protection & Privacy",
        "survey_type": "expert",
        "question_text": "Does the data protection framework clearly apply to the digital ID system?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "No data protection legislation exists or applicable law explicitly exempts digital ID systems from its provisions."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "General data protection framework exists but ID-specific provisions absent; ID system subject to generic government data handling rules only."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Comprehensive data protection legislation with explicit ID-system provisions enacted; independent supervisory authority operational; compliance is confirmed through published oversight reports."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Data protection authority actively supervises the ID system; compliance reports published; international adequacy assessments underway with findings publicly accessible."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Real-time compliance monitoring integrated into ID system operations; automated privacy impact assessments trigger corrective action; framework recognized as a CARICOM reference."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.2.EX.Q2",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.2",
        "subpillar_name": "Data Protection & Privacy",
        "survey_type": "expert",
        "question_text": "How strong are the legal rules and technical controls for consent, purpose limitation, and data minimization — separately and together — in Trident?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "None of the three — consent, purpose limitation, or data minimization — is codified in law or enforced in the system."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "At least one of the three is in law (most likely consent provisions), but the others remain in policy only and are not technically enforced."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "All three are codified in law and implemented in Trident's technical design; at least one has been independently verified as operational through audit or public reporting."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "All three are technically enforced (e.g., purpose limitation enforced at the API layer; automated data deletion after retention period); independent audits verify compliance for each; findings published."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Automated enforcement of all three is embedded in system architecture, making violations technically difficult; a rights-respecting credential design (e.g., selective disclosure) eliminates unnecessary data sharing entirely."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.2.EX.Q3",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.2",
        "subpillar_name": "Data Protection & Privacy",
        "survey_type": "expert",
        "question_text": "How effective is independent oversight and enforcement for data protection in digital ID?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The jurisdictional mandate for an independent oversight body to specifically monitor digital ID data processing is currently being defined."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "An oversight body exists and has the authority to investigate data breaches, but its mandate does not specifically cover digital ID systems, and it has not yet conducted any investigations related to digital identity."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Independent data protection authority with explicit ID oversight mandate operational; has conducted at least one formal investigation; findings documented in official records."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Oversight body conducts proactive compliance audits of the ID system; findings published; sanctions levied and enforcement actions publicly tracked."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Oversight continuous and technology-assisted; authority collaborates with international counterparts; enforcement outcomes contribute to regional data protection standards."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.3.EX.Q1",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.3",
        "subpillar_name": "Trust Services (eID, Signatures)",
        "survey_type": "expert",
        "question_text": "Are digital identities and electronic signatures legally recognized?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "No legislation grants legal recognition to digital identities or electronic signatures; their use in transactions carries no legal standing."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Draft legislation proposes legal recognition for e-signatures in limited contexts; recognition of digital identity credentials not yet established."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Legislation grants legal recognition to digital identities and e-signatures for defined use cases; trust services framework designates supervised providers; operationalization is confirmed through regulatory publication."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Full legal equivalence with physical identity documents established across the public sector; regulated private sector adoption mandated with compliance monitored."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Universal legal recognition across all sectors and transaction types in force; cross-border recognition agreements operational within CARICOM."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.3.EX.Q2",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.3",
        "subpillar_name": "Trust Services (eID, Signatures)",
        "survey_type": "expert",
        "question_text": "How broadly are digital credentials accepted across public and private services?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Protocols for accepting digital credentials across public and private sector services are currently being developed."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Digital credentials accepted in one or two pilot public services; acceptance inconsistent and not mandated by policy."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Digital credentials accepted across core public services with consistent verification processes; regulated private sector adoption underway; acceptance is verified through service usage reports."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Digital credentials accepted across the full public sector with a single sign-on experience; private sector adoption widespread with participation tracked publicly."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Digital credentials accepted across all public and private services; cross-border service access enabled within CARICOM with mutual recognition protocols operational."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.3.EX.Q3",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.3",
        "subpillar_name": "Trust Services (eID, Signatures)",
        "survey_type": "expert",
        "question_text": "How mature is the trust services framework, including regulated provider arrangements?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "A comprehensive trust services framework and provider regulation models are currently being developed."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Draft trust services framework circulated; no providers licensed yet; liability rules under development."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Trust services framework operational; qualified providers licensed against defined criteria; liability rules established; implementation is confirmed through regulatory registry."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Trust services framework includes tiered assurance levels aligned with international standards (eIDAS, NIST SP 800-63); compliance monitoring automated."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Framework recognized as an international reference; trust marks enable seamless cross-border transactions; technical specifications contributed to CARICOM standards development."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.4.EX.Q1",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.4",
        "subpillar_name": "Emerging Tech Safeguards",
        "survey_type": "expert",
        "question_text": "Are there binding rules requiring systematic impact assessments for AI/automated decision-making, and how are bias testing and human oversight applied in practice?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Legal requirements and structured protocols for algorithmic impact assessments, bias testing, and human oversight in ID verification are currently in development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Draft guidelines suggest voluntary AI risk assessments, but structured bias testing and mandatory human oversight of automated decisions are not systematically enforced."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Binding regulations mandate impact assessments (DPIA/HRIA) for AI-assisted decisions; human override mechanisms and bias testing standards are legally defined and verified."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Assessments are conducted by independent third parties; bias metrics are tracked longitudinally and published, while human oversight logs are maintained for external auditors."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "A full lifecycle AI governance system features real-time automated bias monitoring; findings drive iterative model improvement, establishing a CARICOM model for responsible AI."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.4.EX.Q2",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.4",
        "subpillar_name": "Emerging Tech Safeguards",
        "survey_type": "expert",
        "question_text": "How strong are transparency, monitoring, and independent review for automated identity related decisions?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Transparency mechanisms, including accessible audit trails and explainability tools for automated decisions, are being developed."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "High-level information about automated decision processes available internally; audit trails maintained but not accessible externally; review mechanisms exist but are difficult to access."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Legally mandated transparency requirements apply to automated ID decisions; audit trails maintained and accessible to oversight bodies; review mechanisms operational with documented procedures."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Algorithmic transparency operationalized through publicly accessible model cards and audit logs; independent review bodies have statutory authority to investigate automated decisions."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Explainability tools available to affected individuals in plain language; tools contributed to global DPI repositories with additional capability for real-time decision auditing."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.5.EX.Q1",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.5",
        "subpillar_name": "Legal Interoperability",
        "survey_type": "expert",
        "question_text": "Are implementing regulations in place to operationalize the ID law?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Detailed implementing regulations necessary to fully operationalize the primary ID legislation are currently being drafted."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Draft implementing regulations have been circulated for comments but have not yet been officially gazetted."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Key implementing regulations have been gazetted and are operational; they cover enrollment procedures, credential formats, verification protocols, and data governance; compliance is confirmed through regulatory publication."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Comprehensive regulatory framework in place; regulations are regularly reviewed and updated through a defined legislative cycle with public consultation."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Regulatory framework adaptive; regulations are updated through fast-track mechanisms to respond to technology change; cited as a CARICOM model for regulatory agility in digital identity."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.5.EX.Q2",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.5",
        "subpillar_name": "Legal Interoperability",
        "survey_type": "expert",
        "question_text": "How clearly are legacy credentials and existing IDs recognized within the legal framework?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formal legal pathways and transition timelines for the recognition and migration of legacy ID credentials are being formulated."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Draft regulations acknowledge legacy ID credentials but transitional recognition rules are inconsistently applied; sunset timelines are not defined."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Legislation establishes clear hierarchy of recognized credentials; legacy ID transitional pathways with defined validity periods enacted; implementation is verified through public transition reports."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Legacy credential recognition operationalized with automated validation; sunset timelines publicly communicated; migration progress tracked and reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "All legacy ID credentials are formally retired or migrated; legal hierarchy of credentials is stable and internationally recognized; transition framework is cited as a regional reference."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.5.EX.Q3",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.5",
        "subpillar_name": "Legal Interoperability",
        "survey_type": "expert",
        "question_text": "How mature are domestic and cross-border legal frameworks for interoperability and data sharing?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "No domestic data-sharing framework exists specifically for digital ID; cross-border data flows are currently unregulated."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "A domestic data-sharing framework is in draft form; cross-border data flows occur under ad hoc arrangements; initial bilateral negotiations are underway with CARICOM partners."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Domestic data-sharing framework is enacted with standardized data exchange agreements; cross-border framework is under negotiation; implementation is confirmed through inter-ministerial reporting."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Mature domestic framework supports automated credential validation across government systems; cross-border agreements are operational within CARICOM with mutual recognition protocols."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Adaptive legal frameworks enable real-time, privacy-preserving cross-border verification; multilateral agreements govern data sovereignty; Barbados serves as a regional reference for interoperable identity law."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.1.NE.Q1",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.1",
        "subpillar_name": "Legal Identity & Civil Registration",
        "survey_type": "stakeholder",
        "question_text": "Does the legal framework clearly define legal identity, enrollment status, and eligibility?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Comprehensive legislation explicitly defining digital legal identity and eligibility criteria is yet to be fully enacted."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Existing legislation addresses some aspects of identity but requires updates to fully cover digital identity, eligibility, and enrollment procedures."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Legislation is in place that establishes legal identity and outlines enrollment eligibility and procedures."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The law is fully in force and the process for determining who qualifies for a digital ID is largely automated."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The legal framework for digital identity is internationally recognized, with clear, comprehensive provisions and regular independent reviews."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.1.NE.Q2",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.1",
        "subpillar_name": "Legal Identity & Civil Registration",
        "survey_type": "stakeholder",
        "question_text": "How well is civil registration linked to the digital ID system to prevent statelessness?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Birth, marriage, and death records are kept separately and are not connected to the digital ID system at all."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Automated data exchange protocols linking civil registration systems (births, deaths) to the digital ID registry are currently being designed."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Automated data exchange protocols linking civil registration systems to the digital ID registry are being implemented; initial pilots have been conducted."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Routine, automated data exchange between civil registration and the digital ID registry ensures that life events are reflected in identity records in a timely manner."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Comprehensive, real-time data integration ensures that civil registration and the digital ID registry are fully synchronized, effectively eliminating gaps that could lead to statelessness."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.2.NE.Q1",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.2",
        "subpillar_name": "Data Protection & Privacy",
        "survey_type": "stakeholder",
        "question_text": "Does the data protection framework clearly apply to the digital ID system?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Foundational work is underway to establish the specific data protection legislation governing the handling of information within the digital ID system."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "A broad data protection law is in place in Barbados and specific regulatory guidance tailored to the digital ID system is being developed."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Data protection legislation is in place and its application to the digital ID system is clearly defined."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "An independent body actively monitors the ID system and publishes compliance reports."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The legal framework for digital identity is internationally recognized, with clear, comprehensive provisions and regular independent reviews."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.2.NE.Q2",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.2",
        "subpillar_name": "Data Protection & Privacy",
        "survey_type": "stakeholder",
        "question_text": "How well does Trident protect people's data by getting proper permission, only using it for the right purpose, and not collecting more than is needed?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Trident collects data without asking for permission and there are no rules about what it can be used for or how long it is kept."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Consent mechanisms are operational, with ongoing initiatives to strictly enforce data usage limits and retention schedules system-wide."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "The law requires that permission is obtained before data is used, limits what it can be used for, and sets rules about deleting it when it is no longer needed; all three are in place and working."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The system automatically enforces these three protections — permission rules, usage limits, and data deletion — and outside reviewers have confirmed publicly that they work."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident is built so that it is technically impossible to use someone's data beyond what they agreed to; the design is recognized as a model for data protection in CARICOM."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.3.NE.Q1",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.3",
        "subpillar_name": "Trust Services (eID, Signatures)",
        "survey_type": "stakeholder",
        "question_text": "Are digital identities and electronic signatures legally recognized?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The legal equivalence of digital IDs and electronic signatures for official transactions is not yet formalized in law."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Legislation to formally recognize digital IDs and electronic signatures is currently drafted and progressing through the review process."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Legislation is in place that recognizes digital IDs and electronic signatures for specific official uses."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Digital IDs are legally equal to physical ID documents across the public sector."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Digital IDs and e-signatures are legally recognized everywhere, and cross-border recognition agreements are operational."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.3.NE.Q2",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.3",
        "subpillar_name": "Trust Services (eID, Signatures)",
        "survey_type": "stakeholder",
        "question_text": "How broadly are digital credentials accepted across public and private services?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Physical documents currently serve as the primary method for accessing government services, with Trident digital ID integration in the early stages of roadmapping."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Trident digital IDs are being piloted for acceptance in a select number of initial government services to establish testing baselines."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Digital IDs are formally accepted across a core set of key government services, successfully linked to national login infrastructure."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Trident provides a seamless, single sign-on experience universally accepted across the vast majority of government digital services."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Digital IDs enjoy universal acceptance across both government and the private sector, with cross-border recognition operationalized."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.4.NE.Q1",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.4",
        "subpillar_name": "Emerging Tech Safeguards",
        "survey_type": "stakeholder",
        "question_text": "How well does the policy and regulatory framework support responsible innovation and risk management for AI-enabled identity services. Are there binding rules to assess and manage risks from AI and automated decision-making in ID systems?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Regulatory frameworks specifically addressing the risks of automated decision-making in the ID system are currently in development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Guidelines exist that suggest checking AI systems for risks, but following them is optional and there is no enforcement."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "The law requires that AI systems used in ID decisions be assessed for risks including bias."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Risk assessments are independently checked and AI systems are continuously monitored for unfair outcomes."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "AI in the ID system is governed throughout its full lifecycle with real-time monitoring and independent audits."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.4.NE.Q2",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.4",
        "subpillar_name": "Emerging Tech Safeguards",
        "survey_type": "stakeholder",
        "question_text": "How strong are transparency, monitoring, and independent review for automated ID decisions?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Transparency mechanisms, including plain-language explanations and review processes for automated decisions, are being established."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Some information about how automated decisions are made is available to affected individuals, but comprehensive explanations and independent review processes are not yet fully implemented."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "People have the right to receive an explanation for automated ID decisions and to request human review."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Anyone affected by an automated ID decision can see how it was made through publicly accessible tools."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Plain-language explanations are available to all affected individuals; tools are shared globally."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.5.NE.Q1",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.5",
        "subpillar_name": "Legal Interoperability",
        "survey_type": "stakeholder",
        "question_text": "Are implementing regulations in place to operationalize the ID law?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The ID law has been passed but the detailed rules needed to put it into practice have not yet been issued."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Draft rules to implement the ID law are being reviewed but have not been officially published."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "The detailed rules needed to operate the ID system have been officially issued and cover enrollment, ID formats, and data handling."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The rules are comprehensive and reviewed regularly; a formal process exists to update them when needed."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The rules can be updated quickly to keep up with new technology."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P5.5.NE.Q2",
        "pillar_code": "P5",
        "pillar_name": "Legal & Regulatory Foundations",
        "subpillar_code": "P5.5",
        "subpillar_name": "Legal Interoperability",
        "survey_type": "stakeholder",
        "question_text": "How clearly are legacy credentials and IDs recognized within the legal framework?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Guidelines for the continued validity and structured phasing out of legacy ID documents are currently being developed to ensure a smooth transition."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Existing rules acknowledge legacy IDs, with ongoing efforts to establish clear timelines and consistent transitional recognition protocols."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "The law clearly states which legacy IDs are still valid and for how long."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The transition from legacy to new IDs is tracked publicly; sunset timelines are communicated."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "All legacy ID types have been fully transitioned to the new system."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.1.EX.Q1",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.1",
        "subpillar_name": "Leadership & Coordination",
        "survey_type": "expert",
        "question_text": "Is there a clearly designated lead institution for digital ID, and how effective is its authority in driving inter-agency coordination?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The statutory mandate for a lead coordinating institution and structured inter-agency mechanisms are currently being finalized."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "A lead agency has been designated via directive, but its mandate is narrow; an inter-agency coordination body exists but meets irregularly without binding authority."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A lead institution is established by law with a clear coordination mandate; a formal inter-agency body meets regularly to make binding decisions, verified by published records."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The lead agency possesses operational independence and enforcement authority; cross-sector policy decisions are implemented via shared digital workflows and tracked publicly."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The lead agency utilizes an adaptive governance structure with civil society representation; it holds formal authority over all statutory bodies, serving as a CARICOM reference."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.1.EX.Q2",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.1",
        "subpillar_name": "Leadership & Coordination",
        "survey_type": "expert",
        "question_text": "How strong is whole-of-government policy harmonization across sectors using digital ID?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Whole-of-government digital ID strategies to harmonize policies across all sectors are currently being developed."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Some sector ministries reference digital ID in their policies but alignment is informal and inconsistently applied."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A whole-of-government digital ID strategy has been approved at cabinet level, designating sectoral leads and adoption targets across key ministries; implementation progress is reported to cabinet."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Direct ministerial accountability mechanisms are operationalized; cross-sector policy alignment automated via shared workflow tools; joint service delivery operational."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Policy harmonization extends to statutory bodies and agencies; joint cross-sector service delivery using digital ID is operational; the approach is cited as a CARICOM model."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.2.EX.Q1",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.2",
        "subpillar_name": "Skills & Capacity",
        "survey_type": "expert",
        "question_text": "Do digital ID institutions have structured training programs and competency frameworks?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Baseline skill requirements are currently managed informally, with structured capacity building programs and competency frameworks identified as future development areas."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Formalized competency frameworks and structured training programs for digital ID personnel are currently being mapped out."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A structured competency framework defines the skills required for all digital ID roles; regular certified training cycles are delivered; participation and certification outcomes are tracked in official records."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Competency framework aligned with international digital identity standards; training delivered via international partnerships; career pathways defined and publicly communicated."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "National digital academy offers digital ID training with regional hub status; continuous learning embedded in institutional culture; training outcomes independently evaluated."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.2.EX.Q2",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.2",
        "subpillar_name": "Skills & Capacity",
        "survey_type": "expert",
        "question_text": "How strong are staffing, retention, and specialist capacity for operating the ID system?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The system experiences capacity constraints in critical technical roles, highlighting the need to formalize a targeted specialist retention strategy."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Core technical roles are established, and the agency is actively formulating strategies to enhance long-term retention."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A formalized staffing plan identifies critical roles and required competencies; retention incentives are in place and their impact is tracked and reported to leadership."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Retention rates for specialist roles are above sector benchmarks; succession planning is operationalized; and retention strategies are publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Institution recognized as employer of choice for digital identity specialists; retention data independently validated; model cited regionally."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.2.EX.Q3",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.2",
        "subpillar_name": "Skills & Capacity",
        "survey_type": "expert",
        "question_text": "How well is change management and user adoption support embedded across implementing institutions?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "No formal change management function exists; technology deployments proceed without stakeholder engagement, communications planning, or adoption support."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Dedicated change management and stakeholder adoption strategies are currently being integrated into deployment plans."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Digital ID deployments include documented stakeholder engagement plans; adoption barriers identified and addressed; implementation is verified through post-deployment reviews."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Change management proactive and data-driven; adoption metrics tracked and inform iterative communications; outcomes publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Change management capability institutionalized across the whole-of-government digital ID ecosystem; approach independently evaluated and shared with CARICOM partners."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.3.EX.Q1",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.3",
        "subpillar_name": "Vendor & Technical Management",
        "survey_type": "expert",
        "question_text": "How strong are the procurement arrangements, and how effective is the government's ongoing technical oversight of vendor performance?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formal digital ID-specific procurement guidelines and structured government technical oversight capabilities are currently in the development phase."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Standard government procurement rules are applied; technical oversight relies largely on vendor reporting or external consultants while internal audit capabilities are strengthened."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Competitive procurement with transparent evaluation criteria and SLA enforcement is standard; a dedicated government oversight unit conducts regular audits, tracking findings in an official register."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Procurement mandates open standards compliance; independent technical audits are conducted regularly, driving corrective action plans that are tracked and published."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The procurement framework is recognized as an international best practice; technical oversight is continuous, automated, and supplemented by independent red-team exercises to ensure vendor accountability."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.3.EX.Q2",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.3",
        "subpillar_name": "Vendor & Technical Management",
        "survey_type": "expert",
        "question_text": "To what extent does the architecture and contracting approach reduce vendor lock-in?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Digital ID system entirely dependent on a single proprietary vendor."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Vendor contracts include basic data portability clauses but not technically implemented; no alternative vendor assessed."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Contracts include source code escrow, data portability, and API interoperability clauses; implementation is verified through technical audits."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Multi-vendor architecture operational; open standards compliance mandatory criterion in all procurement; portability tested through live migration exercises."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Government retains full sovereignty over core infrastructure, data, and intellectual property; architecture independently validated as vendor-independent."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.4.EX.Q1",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.4",
        "subpillar_name": "Institutional Accountability",
        "survey_type": "expert",
        "question_text": "Are institutional roles, mandates, and reporting lines for digital ID clearly defined?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Institutional roles are currently distributed across agencies; efforts to unify mandates and streamline reporting lines are being mapped out."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Roles and responsibilities are partially documented in policy, with active efforts to clarify operational workflows and formalize inter-agency reporting lines."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Institutional mandates clearly defined in law or formal policy; organizational chart with reporting lines published and updated; implementation is verified through official publication."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Institutional mandates regularly reviewed; performance against mandate publicly reported; inter-agency reporting automated and tracked."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Institutional framework adaptive and continuously evaluated; recognized as a model for clear accountability in digital public infrastructure; evaluation outcomes independently validated."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.4.EX.Q2",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.4",
        "subpillar_name": "Institutional Accountability",
        "survey_type": "expert",
        "question_text": "How effective are internal accountability processes across implementing agencies, and how strong is the external oversight of institutional performance?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Internal compliance mechanisms and formal external oversight bodies for monitoring institutional performance across the ecosystem are currently being established."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Basic internal reporting exists within isolated agencies, but cross-agency compliance is inconsistent; external oversight frameworks remain in the planning phase."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Internal compliance reporting and audit tracking function across implementing agencies; operational oversight bodies hold defined authority to review and enforce institutional performance."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Compliance is monitored in real-time via shared dashboards with automated escalation; independent oversight bodies actively publish performance reports, driving corrective action."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "A fully integrated accountability ecosystem enables continuous monitoring; real-time performance oversight is embedded in governance, serving as a validated regional reference."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.5.EX.Q1",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.5",
        "subpillar_name": "Financing & Sustainability",
        "survey_type": "expert",
        "question_text": "Is there a long-term financing plan for operating and improving the digital ID system?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Financial planning currently operates on annual budget cycles, with long-term, multi-year sustainability pathways under evaluation."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Comprehensive, multi-year financial sustainability plans for the digital ID ecosystem are actively being formulated to supplement current annual funding."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Multi-year financial plan with dedicated budget lines for operations, maintenance, and technology refresh formally approved; plan implementation is tracked through budget execution reports."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Multi-year financial plan includes contingency reserves and covers planned innovation sprints; plan execution is regularly reviewed and reported publicly."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Transparent full-cost accounting with public reporting underpins a self-sustaining financial model; surplus reinvested in an innovation fund; model independently validated."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.5.EX.Q2",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.5",
        "subpillar_name": "Financing & Sustainability",
        "survey_type": "expert",
        "question_text": "How diversified and reliable are funding sources for digital ID?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Digital ID system funded entirely from a single source (general government revenue or a single donor)."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Funding comes from government appropriations with some donor supplementation; cost recovery options explored but not implemented."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Funding diversified across government budget, development partner contributions under a formal framework, and modest cost recovery; diversification strategy is documented and reviewed annually."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Multiple revenue streams — government, development partners, user fees, and commercial API usage fees — operational and tracked; revenue performance publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Self-sustaining revenue ecosystem funds operations and innovation; revenue model independently validated and cited as a regional reference."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.5.EX.Q3",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.5",
        "subpillar_name": "Financing & Sustainability",
        "survey_type": "expert",
        "question_text": "How well is the long-term financial sustainability of Trident secured through coordinated planning and stable funding — regardless of source?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "No coordinated financial planning exists; Trident's funding is decided year by year with no multi-year commitment from any source."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Some planning has been done but funding commitments are short-term; there is no formal coordination between budget authorities, ministries, and any external supporters."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A formal coordination mechanism exists between the Ministry of Finance, the lead digital ID agency, and any key funders; multi-year funding commitments are documented and agreed; implementation is verified through budget execution reports."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The funding plan is formally reviewed annually; contingency reserves are maintained; all parties — whether government ministries, statutory bodies, or development partners — report against agreed milestones; outcomes publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident's financial sustainability is secured through a diversified, domestically-anchored model; the funding strategy is transparent and publicly reported; the system has maintained uninterrupted operation through at least one budget cycle without emergency supplementation; model independently validated."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.1.NE.Q1",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.1",
        "subpillar_name": "Leadership & Coordination",
        "survey_type": "stakeholder",
        "question_text": "Is there a clearly designated lead institution with a defined mandate for Trident?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Institutional responsibilities for Trident are currently distributed across multiple agencies, without a singular, formalized coordinating mandate."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "A lead ministry has been designated, with efforts underway to formalize its statutory mandate and strengthen inter-agency coordination."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A specific institution is legally responsible for Trident with a clear mandate and authority to coordinate other government departments."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The lead institution is independent and has real authority over other agencies on Trident matters; coordination decisions are publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The lead institution includes voices from civil society and the private sector; the governance model is recognized across CARICOM."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.1.NE.Q2",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.1",
        "subpillar_name": "Leadership & Coordination",
        "survey_type": "stakeholder",
        "question_text": "How effective are inter-agency coordination mechanisms for Trident policy and implementation?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Inter-agency coordination for Trident is currently informal, with ministries largely operating independently."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "An inter-agency coordination group is in place, with processes being refined to establish regular schedules and formalized decision-making authority."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A formal coordination body meets regularly; decisions are recorded and agencies must follow agreed policies."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The coordination body can enforce its decisions; shared digital tools support coordination across agencies and outcomes are publicly tracked."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Coordination includes statutory bodies and CARICOM partners; civil society participates in a structured advisory role."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.2.NE.Q1",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.2",
        "subpillar_name": "Skills & Capacity",
        "survey_type": "stakeholder",
        "question_text": "Do Trident institutions have structured training programs and competency frameworks?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Formalized competency frameworks and specialized training programs for Trident personnel are currently being mapped out."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "New staff receive basic induction training but there is no structured program or certification for Trident roles."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A formal training program exists with defined skill requirements, and staff are certified through regular training cycles."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Training meets international standards; career paths for Trident specialists are clearly mapped and publicly communicated."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "A national training hub offers Trident courses to the region; the approach is recognized across CARICOM."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.2.NE.Q2",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.2",
        "subpillar_name": "Skills & Capacity",
        "survey_type": "stakeholder",
        "question_text": "How strong are staffing, retention, and specialist capacity for operating Trident?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The system currently relies on external capacity for core technical operations, with long-term retention and internal knowledge-transfer strategies under development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Core technical roles are established, and the agency is actively formulating strategies to enhance long-term retention and institutional knowledge transfer."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A comprehensive staffing plan covers all critical roles; structured career development pathways and competitive incentives are successfully retaining skilled staff."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Staff turnover in specialist roles is exceptionally low; proactive succession plans are operational, and retention strategies are publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The Trident agency is widely recognized as a premier employer for digital identity experts; robust retention data is independently validated."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.3.NE.Q1",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.3",
        "subpillar_name": "Vendor & Technical Management",
        "survey_type": "stakeholder",
        "question_text": "How strong are procurement and contract management arrangements for Trident?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Digital ID-specific procurement guidelines and targeted vendor performance frameworks are yet to be standardized"
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Standard government procurement rules are currently utilized, with tailored guidelines specific to Trident's digital infrastructure under development."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Trident contracts are awarded through open competition with published evaluation criteria."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Procurement decisions are publicly reported; a dedicated team monitors vendor performance against contract requirements."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Procurement practices are recognized internationally; contract templates are shared for other CARICOM countries to use."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.3.NE.Q2",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.3",
        "subpillar_name": "Vendor & Technical Management",
        "survey_type": "stakeholder",
        "question_text": "To what extent does the architecture and contracting approach reduce vendor lock-in?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "The system architecture currently relies on specific vendor technologies; switching would be extremely costly and difficult."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Strategies to enhance vendor independence are being explored."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "The system architecture avoids excessive vendor dependency; contracts include data portability clauses and define clear exit strategies."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The system uses multiple vendors and open standards; the government can switch components without major disruption."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The Government fully owns Trident and all its data; the architecture is independently validated as vendor-independent."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.4.NE.Q1",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.4",
        "subpillar_name": "Institutional Accountability",
        "survey_type": "stakeholder",
        "question_text": "Are institutional roles, mandates, and reporting lines for Trident clearly defined?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Institutional mandates and reporting lines for various components of Trident are yet to be formally delineated."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Institutional responsibilities are documented, and inter-agency workflows are being actively refined to optimize coordination and streamline service delivery."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Each agency involved in Trident has a clearly defined role set out in law."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Each institution regularly reports on its performance; governance tools automate reporting between agencies and results are publicly available."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "The institutional framework is regularly updated and independently evaluated; the model is shared across CARICOM."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.4.NE.Q2",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.4",
        "subpillar_name": "Institutional Accountability",
        "survey_type": "stakeholder",
        "question_text": "How effective are internal accountability and compliance processes across implementing agencies?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Consistent internal compliance checks and standardized accountability measures across implementing agencies are currently in development."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Some internal reporting exists within agencies but checking compliance across agencies is inconsistent."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "All implementing agencies have working compliance processes; audit findings are tracked and acted upon."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Compliance is tracked in real time across agencies; failures trigger automatic escalation and are publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Accountability is continuous and system-wide; the approach is independently validated and shared regionally."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.5.NE.Q1",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.5",
        "subpillar_name": "Financing & Sustainability",
        "survey_type": "stakeholder",
        "question_text": "Is there a long-term financing plan for operating and improving Trident?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Financial planning for Trident is currently managed on short-term cycles, without a formalized multi-year sustainability strategy."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Core operations are supported by secure annual funding, while a comprehensive multi-year financial strategy is being formulated."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "A multi-year financial plan has been approved covering operations, maintenance, and upgrades and is reviewed each year."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "The financial plan includes dedicated reserves for emergency situations and fully funds future technology upgrades and plan performance is publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Full costs are transparently reported publicly and Trident generates enough to reinvest in innovation and the model is recognized regionally."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    },
    {
        "q_code": "P6.5.NE.Q2",
        "pillar_code": "P6",
        "pillar_name": "Institutional Capacity & Governance",
        "subpillar_code": "P6.5",
        "subpillar_name": "Financing & Sustainability",
        "survey_type": "stakeholder",
        "question_text": "How diversified and reliable are funding sources for Trident?",
        "options": [
            {
                "score": 1,
                "label": "1 - Basic",
                "description": "Funding is currently centralized through a primary source, highlighting an opportunity to build resilience through future financial diversification."
            },
            {
                "score": 2,
                "label": "2 - Opportunistic",
                "description": "Funding comes mainly from government allocations, with early explorations into diversifying revenue through external partnerships or services."
            },
            {
                "score": 3,
                "label": "3 - Systematic",
                "description": "Several funding sources are in use — government budget, donor grants, and some fees for premium services."
            },
            {
                "score": 4,
                "label": "4 - Differentiating",
                "description": "Multiple funding streams are active and tracked; reserves covering at least one year of operations are maintained and publicly reported."
            },
            {
                "score": 5,
                "label": "5 - Transformational",
                "description": "Trident is financially self-sustaining through diverse revenue streams; the funding strategy is transparent and publicly reported."
            },
            {
                "score": 9,
                "label": "I don't know / Unable to assess",
                "description": "Insufficient information to make an assessment."
            }
        ],
        "allow_unknown": true
    }
];