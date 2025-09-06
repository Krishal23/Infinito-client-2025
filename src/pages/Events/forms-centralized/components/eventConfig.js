const EMPTY_PERSON = { fullname: "", email: "", phoneNumber: "", aadharId: "" };
const EMPTY_PERSON_WITH_COLLEGE_ID = { ...EMPTY_PERSON, collegeId: "" };



const defaultTeamPayloadBuilder = (form) => {
  const payload = {
    category: form.category,
    collegeName: form.collegeName,
    collegeAddress: form.collegeAddress,
    coach: form.accompanyingCoach === 'Yes' && form.coach?.fullname ? form.coach : undefined,
  };
  if (form.team && typeof form.team === 'object') {
    for (const key in form.team) {
      const members = (form.team[key] || []).filter(p => p?.fullname && p?.email);
      if (members.length > 0) {
        payload[key] = members.length === 1 ? members[0] : members;
      }
    }
  }
  return payload;
};

const athleticsPayloadBuilder = (form) => {
  const relayTeams = form.selectedRelayEvents.map(eventName => ({
    teamName: eventName,
    members: form.relayTeams[eventName],
  }));

  const payload = {
    leadName: form.captain.fullname,
    email: form.captain.email,
    phoneNumber: form.captain.phoneNumber,
    aadharId: form.captain.aadharId,

    collegeDetails: {
      collegeName: form.collegeName,
      collegeAddress: form.collegeAddress,
    },

    category: form.category.toLowerCase(),
    individualEvents: form.selectedIndividualEvents,
    relayTeams: relayTeams,

    coachDetails: form.accompanyingCoach === 'Yes' && form.coach.fullname ? form.coach : undefined,
  };

  if (!payload.coachDetails) {
    delete payload.coachDetails;
  }

  return payload;
};


