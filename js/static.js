var appTitle = new Vue({
    el: '.title',
    data: {
        greeting: 'Hello World!'
    }
})

var appBackground = new Vue({
    el: '.bg',
    data: {
        imageFirst: "https://source.unsplash.com/random?=first" + new Date().getTime(),
        imageSecond: "https://source.unsplash.com/random?=second" + new Date().getTime(),
        first:true,
        to:false
    },
    methods:{
        cancelTo() {
            clearTimeout(this.to);
        },
        refreshBackground ()
        {
          if (this.first)
            this.imageSecond = "https://source.unsplash.com/random?=second" + new Date().getTime()
          else
            this.imageFirst = "https://source.unsplash.com/random?=first" + new Date().getTime()
        },
        loop: function () {
   		    var that = this;
            this.to = setTimeout( function () {
                that.first = !that.first;
          		that.refreshBackground();
              	that.loop();
			}, 10000);
        },
    },
    mounted () {
      this.loop()
    }
})

// Conversion from URL to Base64 via Canvas: http://jsfiddle.net/handtrix/YvQ5y/
// particles.js: https://vincentgarreau.com/particles.js/
// For circular navigation: https://tympanus.net/Tutorials/CircularNavigation/index.html
//                          https://codepen.io/CreativePunch/pen/lAHiu/
//                          https://codepen.io/seyedi/pen/YXEqwB
//                          https://codepen.io/mahmoud-nb/pen/pbNBYP/
//
