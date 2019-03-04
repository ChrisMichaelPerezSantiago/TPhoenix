import {ACTYPE} from './types/actions_types';
import {MUTYPE} from './types/mutations_types';
import {BASE_URL , TOP_MOVIES , TOP_TVSHOWS , QUERY_URL} from '../API_URLs/index';
import axios from 'axios';

const A = axios.create({ baseURL: String(BASE_URL) });

function paginator(items, page, per_page){
  var page = page || 1,
  per_page = per_page || 10,
  offset = (page - 1) * per_page,

  paginatedItems = items.slice(offset).slice(0, per_page),
  total_pages = Math.ceil(items.length / per_page),

  paginContent = {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems
  };
  console.log("Paginate Item: " , paginatedItems);
  console.log("Pagin Content: " , paginContent);
  const total = paginContent.total;
  return paginContent.data;
};

export const actions = {
  [ACTYPE.GET_MOVIES]({commit} , page ){
   A.get(TOP_MOVIES).then((res) =>{
      console.log("\nTOP_MOVIES (res): " , res);
      const dataPaginated = paginator(res.data , page , 10);
      commit(MUTYPE.SET_MOVIES_DATA , dataPaginated);
      commit(MUTYPE.IS_LOADING , false);
    }).catch((err) =>{
      console.log(err);
    });  
  }, 

  [ACTYPE.GET_TVSHOWS]({commit} , page){
    A.get(TOP_TVSHOWS).then((res) =>{
      console.log("\nTOP_TVSHOWS (res): " , res);
      const dataPaginated = paginator(res.data , page , 10);
      commit(MUTYPE.SET_TVSHOW_DATA , dataPaginated)
      commit(MUTYPE.IS_LOADING , false);
    }).catch((err) =>{
      console.log(err)
    });
  },

  [ACTYPE.SEARCH_DATA]({commit} , query){
    A.get(QUERY_URL + `${query}/`).then((res) =>{
      console.log(res);
      commit(MUTYPE.SET_QUERIES , res.data);
    }).catch((err) =>{
      console.log(err);
    });
  },
};