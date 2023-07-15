import axios from "axios";


// const url_API = process.env.VUE_APP_USER_API_URL
const state = {
    user:{},
    userLoading:false,
    data:'',
};
const getters = {
    GetUser:(state)=>{
        return state.user
    },
    loadding:(state)=>{
        return state.userLoading
    },
    sendData:(state)=>{
        return state.data
    },
};

const mutations = {
    userLoading(state, data){
        state.userLoading = data
    },
    sendToUser(state,data){
        state.user = data
    }
    ,
    sendData(state, u){
        state.data = u
    }
};

const actions = {
    async getData({commit}){
        
        commit('userLoading',true)
        await axios.get("user", this.$headers).then((res)=>{
            commit('sendToUser',res.data)
            commit('userLoading',false)
            
            console.log('hel', res.data)
            // console.log(state.url_API,1111133411)
        }).catch(err=>{
            if(response.status == 401){
                location.reload()
            }
            // console.log(err)
        })
    },
    eventStart({commit}){
        let a = 10;
        console.log(666,this.$headers)
        commit('sendData',a)
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};

