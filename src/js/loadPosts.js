let url = "//scrummable.com"

const displayPosts = (post) => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', 'templates/card.html')
    xhr.responseType = 'text'
    xhr.send(null)

    xhr.onreadystatechange = (templates) => {
        const DONE = 4 // readyState 4 means the request is done.
        const OK = 200 // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                // Log for debug
                // console.log(xhr.responseText)
                const template = xhr.responseText
                const main = document.querySelector('main')
                const container = document.createElement('article')
                const content = Mustache.render(template, post)
                container.className = 'post-card'
                container.innerHTML = content
                main.appendChild(container)
            } else {
                console.error('Error: ' + xhr.status) // An error occurred during the request.
            }
        }
    }
}

const authors = []

const getAuthors = () => {
    let xhr = new XMLHttpRequest()
    let bustCache = '?' + new Date().getTime()
    xhr.open('GET', url + '/wp-json/wp/v2/users/', true)
    xhr.responseType = 'text'
    xhr.send(null)

    xhr.onreadystatechange = () => {
        const DONE = 4 // readyState 4 means the request is done.
        const OK = 200 // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                // Log for debug
                //console.log(xhr.responseText)
                authors.push(JSON.parse(xhr.responseText))

            } else {
                console.error('Error: ' + xhr.status) // An error occurred during the request.
            }
        }
    }
}

getAuthors()

let getThisAuthor = (id) => {
    for (let i = 0; i < authors.length; i++) {
        for (var [key, value] of Object.entries(authors[i])) {
            if (value.id == id) {
                return value.name
            }
        }
    }
}

const posts = []

const loadPosts = () => {

    let xhr = new XMLHttpRequest()
    let bustCache = '?' + new Date().getTime()
    xhr.open('GET', url + '/wp-json/wp/v2/posts?_embed', true)
    xhr.responseType = 'text'
    xhr.send(null)

    xhr.onreadystatechange = () => {
        const DONE = 4 // readyState 4 means the request is done.
        const OK = 200 // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {

                // Log for debug
                // console.log(xhr.responseText)
                const r = JSON.parse(xhr.responseText)
                for (let i = 0; i < r.length; i++) {
                    // Log for debug
                    //console.info('R:', r[i])


                    let authorname = ''

                    let post = {
                        hero: r[i]._embedded["wp:featuredmedia"]["0"].source_url,
                        title: r[i].title.rendered,
                        id: r[i].id,
                        datePost: moment(r[i].date).format('Do MMMM YYYY'),
                        author: getThisAuthor(r[i].author),
                        excerpt: r[i].excerpt.rendered,
                        content: r[i].content.rendered,
                        postLength: (r[i].content.rendered).split(' ').length,
                        readTime: Math.ceil((r[i].content.rendered).split(' ').length / 200)
                    }




                    posts.push(post)


                    if (document.querySelector('.post-card') == r.length) {
                        console.log('all posts rendered')
                        returnButtons()
                    }
                }
                for (let a = 0; a < posts.length; a++) {
                    displayPosts(posts[a])
                }

            } else {
                console.error('Error: ' + xhr.status) // An error occurred during the request.
            }
        }
    }


}

function loadPost(id) {
    $.ajax({
        type: "GET",
        url: url + "/wp-json/wp/v2/posts/" + id + "?_embed",
        dataType: "JSON",
        success: function(data) {
            let post = data
            let hero = post._embedded["wp:featuredmedia"]["0"].source_url
            let title = post.title.rendered
            let content = post.content.rendered
            let permalink = post.link
            let postCard = "<article class='post-full'><img style='width: 100%;' src='" + hero + "'/><h1>" + title + "</h1><div class='post-content'>" + content + "</div></article>"
            $('main').html(postCard)



            console.log('load post', data)

            // end of success
        }
    })
}

function blogInfo() {
    $.ajax({
        type: "GET",
        url: url + "/wp-json/",
        dataType: "JSON",
        success: function(data) {
            // log for debug
            console.log('blog info', data)

            let name = data.name
            let description = data.description

            let now = new Date().getFullYear()
            let dateStart = '2014'
            let years = (now - dateStart)
            if (years >= 1) {
                $('#colophon .inner').html("<small>&copy; " + dateStart + " - " + now + " " + name + ".<br />" + description + "</small>")
                $('#colophon .inner small').append('.<br />Made with &hearts; for ' + years + ' years')
            } else {
                $('#colophon .inner').html("<small>&copy; " + now + " " + name + ".<br />" + description + "</small>")
                $('#colophon .inner small').append('.<br />Made with &hearts;')
            }

            $('#masthead .inner').html("<h1>" + name + "</h1>")
                // end of success
        }
    })

}
