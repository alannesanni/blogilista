const dummy = (blogs) => (1)

const totalLikes = (blogs) => {
    const summa = blogs.reduce((acc, current) => acc + current.likes, 0)
    return (summa)
}
  
const favoriteBlog = (blogs) => {
    if (blogs.length===0) {
        return (null)
    }
    const mostLikedBlog = blogs.reduce((prev, current) => (current.likes > prev.likes) ? current : prev)
    return (mostLikedBlog)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return (null)
    }

    const blogsByAuthor = {}

    blogs.forEach(blog => {
        if (blog.author in blogsByAuthor) {
        blogsByAuthor[blog.author]++
        } else {
        blogsByAuthor[blog.author] = 1
        }
    })

    const mostBlogsAuthor = Object.keys(blogsByAuthor).reduce((prev, current) => {
        return (blogsByAuthor[current] > blogsByAuthor[prev]) ? current : prev
    });
    return ({
        author: mostBlogsAuthor,
        blogs: blogsByAuthor[mostBlogsAuthor]
    })
    }

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return (null)
    }

    const likesByAuthor = {}

    blogs.forEach(blog => {
        if (blog.author in likesByAuthor) {
        likesByAuthor[blog.author] +=blog.likes
        } else {
        likesByAuthor[blog.author] = blog.likes
        }
    })

    const mostLikedAuthor = Object.keys(likesByAuthor).reduce((prev, current) => {
        return (likesByAuthor[current] >likesByAuthor[prev]) ? current : prev
    });
    return ({
        author: mostLikedAuthor,
        likes: likesByAuthor[mostLikedAuthor]
    })
    }

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }
