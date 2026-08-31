type SocialBarDocumentState = {
  requestedScriptIds: Set<string>;
  revokedScriptIds: Set<string>;
  reloadPending: boolean;
};

declare global {
  interface Window {
    __security51GuideSocialBarState?: SocialBarDocumentState;
  }
}

function getState(): SocialBarDocumentState {
  if (!window.__security51GuideSocialBarState) {
    window.__security51GuideSocialBarState = {
      requestedScriptIds: new Set(),
      revokedScriptIds: new Set(),
      reloadPending: false,
    };
  }

  return window.__security51GuideSocialBarState;
}

function removeOwnedScript(scriptId: string) {
  const element = document.getElementById(scriptId);
  if (
    element instanceof HTMLScriptElement
    && element.dataset.adsterraSocialBar === scriptId
  ) {
    element.remove();
  }
}

export function markSocialBarRequested(scriptId: string) {
  getState().requestedScriptIds.add(scriptId);
}

export function isSocialBarRequestBlocked(scriptId: string) {
  const state = getState();
  return state.reloadPending
    || state.requestedScriptIds.has(scriptId)
    || state.revokedScriptIds.has(scriptId);
}

export function revokeSocialBar(scriptId: string) {
  const state = getState();
  if (!state.requestedScriptIds.has(scriptId)) return false;

  state.revokedScriptIds.add(scriptId);
  removeOwnedScript(scriptId);
  return true;
}

export function revokeRequestedSocialBars() {
  const state = getState();
  for (const scriptId of state.requestedScriptIds) {
    state.revokedScriptIds.add(scriptId);
    removeOwnedScript(scriptId);
  }

  return state.requestedScriptIds.size > 0;
}

export function requestDocumentReload(reload: () => void) {
  const state = getState();
  if (state.reloadPending) return false;

  state.reloadPending = true;
  reload();
  return true;
}
