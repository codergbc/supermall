import axios from './axios'

export function getDetailData(iid){
  return axios({
    url:'/detail',
    params:{
      iid
    }
  })
}

export function getRecommend(){
  return axios({
    url:'./recommend'
  })
}


export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.nowPrice = itemInfo.highNowPrice;
    this.count = itemInfo.cartNum
  }
}