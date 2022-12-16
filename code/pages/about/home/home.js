const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  properties:{
    userName:{
      type:"string",
      value:''
    },
    userAvatarUrl:{
      type:"string",
      value:''
    }
  },
  lifetimes:{
    attached()
    {   
     
      
    },
  },
  methods: {
    
  }
})