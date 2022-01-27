import { Module } from 'vuex';

import { SET_ACCOUNTINFO, GET_ACCOUNTINFO } from './actionType';
import { AccountInfo } from '@/interface/index';

export interface LoginState {
  accountInfo: AccountInfo;
}

const LoginStore: Module<LoginState, Record<string, unknown>> = {
  namespaced: true,
  state: {
    accountInfo: {
      account: '',
      password: ''
    }
  },
  getters: {
    [GET_ACCOUNTINFO]: (state: LoginState): AccountInfo => {
      return state.accountInfo;
    }
  },
  mutations: {
    [SET_ACCOUNTINFO](state, payload: AccountInfo) {
      state.accountInfo = payload;
    }
  },
  actions: {
    [SET_ACCOUNTINFO]({ commit }, payload: AccountInfo) {
      commit(SET_ACCOUNTINFO, payload);
    }
  }
};

export default LoginStore;
