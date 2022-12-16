Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    elements: [
      {
        title: '发起签到',
        name: 'initiate',
        realname:'initiate sign',
        color: 'cyan',
        icon: 'newsfill'
      },
      {
        title: '签到',
        name: 'signin',
        realname:'sign in',
        color: 'blue',
        icon: 'check'
      },
      {
        title: '寻物',
        name: 'find',
        realname:'look for',
        color: 'purple',
        icon: 'search'
      },
      {
        title: '记录',
        name: 'record',
        realname:'record',
        color: 'mauve',
        icon: 'camera'
      },
      {
        title: '锻炼',
        name: 'exercise',
        realname:'exercise',
        color: 'pink',
        icon: 'activityfill'
      },
      {
        title: '敬请期待..',
        name: 'more',
        realname:'More',
        color: 'grey',
        icon: 'like'
      }
    ],
  }
})