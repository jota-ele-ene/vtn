var appTitle = new Vue({
    el: '.title',
    data: {
        greeting: 'Hello World!'
    }
})

var appBackground = new Vue({
    el: '.bg',
    data: {
        image: "https://source.unsplash.com/random"
    },
    methods:{
        callFunction: function () {
       		var that = this;
			setTimeout( function () {
              	refreshBackground();
				    that.callFunction();
							}, 2000);
       },
        humanizeURL(url) {
            return url
            .replace(/^https?:\/\//, '')
            .replace(/\/$/, '')
        },
        refreshBackground ()
        {
            this.image = "https://source.unsplash.com/random?=" + new Date().getTime()
        }

    },
    computed: {
        background() {
            return "{ background-image: url(https://source.unsplash.com/random?="+ new Date().getTime() +");}"
        }
    },
    mounted () {
      this.loop()
    }
})