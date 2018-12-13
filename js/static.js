var app = new Vue({
    el: '.title',
    data: {
    greeting: 'Hello World!',
    background: 'http://source.unsplash.com/random'
    },
    methods: {
    humanizeURL: function (url) {
        return url
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '')
    }
    }
})
