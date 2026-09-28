import {
  availabilityMock,
  leadsMock,
  notificationSettingsMock,
  portfolioMock,
  professionalProfileMock,
  reviewsMock,
  serviceAreasMock,
  servicesMock,
  teamMembersMock,
  walletTransactionsMock,
} from "../data/professional.mock";

export function getProfessionalWorkspace() {
  return {
    profile: { ...professionalProfileMock },
    leads: leadsMock.map((lead) => ({ ...lead })),
    services: servicesMock.map((service) => ({ ...service })),
    portfolio: portfolioMock.map((item) => ({ ...item })),
    reviews: reviewsMock.map((review) => ({ ...review })),
    teamMembers: teamMembersMock.map((member) => ({ ...member })),
    availability: {
      ...availabilityMock,
      workingDays: [...availabilityMock.workingDays],
    },
    serviceAreas: [...serviceAreasMock],
    notifications: { ...notificationSettingsMock },
    transactions: walletTransactionsMock.map((transaction) => ({
      ...transaction,
    })),
    creditBalance: 450,
  };
}
