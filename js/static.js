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
    mounted: function() {
      alert("MOUNTED")
    },
    methods: {
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
})
