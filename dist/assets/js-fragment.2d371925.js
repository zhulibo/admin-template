function i(e,n=200,u=!1){let t=null,l=0;return function(){l++,u&&!t&&e.apply(this,arguments),t&&clearTimeout(t),t=setTimeout(()=>{(l>1||!u)&&e.apply(this,arguments),t=null},n)}}export{i as d};
