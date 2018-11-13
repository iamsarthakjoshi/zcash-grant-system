enum CreateTypes {
  UPDATE_FORM = 'UPDATE_FORM',

  SAVE_DRAFT = 'SAVE_DRAFT',
  SAVE_DRAFT_PENDING = 'SAVE_DRAFT_PENDING',
  SAVE_DRAFT_FULFILLED = 'SAVE_DRAFT_FULFILLED',
  SAVE_DRAFT_REJECTED = 'SAVE_DRAFT_REJECTED',

  FETCH_DRAFTS = 'FETCH_DRAFTS',
  FETCH_DRAFTS_PENDING = 'FETCH_DRAFTS_PENDING',
  FETCH_DRAFTS_FULFILLED = 'FETCH_DRAFTS_FULFILLED',
  FETCH_DRAFTS_REJECTED = 'FETCH_DRAFTS_REJECTED',

  CREATE_DRAFT = 'CREATE_DRAFT',
  CREATE_DRAFT_PENDING = 'CREATE_DRAFT_PENDING',
  CREATE_DRAFT_FULFILLED = 'CREATE_DRAFT_FULFILLED',
  CREATE_DRAFT_REJECTED = 'CREATE_DRAFT_REJECTED',

  SUBMIT = 'CREATE_PROPOSAL',
  SUBMIT_PENDING = 'CREATE_PROPOSAL_PENDING',
  SUBMIT_FULFILLED = 'CREATE_PROPOSAL_FULFILLED',
  SUBMIT_REJECTED = 'CREATE_PROPOSAL_REJECTED',
}

export interface CreateDraftOptions {
  redirect?: boolean;
}

export default CreateTypes;
