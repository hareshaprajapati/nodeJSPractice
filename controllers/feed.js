exports.getPosts = (req, res, next) => {
    return res.status(200).json({
        posts: [{
            title: 'title',
            content: 'contents'
        }]
    });
}

exports.createPost = (req, res, next) => {
    const titile = req.body.title;
    const content = req.body.content;
    // 201 means resource created
    res.status(201).json({ 
        message: 'post created successfully.',
        post: { id: new Date().toISOString(), title: titile, content: content}
 })
}