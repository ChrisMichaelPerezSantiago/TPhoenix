import {MUTYPE} from './types/mutations_types';

export const mutations = {
  [MUTYPE.SET_MOVIES_DATA](state , payload){
    state.topMovies = payload;
  },

  [MUTYPE.SET_TVSHOW_DATA](state , payload){
    state.topTvShows = payload
  },

  [MUTYPE.IS_LOADING](state , payload){
    state.loading = payload;
  },

  [MUTYPE.SET_QUERIES](state , payload){
    state.queries = payload;
  },
};