export const eventConfigs = {
  // == MAJOR TEAM SPORTS ==
  cricket: {
    title: "Cricket Registration",
    endpoint: "/events/cricket",
    paymentDetails: { fee:{open: "6500"} },
    steps: [
      { type: 'college', title: 'General Information', hasCategory: true },
      {
        type: 'team', title: "Team Leadership", fields: [
          { name: "captain", title: "Captain", min: 1, max: 1, initialData: EMPTY_PERSON_WITH_COLLEGE_ID },
          { name: "viceCaptain", title: "Vice-Captain", min: 1, max: 1, initialData: EMPTY_PERSON_WITH_COLLEGE_ID },
        ]
      },
      {
        type: 'team', title: "Player Roster", fields: [
          { name: "players", title: "Player", min: 11, max: 18, initialData: { ...EMPTY_PERSON_WITH_COLLEGE_ID, role: 'batsman' } },
        ]
      },
      { type: 'coach', title: 'Coach Details' },
      { type: 'receipt', title: 'Payment Confirmation' }
    ],
    buildPayload: defaultTeamPayloadBuilder,
  },
  football: {
    title: "Football Registration",
    endpoint: "/events/football",
    paymentDetails: { fee: {men:"6500",women:"3000"} },
    steps: [
      { type: 'college', title: 'General Information', hasCategory: true },
      {
        type: 'team', title: "Team Leadership", fields: [
          { name: "captain", title: "Captain", min: 1, max: 1, initialData: EMPTY_PERSON_WITH_COLLEGE_ID },
          { name: "viceCaptain", title: "Vice-Captain", min: 1, max: 1, initialData: EMPTY_PERSON_WITH_COLLEGE_ID },
        ]
      },
      {
        type: 'team', title: "Player Roster", fields: [
          { name: "players", title: "Player", min: 11, max: 14, initialData: EMPTY_PERSON_WITH_COLLEGE_ID },
        ]
      },
      { type: 'coach', title: 'Coach Details' },
      { type: 'receipt', title: 'Payment Confirmation' }
    ],
    buildPayload: defaultTeamPayloadBuilder,
  },
  basketball: {
    title: "Basketball Registration",
    endpoint: "/events/basketball",
    paymentDetails: { fee: {men:"4800",women:"4200"} },
    steps: [
      { type: 'college', title: 'General Information', hasCategory: true },
      {
        type: 'team', title: 'Team Leadership', fields: [
          { name: "captain", title: "Captain", min: 1, max: 1, initialData: EMPTY_PERSON },
          { name: "viceCaptain", title: "Vice-Captain", min: 1, max: 1, initialData: EMPTY_PERSON },
        ]
      },
      {
        type: 'team', title: 'Player Roster', fields: [
          { name: "players", title: "Player", min: 5, max: 5, initialData: EMPTY_PERSON },
          { name: "substitutes", title: "Substitute", min: 0, max: 7, initialData: EMPTY_PERSON },
        ]
      },
      { type: 'coach', title: 'Coach Details' },
      { type: 'receipt', title: 'Payment Confirmation' }
    ],
    buildPayload: defaultTeamPayloadBuilder,
  },
  volleyball: {
    title: "Volleyball Registration",
    endpoint: "/events/volleyball",
    paymentDetails: { fee: {men:"4800",women:"4500"} },
    steps: [
      { type: 'college', title: 'General Information', hasCategory: true },
      {
        type: 'team', title: 'Team Leadership', fields: [
          { name: "captain", title: "Captain", min: 1, max: 1, initialData: EMPTY_PERSON },
          { name: "viceCaptain", title: "Vice-Captain", min: 1, max: 1, initialData: EMPTY_PERSON },
        ]
      },
      {
        type: 'team', title: 'Player Roster', fields: [
          { name: "players", title: "Player", min: 3, max: 4, initialData: EMPTY_PERSON },
          { name: "substitutes", title: "Substitute", min: 0, max: 6, initialData: EMPTY_PERSON },
        ]
      },
      { type: 'coach', title: 'Coach Details' },
      { type: 'receipt', title: 'Payment Confirmation' }
    ],
    buildPayload: defaultTeamPayloadBuilder,
  },
  kabaddi: {
    title: "Kabaddi Registration",
    endpoint: "/events/kabaddi",
    paymentDetails: { fee: {men:"4000",women:"2000"} },
    steps: [
      { type: 'college', title: 'General Information', hasCategory: true },
      {
        type: 'team', title: 'Team Leadership', fields: [
          { name: "captain", title: "Captain", min: 1, max: 1, initialData: EMPTY_PERSON },
          { name: "viceCaptain", title: "Vice-Captain", min: 1, max: 1, initialData: EMPTY_PERSON },
        ]
      },
      {
        type: 'team', title: 'Player Roster', fields: [
          { name: "players", title: "Player", min: 7, max: 7, initialData: EMPTY_PERSON },
          { name: "substitutes", title: "Substitute", min: 0, max: 5, initialData: EMPTY_PERSON },
        ]
      },
      { type: 'coach', title: 'Coach Details' },
      { type: 'receipt', title: 'Payment Confirmation' }
    ],
    buildPayload: defaultTeamPayloadBuilder,
  },
  badminton: {
    title: "Badminton Registration",
    endpoint: "/events/badminton",
    paymentDetails: { fee: {men:"2500",women:"1500"} },
    steps: [
      { type: 'college', title: 'General Information', hasCategory: true },
      {
        type: 'team', title: 'Team Leadership', fields: [
          { name: "captain", title: "Captain", min: 1, max: 1, initialData: EMPTY_PERSON },
          { name: "viceCaptain", title: "Vice-Captain", min: 1, max: 1, initialData: EMPTY_PERSON },
        ]
      },
      {
        type: 'team', title: 'Player Roster', fields: [
          { name: "players", title: "Player", min: 3, max: 3, initialData: EMPTY_PERSON },
        ]
      },
      { type: 'coach', title: 'Coach Details' },
      { type: 'receipt', title: 'Payment Confirmation' }
    ],
    buildPayload: defaultTeamPayloadBuilder,
  },

  // == SMALLER TEAM / INDIVIDUAL SPORTS ==
  table_tennis: {
    title: "Table Tennis Registration",
    endpoint: "/events/table_tennis",
    paymentDetails: { fee: {men:"1500",women:"1000"} },
    steps: [
      { type: 'college', title: 'General Information', hasCategory: true },
      {
        type: 'team', title: 'Team Roster', fields: [
          { name: "captain", title: "Captain", min: 1, max: 1, initialData: EMPTY_PERSON },
          { name: "players", title: "Player", min: 0, max: 3, initialData: EMPTY_PERSON },
        ]
      },
      { type: 'coach', title: 'Coach Details' },
      { type: 'receipt', title: 'Payment Confirmation' }
    ],
    buildPayload: defaultTeamPayloadBuilder,
  },
  lawn_tennis: {
    title: "Lawn Tennis Registration",
    endpoint: "/events/lawn_tennis",
    paymentDetails: { fee: {men:"1000",women:"800"} },
    steps: [
      { type: 'college', title: 'General Information', hasCategory: true },
      {
        type: 'team', title: 'Team Roster', fields: [
          { name: "players", title: "Player", min: 2, max:4, initialData: EMPTY_PERSON },
        ]
      },
      { type: 'coach', title: 'Coach Details' },
      { type: 'receipt', title: 'Payment Confirmation' }
    ],
    buildPayload: defaultTeamPayloadBuilder,
  },
  squash: {
    title: "Squash Registration",
    endpoint: "/events/squash",
    paymentDetails: { fee: {men:"800",women:"600"} },
    steps: [
      { type: 'college', title: 'General Information', hasCategory: true },
      {
        type: 'team', title: 'Team Roster', fields: [
          { name: "players", title: "Player", min: 2, max: 2, initialData: EMPTY_PERSON },
        ]
      },
      { type: 'coach', title: 'Coach Details' },
      { type: 'receipt', title: 'Payment Confirmation' }
    ],
    buildPayload: defaultTeamPayloadBuilder,
  },
  chess: {
    title: "Chess Registration",
    endpoint: "/events/chess",
    paymentDetails: { fee: {open:"249" }},
    steps: [
      { type: 'college', title: 'General Information', hasCategory: false },
      {
        type: 'team', title: 'Team Roster', fields: [
          { name: "captain", title: "Captain", min: 1, max: 1, initialData: EMPTY_PERSON },
          { name: "players", title: "Player", min: 4, max: 5, initialData: EMPTY_PERSON },
        ]
      },
      { type: 'coach', title: 'Coach Details' },
      { type: 'receipt', title: 'Payment Confirmation' }
    ],
    buildPayload: defaultTeamPayloadBuilder,
  },
  powerlifting: {
    title: "Powerlifting Registration",
    endpoint: "/events/power_lifting",
    paymentDetails: { fee: {open:"999" }},
    steps: [
      { type: 'college', title: 'General Information', hasCategory: false },
      {
        type: 'team', title: 'Athlete Details', fields: [
          { name: "players", title: "Athlete", min: 1, max: 1, initialData: EMPTY_PERSON },
        ]
      },
      { type: 'coach', title: 'Coach Details' },
      { type: 'receipt', title: 'Payment Confirmation' }
    ],
    buildPayload: defaultTeamPayloadBuilder,
  },
  weightlifting: {
    title: "Weightlifting Registration",
    endpoint: "/events/weight_lifting",
    paymentDetails: { fee: {open:"999" }},
    steps: [
      { type: 'college', title: 'General Information', hasCategory: false },
      {
        type: 'team', title: 'Athlete Details', fields: [
          { name: "players", title: "Athlete", min: 1, max: 1, initialData: EMPTY_PERSON },
        ]
      },
      { type: 'coach', title: 'Coach Details' },
      { type: 'receipt', title: 'Payment Confirmation' }
    ],
    buildPayload: defaultTeamPayloadBuilder,
  },


  // == UNIQUE CASE: ATHLETICS ==
  athletics: {
    title: "Athletics Registration",
    endpoint: "/events/athletics",
    paymentDetails: { fee: "₹ 700 per head" },
    individualEventOptions: ["100m", "200m", "400m", "800m", "1500m", "5000m", "Long Jump", "Discuss Throw", "Shot put"],
    relayEventOptions: ["4x100m", "4x400m", "4x100m (Mixed)"],
    eventOptions: {
      men: {
        individual: ["100m", "200m", "400m", "800m", "1500m", "5000m", "Long Jump", "Discuss Throw", "Shotput"],
        relay: ["4x100m", "4x400m"],
      },
      women: {
        individual: ["100m", "200m", "400m", "800m", "Shotput"],
        relay: ["4x100m"],
      },
      mixed: {
        relay: ["4x100m (Mixed)"],
      },
    },
    steps: [
      { type: 'college', title: 'General Information', hasCategory: true },
      { type: 'athlete_captain', title: 'Lead Athlete Details' },
      { type: 'individual_events', title: 'Individual Event Selection (Max 3)' },
      { type: 'relay_events', title: 'Relay Event Selection (Max 2)' },
      { type: 'receipt', title: 'Payment Confirmation' },
      { type: 'coach', title: 'Coach Details' }
    ],
    buildPayload: athleticsPayloadBuilder,
  },


  mr_infinito: {
    title: "Mr. Infinito Registration",
    endpoint: "/events/mr_infinito", 
    paymentDetails: { fee: "₹ 599" },
    steps: [
      { type: 'college', title: 'General Information', hasCategory: true }, 
      {
        type: 'team', title: "Participant Details", fields: [
          { name: "players", title: "Participant", min: 1, max: 1, initialData: EMPTY_PERSON_WITH_COLLEGE_ID },
        ]
      },
      { type: 'receipt', title: 'Payment Confirmation' }
    ],
    buildPayload: defaultTeamPayloadBuilder, 
  },
};

