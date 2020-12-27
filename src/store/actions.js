export const actions = {
  cAddToCart(context,payload){
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if(oldProduct)
      context.commit('addCount',oldProduct)
    else 
      context.commit('addToCart',payload)
  }
}