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
    "question_text": "How inclusive is digital ID enrollment across all population groups and regions?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Coverage below 20%; no disaggregated data by geography, gender, or vulnerability; no equity targets set."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Coverage 20–40%; basic disaggregation by geography and gender collected; to rural areas is ad hoc."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Coverage 40–70%; formal inclusion strategy with equity targets operational; reach remote areas. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Coverage 70–90%; real-time equity dashboards track gaps by sub-group; multi-modal enrollment reduces structural barriers."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Coverage exceeds 90%; no exclusion attributable to system design; inclusion innovations shared globally."
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
    "question_text": "How inclusive is digital ID enrollment across all population groups and regions?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Fewer than 1 in 5 people have a digital ID; no effort is made to track or reach groups who are left out."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Between 1 in 5 and 2 in 5 people are enrolled; some data is collected by region and gender but is limited."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Between 2 in 5 and 7 in 10 people are enrolled; a formal inclusion plan is in place; mobile teams reach remote areas."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Between 7 in 10 and 9 in 10 people are enrolled; real-time data tracks gaps for specific groups."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Over 9 in 10 people are enrolled; no one is excluded because of how the system was designed."
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
    "question_text": "What specific measures exist to reach marginalized or hard-to-reach populations?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No targeted measures for marginalized groups; no alternative documentation pathways exist."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some rural outreach occurs; alternative documentation pathways proposed but not operationalized."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Structured inclusion strategy with dedicated outreach targets identified vulnerable groups (stateless, disabled, elderly, minorities). (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Annual exclusion mapping conducted; community enrollment agents deployed in hard-to-reach areas; proactive outreach funded."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Zero exclusion attributable to system design independently verified; model shared globally."
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
        "label": "1 – Basic",
        "description": "Nothing specific is done to help people who are hard to reach — such as those living remotely or without documents."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some outreach happens in rural areas; alternative ways to prove identity are proposed but not yet available."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A formal inclusion program targets specific groups such as people with disabilities, the elderly, and remote communities."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Each year, a mapping exercise identifies those still excluded; community agents operate in remote areas."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "outside reviewers have confirmed publicly confirm that no one is excluded because of how the system is designed."
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
    "q_code": "P1.1.EX.Q3",
    "pillar_code": "P1",
    "pillar_name": "Service Delivery & User Value",
    "subpillar_code": "P1.1",
    "subpillar_name": "Coverage & Inclusion",
    "survey_type": "expert",
    "question_text": "How strong are accessibility and non-discrimination protections in the enrollment process?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No accessibility requirements applied in enrollment design; system does not accommodate persons with disabilities."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic accessibility accommodations available informally; WCAG compliance not assessed; non-discrimination not enforced."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "WCAG 2.1 AA compliance implemented and certified for all digital channels; legally mandated non-discrimination provisions apply. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Accessibility proactively monitored through user testing with persons with disabilities; equity audits published."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
        "label": "1 – Basic",
        "description": "No user testing conducted; interface assumes high digital literacy; only in-person enrollment available."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic usability testing done with a small, non-representative sample; some channel options available."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Comprehensive UX research with diverse user representation informs design; multiple channels (online, mobile, in-person) available. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Continuous usability feedback loops drive iterative improvements; satisfaction scores benchmarked and publicly reported."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "System recognized as exemplary in user-centered design; UX innovations contributed to global DPI design standards."
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
    "question_text": "How easy is the digital ID system to use across different channels and devices?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "The system has never been tested with real users; it assumes a level of digital skill that many people do not have."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some basic usability testing has been done but with a limited group of people."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "The system was designed based on research with a wide range of users; multiple ways to access it are available."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "User feedback is collected continuously and drives improvements; satisfaction scores are publicly reported."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The system is internationally recognized for excellent user-centered design."
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
    "question_text": "How well does the system support users with disabilities, low digital literacy, or limited connectivity?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Digital channels not accessible to persons with disabilities; no assisted enrollment or literacy support available."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Partial WCAG compliance for some channels; assisted enrollment available informally in some locations."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Full WCAG 2.1 AA compliance across all channels; assisted enrollment available as a standard service. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Proactive accessibility innovation beyond WCAG minimums; digital literacy support embedded in enrollment experience."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "System is an internationally recognized model for accessible public digital services."
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
    "question_text": "How well does the system support users with disabilities, low digital literacy, or limited connectivity?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "People with disabilities cannot use the digital system; there is no help for people with low digital skills."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some parts of the digital system are accessible; assisted enrollment exists in some locations informally."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "The system meets formal accessibility standards; help is available at every enrollment point."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Accessibility goes beyond legal minimums; dedicated support is available for all users who need it."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The system is internationally recognized for accessible public digital design."
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
    "q_code": "P1.2.EX.Q3",
    "pillar_code": "P1",
    "pillar_name": "Service Delivery & User Value",
    "subpillar_code": "P1.2",
    "subpillar_name": "User Experience",
    "survey_type": "expert",
    "question_text": "How effective are offline or low-connectivity options for accessing digital ID services?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No offline capability; digital ID services entirely dependent on internet connectivity."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Offline enrollment available but verification requires connectivity; syncing of offline records is manual and delayed."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Seamless offline/online synchronization operational; enrollment and basic verification possible without connectivity. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Offline capability supports the full range of ID use cases including authentication for government services."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Offline-first design is a core architectural principle; offline innovations contributed to global DPI standards."
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
        "label": "1 – Basic",
        "description": "Digital ID not accepted for any government service; all services require physical documents."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Digital ID accepted in one or two government pilot services; integration not mandated."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Digital ID mandatorily accepted across three or more core government services via standardized API-based authentication. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Digital ID accepted across the full public sector with a single sign-on experience; adoption monitored and publicly reported."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
    "q_code": "P1.3.NE.Q1",
    "pillar_code": "P1",
    "pillar_name": "Service Delivery & User Value",
    "subpillar_code": "P1.3",
    "subpillar_name": "Service Integration",
    "survey_type": "stakeholder",
    "question_text": "How widely is digital ID integrated into government services?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No government service accepts digital ID; physical documents are always required."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Digital ID is accepted in one or two pilot government services only."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Digital ID is accepted across several core government services through a standard connection process. (e.g., NIS, BRA, or passport services)."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "A single digital ID login works across all government services; adoption is tracked and publicly reported."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Digital ID is accepted by all public services and some cross-border services."
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
        "label": "1 – Basic",
        "description": "Digital ID not accepted by any private sector entity or statutory institution."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "A small number of private companies accept digital ID voluntarily; statutory bodies and agencies operate independent identity systems."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Private sector acceptance mandated for regulated industries (banking, telecoms); statutory adoption under a standard process. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Widespread voluntary private sector adoption beyond mandated industries; thriving digital identity ecosystem."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
    "q_code": "P1.3.NE.Q2",
    "pillar_code": "P1",
    "pillar_name": "Service Delivery & User Value",
    "subpillar_code": "P1.3",
    "subpillar_name": "Service Integration",
    "survey_type": "stakeholder",
    "question_text": "How broadly is digital ID accepted by the private sector and statutory institutions?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Private companies and parish-level services do not accept digital ID."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "A few private companies accept digital ID voluntarily; parish-level services use separate identity systems."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Banks and telecoms are required to accept digital ID; parish-level services have adopted it."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Most private companies accept digital ID and build value-added services on top of it."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Private and statutory acceptance is universal."
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
        "label": "1 – Basic",
        "description": "Users cannot rely on digital ID for any service journey; authentication experiences are inconsistent or non-functional."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Users can rely on digital ID for one or two service journeys but experience significant inconsistency."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Users can consistently use digital ID across defined priority service journeys; reliability tracked with SLA targets. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "User trust demonstrated through survey data; SLA performance publicly reported."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
        "label": "1 – Basic",
        "description": "No measurement of transaction time reduction; manual identity verification processes dominate service delivery."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic time-tracking for enrollment conducted; limited automation yields anecdotally reported time savings."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Transaction time reduction systematically measured for key services; documented improvements of at least 30% evidenced. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Real-time analytics measure transaction efficiency across all digital ID-enabled services; savings quantified in economic terms."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "International benchmarking confirms top-quartile transaction efficiency; time savings independently audited."
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
    "question_text": "To what extent has digital ID reduced transaction time and cost for users and service providers?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No one measures whether using digital ID saves time; manual processes still dominate most services."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Enrollment time has been tracked in one or two places; some time savings reported but not formally measured."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Time savings from using digital ID are measured for the main services."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Transaction times are tracked in real time across all digital ID services and converted into economic savings."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The country ranks among the best globally for transaction efficiency using digital ID."
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
        "label": "1 – Basic",
        "description": "No economic or social value assessment conducted; service delivery costs not tracked against a digital ID baseline."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Anecdotal evidence of cost savings in one or two services; no formal cost-benefit analysis completed."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Formal cost-benefit analysis or economic impact assessment conducted and published. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Demonstrable economic impact evidenced through independent studies; value tracked by service type and user segment."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
    "q_code": "P1.4.NE.Q2",
    "pillar_code": "P1",
    "pillar_name": "Service Delivery & User Value",
    "subpillar_code": "P1.4",
    "subpillar_name": "Value",
    "survey_type": "stakeholder",
    "question_text": "How much economic and social value has digital ID generated through cost savings or convenience gains?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No one has studied whether digital ID saves money or makes life easier for people."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some anecdotal evidence of savings exists but no formal study has been done."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A formal study has been done showing the economic and social benefits of digital ID."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Independent studies show the economic impact of digital ID; results are broken down by service and user group."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Digital ID's contribution to the economy is officially recognized nationally and internationally."
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
        "label": "1 – Basic",
        "description": "Efficiency metrics not defined for digital ID-enabled services; no feedback loop links performance data to improvement decisions."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some performance metrics tracked informally; efficiency data reviewed periodically but does not systematically drive improvement."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Performance measurement framework with defined KPIs operational for digital ID-enabled services. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Real-time performance analytics integrated into service management dashboards; improvements tracked publicly."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
        "label": "1 – Basic",
        "description": "No formal user feedback mechanism exists; feedback received informally through ad hoc channels with no tracking."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic feedback channel (email or complaints box) exists; feedback reviewed irregularly; no systematic tracking."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Multi-channel feedback system with automated routing and tracking operational; feedback categorized and reviewed in structured cycles. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Advanced analytics on feedback data identify systemic issues proactively; feedback informs co-design of service enhancements."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
    "q_code": "P1.5.NE.Q1",
    "pillar_code": "P1",
    "pillar_name": "Service Delivery & User Value",
    "subpillar_code": "P1.5",
    "subpillar_name": "Improvement",
    "survey_type": "stakeholder",
    "question_text": "How systematically is user feedback collected and acted upon for digital ID-enabled services?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "There is no formal way for people to give feedback about their digital ID experience."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "There is a basic way to give feedback (like an email address) but it is checked irregularly."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A multi-channel feedback system is in place; feedback is tracked and used to improve services."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Analytics on feedback data identify problems before they escalate; feedback informs service redesign."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Feedback drives real-time service adaptation; the feedback approach is shared internationally as a best practice."
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
    "question_text": "How well is service performance monitored and acted upon?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No service performance monitoring exists for digital ID-enabled services."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic performance metrics (e.g., system uptime) monitored internally; no public reporting."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Performance monitoring framework with defined KPIs, SLA targets, and public dashboards operational. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Advanced analytics detect performance degradation proactively; improvement actions tracked in a public register."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Real-time performance monitoring drives adaptive management; framework contributed to global DPI service management standards."
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
        "label": "1 – Basic",
        "description": "No one monitors how well digital ID services are performing."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic performance data (like whether the system is online) is tracked internally but not shared publicly."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A performance monitoring system with clear targets and public dashboards is in place."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Advanced tools detect problems before they affect users; improvement actions are publicly tracked."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Performance monitoring is real time and drives continuous improvement; the approach is recognized globally."
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
    "q_code": "P1.5.EX.Q3",
    "pillar_code": "P1",
    "pillar_name": "Service Delivery & User Value",
    "subpillar_code": "P1.5",
    "subpillar_name": "Improvement",
    "survey_type": "expert",
    "question_text": "How effective are continuous improvement processes for fixing problems and optimizing service delivery?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No continuous improvement process exists; service problems recur without systemic resolution."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Informal improvement process exists; some problems fixed reactively; retrospective reviews occur after major incidents only."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Structured continuous improvement process (e.g., PDCA) institutionalized for digital ID-enabled services. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Improvement processes data-driven and time-bound; co-design with users standard practice for major improvements."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Improvement methodology fully embedded and contributes to adaptive service design; shared globally."
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
        "label": "1 – Basic",
        "description": "No consent mechanism exists; data collected and shared without user knowledge; no legal basis for processing documented."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic consent notices provided at enrollment but not informed (complex language, pre-ticked boxes); no withdrawal mechanism."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Informed consent obtained in plain language at point of data collection; user portal enables consent management and withdrawal. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Granular, dynamic consent allows users to control data sharing per service; consent logs available to users in real time."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
    "q_code": "P2.1.NE.Q1",
    "pillar_code": "P2",
    "pillar_name": "Safeguards, Trust & Accountability",
    "subpillar_code": "P2.1",
    "subpillar_name": "Consent & Data Minimization",
    "survey_type": "stakeholder",
    "question_text": "How well does the system implement informed consent for data collection and sharing?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Data is collected without asking permission; people do not know what information is taken or how it is used."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "A consent notice is shown during enrollment but it uses complex language and people cannot withdraw consent."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Consent is obtained in plain language; a user portal allows people to manage and withdraw consent."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "People can control exactly which services see which data; consent records are available in real time."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The consent system is recognized globally as a best practice for privacy-respecting digital identity."
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
        "label": "1 – Basic",
        "description": "Data beyond what is necessary for service delivery routinely collected; no purpose limitation applied."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Data minimization and purpose limitation stated in policy but not technically enforced."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Data minimization implemented in system design; only data required for each specific service collected and exchanged. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Automated data minimization routines purge data exceeding retention limits; purpose limitation verified through independent audits."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
    "q_code": "P2.1.NE.Q2",
    "pillar_code": "P2",
    "pillar_name": "Safeguards, Trust & Accountability",
    "subpillar_code": "P2.1",
    "subpillar_name": "Consent & Data Minimization",
    "survey_type": "stakeholder",
    "question_text": "To what extent are data minimization and purpose limitation applied in practice?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "More data is collected than is needed for services; there are no limits on how it can be used."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Policies mention collecting only what is needed but this is not technically enforced in practice."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "The system is designed to collect only the minimum data needed for each service."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "the system automatically delete data after its permitted use; outside reviewers have confirmed publicly check that only the right data is used."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Advanced privacy technologies mean that sharing any unnecessary data is technically impossible."
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
        "label": "1 – Basic",
        "description": "Users have no rights to access, correct, port, or delete personal data; no mechanism to exercise such rights exists."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "User rights stated in policy but exercising them requires a complex manual process with long response times."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Users can access, correct, and (where legally applicable) delete or port their data through a self-service portal. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "User rights exercisable in real time via a digital dashboard; rights exercise logged and independently verified."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
    "question_text": "How transparent are digital ID system rules, operations, and decision processes to the public?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No public information available on how the digital ID system operates; decision-making logic undisclosed."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "High-level system descriptions published; key operational rules documented internally but not publicly accessible."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Comprehensive public reporting covers system rules, operational performance, and key decision processes. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Real-time transparency dashboards enable public monitoring of system performance and compliance."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Transparency tools contributed to global DPI repositories AND a genuine additional capability layer (e.g., automation, self-healing) is present; model independently recognized as a regional standard."
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
    "question_text": "How transparent are digital ID system rules, operations, and decision processes to the public?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Nothing is publicly available about how the digital ID system works or how decisions are made."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "High-level descriptions are published but the rules governing the system are not publicly available."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Comprehensive public reports cover how the system works, what rules it follows, and how it performs."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "anyone can check online at any time allow anyone to see system performance and compliance."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Transparency tools are shared with other countries; the model is recognized as a regional standard."
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
        "label": "1 – Basic",
        "description": "No explanation given when an enrollment is rejected, an ID is suspended, or a correction is denied; no reason is stated."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "A generic reason is provided for administrative decisions but it does not explain the specific basis or how to challenge it."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Individuals receive a written explanation of the specific reasons for decisions affecting their ID status, with information on how to appeal; decisions are logged."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Explanations are provided in plain language within a defined timeframe; a summary of all administrative decisions and their outcomes is published annually."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
    "q_code": "P2.2.NE.Q2",
    "pillar_code": "P2",
    "pillar_name": "Safeguards, Trust & Accountability",
    "subpillar_code": "P2.2",
    "subpillar_name": "Transparency & Explainability",
    "survey_type": "stakeholder",
    "question_text": "How understandable are automated decisions and technical processes for affected users and institutions?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "When an automated decision affects someone, no explanation is given and there is no way to understand why."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "General information about how the system makes decisions is available to institutions but not to individual users."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Anyone affected by an automated decision can receive a plain-language explanation of how and why it was made."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Interactive tools let individuals query specific decisions made about them."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Explainability tools are open-source; the approach is adopted by other countries."
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
    "q_code": "P2.2.EX.Q3",
    "pillar_code": "P2",
    "pillar_name": "Safeguards, Trust & Accountability",
    "subpillar_code": "P2.2",
    "subpillar_name": "Transparency & Explainability",
    "survey_type": "expert",
    "question_text": "How proactively are system documentation, privacy notices, and operational information disclosed?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "System documentation, privacy notices, and operational information only provided upon formal request; no proactive disclosure."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic privacy notices published at enrollment; system changes not proactively communicated to affected users."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Privacy notices, system change notifications, and operational documentation proactively published and updated in real time. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Users proactively notified of all changes affecting their data or rights; documentation available in multiple formats and languages."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Proactive disclosure embedded as a core system design principle; transparency model contributed to global DPI governance frameworks."
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
    "question_text": "How clear and accessible are mechanisms for lodging complaints about digital ID issues?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No formal complaint mechanism specific to digital ID exists; complaints handled informally with no tracking."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic complaint channel (phone or in-person) exists but not widely advertised; complaints acknowledged inconsistently."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Multi-channel complaint system (online, phone, in-person) operational; complaints acknowledged within defined timeframes. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Complaint mechanisms accessible in all relevant languages and formats; digital self-service options enable submission and tracking."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Complaint accessibility recognized as a model for inclusive redress; mechanism design contributed to global DPI accountability frameworks."
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
    "question_text": "How clear and accessible are mechanisms for lodging complaints about digital ID issues?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "There is no official way for people to complain about the digital ID system."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "A way to complain exists but it is not widely known about and complaints are not consistently acknowledged."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A formal multi-channel complaint system is in place; complaints are acknowledged within set timeframes."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The complaint system is accessible in all relevant languages; people can submit and track complaints digitally."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The complaint system is a regional model for accessible redress."
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
    "question_text": "How timely and effective is resolution of digital ID complaints and disputes?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No resolution timeframe exists; most complaints not resolved; no escalation or appeal pathway available."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Resolution timeframes defined but not consistently met; most complaints result in a response but not necessarily a remedy."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Resolution timeframes legally defined and met in the majority of cases; remedies provided where complaints are upheld. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "SLA compliance for complaint resolution publicly reported; repeat complaints trigger systemic reviews."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Resolution timelines and remedy rates published in real time; systemic issues identified through complaints drive proactive improvements."
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
    "question_text": "How timely and effective is resolution of digital ID complaints and disputes?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "There is no time limit for resolving complaints; most complaints lead to no outcome."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Time limits for resolving complaints exist but are not consistently met."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Resolution timeframes are set by law and mostly met; where complaints are upheld, remedies are provided."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Complaint resolution performance is publicly reported; patterns in complaints trigger fixes to systemic problems."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Resolution rates and times are published in real time; complaint patterns proactively improve the system."
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
    "q_code": "P2.3.EX.Q3",
    "pillar_code": "P2",
    "pillar_name": "Safeguards, Trust & Accountability",
    "subpillar_code": "P2.3",
    "subpillar_name": "Accountability & Redress",
    "survey_type": "expert",
    "question_text": "How functional are administrative or judicial review channels for challenging digital ID decisions?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No administrative or judicial review channel specific to digital ID decisions exists."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Administrative appeal process exists in theory but is difficult to navigate; judicial review costly and complex."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Accessible administrative review channel with defined timelines and standards operational; judicial review available and affordable. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Administrative and judicial review channels actively used and effective; success rates, timelines, and remedies publicly reported."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
    "question_text": "How strong are legal and operational protections against exclusion and discrimination in the digital ID system?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No non-discrimination provisions in legislation or policy governing digital ID; no monitoring of differential exclusion impacts."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Non-discrimination mentioned in policy but not operationally implemented; no complaint mechanism addresses discrimination in ID access."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Comprehensive anti-discrimination framework with explicit digital ID provisions enacted and operationally enforced. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Anti-discrimination provisions enforced by an independent body; algorithmic bias detection applied to ID system decision-making."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Equity safeguards technically embedded at system level; safeguard model contributed to global DPI standards."
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
    "question_text": "How strong are legal and operational protections against exclusion and discrimination in the digital ID system?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "There are no rules preventing the digital ID system from excluding or discriminating against certain groups."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Non-discrimination is mentioned in policy but there is no mechanism to detect or address it in practice."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A comprehensive framework prevents discrimination in digital ID; it is actively enforced."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "An independent body enforces anti-discrimination rules; AI-based checks detect bias in ID decisions."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Protections against bias are built into the technical system; the model is shared globally."
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
    "question_text": "How systematically are equity risks assessed and mitigated for vulnerable groups?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No equity risk assessment conducted for digital ID system design, deployment, or updates."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Equity risks considered informally during design; no structured risk assessment process or mitigation plan exists."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Structured equity risk assessment conducted for all major system changes and new deployments; mitigation measures documented. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Equity risk assessments conducted by independent experts; risk registers maintained and publicly shared."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Equity risk assessment a mandatory, continuous process embedded in system governance."
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
    "question_text": "How systematically are equity risks assessed and mitigated for vulnerable groups?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No one checks whether the digital ID system creates unfair outcomes for specific groups."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Equity risks are considered informally during design but there is no structured process."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A formal equity risk assessment is done for all major system changes; mitigation measures are documented."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Independent experts conduct equity risk assessments; risk registers are publicly shared."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Equity risk assessment is a mandatory, continuous process built into how the system is governed."
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
    "q_code": "P2.4.EX.Q3",
    "pillar_code": "P2",
    "pillar_name": "Safeguards, Trust & Accountability",
    "subpillar_code": "P2.4",
    "subpillar_name": "Inclusion & Non-Discrimination",
    "survey_type": "expert",
    "question_text": "How well do safeguards address surveillance misuse or disproportionate harm to marginalized populations?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Digital ID infrastructure has no legal or technical safeguards against surveillance misuse."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Draft guidelines address surveillance limitations but are not legally binding; no independent review of surveillance requests."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Legally binding limits on surveillance use of ID infrastructure in place; independent review of law enforcement access requests operational. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Independent oversight of all surveillance access to ID data operational and publicly reported."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
        "label": "1 – Basic",
        "description": "No independent oversight body with a mandate over digital ID exists; oversight entirely internal to implementing agency."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Oversight body nominally responsible for digital ID exists but lacks explicit mandate, adequate resourcing, or operational independence."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Independent oversight body with clear statutory mandate for digital ID, investigative powers, and adequate resourcing is operational. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Oversight body has guaranteed budget independence, expert technical capacity, and authority to impose sanctions."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
    "q_code": "P2.5.NE.Q1",
    "pillar_code": "P2",
    "pillar_name": "Safeguards, Trust & Accountability",
    "subpillar_code": "P2.5",
    "subpillar_name": "Independent Oversight",
    "survey_type": "stakeholder",
    "question_text": "How independent and well-resourced are oversight bodies for digital ID?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No independent body oversees the digital ID system; oversight is done internally by the same agency that runs it."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "An oversight body exists on paper but lacks the resources and independence to do its job effectively."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "An independent oversight body with legal powers and adequate resources is actively monitoring the digital ID system."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The oversight body has guaranteed funding, technical expertise, and the power to impose penalties."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The oversight body is internationally recognized for its independence and effectiveness."
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
    "question_text": "How regularly are independent audits conducted and acted upon?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No independent audits of the digital ID system conducted; only internal reviews occur, if at all."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Voluntary third-party audits conducted at least once but scope limited and findings not systematically acted upon."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Regular comprehensive third-party audits conducted at defined intervals; findings tracked and formally responded to by management. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Independent audits cover security, privacy, equity, and performance; findings published in full; action plans publicly tracked."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Real-time audit dashboards provide continuous independent visibility; automated alerts trigger immediate management response."
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
    "question_text": "How regularly are outside reviewers have confirmed publicly conducted and acted upon?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No outside reviewers have confirmed publicly of the digital ID system take place."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "At least one audit has been done by an outside party but what it covered was limited and findings were not acted on."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Regular comprehensive audits are conducted on schedule; findings are formally responded to and responses are published."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Audits cover security, privacy, equity, and performance; full findings are published."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Real-time audit dashboards provide continuous independent monitoring; immediate alerts trigger management action."
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
    "q_code": "P2.5.EX.Q3",
    "pillar_code": "P2",
    "pillar_name": "Safeguards, Trust & Accountability",
    "subpillar_code": "P2.5",
    "subpillar_name": "Independent Oversight",
    "survey_type": "expert",
    "question_text": "How transparent are oversight findings, parliamentary review, and public reporting?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Oversight findings and audit results not published; parliamentary oversight limited to annual budget approval."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some oversight findings published in summary form; parliamentary review of digital ID system occurs informally."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Oversight findings published in full; parliamentary committee with technical expertise reviews digital ID system at least annually. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "All oversight findings, parliamentary committee reports, and management responses publicly available online."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Oversight transparency fully automated with real-time public access to all non-sensitive findings."
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
    "question_text": "How clear and effective are frameworks for private sector entities to use or rely on digital ID?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No framework exists for private sector access to digital ID infrastructure; API access restricted to government systems."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic relying party framework drafted but not operationalized; private sector access by informal arrangement."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Comprehensive relying party framework operational; automated onboarding enables private sector access with standardized accountability requirements. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Advanced trust framework with dynamic accreditation tiers governs private sector participation; real-time compliance monitoring embedded."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Trust framework recognized as a global model for open digital identity ecosystems; design contributed to international standards."
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
    "question_text": "How clear and effective are frameworks for private sector entities to use or rely on digital ID?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "There are no rules for private companies to use or rely on the digital ID system."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some draft rules exist but private companies access the system by informal arrangement without clear accountability."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A formal framework governs how private companies can join the digital ID ecosystem."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "An advanced accreditation system governs private sector access at different trust levels; compliance is monitored in real time."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The framework is a global model for open digital identity ecosystems."
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
    "question_text": "How well are private sector access, compliance, and accountability requirements enforced?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No enforcement mechanism exists for private sector compliance with digital ID access rules; non-compliance has no consequences."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Compliance obligations stated in contracts but enforcement rare; monitoring of private sector access limited to log review."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Compliance monitored through automated API usage analytics; contractual breaches trigger defined penalties. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Real-time compliance dashboards monitor all private sector API usage; automated alerts trigger investigation and enforcement."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Enforcement proactive and technology-assisted; private sector compliance independently audited."
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
    "question_text": "How well are private sector access, compliance, and accountability requirements enforced?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "There is no enforcement of rules for private companies using the digital ID system."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Compliance rules exist in contracts but enforcement is rare and monitoring is limited."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Compliance is monitored automatically; breaches trigger defined penalties."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "anyone can check online at any time monitor all private sector usage; automated alerts trigger enforcement."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Enforcement is proactive and technology-assisted; compliance is independently audited."
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
    "q_code": "P3.1.EX.Q3",
    "pillar_code": "P3",
    "pillar_name": "Ecosystem & Innovation",
    "subpillar_code": "P3.1",
    "subpillar_name": "Private Sector Participation",
    "survey_type": "expert",
    "question_text": "How mature are certification or approval mechanisms for private sector participation in the ecosystem?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No certification or approval process exists for private entities wishing to participate in the digital ID ecosystem."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Informal approval process operates by ministerial discretion; no criteria published; no compliance audit required."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Formal certification scheme with published criteria, independent assessment, and publicly accessible registry of approved entities operational. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Tiered certification scheme aligned with international trust assurance frameworks operational; re-certification required periodically."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Certification scheme recognized internationally and aligned with global trust frameworks (e.g., eIDAS, NIST SP 800-63)."
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
        "label": "1 – Basic",
        "description": "No documented use cases beyond basic government authentication; digital ID not enabling value in any specific sector."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "One or two pilot use cases in regulated sectors (banking KYC, welfare enrollment); use cases not yet scaled."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Multiple validated and scaled use cases across three or more sectors (finance, health, social protection, e-government); impact documented. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Advanced multi-sector use case ecosystem operational with measurable economic impact; cross-sector data publicly available."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Digital ID-enabled innovations contribute to GDP growth; use case ecosystem is a global reference."
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
    "question_text": "How many meaningful use cases across sectors are enabled by digital ID today?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "The digital ID is only used for basic government login; no meaningful use cases exist in any sector."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "One or two pilot use cases exist in specific sectors (like banking or welfare) but they have not been scaled up."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Several validated use cases are operating across multiple sectors; their economic and social impact is documented."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "A rich multi-sector use case ecosystem operates with measurable economic impact."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Digital ID use cases contribute to economic growth; the ecosystem is a global reference."
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
        "label": "1 – Basic",
        "description": "No innovation support mechanisms exist; digital ID system has not enabled any demonstrable innovation in any sector."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Digital ID used for basic identity verification in one regulated sector; no structured innovation support available."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Digital ID enables demonstrable innovation in at least two sectors; innovation support mechanisms (sandbox, grants) operational. (Operationalization is independently verified.) This includes tourism (e.g., visitor digital verification, contactless hotel check-in, e-visa integration)."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Digital ID is a platform for significant cross-sector innovation; advanced innovation ecosystem with measurable economic impact documented."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Digital ID-enabled innovation internationally recognized as a driver of inclusive economic growth."
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
    "question_text": "How effectively does digital ID support innovation in sectors such as finance, health, or tourism?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "The digital ID has not enabled innovation in any sector; there is no support for businesses wanting to build on it."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Digital ID is used for basic checks in one sector; no structured innovation support is available."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Digital ID powers innovation in at least two sectors; innovation support mechanisms are in place. This includes tourism (e.g., visitor digital verification, contactless hotel check-in, e-visa integration)."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Digital ID is a platform for innovation across many sectors; measurable economic impact is documented."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Digital ID-enabled innovation is internationally recognized as an inclusive growth driver."
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
        "label": "1 – Basic",
        "description": "No pilot or sandbox mechanism exists; new use cases must be deployed in production without testing capability."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic test environment available with restricted access; no structured pilot program or mentorship exists."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Production-like sandbox with realistic synthetic data available; structured pilot program with defined success criteria operational. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Advanced sandbox ecosystem supports complex multi-system integration testing; pilot outcomes tracked and published."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Sandbox recognized as a global model for digital identity innovation enablement."
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
    "question_text": "To what extent does the ecosystem adopt recognized international technical and trust standards?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No international technical or trust standards adopted; ecosystem operates on proprietary specifications with no conformance testing."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Selected international standards partially adopted for specific use cases; adoption not systematic; conformance not independently tested."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Comprehensive adoption of recognized international standards (ISO/IEC 29115, NIST SP 800-63, eIDAS LoA) mandatory for ecosystem participants. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Standards adoption comprehensive, current, and proactively tracked against international developments; country leads in adapting standards."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Ecosystem recognized internationally as a standards-compliant reference implementation; standards contributions acknowledged by international bodies."
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
    "question_text": "To what extent does the ecosystem adopt recognized international technical and trust standards?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No international standards are adopted; the ecosystem uses its own proprietary specifications."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some international standards are partially adopted for specific use cases but adoption is not systematic."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Recognized international standards are mandatory for all ecosystem participants; conformance is independently tested."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Standards adoption is comprehensive and proactively tracked; the country leads in adapting global standards."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The ecosystem is recognized internationally as a standards-compliant reference implementation."
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
        "label": "1 – Basic",
        "description": "No certification program exists; conformance testing not conducted."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Voluntary certification program exists with basic criteria; conformance testing limited in scope and conducted internally."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Mandatory certification program with independent conformance testing and public registry of certified entities operational. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Certification includes tiered assurance levels aligned with international frameworks; automated conformance testing tools publicly available."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Open conformance testing tools contributed to global DPI repositories AND a genuine additional capability layer (e.g., automation, self-healing) is present; certification scheme referenced in international standards."
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
    "question_text": "How mature are certification, conformance testing, and compliance assurance arrangements?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "There is no certification program; no one checks whether ecosystem participants meet required standards."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "A voluntary certification program exists but it is limited in scope and not independently tested."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A mandatory certification program with independent testing and a public registry of certified entities is operational."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Certification includes tiered assurance levels; automated testing tools are publicly available."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Open testing tools are shared globally; the certification scheme is referenced in international standards."
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
        "label": "1 – Basic",
        "description": "No one is assigned to track international digital identity standards; the system does not monitor developments in global standards bodies."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "International standards are tracked informally; updates are adopted reactively when a problem arises, not proactively."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A designated unit monitors international digital identity standards (ISO/IEC, NIST, W3C); updates are reviewed on a defined cycle and adoption decisions documented. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Standards updates are incorporated into Trident on a planned schedule; compliance with adopted standards is independently verified and publicly reported."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Barbados actively participates in regional or international standards bodies; technical contributions have influenced adopted standards; Trident is recognized as a standards-compliant reference implementation."
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
    "question_text": "How available are APIs, documentation, and technical resources for developers?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No developer-facing APIs, documentation, or technical resources publicly available; developer access requires a formal government contract."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic API documentation available on request; access to test environment requires manual onboarding approval; developer support ad hoc."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Comprehensive developer portal with full API documentation, code samples in multiple languages, interactive API explorer, and community forums publicly accessible. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Developer portal includes real-time API status dashboards, usage analytics, SDKs for all major platforms, and production-like sandbox."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Developer resources open-sourced and contributed to global DPI repositories AND a genuine additional capability layer (e.g., automation, self-healing) is present; developer portal recognized as a regional reference."
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
    "question_text": "How available are APIs, documentation, and technical resources for developers?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "There are no publicly available tools or documentation for developers wanting to build on the digital ID system."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic documentation is available on request; access to a test environment requires manual approval."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A comprehensive developer portal with full documentation, code samples, and community forums is publicly accessible."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The developer portal includes real-time status dashboards, SDKs for all major platforms, and a production-like sandbox."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Developer resources are open-sourced and shared globally; the portal is recognized as a regional reference."
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
    "question_text": "How useful and accessible are sandbox environments for testing digital ID integrations?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No sandbox environment available; developers must test integrations in the live production system."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Test environment available but access restricted, data synthetic and unrealistic, and support minimal."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Production-like sandbox with realistic synthetic data available with self-service access; sandbox documentation matches production documentation. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Sandbox mirrors production infrastructure including security controls; sandbox performance metrics publicly available."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Sandbox ecosystem recognized as a global reference for developer enablement."
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
    "question_text": "How useful and accessible are sandbox environments for testing digital ID integrations?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "There is no safe testing environment; developers must test in the live system."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "A test environment is available but access is restricted and the data is not realistic."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A realistic testing environment is available with self-service access; documentation matches the live system."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The testing environment mirrors the live system including security controls; performance metrics are publicly available."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The testing environment is recognized as a global reference for developer enablement."
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
    "q_code": "P3.4.EX.Q3",
    "pillar_code": "P3",
    "pillar_name": "Ecosystem & Innovation",
    "subpillar_code": "P3.4",
    "subpillar_name": "Developer Ecosystem",
    "survey_type": "expert",
    "question_text": "How strong is support for the developer ecosystem through outreach, events, or financial incentives?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No developer outreach, events, or financial incentives exist; developer engagement entirely passive."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Occasional developer events held; no structured outreach program or financial incentives for developers exist."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Structured developer engagement program includes regular hackathons with prize funding, startup support programs, and dedicated developer relations team. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Innovation grants and accelerator programs specifically for digital ID use cases operational."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Developer support tools contributed to open-source DPI repositories; developer community internationally recognized."
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
        "label": "1 – Basic",
        "description": "No cross-border digital ID recognition or interoperability arrangement exists; ID system entirely domestic in scope."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Exploratory discussions with one or more CARICOM member states on cross-border digital ID recognition underway; no formal agreement concluded."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Operational mutual recognition agreements with at least one neighboring country enable cross-border digital ID use for defined services. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Leadership in a regional interoperability initiative established; multilateral mutual recognition with automated verification operational."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Country recognized as a regional hub for interoperable digital public infrastructure; governance model contributed to global standards."
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
    "question_text": "How developed are cross-border digital ID recognition and interoperability arrangements?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "The digital ID only works within the country; no arrangements exist to recognize it across borders."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Discussions with CARICOM member states about cross-border digital ID recognition have started but no agreement has been reached."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "At least one cross-border agreement is operational; digital ID can be used for defined services across borders."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The country leads a regional interoperability initiative; multilateral recognition with automated verification is operational."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The country is a recognized hub for cross-border digital identity."
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
        "label": "1 – Basic",
        "description": "No legal framework or technical protocol supports trusted cross-border data exchange involving digital ID; cross-border data flows unregulated."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic data flow protocols being established for limited cross-border use cases under exploratory arrangements."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Comprehensive cross-border data governance frameworks covering legal basis, consent, security, and data sovereignty operational under formal agreements. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Cross-border data exchange automated and privacy-preserving; legal frameworks harmonized with CARICOM member states."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Cross-border data exchange framework recognized as a global model for privacy-preserving, sovereignty-respecting identity federation."
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
    "question_text": "How well do laws and technical systems support trusted cross-border data exchange?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "There are no rules or technical systems to support trustworthy exchange of digital ID data across borders."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic data protocols are being set up for limited cross-border uses."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A comprehensive legal and technical framework governs cross-border data sharing."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Cross-border data exchange is automated and privacy-preserving; legal frameworks are harmonized across the region."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The framework is recognized globally as a model for privacy-preserving, sovereignty-respecting cross-border identity federation."
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
        "label": "1 – Basic",
        "description": "Cross-border interoperability (where it exists) depends on proprietary vendor solutions with no government-controlled fallback."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Cross-border interoperability relies on bilateral technical agreements that are vendor-dependent; no open standards underpin cross-border exchange."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Cross-border interoperability based on open standards and government-controlled protocols; resilience tested regularly. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Cross-border architecture fully vendor-independent, based on open standards, and tested for resilience under failure scenarios."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Cross-border interoperability architecture is a regional reference model for vendor-independent, resilient digital identity federation."
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
        "label": "1 – Basic",
        "description": "Architecture is monolithic with no API layer; system components tightly coupled; scalability constrained to current enrollment volume."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Modular design documented but inconsistently implemented; basic API endpoints exist for core enrollment and authentication functions."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "API-first architecture fully implemented with comprehensive OpenAPI documentation; microservices enable independent scaling of components. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Event-driven architecture with real-time data synchronization operational; infrastructure-as-code enables automated environment replication."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Self-healing systems with automated failover and zero-downtime deployments operational; architecture contributed to open-source DPI commons."
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
    "question_text": "How well is Trident designed to grow, connect to new services, and recover from problems without major disruption?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Adding a new service to Trident requires rebuilding parts of the system; downtime is frequent and unpredictable."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "New services can be connected to Trident but the process is slow, often requiring months of custom work."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "New services have been successfully connected to Trident within the past year without significant disruption; the system has a clear process for adding new connections."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Trident has grown to support several services across multiple sectors; when one part of the system has a problem, other services continue to work; recovery is fast and publicly acknowledged."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Trident is continuously expanding; it recovers from failures automatically with no service interruption; the architecture has been shared openly for other countries to learn from."
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
        "label": "1 – Basic",
        "description": "Architectural model selected without formal requirements analysis; no alignment with DPI principles documented."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Architectural model chosen but rationale not documented; alignment with DPI principles and national context is partial."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Architectural model documented with formal rationale aligned to national data sovereignty, inclusion requirements, and DPI integration needs. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Architecture regularly reviewed against evolving national needs and DPI standards; review findings publicly reported."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Architecture optimally balances centralization and federation based on evidence; model contributed to global DPI knowledge."
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
    "question_text": "How appropriate is the architectural model (centralized or federated) for national needs and DPI alignment?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "The design of the ID system was chosen without a clear analysis of what the country actually needs."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "A design was chosen but the reasons for the choice are not clearly explained and it does not fully reflect national priorities."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "The design of the system was chosen based on a documented analysis of national needs including inclusion and data ownership."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The design is regularly reviewed to ensure it keeps meeting national needs as the country and technology evolve."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The system design is continuously tested and refined based on evidence; the model is shared globally."
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
        "label": "1 – Basic",
        "description": "No architecture documentation exists; system design decisions undocumented; no governance process controls changes."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "High-level architecture diagrams exist but are outdated; no governance process controls changes to the architecture."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Comprehensive architecture documentation maintained and version-controlled; architecture review board approves changes. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Architecture documentation publicly available; change governance includes security and privacy impact assessments."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Architecture documentation a living asset updated in near-real-time; contributed to open DPI repositories."
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
    "question_text": "How available and well-documented are APIs and data exchange interfaces for digital ID?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No documented APIs exist; data exchange relies on ad hoc file transfers in proprietary formats."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic API endpoints for core functions available with minimal documentation; API versioning not managed; no developer portal."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Comprehensive API catalog with OpenAPI specifications and version management publicly available; developer portal with documentation and sandbox operational. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "API documentation includes interactive testing tools; usage analytics inform API roadmap decisions."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "APIs contributed to open DPI repositories with reference implementations; API documentation standards contributed to international bodies."
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
        "label": "1 – Basic",
        "description": "There are no published connections (APIs) for other systems to use; sharing data requires one-off arrangements."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic system connections exist but documentation is minimal."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A full catalog of system connections is publicly documented with a developer portal and sandbox."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Documentation is interactive and includes testing tools; developers are notified automatically when connections change."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Connection standards are published openly and contributed to international bodies."
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
        "label": "1 – Basic",
        "description": "System uses proprietary data formats and protocols; no recognized international technical standards (ISO/IEC, W3C, NIST) implemented."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Partial adoption of ISO/IEC biometric standards; data exchange uses generic formats (CSV/XML) with custom schemas."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Full compliance with relevant ISO/IEC identity standards; OpenID Connect and OAuth 2.0 implemented for authentication. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Standards adoption comprehensive and proactively tracked against emerging international developments; conformance testing automated."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "System contributes to international standards development; recognized as a reference implementation."
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
        "label": "1 – Basic",
        "description": "The ID system uses its own formats that do not follow international standards."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some international standards are used for specific parts (like biometrics) but overall the system does not consistently follow them."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "The system fully follows recognized international standards for identity and authentication."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Standards are tracked as they evolve and the system is kept up to date; conformance is tested automatically."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The system contributes to developing the standards it uses."
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
        "label": "1 – Basic",
        "description": "Data exchange with other government systems does not occur in practice; manual data re-entry or periodic batch file transfers only."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Semi-automated data exchange occurs with 1–2 government systems via point-to-point interfaces; errors require manual reconciliation."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Real-time API-based data exchange operational with 3 or more government systems; data exchange gateway manages security and logging. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Event-driven data exchange operational across the wider government ecosystem; data lineage and consent tracked."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Cross-government data exchange frictionless and privacy-preserving; exchange architecture contributed to global DPI standards."
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
    "question_text": "How deeply is digital ID integrated with other DPI components such as payments and registries?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Digital ID not integrated with any other DPI component; citizens must enroll separately in payments, health, and social protection systems."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Point-to-point integration exists with one or two systems; integration one-directional and batch-based; duplicate enrollment common."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "API-based integration with three or more DPI components (payments, civil registry, health) uses standardized protocols. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Event-driven integration ecosystem connects all major DPI components; automated consent management tracks data sharing."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Integration frameworks contributed to global DPI commons; country serves as a regional hub for cross-border service delivery."
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
        "label": "1 – Basic",
        "description": "The digital ID system is completely separate from other government digital systems like payments or health records."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "The digital ID connects to one or two other systems but connections are one-way and not updated in real time."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Digital ID connects in real time to three or more government systems using standard methods."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "All major government digital systems share data through the digital ID."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The integration approach is shared globally; the country is a regional hub for cross-border service delivery."
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
        "label": "1 – Basic",
        "description": "Digital ID does not support service delivery in any sector; sector agencies operate independent identity verification processes."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Digital ID used for authentication in one or two pilot services within a priority sector; user journeys require switching between multiple systems."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Digital ID supports seamless authentication and pre-population of user data across three or more priority service journeys. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Single digital ID login enables access to the full range of priority public services."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Digital ID-enabled service delivery recognized as a global exemplar; cross-border service access operational."
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
        "label": "1 – Basic",
        "description": "Using the digital ID does not make it easier to access government services."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Digital ID is used to log in to one or two pilot services but the overall experience is still fragmented."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Digital ID gives seamless access to several important services; users do not have to re-enter their data each time."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "One digital ID login works for the full range of major public services."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
        "label": "1 – Basic",
        "description": "Digital ID has no integration with social protection or health systems."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Digital ID piloted in one social protection or health program; integration shallow (authentication only); beneficiary data not synchronized."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Digital ID integrated with core social protection and health systems enabling automated eligibility verification and service delivery. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Integration with social protection, health, and at least one other high-impact sector is mature."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Integration with all high-impact public services complete; economic and social impact independently measured."
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
    "question_text": "How strongly is cybersecurity built into the design and operation of the ID system?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No formal cybersecurity policy applies to the digital ID system; data stored without encryption; no security architecture documentation."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic security controls implemented reactively; encryption applied to data at rest but not in transit."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Comprehensive security architecture aligned with NIST Cybersecurity Framework or ISO 27001 implemented and certified. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Zero-trust architecture with continuous authentication and micro-segmentation implemented; threat modeling embedded in SDLC."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "International cybersecurity certification held; threat intelligence proactively shared with CARICOM member states."
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
        "label": "1 – Basic",
        "description": "The ID system has no formal security policy."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic security measures are in place but they were added after the fact; data in transit is not always encrypted."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "The system is built to a recognized security standard with full encryption and formal processes for managing encryption keys."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The system is designed so that every user and device must continuously prove they are authorized."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The system holds international security certifications; security knowledge is shared with neighbouring countries."
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
        "label": "1 – Basic",
        "description": "No disaster recovery or business continuity plan exists for the digital ID system; single points of failure present."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Draft disaster recovery plan exists; data backups taken regularly but restoration not tested; recovery time objectives not defined."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Tested disaster recovery plan with defined RTO and RPO operational; data backed up in multiple locations. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Automated failover to geo-redundant infrastructure operational; recovery procedures tested quarterly."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Self-healing systems with automated failover achieve near-zero downtime; resilience architecture contributed to global DPI standards."
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
        "label": "1 – Basic",
        "description": "There is no plan for what to do if the ID system breaks down."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "A recovery plan exists on paper; backups are taken but it has not been confirmed that data can actually be restored."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A tested recovery plan is in place with clear time targets; data is backed up in more than one location."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The system automatically switches to a backup if the main system fails; recovery is tested every three months."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The system recovers automatically from failures with near-zero downtime."
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
    "q_code": "P4.4.EX.Q3",
    "pillar_code": "P4",
    "pillar_name": "Technology & DPI Integration",
    "subpillar_code": "P4.4",
    "subpillar_name": "Cybersecurity & Resilience",
    "survey_type": "expert",
    "question_text": "How regularly are the system's security controls monitored, tested, and improved?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Security controls not monitored; no penetration testing or vulnerability scanning conducted."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Ad hoc vulnerability scans conducted occasionally; penetration tests have occurred at least once."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Regular penetration testing (at least annually) by qualified third parties conducted; continuous vulnerability scanning automated. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Continuous security monitoring with AI/ML-assisted threat detection operational; red team exercises held semi-annually."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Security monitoring fully automated with real-time alerts; threat intelligence feeds integrated."
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
    "question_text": "To what extent does the digital ID system use open standards and interoperable components?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "System built entirely on proprietary technology; no recognized open standards implemented."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Partial adoption of open standards for specific components (e.g., biometric capture); majority of system relies on proprietary protocols."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Core system components built on recognized open standards (OpenID Connect, W3C DID/VC, ISO/IEC biometric standards). (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Open standards adoption comprehensive and verifiable through public conformance testing; country actively shapes future international standards."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "System recognized as a reference implementation for open digital identity; standards contributions acknowledged by international bodies."
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
        "label": "1 – Basic",
        "description": "The ID system uses proprietary technology that cannot easily connect to other systems or be adapted by others."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some open international standards are used for specific parts but most of the system still relies on proprietary technology."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "The main parts of the system use recognized open international standards."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Open standards use is comprehensive and publicly verifiable; the country actively shapes future international standards."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The system is internationally recognized as a model for open digital identity."
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
    "question_text": "How much does the system rely on open-source components or digital public goods where appropriate?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "System uses no open-source components; all software proprietary; digital public goods (e.g., MOSIP, OpenCRVS) not evaluated."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some open-source libraries used as dependencies but not documented; digital public goods evaluated but not adopted."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Core system functionality relies on evaluated and documented open-source components or digital public goods. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Open-source digital public goods form the basis of major system components; government actively contributes upstream."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Majority of system code open-sourced and contributed to global DPI commons."
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
        "label": "1 – Basic",
        "description": "The ID system uses only commercial software; free and open tools have not been considered."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some free and open tools are used but this has not been documented or formally planned."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Major parts of the system use recognized open and free tools; a public list of which tools are used is maintained."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Open-source tools are central to the system; the government contributes improvements back to those tools."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Most of the system code is shared freely online for anyone to use."
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
    "q_code": "P4.5.EX.Q3",
    "pillar_code": "P4",
    "pillar_name": "Technology & DPI Integration",
    "subpillar_code": "P4.5",
    "subpillar_name": "Digital Public Goods",
    "survey_type": "expert",
    "question_text": "How available is technical documentation, and how actively does the system contribute to shared public resources?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No public technical documentation exists; architecture diagrams, API specifications, and data models classified or held exclusively by vendor."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic technical documentation available to approved partners under NDA; public documentation limited to high-level system descriptions."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Comprehensive technical documentation including API specifications, architecture diagrams, data models, and security guidelines publicly available under open license. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Technical documentation actively maintained and version-controlled; contributed to international DPI repositories."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Technical documentation a global reference for digital identity implementation."
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
        "label": "1 – Basic",
        "description": "No primary digital ID legislation exists; legal identity undefined in statute; no enrollment criteria or eligibility thresholds codified."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Draft digital ID bill defines legal identity in broad terms but enrollment status categories and eligibility thresholds remain undefined."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Primary legislation enacted with statutory definitions of legal identity, enrollment status categories, and eligibility criteria. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Legislation and subsidiary regulations fully operational; eligibility determinations automated against civil registration data."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Independent statutory review confirms legislative completeness; legal framework cited as a regional model."
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
        "label": "1 – Basic",
        "description": "There is no law that defines who qualifies for a digital ID or what counts as legal identity."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "A draft law is being reviewed but it does not yet clearly state who is eligible or what enrollment steps are required."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A law has been passed that defines legal identity and sets out who can enroll and under what conditions."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The law is fully in force and the process for determining who qualifies for a digital ID is largely automated."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Independent reviews confirm the law covers everyone and leaves no gaps."
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
        "label": "1 – Basic",
        "description": "Civil registration operates in isolation with no data exchange protocol or interoperability mechanism connecting it to digital ID issuance."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Civil registration records exist but linkage to digital ID is manual, event-driven only, and dependent on individual application."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Formal linkage protocol enacted and operational; vital events trigger automated updates to the digital ID registry. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Civil registration and digital ID databases fully integrated via real-time APIs; de-duplication and reconciliation automated."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Independent audit confirms zero statelessness attributable to registration gaps; birth registration coverage exceeds 95%."
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
        "label": "1 – Basic",
        "description": "Birth, marriage, and death records are kept separately and are not connected to the digital ID system at all."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Civil records exist but the connection to digital ID is done manually and only when someone applies."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A formal process links civil records to the digital ID system so that major life events automatically update ID records."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Civil registration and the digital ID system are fully connected in real time."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Audits confirm no one is left without an ID because of registration gaps."
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
        "label": "1 – Basic",
        "description": "The legal framework only addresses initial ID registration; it does not cover corrections, changes after major life events, stateless persons, or death registration linkage."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some lifecycle provisions exist (e.g., birth and death registration) but are not consistently linked to digital ID; no provision for stateless persons or complex cases."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "The legal framework covers the main identity lifecycle events (birth, death, name change, corrections) and links them to digital ID issuance; a process exists for stateless persons and those without documentation. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The framework covers all lifecycle events including diaspora returns, gender marker changes, and disputed identity; processes are automated where appropriate; outcomes are monitored."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
        "label": "1 – Basic",
        "description": "No data protection legislation exists or applicable law explicitly exempts digital ID systems from its provisions."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "General data protection framework exists but ID-specific provisions absent; ID system subject to generic government data handling rules only."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Comprehensive data protection legislation with explicit ID-system provisions enacted; independent supervisory authority operational. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Data protection authority actively supervises the ID system; compliance reports published; international adequacy assessments underway."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Real-time compliance monitoring integrated into ID system operations; automated privacy impact assessments trigger corrective action."
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
        "label": "1 – Basic",
        "description": "There is no law that protects personal data held by the digital ID system."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "A general data protection law exists but it does not specifically address the digital ID system."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A law clearly states how personal data in the ID system must be protected, and an independent body oversees compliance."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The oversight body actively monitors the ID system and publishes compliance reports."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The system automatically checks for privacy compliance."
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
        "label": "1 – Basic",
        "description": "None of the three — consent, purpose limitation, or data minimization — is codified in law or enforced in the system."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "At least one of the three is in law (most likely consent provisions), but the others remain in policy only and are not technically enforced."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "All three are codified in law AND implemented in Trident's technical design; at least one has been independently verified as operational."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "All three are technically enforced (e.g., purpose limitation enforced at the API layer; automated data deletion after retention period); independent audits verify compliance for each; findings published."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
        "label": "1 – Basic",
        "description": "Trident collects data without asking for permission and there are no rules about what it can be used for or how long it is kept."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Permission is required but the rules about what data can be used for and how long it can be kept are written down but not followed in practice."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "The law requires that permission is obtained before data is used, limits what it can be used for, and sets rules about deleting it when it is no longer needed; all three are in place and working."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The system automatically enforces these three protections — permission rules, usage limits, and data deletion — and outside reviewers have confirmed publicly that they work."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
        "label": "1 – Basic",
        "description": "No independent oversight body has jurisdiction over digital ID data processing."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Oversight body exists but lacks specific mandate over ID systems, is under-resourced, and has not investigated any ID-related breach."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Independent data protection authority with explicit ID oversight mandate operational; has conducted at least one formal investigation. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Oversight body conducts proactive compliance audits of the ID system; findings published; sanctions levied."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Oversight continuous and technology-assisted; authority collaborates with international counterparts."
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
        "label": "1 – Basic",
        "description": "No legislation grants legal recognition to digital identities or electronic signatures; their use in transactions carries no legal standing."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Draft legislation proposes legal recognition for e-signatures in limited contexts; recognition of digital identity credentials not yet established."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Legislation grants legal recognition to digital identities and e-signatures for defined use cases; trust services framework designates supervised providers. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Full legal equivalence with physical identity documents established across the public sector; regulated private sector adoption mandated."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Universal legal recognition across all sectors and transaction types in force; cross-border recognition agreements operational."
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
        "label": "1 – Basic",
        "description": "Digital IDs and electronic signatures have no legal status and cannot be used in official transactions."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "A law is being drafted to recognize digital IDs and e-signatures, but it has not yet been passed."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A law has been passed recognizing digital IDs and electronic signatures for specific official uses."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Digital IDs are legally equal to physical ID documents across the public sector."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Digital IDs and e-signatures are legally recognized everywhere; cross-border recognition agreements are operational."
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
        "label": "1 – Basic",
        "description": "Digital credentials not accepted for any public service transaction; all interactions require physical document presentation."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Digital credentials accepted in one or two pilot public services; acceptance inconsistent and not mandated by policy."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Digital credentials mandatorily accepted across a defined set of core public services; regulated private sector adoption underway. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Digital credentials accepted across the full public sector with a single sign-on experience; private sector adoption widespread."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Digital credentials accepted across all public and private services; cross-border service access enabled."
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
        "label": "1 – Basic",
        "description": "Digital IDs are not accepted for any government service; people must always show a physical document."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Digital IDs are accepted in one or two government pilot services but are not widely used."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Digital IDs are accepted across a core set of government services and the system is linked to the national login infrastructure. (e.g., NIS, BRA, or passport services)."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Digital IDs are accepted across all government services through a single login."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Digital IDs are accepted everywhere — government, private sector, and across borders."
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
        "label": "1 – Basic",
        "description": "No trust services framework exists; no regulated providers designated; liability limits for digital identity services undefined."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Draft trust services framework circulated; no providers licensed yet."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Trust services framework operational; qualified providers licensed against defined criteria; liability regimes established. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Trust services framework includes tiered assurance levels aligned with international standards (eIDAS, NIST SP 800-63)."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Framework recognized as an international reference; trust marks enable seamless cross-border transactions."
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
    "question_text": "Are there binding rules to assess and manage risks from AI and automated decision-making in ID systems?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No legal or regulatory requirement mandates risk assessment for AI or automated decision-making used in identity verification."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Draft guidelines reference the need for AI risk assessments (DPIA, HRIA) but application is voluntary and there is no enforcement mechanism."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Binding regulations require mandatory impact assessments (DPIA/HRIA) for all AI-assisted ID decisions; standards for transparency and bias testing legally defined. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Mandatory impact assessments enforced by an independent body; continuous monitoring for algorithmic bias required; audit results publicly reported."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Full lifecycle AI governance regime in force with real-time monitoring, third-party audits, and redress mechanisms."
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
    "question_text": "Are there binding rules to assess and manage risks from AI and automated decision-making in ID systems?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "There are no rules requiring checks on AI or automated systems used to make decisions about digital IDs."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Guidelines suggest checking AI systems for risks, but following them is optional and there is no enforcement."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "The law requires that AI systems used in ID decisions be assessed for risks, including bias."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Risk assessments are independently checked; AI systems are continuously monitored for unfair outcomes."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "AI in the ID system is governed throughout its full lifecycle with real-time monitoring and outside reviewers have confirmed publicly."
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
    "question_text": "How systematically are impact assessments, bias testing, and human oversight applied in practice?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No impact assessments or bias testing protocols conducted on AI components of the ID system; human oversight of automated decisions absent."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Impact assessments conducted on an ad hoc basis for high-profile deployments; bias testing methodology undefined."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Impact assessments (DPIA/HRIA) mandatory for all AI-assisted ID processes; human override mechanisms legally mandated. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Assessments conducted by independent third parties; bias metrics tracked longitudinally and published."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Real-time bias monitoring automated; impact assessment findings drive iterative model improvement."
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
    "q_code": "P5.4.NE.Q3",
    "pillar_code": "P5",
    "pillar_name": "Legal & Regulatory Foundations",
    "subpillar_code": "P5.4",
    "subpillar_name": "Emerging Tech Safeguards",
    "survey_type": "stakeholder",
    "question_text": "How systematically are impact assessments, bias testing, and human oversight applied in practice?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No checks are done to see whether AI systems in the ID process produce unfair or biased outcomes."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some checks are done for major AI deployments but there is no standard process."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "All AI-assisted ID decisions must go through a formal risk and bias check before launch."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Independent experts conduct the checks; bias trends are tracked and shared publicly."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "AI fairness is monitored automatically in real time; results drive ongoing improvements."
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
    "q_code": "P5.4.EX.Q3",
    "pillar_code": "P5",
    "pillar_name": "Legal & Regulatory Foundations",
    "subpillar_code": "P5.4",
    "subpillar_name": "Emerging Tech Safeguards",
    "survey_type": "expert",
    "question_text": "How strong are transparency, monitoring, and independent review for automated ID decisions?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Automated ID decisions opaque; no audit trail exists; affected individuals have no right to explanation or review."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "High-level information about automated decision processes available internally; audit trails maintained but not accessible externally."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Legally mandated transparency requirements apply to automated ID decisions; audit trails maintained and accessible to oversight bodies. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Algorithmic transparency operationalized through publicly accessible model cards and audit logs."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Explainability tools available to affected individuals in plain language; tools contributed to global DPI repositories AND a genuine additional capability layer (e.g., automation, self-healing) is present."
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
        "label": "1 – Basic",
        "description": "No implementing regulations issued; primary ID law cannot be operationalized; legal gaps prevent enrollment, issuance, or verification."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Draft implementing regulations circulating for comment but not gazetted; operational guidance relies on ad hoc ministerial directives."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Key implementing regulations gazetted and operational; cover enrollment procedures, credential formats, verification protocols, and data governance. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Comprehensive regulatory framework in place; regulations regularly reviewed and updated through a defined legislative cycle."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Regulatory framework adaptive; regulations updated through fast-track mechanisms to respond to technology change; cited as a model for regulatory agility."
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
        "label": "1 – Basic",
        "description": "The ID law has been passed but the detailed rules needed to put it into practice have not yet been issued."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Draft rules to implement the ID law are being reviewed but have not been officially published."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "The detailed rules needed to operate the ID system have been officially issued and cover enrollment, ID formats, and data handling."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The rules are comprehensive and reviewed regularly; a formal process exists to update them when needed."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
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
        "label": "1 – Basic",
        "description": "Legal status of legacy credentials (old national IDs, paper certificates) undefined; no transition or recognition pathway exists."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Draft regulations acknowledge legacy IDs but transitional recognition rules inconsistently applied."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Legislation establishes clear hierarchy of recognized credentials; legacy ID transitional pathways with defined validity periods enacted. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Legacy credential recognition operationalized with automated validation; sunset timelines publicly communicated."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "All legacy credentials formally retired or migrated; legal hierarchy of credentials stable and internationally recognized."
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
    "question_text": "How clearly are legacy credentials and existing IDs recognized within the legal framework?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "It is unclear whether old ID documents are still valid or what happens to people who only have legacy credentials."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Draft rules acknowledge old IDs but it is not consistently clear how they are treated or when they will be phased out."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "The law clearly states which old IDs are still valid and for how long."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The transition from old to new IDs is tracked publicly; sunset timelines are communicated."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "All old ID types have been fully transitioned to the new system."
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
        "label": "1 – Basic",
        "description": "No domestic data-sharing framework for digital ID exists; cross-border data flows unregulated."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Domestic data-sharing framework in draft; cross-border data flows occur under ad hoc arrangements; initial bilateral negotiations underway."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Domestic data-sharing framework enacted with standardized data exchange agreements; cross-border framework under negotiation. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Mature domestic framework supports automated credential validation across government systems; cross-border agreements operational."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Adaptive legal frameworks enable real-time, privacy-preserving cross-border verification; multilateral agreements govern data sovereignty."
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
    "question_text": "Is there a clearly designated lead institution with a defined mandate for digital ID?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No institution formally designated as the lead for digital ID; overlapping mandates across ministries create jurisdictional ambiguity."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Lead agency designated by ministerial directive but mandate is non-statutory, narrowly defined, and contested by other agencies."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Lead institution established by law with defined mandate, published organizational chart, and sufficient legal authority to coordinate across government. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Lead agency has operational independence, security of tenure for its leadership, and enforcement authority over other agencies."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Lead agency operates within an adaptive governance structure with civil society and private sector representation; model replicated regionally."
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
    "question_text": "Is there a clearly designated lead institution with a defined mandate for digital ID?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No single government body is clearly in charge of the digital ID system; responsibilities are split and unclear."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "A ministry has been given responsibility for digital ID but it is not backed by law and other agencies do not consistently follow its lead."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A specific institution is legally responsible for digital ID with a clear mandate and authority to coordinate other government departments."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The lead institution is independent and has real authority over other agencies on digital ID matters."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The lead institution includes voices from civil society and the private sector; the model is replicated regionally."
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
    "question_text": "How effective are inter-agency coordination mechanisms for digital ID policy and implementation?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Inter-agency coordination entirely ad hoc; no formal mechanism, shared agenda, or documented meeting record exists."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Inter-agency coordination body exists but meets irregularly; attendance inconsistent; no binding decisions made."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Formal inter-agency coordination body meets on a regular schedule with documented agendas and minutes; decisions binding. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Coordination body has enforcement authority; cross-sector policy decisions documented and implemented via shared digital workflows."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Coordination extends to statutory and regional levels; civil society participates in a structured advisory role."
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
    "question_text": "How effective are inter-agency coordination mechanisms for digital ID policy and implementation?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Government agencies do not coordinate in any organized way on digital ID; each acts independently."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "An inter-agency group exists but meets irregularly and has no power to make binding decisions."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A formal coordination body meets regularly; decisions are recorded and agencies must follow agreed policies."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The coordination body can enforce its decisions; shared digital tools support coordination across agencies."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Coordination includes parish-level services and civil society."
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
    "q_code": "P6.1.EX.Q3",
    "pillar_code": "P6",
    "pillar_name": "Institutional Capacity & Governance",
    "subpillar_code": "P6.1",
    "subpillar_name": "Leadership & Coordination",
    "survey_type": "expert",
    "question_text": "How strong is whole-of-government policy harmonization across sectors using digital ID?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Digital ID policy siloed within the lead agency; no cross-sector harmonization."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some sector ministries reference digital ID in their policies but alignment is informal and inconsistently applied."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A whole-of-government digital ID strategy has been approved at cabinet level, designating sectoral leads and adoption targets across key ministries."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Direct ministerial accountability mechanisms are operationalized and appropriate to a small unitary state."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Policy harmonization extends to statutory bodies and agencies; joint cross-sector service delivery using digital ID is operational."
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
        "label": "1 – Basic",
        "description": "No formal training program or competency framework exists for digital ID roles; skill requirements undefined and capacity building unplanned."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic induction training exists for new hires; competency requirements documented informally; no formal certification or assessment in place."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Structured competency framework defines skills required for all digital ID roles; regular certified training cycles delivered. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Competency framework aligned with international digital identity standards; training delivered via international partnerships; career pathways defined."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "National digital academy offers digital ID training with regional hub status; continuous learning embedded in institutional culture."
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
    "question_text": "Do digital ID institutions have structured training programs and competency frameworks?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "There is no formal training program or skill requirements defined for people working on the digital ID system."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "New staff receive basic induction training but there is no structured program or certification for digital ID roles."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A formal training program exists with defined skill requirements; staff are certified through regular training cycles."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Training meets international standards; career paths for digital ID specialists are clearly mapped."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "A national training hub offers digital ID courses to the region."
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
        "label": "1 – Basic",
        "description": "Critical technical roles in the ID system unfilled or frequently vacated; no retention strategy exists."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Core technical roles filled but turnover high; no formal retention mechanisms in place."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Staffing plan identifies critical roles and required competencies; retention incentives (career paths, competitive pay) approved. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Retention rates for specialist roles above sector benchmarks; succession planning operationalized."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Institution recognized as employer of choice for digital identity specialists."
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
    "question_text": "How strong are staffing, retention, and specialist capacity for operating the ID system?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Key technical positions in the ID agency are often vacant or filled by outside contractors with no institutional memory."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Core roles are filled but staff leave frequently."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A staffing plan covers all critical roles; pay and career development incentives are approved to keep skilled staff."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Staff turnover in specialist roles is low; succession plans exist."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The agency is known as a top employer for digital identity experts."
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
        "label": "1 – Basic",
        "description": "No change management function exists; technology deployments proceed without stakeholder engagement, communications planning, or adoption support."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Change communications issued on an ad hoc basis for major deployments; no dedicated change management team exists."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Dedicated change management team supports all major digital ID deployments; staff receive training. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Change management proactive and data-driven; adoption metrics tracked and inform iterative communications."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Change management capability institutionalized across the whole-of-government digital ID ecosystem."
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
    "question_text": "How strong are procurement and contract management arrangements for digital ID systems?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No formal procurement guidelines specific to digital ID exist; contracts awarded without competitive process."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "General government procurement rules apply but no ID-specific criteria exist."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Competitive procurement with transparent, published evaluation criteria is standard practice; contracts include performance bonds and SLA enforcement. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Advanced procurement framework mandates open standards compliance; procurement decisions publicly reported."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Procurement regime recognized as international best practice; contract templates contributed to global DPI procurement standards."
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
    "question_text": "How strong are procurement and contract management arrangements for digital ID systems?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Digital ID contracts are awarded without a clear competitive process and without proper performance expectations."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Standard government procurement rules are used but they do not address the specific needs of digital ID systems."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Digital ID contracts are awarded through open competition with published evaluation criteria."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Procurement decisions are publicly reported; a dedicated team monitors vendor performance against contract requirements."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Procurement practices are recognized internationally; contract templates are shared for other countries to use."
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
        "label": "1 – Basic",
        "description": "Digital ID system entirely dependent on a single proprietary vendor."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Vendor contracts include basic data portability clauses but not technically implemented; no alternative vendor assessed."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Contracts include source code escrow, data portability, and API interoperability clauses. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Multi-vendor architecture operational; open standards compliance mandatory criterion in all procurement."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Government retains full sovereignty over core infrastructure, data, and intellectual property."
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
        "label": "1 – Basic",
        "description": "The digital ID system can only be operated by one vendor; switching would be extremely costly and difficult."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Contracts say data can be taken away if needed but this has not been tested."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "The system is designed so that individual parts can be replaced; contracts include data portability clauses."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The system uses multiple vendors and open standards."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The government fully owns the system and all its data."
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
    "q_code": "P6.3.EX.Q3",
    "pillar_code": "P6",
    "pillar_name": "Institutional Capacity & Governance",
    "subpillar_code": "P6.3",
    "subpillar_name": "Vendor & Technical Management",
    "survey_type": "expert",
    "question_text": "How effective is government technical oversight of vendors, systems, and performance?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Government has no independent technical capability to oversee vendors; oversight entirely reliant on vendor self-reporting."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Technical oversight conducted using external consultants on an ad hoc basis; audit rights exist in contracts but rarely exercised."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Dedicated government technical oversight unit has defined audit authority; regular audits conducted. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Third-party technical audits with public reporting conducted annually."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Technical oversight continuous, automated, and supplemented by third-party red-team exercises."
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
        "label": "1 – Basic",
        "description": "Institutional roles for digital ID fragmented across multiple agencies with no clear mandate allocation; reporting lines undefined."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Roles and responsibilities partially documented in policy but ambiguous in practice; reporting lines informal and frequently disputed."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Institutional mandates clearly defined in law or formal policy; organizational chart with reporting lines published and updated. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Institutional mandates regularly reviewed; performance against mandate publicly reported; inter-agency reporting automated."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Institutional framework adaptive and continuously evaluated; recognized as a model for clear accountability in digital public infrastructure."
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
    "question_text": "Are institutional roles, mandates, and reporting lines for digital ID clearly defined?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "It is not clear which government bodies are responsible for which parts of the digital ID system."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Responsibilities are described in documents but in practice they overlap or fall into gaps between agencies."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Each agency involved in digital ID has a clearly defined role set out in law."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Each institution regularly reports on its performance; governance tools automate reporting between agencies."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The institutional framework is regularly updated and independently evaluated."
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
    "question_text": "How effective are internal accountability and compliance processes across implementing agencies?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "Internal accountability mechanisms absent or inconsistently applied across implementing agencies; compliance obligations undefined."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Basic internal reporting exists within agencies but cross-agency compliance inconsistent."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Internal accountability processes — including compliance reporting, audit findings tracking, and corrective action plans — functioning across all implementing agencies. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Compliance monitored in real time through shared dashboards; non-compliance triggers automated escalation."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Fully integrated accountability ecosystem enables continuous monitoring and improvement."
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
        "label": "1 – Basic",
        "description": "There are no consistent internal checks to ensure agencies follow digital ID rules; non-compliance has no consequences."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some internal reporting exists within agencies but checking compliance across agencies is inconsistent."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "All implementing agencies have working compliance processes; audit findings are tracked and acted upon."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Compliance is tracked in real time across agencies; failures trigger automatic escalation and are publicly reported."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Accountability is continuous and system-wide."
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
    "q_code": "P6.4.EX.Q3",
    "pillar_code": "P6",
    "pillar_name": "Institutional Capacity & Governance",
    "subpillar_code": "P6.4",
    "subpillar_name": "Institutional Accountability",
    "survey_type": "expert",
    "question_text": "How strong is oversight of institutional performance, coordination, and enforcement?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "No mechanism exists to oversee institutional performance across the digital ID ecosystem; enforcement of inter-agency obligations absent."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Oversight function nominally exists but under-resourced; performance data not independently collected."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Oversight bodies operational with defined authority to review institutional performance; enforcement mechanisms legally grounded. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Oversight bodies actively monitor performance indicators and coordinate enforcement; regular inter-agency performance reports published."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Real-time performance monitoring embedded in governance infrastructure; continuous improvement driven by oversight findings."
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
        "label": "1 – Basic",
        "description": "No multi-year financial plan exists for digital ID; operations rely on annual appropriations with no sustainability pathway."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Annual budget appropriations cover core operations; multi-year financial planning exercise initiated but not approved."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Multi-year financial plan with dedicated budget lines for operations, maintenance, and technology refresh formally approved. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Financial plan incorporates scenario analysis and contingency reserves; technology refresh cycles fully funded."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Transparent full-cost accounting with public reporting underpins a self-sustaining financial model; surplus reinvested in an innovation fund."
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
    "question_text": "Is there a long-term financing plan for operating and improving the digital ID system?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "There is no multi-year plan for funding the digital ID system."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Annual funding is available for core operations but there is no approved long-term financial plan."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A multi-year financial plan has been approved covering operations, maintenance, and upgrades; it is reviewed each year."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The plan includes emergency reserves and fully funds future technology upgrades."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Full costs are transparently reported publicly; the system generates enough to reinvest in innovation."
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
        "label": "1 – Basic",
        "description": "Digital ID system funded entirely from a single source (general government revenue or a single donor)."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Funding comes from government appropriations with some donor supplementation; cost recovery options explored but not implemented."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Funding diversified across government budget, development partner contributions under a formal framework, and modest cost recovery. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Multiple revenue streams — government, development partners, user fees, and commercial API usage fees — operational and tracked."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Self-sustaining revenue ecosystem funds operations and innovation."
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
    "question_text": "How diversified and reliable are funding sources for digital ID?",
    "options": [
      {
        "score": 1,
        "label": "1 – Basic",
        "description": "The digital ID system is funded by only one source and would be at risk if that source of funding were reduced."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Funding comes mainly from government and donors."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "Several funding sources are in use — government budget, donor grants, and some fees for premium services."
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "Multiple funding streams are active and tracked; reserves covering at least one year of operations are maintained."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "The system is financially self-sustaining through diverse revenue streams."
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
        "label": "1 – Basic",
        "description": "No coordinated financial planning exists; Trident's funding is decided year by year with no multi-year commitment from any source."
      },
      {
        "score": 2,
        "label": "2 – Opportunistic",
        "description": "Some planning has been done but funding commitments are short-term; there is no formal coordination between budget authorities, ministries, and any external supporters."
      },
      {
        "score": 3,
        "label": "3 – Systematic",
        "description": "A formal coordination mechanism exists between the Ministry of Finance, the lead digital ID agency, and any key funders; multi-year funding commitments are documented and agreed. (Operationalization is independently verified.)"
      },
      {
        "score": 4,
        "label": "4 – Differentiating",
        "description": "The funding plan is formally reviewed annually; contingency reserves are maintained; all parties — whether government ministries, statutory bodies, or development partners — report against agreed milestones."
      },
      {
        "score": 5,
        "label": "5 – Transformational",
        "description": "Trident's financial sustainability is secured through a diversified, domestically-anchored model; the funding strategy is transparent and publicly reported; the system has maintained uninterrupted operation through at least one budget cycle without emergency supplementation."
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
