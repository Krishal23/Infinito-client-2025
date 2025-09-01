const EMPTY_ESPORTS_PLAYER = { name: "", email: "", contactNumber: "", aadharId: "", ign: "" };

const esportsPayloadBuilder = (form) => {
  const payload = {
    teamName: form.teamName,
    teamLeader: {
      ...form.teamLeader,
      collegeName: form.collegeName,
      collegeAddress: form.collegeAddress,
      collegeId: form.collegeId,
    },
    players: form.players.filter(p => p.name && p.email),
    queries: form.queries,
  };
  if (form.players.length === 0) {
    delete payload.teamName;
  }
  return payload;
};

export const esportsConfigs = {
  valorant: {
    title: "Valorant Registration",
    gameName: "VALORANT",
    playerCount: 4,
    paymentDetails: { fee: "₹ 1000" },
    steps: [
      { type: 'college_info', title: 'College Information' },
      { type: 'team_info', title: 'Team Information' },
      { type: 'leader_info', title: 'Team Leader Details' },
      { type: 'player_info', title: 'Player Roster' },
      { type: 'receipt', title: 'Payment Confirmation' },
    ],
    buildPayload: esportsPayloadBuilder,
  },
  bgmi: {
    title: "BGMI Registration",
    gameName: "BGMI",
    playerCount: 4,
    paymentDetails: { fee: "₹ 800" },
    steps: [
      { type: 'college_info', title: 'College Information' },
      { type: 'team_info', title: 'Team Information' },
      { type: 'leader_info', title: 'Team Leader Details' },
      { type: 'player_info', title: 'Player Roster' },
      { type: 'receipt', title: 'Payment Confirmation' },
    ],
    buildPayload: esportsPayloadBuilder,
  },
  codm: {
    title: "CODM Registration",
    gameName: "CODM",
    playerCount: 4,
    paymentDetails: { fee: "₹ 800" },
    steps: [
        { type: 'college_info', title: 'College Information' },
        { type: 'team_info', title: 'Team Information' },
        { type: 'leader_info', title: 'Team Leader Details' },
        { type: 'player_info', title: 'Player Roster' },
        { type: 'receipt', title: 'Payment Confirmation' },
    ],
    buildPayload: esportsPayloadBuilder,
  },
  freefire: {
    title: "Free Fire Registration",
    gameName: "FREEFIRE",
    playerCount: 4,
    paymentDetails: { fee: "₹ 800" },
    steps: [
        { type: 'college_info', title: 'College Information' },
        { type: 'team_info', title: 'Team Information' },
        { type: 'leader_info', title: 'Team Leader Details' },
        { type: 'player_info', title: 'Player Roster' },
        { type: 'receipt', title: 'Payment Confirmation' },
    ],
    buildPayload: esportsPayloadBuilder,
  },
  clash_royale: {
    title: "Clash Royale Registration",
    gameName: "CLASH_ROYALE",
    playerCount: 4, 
    paymentDetails: { fee: "₹ 200" },
    steps: [
        { type: 'college_info', title: 'College Information' },
        { type: 'team_info', title: 'Team Information' },
        { type: 'leader_info', title: 'Team Leader Details' },
        { type: 'player_info', title: 'Player Roster' },
        { type: 'receipt', title: 'Payment Confirmation' },
    ],
    buildPayload: esportsPayloadBuilder,
  },
};

