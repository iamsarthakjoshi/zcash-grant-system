export enum PROPOSAL_SORT {
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST',
}

export const SORT_LABELS: { [key in PROPOSAL_SORT]: string } = {
  NEWEST: 'Newest',
  OLDEST: 'Oldest',
};

export enum PROPOSAL_CATEGORY {
  DEV_TOOL = 'DEV_TOOL',
  CORE_DEV = 'CORE_DEV',
  COMMUNITY = 'COMMUNITY',
  DOCUMENTATION = 'DOCUMENTATION',
  ACCESSIBILITY = 'ACCESSIBILITY',
}

interface CategoryUI {
  label: string;
  color: string;
  icon: string;
}

export const CATEGORY_UI: { [key in PROPOSAL_CATEGORY]: CategoryUI } = {
  DEV_TOOL: {
    label: 'Developer tool',
    color: '#2c3e50',
    icon: 'tool',
  },
  CORE_DEV: {
    label: 'Core dev',
    color: '#d35400',
    icon: 'rocket',
  },
  COMMUNITY: {
    label: 'Community',
    color: '#27ae60',
    icon: 'team',
  },
  DOCUMENTATION: {
    label: 'Documentation',
    color: '#95a5a6',
    icon: 'paper-clip',
  },
  ACCESSIBILITY: {
    label: 'Accessibility',
    color: '#2980b9',
    icon: 'eye-o',
  },
};

export enum PROPOSAL_STAGE {
  PREVIEW = 'PREVIEW',
  FUNDING_REQUIRED = 'FUNDING_REQUIRED',
  WIP = 'WIP',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
}

export enum CUSTOM_FILTERS {
  STATUS_DISCUSSION = 'STATUS_DISCUSSION',
  ACCEPTED_WITH_FUNDING = 'ACCEPTED_WITH_FUNDING',
  ACCEPTED_WITHOUT_FUNDING = 'ACCEPTED_WITHOUT_FUNDING',
}

interface StageUI {
  label: string;
  color: string;
}

export type PROPOSAL_FILTERS = PROPOSAL_STAGE | CUSTOM_FILTERS;

export const STAGE_UI: { [key in PROPOSAL_FILTERS]: StageUI } = {
  PREVIEW: {
    label: 'Preview',
    color: '#8e44ad',
  },
  STATUS_DISCUSSION: {
    label: 'Open for Public Review',
    color: '#8e44ad',
  },
  FUNDING_REQUIRED: {
    label: 'Funding required',
    color: '#8e44ad',
  },
  ACCEPTED_WITH_FUNDING: {
    label: 'Funded by ZF',
    color: '#8e44ad',
  },
  ACCEPTED_WITHOUT_FUNDING: {
    label: 'Not Funded by ZF',
    color: '#8e44ad',
  },
  WIP: {
    label: 'In progress',
    color: '#2980b9',
  },
  COMPLETED: {
    label: 'Completed',
    color: '#27ae60',
  },
  // Never used
  FAILED: {
    label: 'Failed',
    color: '#000',
  },
  CANCELED: {
    label: 'Canceled',
    color: '#000',
  },
};

export enum RFP_STATUS {
  DRAFT = 'DRAFT',
  LIVE = 'LIVE',
  CLOSED = 'CLOSED',
}
